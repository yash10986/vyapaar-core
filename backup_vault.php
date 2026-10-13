<?php
/**
 * Vyapaar Core Quantum Backup Vault.
 *
 * GET  ?action=status|history
 * POST ?action=snapshot|schedule|restore
 *
 * Always returns JSON. Local development (localhost / CLI) does not fail
 * closed on CSRF so dashboard snapshot sync can complete in XAMPP.
 */
declare(strict_types=1);

ini_set('display_errors', '0');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('Content-Type: application/json; charset=utf-8');

const BACKUP_VERSION = '1.0';
const BACKUP_DIRECTORY = __DIR__ . DIRECTORY_SEPARATOR . 'backups';

function jsonResponse(array $payload, int $status = 200): never
{
    if (!headers_sent()) {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        header('X-Content-Type-Options: nosniff');
        header('Cache-Control: no-store, no-cache, must-revalidate');
    }
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
    exit;
}

function vaultError(string $message, int $status = 400, array $extra = []): never
{
    jsonResponse(array_merge(['success' => false, 'error' => $message], $extra), $status);
}

function isCliRuntime(): bool
{
    return PHP_SAPI === 'cli';
}

function isLocalDevelopment(): bool
{
    if (isCliRuntime()) {
        return true;
    }
    $host = strtolower((string)($_SERVER['HTTP_HOST'] ?? $_SERVER['SERVER_NAME'] ?? ''));
    $host = explode(':', $host)[0];
    $remote = (string)($_SERVER['REMOTE_ADDR'] ?? '');
    $localHosts = ['localhost', '127.0.0.1', '::1', ''];
    $localRemotes = ['127.0.0.1', '::1', '::ffff:127.0.0.1', ''];
    return in_array($host, $localHosts, true) || in_array($remote, $localRemotes, true);
}

function readJsonBody(): array
{
    $raw = (string)file_get_contents('php://input');
    if ($raw === '') {
        return [];
    }
    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : [];
}

function extractCsrfToken(array $payload): string
{
    $candidates = [
        $payload['csrfToken'] ?? null,
        $payload['csrf_token'] ?? null,
        $_POST['csrfToken'] ?? null,
        $_POST['csrf_token'] ?? null,
        $_SERVER['HTTP_X_CSRF_TOKEN'] ?? null,
        $_SERVER['HTTP_X_CSRFTOKEN'] ?? null,
    ];
    foreach ($candidates as $candidate) {
        if (is_string($candidate) && $candidate !== '') {
            return $candidate;
        }
    }
    return '';
}

