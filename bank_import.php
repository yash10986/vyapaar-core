<?php
/**
 * VYAPAAR CORE - Bank Statement Import & Normalisation Engine
 *
 * Endpoint contract (always returns application/json):
 *   POST bank_import.php?action=parse     multipart/form-data: statement=<file>, bank=auto|sbi|hdfc|icici
 *   POST bank_import.php?action=parse     application/json:    { fileName, content, bank }
 *   GET  bank_import.php?action=formats
 *
 * Accepts .CSV and .OFX exports from SBI, HDFC and ICICI and emits a single
 * normalised transaction shape the reconciliation UI can match against:
 *
 *   { date, valueDate, narration, refNo, deposit, withdrawal, amount,
 *     direction: "deposit"|"withdrawal", balance, fingerprint }
 */

declare(strict_types=1);

ini_set('display_errors', '0');
ini_set('log_errors', '1');
error_reporting(E_ALL);

if (session_status() === PHP_SESSION_NONE) {
    @session_start();
}

const BANK_IMPORT_DIR   = 'imports';
const BANK_MAX_BYTES    = 8388608; // 8 MB
const BANK_MAX_ROWS     = 5000;

function bankRespond(array $payload, int $status = 200): void
{
    if (!headers_sent()) {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        header('Cache-Control: no-store, no-cache, must-revalidate');
        header('X-Content-Type-Options: nosniff');
    }
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PARTIAL_OUTPUT_ON_ERROR);
    exit;
}

function bankFail(string $message, int $status = 400, array $extra = []): void
{
    bankRespond(array_merge(['success' => false, 'error' => $message], $extra), $status);
}

set_exception_handler(static function (Throwable $e): void {
    error_log('[bank_import] ' . $e->getMessage() . ' @ ' . $e->getFile() . ':' . $e->getLine());
    bankFail('Statement parser exception: ' . $e->getMessage(), 500);
});

set_error_handler(static function (int $severity, string $message, string $file = '', int $line = 0): bool {
    if ((error_reporting() & $severity) === 0) {
        return false;
    }
    throw new ErrorException($message, 0, $severity, $file, $line);
});