function requireCsrf(array $payload): void
{
    if (isCliRuntime()) {
        return;
    }

    if (empty($_SESSION['csrf_token']) || !is_string($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }

    $token = extractCsrfToken($payload);
    $sessionToken = (string)$_SESSION['csrf_token'];

    if ($token !== '' && hash_equals($sessionToken, $token)) {
        return;
    }

    if (isLocalDevelopment()) {
        return;
    }

    vaultError('CSRF validation failed.', 419);
}

function ensureBackupDirectory(): void
{
    if (!is_dir(BACKUP_DIRECTORY) && !mkdir(BACKUP_DIRECTORY, 0755, true) && !is_dir(BACKUP_DIRECTORY)) {
        throw new RuntimeException('Backup storage could not be created at /backups.');
    }

    $htaccess = BACKUP_DIRECTORY . DIRECTORY_SEPARATOR . '.htaccess';
    if (!is_file($htaccess)) {
        @file_put_contents($htaccess, "Require all denied\nDeny from all\n", LOCK_EX);
    }

    $indexGuard = BACKUP_DIRECTORY . DIRECTORY_SEPARATOR . 'index.html';
    if (!is_file($indexGuard)) {
        @file_put_contents($indexGuard, '', LOCK_EX);
    }
}

function safeIdentifier(string $identifier): string
{
    if (!preg_match('/^[A-Za-z0-9_]+$/', $identifier)) {
        throw new RuntimeException('Unsafe database identifier encountered.');
    }
    return $identifier;
}

function canonicalJson(mixed $value): string
{
    return json_encode(
        $value,
        JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRESERVE_ZERO_FRACTION | JSON_INVALID_UTF8_SUBSTITUTE | JSON_THROW_ON_ERROR
    );
}

function archiveStamp(array $archive): string
{
    return hash('sha256', canonicalJson([
        'version' => $archive['version'] ?? BACKUP_VERSION,
        'generated_at' => $archive['generated_at'] ?? '',
        'database' => $archive['database'] ?? '',
        'tables' => $archive['tables'] ?? [],
    ]));
}

function requireQuery(mysqli $db, string $sql): mysqli_result
{
    $result = $db->query($sql);
    if ($result === false) {
        throw new RuntimeException('Database query failed: ' . $db->error);
    }
    return $result;
}

function tableColumns(mysqli $db, string $table): array
{
    $table = safeIdentifier($table);
    $result = requireQuery($db, "SHOW COLUMNS FROM `{$table}`");
    $columns = [];
    while ($column = $result->fetch_assoc()) {
        $columns[] = (string)$column['Field'];
    }
    return $columns;
}

function sqlValue(mysqli $db, mixed $value): string
{
    if ($value === null) {
        return 'NULL';
    }
    return "'" . $db->real_escape_string((string)$value) . "'";
}

function utf8Safe(mixed $value): mixed
{
    if (!is_string($value)) {
        return $value;
    }
    if (@preg_match('//u', $value)) {
        return $value;
    }
    return htmlspecialchars_decode(htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'));
}

function buildSqlDump(mysqli $db, array $tables): string
{
    $sql = "-- Vyapaar Core Quantum Vault SQL companion\nSET FOREIGN_KEY_CHECKS=0;\n\n";
    foreach ($tables as $tableName => $table) {
        $safeTable = safeIdentifier((string)$tableName);
        $sql .= "-- TABLE `{$safeTable}`\nDROP TABLE IF EXISTS `{$safeTable}`;\n";
        $sql .= ($table['create_sql'] ?? '') . ";\n";
        $columns = array_map(
            static fn(string $column): string => '`' . safeIdentifier($column) . '`',
            $table['columns'] ?? []
        );
        if (!empty($table['rows'])) {
            foreach (array_chunk($table['rows'], 100) as $chunk) {
                $values = [];
                foreach ($chunk as $row) {
                    $values[] = '(' . implode(', ', array_map(static fn($value) => sqlValue($db, $value), $row)) . ')';
                }
                $sql .= "INSERT INTO `{$safeTable}` (" . implode(', ', $columns) . ") VALUES\n" . implode(",\n", $values) . ";\n";
            }
        }
        $sql .= "\n";
    }
    return $sql . "SET FOREIGN_KEY_CHECKS=1;\n";
}

function createArchive(mysqli $db): array
{
    $database = defined('DB_NAME') ? (string)DB_NAME : '';
    if ($database === '') {
        $dbNameResult = requireQuery($db, 'SELECT DATABASE()');
        $database = (string)($dbNameResult->fetch_row()[0] ?? 'vyapaar_core');
    }

    $tablesResult = requireQuery($db, "SHOW FULL TABLES WHERE Table_type = 'BASE TABLE'");
    $tables = [];
    $tableCount = 0;
    $rowCount = 0;

    while ($tableRow = $tablesResult->fetch_row()) {
        $tableName = safeIdentifier((string)$tableRow[0]);
        $createResult = requireQuery($db, "SHOW CREATE TABLE `{$tableName}`");
        $createRow = $createResult->fetch_assoc() ?: [];
        $createSql = (string)($createRow['Create Table'] ?? $createRow['Create View'] ?? '');
        $columns = tableColumns($db, $tableName);
        $rowsResult = requireQuery($db, "SELECT * FROM `{$tableName}`");
        $rows = [];
        while ($row = $rowsResult->fetch_assoc()) {
            $rows[] = array_map(static fn($column) => utf8Safe($column), array_values($row));
        }
        $tables[$tableName] = [
            'columns' => $columns,
            'rows' => $rows,
            'row_count' => count($rows),
            'create_sql' => $createSql,
        ];
        $tableCount++;
        $rowCount += count($rows);
    }

    $archive = [
        'format' => 'vyapaar-core-quantum-vault',
        'version' => BACKUP_VERSION,
        'generated_at' => gmdate('c'),
        'database' => $database,
        'operator' => (string)($_SESSION['operator_user'] ?? 'admin'),
        'tables' => $tables,
        'summary' => ['table_count' => $tableCount, 'row_count' => $rowCount],
    ];
    $hash = archiveStamp($archive);
    $archive['integrity'] = [
        'algorithm' => 'SHA-256',
        'hash' => $hash,
    ];
    $archive['sql_dump'] = buildSqlDump($db, $tables);
    $archive['artifacts'] = [
        'json' => archiveFileName($hash, $archive['generated_at'], 'json'),
        'sql' => archiveFileName($hash, $archive['generated_at'], 'sql'),
    ];
    return $archive;
}

function archiveFileName(string $hash, string $timestamp, string $extension): string
{
    $safeTimestamp = preg_replace('/[^0-9TZ-]/', '-', $timestamp) ?: gmdate('Ymd\THis\Z');
    return 'vyapaar_quantum_' . $safeTimestamp . '_' . substr($hash, 0, 12) . '.' . $extension;
}

function saveArchive(array $archive): array
{
    ensureBackupDirectory();
    $jsonName = archiveFileName($archive['integrity']['hash'], $archive['generated_at'], 'json');
    $sqlName = archiveFileName($archive['integrity']['hash'], $archive['generated_at'], 'sql');
    $jsonFile = BACKUP_DIRECTORY . DIRECTORY_SEPARATOR . $jsonName;
    $sqlFile = BACKUP_DIRECTORY . DIRECTORY_SEPARATOR . $sqlName;

    $json = json_encode(
        $archive,
        JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_INVALID_UTF8_SUBSTITUTE | JSON_THROW_ON_ERROR
    );
    if (file_put_contents($jsonFile, $json, LOCK_EX) === false) {
        throw new RuntimeException('Backup JSON archive could not be written.');
    }
    if (file_put_contents($sqlFile, (string)$archive['sql_dump'], LOCK_EX) === false) {
        throw new RuntimeException('Backup SQL dump could not be written.');
    }
    @chmod($jsonFile, 0600);
    @chmod($sqlFile, 0600);

    return [
        'json' => $jsonName,
        'sql' => $sqlName,
        'json_path' => $jsonFile,
        'sql_path' => $sqlFile,
        'size' => filesize($jsonFile) ?: strlen($json),
    ];
}

function verifyArchive(array $archive): void
{
    if (($archive['format'] ?? '') !== 'vyapaar-core-quantum-vault' || !is_array($archive['tables'] ?? null)) {
        throw new RuntimeException('Unsupported or malformed vault archive.');
    }
    $expected = (string)($archive['integrity']['hash'] ?? '');
    if ($expected === '' || !hash_equals($expected, archiveStamp($archive))) {
        throw new RuntimeException('Integrity hash mismatch. Archive rejected.');
    }
}

function restoreArchive(mysqli $db, array $archive): array
{
    verifyArchive($archive);
    $existing = [];
    $result = requireQuery($db, "SHOW FULL TABLES WHERE Table_type = 'BASE TABLE'");
    while ($row = $result->fetch_row()) {
        $existing[(string)$row[0]] = true;
    }

    $db->begin_transaction();
    try {
        $db->query('SET FOREIGN_KEY_CHECKS=0');
        $restoredTables = 0;
        $restoredRows = 0;
        foreach ($archive['tables'] as $name => $table) {
            $name = safeIdentifier((string)$name);
            if (!isset($existing[$name])) {
                continue;
            }
            $columns = tableColumns($db, $name);
            $archiveColumns = array_values(array_filter($table['columns'] ?? [], 'is_string'));
            $usableColumns = array_values(array_intersect($archiveColumns, $columns));
            if (!$usableColumns) {
                continue;
            }
            $quoted = implode(', ', array_map(static fn(string $column): string => '`' . safeIdentifier($column) . '`', $usableColumns));
            $db->query("TRUNCATE TABLE `{$name}`");
            $insert = $db->prepare("INSERT INTO `{$name}` ({$quoted}) VALUES (" . implode(', ', array_fill(0, count($usableColumns), '?')) . ")");
            if ($insert === false) {
                throw new RuntimeException('Restore insert could not be prepared for ' . $name);
            }
            $types = str_repeat('s', count($usableColumns));
            foreach (($table['rows'] ?? []) as $row) {
                $values = [];
                foreach ($usableColumns as $column) {
                    $values[] = $row[array_search($column, $archiveColumns, true)] ?? null;
                }
                $refs = [$types];
                foreach ($values as $index => $value) {
                    $refs[] = &$values[$index];
                }
                call_user_func_array([$insert, 'bind_param'], $refs);
                $insert->execute();
                $restoredRows++;
            }
            $insert->close();
            $restoredTables++;
        }
        $db->query('SET FOREIGN_KEY_CHECKS=1');
        $db->commit();
        return ['tables' => $restoredTables, 'rows' => $restoredRows];
    } catch (Throwable $error) {
        $db->rollback();
        $db->query('SET FOREIGN_KEY_CHECKS=1');
        throw $error;
    }
}

function auditVaultEvent(mysqli $db, string $action, string $hash): void
{
    try {
        $stmt = $db->prepare('INSERT INTO system_logs (type, message, detail) VALUES (?, ?, ?)');
        if ($stmt === false) {
            return;
        }
        $type = 'success';
        $detail = 'SHA-256: ' . $hash;
        $stmt->bind_param('sss', $type, $action, $detail);
        $stmt->execute();
        $stmt->close();
    } catch (Throwable $ignored) {
        // Snapshot success must not depend on audit logging.
    }
}

function listBackupHistory(): array
{
    ensureBackupDirectory();
    $files = glob(BACKUP_DIRECTORY . DIRECTORY_SEPARATOR . '*.json') ?: [];
    $files = array_values(array_filter($files, static fn(string $file): bool => basename($file) !== 'schedule.json'));
    usort($files, static fn(string $a, string $b): int => filemtime($b) <=> filemtime($a));
    $items = [];
    foreach (array_slice($files, 0, 20) as $file) {
        $meta = json_decode((string)file_get_contents($file), true);
        if (!is_array($meta)) {
            continue;
        }
        $items[] = [
            'file' => basename($file),
            'sql_file' => $meta['artifacts']['sql'] ?? (preg_replace('/\.json$/', '.sql', basename($file))),
            'generated_at' => $meta['generated_at'] ?? date('c', (int)filemtime($file)),
            'hash' => $meta['integrity']['hash'] ?? '',
            'size' => filesize($file),
            'summary' => $meta['summary'] ?? [],
        ];
    }
    return $items;
}

function getDatabaseConnection(): mysqli
{
    require_once __DIR__ . '/config.php';
    if (!isset($conn) || !($conn instanceof mysqli)) {
        throw new RuntimeException('Database connection is unavailable.');
    }
    if ($conn->connect_errno) {
        throw new RuntimeException('Database connection failed: ' . $conn->connect_error);
    }
    $conn->set_charset('utf8mb4');
    return $conn;
}

try {
    if (session_status() !== PHP_SESSION_ACTIVE) {
        session_start();
    }

    $action = strtolower(trim((string)($_GET['action'] ?? $_POST['action'] ?? '')));
    $payload = $_POST ?: readJsonBody();
    if ($action === '' && isset($payload['action'])) {
        $action = strtolower(trim((string)$payload['action']));
    }

    if ($action === 'status' || $action === 'history') {
        $items = listBackupHistory();
        jsonResponse([
            'success' => true,
            'latest' => $items[0] ?? null,
            'history' => $items,
        ]);
    }

    requireCsrf($payload);
    $conn = getDatabaseConnection();

    if ($action === 'snapshot') {
        $archive = createArchive($conn);
        $saved = saveArchive($archive);
        auditVaultEvent($conn, 'Quantum snapshot created', $archive['integrity']['hash']);
        jsonResponse([
            'success' => true,
            'message' => 'Quantum snapshot stored with SHA-256 integrity stamp.',
            'archive' => $archive,
            'files' => [
                'json' => $saved['json'],
                'sql' => $saved['sql'],
                'size' => $saved['size'],
            ],
        ]);
    }

    if ($action === 'schedule') {
        ensureBackupDirectory();
        $enabled = filter_var($payload['enabled'] ?? false, FILTER_VALIDATE_BOOLEAN);
        $schedule = [
            'enabled' => $enabled,
            'updated_at' => gmdate('c'),
            'updated_by' => (string)($_SESSION['operator_user'] ?? 'admin'),
        ];
        $scheduleFile = BACKUP_DIRECTORY . DIRECTORY_SEPARATOR . 'schedule.json';
        if (file_put_contents($scheduleFile, json_encode($schedule, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES), LOCK_EX) === false) {
            throw new RuntimeException('Schedule file could not be written.');
        }
        jsonResponse(['success' => true, 'schedule' => $schedule]);
    }

    if ($action === 'restore') {
        if (!isset($_FILES['archive']) || $_FILES['archive']['error'] !== UPLOAD_ERR_OK) {
            throw new RuntimeException('A valid archive upload is required.');
        }
        if ($_FILES['archive']['size'] > 100 * 1024 * 1024) {
            throw new RuntimeException('Archive exceeds the 100 MB safety limit.');
        }
        if ((string)($payload['confirmRestore'] ?? $_POST['confirmRestore'] ?? '') !== 'RESTORE_VERIFIED_VAULT') {
            throw new RuntimeException('Explicit restore confirmation is required.');
        }
        $archive = json_decode((string)file_get_contents($_FILES['archive']['tmp_name']), true, 512, JSON_THROW_ON_ERROR);
        if (!is_array($archive)) {
            throw new RuntimeException('Archive JSON could not be parsed.');
        }
        $result = restoreArchive($conn, $archive);
        auditVaultEvent($conn, 'Quantum snapshot restored', (string)($archive['integrity']['hash'] ?? ''));
        jsonResponse(['success' => true, 'message' => 'Verified vault restored.', 'result' => $result]);
    }

    vaultError('Unknown vault action.', 400);
} catch (Throwable $error) {
    jsonResponse([
        'success' => false,
        'error' => $error->getMessage(),
    ], $error instanceof RuntimeException ? 400 : 500);
}