register_shutdown_function(static function (): void {
    $fatal = error_get_last();
    if ($fatal !== null && in_array($fatal['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR], true)) {
        if (!headers_sent()) {
            http_response_code(500);
            header('Content-Type: application/json; charset=utf-8');
        }
        echo json_encode(['success' => false, 'error' => 'Statement parser fatal: ' . $fatal['message']]);
    }
});

// ---------------------------------------------------------------------------
// Bank column dictionaries
//
// Each bank exports the same six logical fields under different headers. The
// detector scores a header row against these synonym lists rather than relying
// on an exact template, so minor export-format drift still resolves.
// ---------------------------------------------------------------------------

const BANK_FIELD_SYNONYMS = [
    'date' => [
        'txn date', 'transaction date', 'tran date', 'date', 'post date', 'posting date',
    ],
    'valueDate' => [
        'value date', 'value dt', 'value dt.', 'valuedate',
    ],
    'narration' => [
        'narration', 'description', 'transaction remarks', 'remarks', 'particulars', 'details',
    ],
    'refNo' => [
        'ref no./cheque no.', 'ref no', 'reference no', 'chq./ref.no.', 'cheque no',
        'cheque number', 'chq no', 'ref/cheque no', 'transaction id', 'utr',
    ],
    'withdrawal' => [
        'withdrawal', 'withdrawal amt.', 'withdrawal amt', 'withdrawal amount', 'withdrawal amount (inr )',
        'withdrawal amount (inr)', 'debit', 'debit amount', 'dr', 'dr amount', 'paid out',
    ],
    'deposit' => [
        'deposit', 'deposit amt.', 'deposit amt', 'deposit amount', 'deposit amount (inr )',
        'deposit amount (inr)', 'credit', 'credit amount', 'cr', 'cr amount', 'paid in',
    ],
    'balance' => [
        'balance', 'closing balance', 'balance (inr )', 'balance (inr)', 'running balance', 'available balance',
    ],
];

/** Header fingerprints used to name the issuing bank in the UI. */
const BANK_SIGNATURES = [
    'HDFC'  => ['narration', 'chq./ref.no.', 'withdrawal amt.', 'deposit amt.', 'closing balance'],
    'ICICI' => ['transaction remarks', 'withdrawal amount (inr )', 'deposit amount (inr )', 's no.'],
    'SBI'   => ['txn date', 'ref no./cheque no.', 'debit', 'credit'],
];

function bankNormaliseHeader(string $value): string
{
    $value = str_replace(["\xEF\xBB\xBF", "\u{00A0}"], ' ', $value);
    $value = strtolower(trim($value));

    return trim(preg_replace('/\s+/', ' ', $value) ?? '');
}

/** @return array<string,int> logical field name => column index */
function bankMapColumns(array $headerCells): array
{
    $normalised = array_map('bankNormaliseHeader', $headerCells);
    $map = [];

    foreach (BANK_FIELD_SYNONYMS as $field => $synonyms) {
        foreach ($normalised as $index => $cell) {
            if ($cell === '' || in_array($index, $map, true)) {
                continue;
            }
            if (in_array($cell, $synonyms, true)) {
                $map[$field] = $index;
                continue 2;
            }
        }
        // Second pass: substring match for headers carrying extra units/notes.
        foreach ($normalised as $index => $cell) {
            if ($cell === '' || in_array($index, $map, true)) {
                continue;
            }
            foreach ($synonyms as $synonym) {
                if (str_contains($cell, $synonym)) {
                    $map[$field] = $index;
                    continue 3;
                }
            }
        }
    }

    return $map;
}

function bankDetectIssuer(array $headerCells, string $fallback = 'Generic'): string
{
    $normalised = array_map('bankNormaliseHeader', $headerCells);
    $best = $fallback;
    $bestScore = 0;

    foreach (BANK_SIGNATURES as $bank => $markers) {
        $score = 0;
        foreach ($markers as $marker) {
            foreach ($normalised as $cell) {
                if ($cell !== '' && str_contains($cell, $marker)) {
                    $score++;
                    break;
                }
            }
        }
        if ($score > $bestScore) {
            $bestScore = $score;
            $best = $bank;
        }
    }

    return $bestScore >= 2 ? $best : $fallback;
}

// ---------------------------------------------------------------------------
// Value coercion
// ---------------------------------------------------------------------------

function bankParseAmount(?string $raw): float
{
    if ($raw === null) {
        return 0.0;
    }
    $clean = preg_replace('/[^0-9.\-()]/', '', str_replace(',', '', $raw)) ?? '';
    if ($clean === '' || $clean === '-' || $clean === '.') {
        return 0.0;
    }
    // Accounting negatives: (1,234.00)
    $negative = str_contains($clean, '(') && str_contains($clean, ')');
    $clean = str_replace(['(', ')'], '', $clean);

    $value = (float)$clean;

    return $negative ? -abs($value) : $value;
}

/** Normalises the many Indian bank date renderings to ISO yyyy-mm-dd. */
function bankParseDate(?string $raw): string
{
    $raw = trim((string)$raw);
    if ($raw === '') {
        return '';
    }

    // OFX: 20260812000000[+5:IST]
    if (preg_match('/^(\d{4})(\d{2})(\d{2})/', $raw, $m)) {
        return sprintf('%s-%s-%s', $m[1], $m[2], $m[3]);
    }

    $formats = ['d/m/Y', 'd-m-Y', 'd.m.Y', 'd/m/y', 'd-m-y', 'Y-m-d', 'd M Y', 'd-M-Y', 'd/M/Y', 'd M y', 'd-M-y'];
    foreach ($formats as $format) {
        $parsed = DateTimeImmutable::createFromFormat('!' . $format, $raw);
        if ($parsed instanceof DateTimeImmutable && $parsed->format($format) === $raw) {
            return $parsed->format('Y-m-d');
        }
    }

    $timestamp = strtotime($raw);

    return $timestamp === false ? '' : date('Y-m-d', $timestamp);
}

function bankCleanText(?string $raw): string
{
    return trim(preg_replace('/\s+/', ' ', (string)$raw) ?? '');
}

function bankFingerprint(array $row): string
{
    return substr(hash('sha256', implode('|', [
        $row['date'], $row['narration'], $row['refNo'], (string)$row['amount'], $row['direction'],
    ])), 0, 16);
}

function bankBuildRow(array $fields): ?array
{
    $date = bankParseDate($fields['date'] ?? '');
    $withdrawal = abs(bankParseAmount($fields['withdrawal'] ?? null));
    $deposit = abs(bankParseAmount($fields['deposit'] ?? null));
    $narration = bankCleanText($fields['narration'] ?? '');

    if ($date === '' && $narration === '') {
        return null;
    }
    if ($withdrawal <= 0.0 && $deposit <= 0.0) {
        return null; // Opening-balance / carry-forward filler lines.
    }

    $direction = $deposit > 0.0 ? 'deposit' : 'withdrawal';
    $row = [
        'date'       => $date,
        'valueDate'  => bankParseDate($fields['valueDate'] ?? '') ?: $date,
        'narration'  => $narration,
        'refNo'      => bankCleanText($fields['refNo'] ?? ''),
        'withdrawal' => round($withdrawal, 2),
        'deposit'    => round($deposit, 2),
        'amount'     => round($deposit > 0.0 ? $deposit : $withdrawal, 2),
        'direction'  => $direction,
        'balance'    => round(bankParseAmount($fields['balance'] ?? null), 2),
    ];
    $row['fingerprint'] = bankFingerprint($row);

    return $row;
}

// ---------------------------------------------------------------------------
// CSV parser
// ---------------------------------------------------------------------------

function bankSplitCsvLine(string $line, string $delimiter): array
{
    return str_getcsv($line, $delimiter, '"', '\\');
}

function bankDetectDelimiter(string $sample): string
{
    $candidates = [',' => 0, ';' => 0, "\t" => 0, '|' => 0];
    foreach (array_keys($candidates) as $delimiter) {
        $candidates[$delimiter] = substr_count($sample, $delimiter);
    }
    arsort($candidates);
    $winner = array_key_first($candidates);

    return $candidates[$winner] > 0 ? (string)$winner : ',';
}

function bankParseCsv(string $content, string $bankHint): array
{
    $content = str_replace(["\r\n", "\r"], "\n", ltrim($content, "\xEF\xBB\xBF"));
    $lines = array_values(array_filter(explode("\n", $content), static fn(string $l): bool => trim($l) !== ''));

    if ($lines === []) {
        bankFail('The uploaded statement is empty.', 422);
    }

    $delimiter = bankDetectDelimiter(implode("\n", array_slice($lines, 0, 25)));

    // Indian bank exports prefix the table with account-holder blurb, so scan
    // for the first line that maps to both a date column and an amount column.
    $headerIndex = -1;
    $columnMap = [];
    foreach ($lines as $index => $line) {
        if ($index > 40) {
            break;
        }
        $candidate = bankMapColumns(bankSplitCsvLine($line, $delimiter));
        if (isset($candidate['date']) && (isset($candidate['withdrawal']) || isset($candidate['deposit']))) {
            $headerIndex = $index;
            $columnMap = $candidate;
            break;
        }
    }

    if ($headerIndex === -1) {
        bankFail(
            'Could not locate a transaction header row. Expected date plus debit/credit columns '
            . '(SBI, HDFC or ICICI CSV export).',
            422,
            ['sampleHeader' => bankCleanText($lines[0] ?? '')]
        );
    }

    $headerCells = bankSplitCsvLine($lines[$headerIndex], $delimiter);
    $issuer = $bankHint !== 'auto' ? strtoupper($bankHint) : bankDetectIssuer($headerCells);

    $rows = [];
    $skipped = 0;
    foreach (array_slice($lines, $headerIndex + 1) as $line) {
        if (count($rows) >= BANK_MAX_ROWS) {
            break;
        }
        $cells = bankSplitCsvLine($line, $delimiter);

        $fields = [];
        foreach ($columnMap as $field => $columnIndex) {
            $fields[$field] = $cells[$columnIndex] ?? '';
        }

        $row = bankBuildRow($fields);
        if ($row === null) {
            $skipped++;
            continue;
        }
        $rows[] = $row;
    }

    return [
        'rows'    => $rows,
        'skipped' => $skipped,
        'issuer'  => $issuer,
        'format'  => 'CSV',
        'columns' => array_keys($columnMap),
    ];
}

// ---------------------------------------------------------------------------
// OFX parser (SGML 1.x and XML 2.x)
// ---------------------------------------------------------------------------

function bankOfxTag(string $block, string $tag): string
{
    // XML-style closed tag first, then SGML-style value-until-newline/next-tag.
    if (preg_match('#<' . $tag . '>(.*?)</' . $tag . '>#is', $block, $m)) {
        return bankCleanText($m[1]);
    }
    if (preg_match('#<' . $tag . '>([^<\r\n]*)#i', $block, $m)) {
        return bankCleanText($m[1]);
    }

    return '';
}

function bankParseOfx(string $content, string $bankHint): array
{
    if (!preg_match_all('#<STMTTRN>(.*?)</STMTTRN>#is', $content, $matches)) {
        bankFail('No <STMTTRN> transaction blocks found in the OFX file.', 422);
    }

    $issuer = $bankHint !== 'auto' ? strtoupper($bankHint) : 'Generic';
    if ($bankHint === 'auto') {
        $orgName = bankOfxTag($content, 'ORG');
        foreach (['SBI' => 'sbi', 'HDFC' => 'hdfc', 'ICICI' => 'icici'] as $label => $needle) {
            if ($orgName !== '' && str_contains(strtolower($orgName), $needle)) {
                $issuer = $label;
                break;
            }
        }
        if ($issuer === 'Generic' && $orgName !== '') {
            $issuer = $orgName;
        }
    }

    $rows = [];
    $skipped = 0;
    foreach ($matches[1] as $block) {
        if (count($rows) >= BANK_MAX_ROWS) {
            break;
        }

        $amount = bankParseAmount(bankOfxTag($block, 'TRNAMT'));
        $type = strtoupper(bankOfxTag($block, 'TRNTYPE'));
        $narration = bankOfxTag($block, 'NAME');
        if ($narration === '') {
            $narration = bankOfxTag($block, 'MEMO');
        }

        // OFX signs the amount; TRNTYPE is the tie-breaker when it is zero.
        $isDeposit = $amount > 0.0 || ($amount === 0.0 && in_array($type, ['CREDIT', 'DEP', 'DIRECTDEP', 'INT'], true));

        $row = bankBuildRow([
            'date'       => bankOfxTag($block, 'DTPOSTED'),
            'valueDate'  => bankOfxTag($block, 'DTAVAIL'),
            'narration'  => $narration !== '' ? $narration : $type,
            'refNo'      => bankOfxTag($block, 'FITID') ?: bankOfxTag($block, 'CHECKNUM'),
            'withdrawal' => $isDeposit ? '' : (string)abs($amount),
            'deposit'    => $isDeposit ? (string)abs($amount) : '',
            'balance'    => '',
        ]);

        if ($row === null) {
            $skipped++;
            continue;
        }
        $rows[] = $row;
    }

    return [
        'rows'    => $rows,
        'skipped' => $skipped,
        'issuer'  => $issuer,
        'format'  => 'OFX',
        'columns' => ['date', 'narration', 'refNo', 'withdrawal', 'deposit'],
    ];
}

// ---------------------------------------------------------------------------
// Upload intake
// ---------------------------------------------------------------------------

function bankUploadErrorMessage(int $code): string
{
    return match ($code) {
        UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE => 'The statement exceeds the upload size limit.',
        UPLOAD_ERR_PARTIAL   => 'The statement upload was interrupted. Retry the import.',
        UPLOAD_ERR_NO_FILE   => 'No statement file was attached to the request.',
        UPLOAD_ERR_NO_TMP_DIR, UPLOAD_ERR_CANT_WRITE => 'The server could not buffer the upload to disk.',
        UPLOAD_ERR_EXTENSION => 'A PHP extension blocked the upload.',
        default              => 'Unknown upload failure (code ' . $code . ').',
    };
}

/** @return array{name:string, content:string} */
function bankReadPayload(): array
{
    if (isset($_FILES['statement'])) {
        $file = $_FILES['statement'];
        $error = (int)($file['error'] ?? UPLOAD_ERR_NO_FILE);
        if ($error !== UPLOAD_ERR_OK) {
            bankFail(bankUploadErrorMessage($error), 422);
        }
        if ((int)($file['size'] ?? 0) > BANK_MAX_BYTES) {
            bankFail('Statement is larger than ' . (BANK_MAX_BYTES / 1048576) . ' MB.', 413);
        }

        $tmpPath = (string)($file['tmp_name'] ?? '');
        if ($tmpPath === '' || !is_uploaded_file($tmpPath)) {
            bankFail('Upload could not be verified as a genuine multipart file.', 422);
        }

        $name = basename((string)($file['name'] ?? 'statement'));
        $extension = strtolower(pathinfo($name, PATHINFO_EXTENSION));
        if (!in_array($extension, ['csv', 'ofx', 'txt', 'qfx'], true)) {
            bankFail('Unsupported file type ".' . $extension . '". Upload a .CSV or .OFX statement.', 415);
        }

        $content = (string)file_get_contents($tmpPath);

        return ['name' => $name, 'content' => $content];
    }

    $raw = file_get_contents('php://input');
    $decoded = is_string($raw) && $raw !== '' ? json_decode($raw, true) : null;
    if (is_array($decoded) && isset($decoded['content']) && is_string($decoded['content'])) {
        return [
            'name'    => basename((string)($decoded['fileName'] ?? 'statement.csv')),
            'content' => $decoded['content'],
        ];
    }

    bankFail('No statement supplied. Attach a multipart "statement" file or POST {fileName, content}.', 422);
}

function bankArchive(string $fileName, string $content): ?string
{
    $dir = __DIR__ . DIRECTORY_SEPARATOR . BANK_IMPORT_DIR;
    if (!is_dir($dir) && !@mkdir($dir, 0775, true) && !is_dir($dir)) {
        return null; // Archiving is best-effort; parsing already succeeded.
    }

    $htaccess = $dir . DIRECTORY_SEPARATOR . '.htaccess';
    if (!file_exists($htaccess)) {
        @file_put_contents($htaccess, "Options -Indexes\nDeny from all\n");
    }

    $safeName = preg_replace('/[^A-Za-z0-9._-]/', '_', $fileName) ?? 'statement';
    $stored = date('Ymd_His') . '_' . bin2hex(random_bytes(3)) . '_' . $safeName;

    return @file_put_contents($dir . DIRECTORY_SEPARATOR . $stored, $content, LOCK_EX) === false
        ? null
        : BANK_IMPORT_DIR . '/' . $stored;
}

// ---------------------------------------------------------------------------
// Dispatch
// ---------------------------------------------------------------------------

$action = strtolower(trim((string)($_GET['action'] ?? $_POST['action'] ?? 'parse')));

if ($action === 'formats') {
    bankRespond([
        'success' => true,
        'action'  => 'formats',
        'banks'   => array_keys(BANK_SIGNATURES),
        'formats' => ['CSV', 'OFX'],
        'fields'  => array_keys(BANK_FIELD_SYNONYMS),
    ]);
}

if ($action !== 'parse') {
    bankFail('Unknown action "' . $action . '". Use ?action=parse or ?action=formats.', 404);
}

if (strtoupper((string)($_SERVER['REQUEST_METHOD'] ?? 'GET')) !== 'POST') {
    bankFail('Statement import requires POST.', 405);
}

$payload = bankReadPayload();
$content = $payload['content'];
if (trim($content) === '') {
    bankFail('The uploaded statement contains no data.', 422);
}
if (strlen($content) > BANK_MAX_BYTES) {
    bankFail('Statement is larger than ' . (BANK_MAX_BYTES / 1048576) . ' MB.', 413);
}

$bankHint = strtolower(trim((string)($_POST['bank'] ?? $_GET['bank'] ?? 'auto')));
if (!in_array($bankHint, ['auto', 'sbi', 'hdfc', 'icici'], true)) {
    $bankHint = 'auto';
}

$looksLikeOfx = stripos($content, '<STMTTRN') !== false || stripos($content, 'OFXHEADER') !== false;
$result = $looksLikeOfx ? bankParseOfx($content, $bankHint) : bankParseCsv($content, $bankHint);

if ($result['rows'] === []) {
    bankFail('The statement parsed cleanly but contained no debit or credit transactions.', 422, [
        'issuer' => $result['issuer'],
        'format' => $result['format'],
    ]);
}

$deposits = 0.0;
$withdrawals = 0.0;
$dates = [];
foreach ($result['rows'] as $row) {
    $deposits += $row['deposit'];
    $withdrawals += $row['withdrawal'];
    if ($row['date'] !== '') {
        $dates[] = $row['date'];
    }
}
sort($dates);

bankRespond([
    'success'   => true,
    'action'    => 'parse',
    'statement' => [
        'fileName'    => $payload['name'],
        'issuer'      => $result['issuer'],
        'format'      => $result['format'],
        'importedAt'  => date('c'),
        'archivedAs'  => bankArchive($payload['name'], $content),
        'columns'     => $result['columns'],
        'periodStart' => $dates[0] ?? '',
        'periodEnd'   => $dates !== [] ? $dates[count($dates) - 1] : '',
    ],
    'summary'   => [
        'transactions'     => count($result['rows']),
        'skippedLines'     => $result['skipped'],
        'totalDeposits'    => round($deposits, 2),
        'totalWithdrawals' => round($withdrawals, 2),
        'netMovement'      => round($deposits - $withdrawals, 2),
    ],
    'transactions' => $result['rows'],
]);
