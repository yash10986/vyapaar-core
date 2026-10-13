<?php
/**
 * Import a merged Vyapaar Core JSON state into MySQL.
 *
 * Usage:
 *   php scripts/restore-backup-to-mysql.php vyapaar_core_state_merged.json
 *   php scripts/restore-backup-to-mysql.php vyapaar_core_state_merged.json --dry-run
 */

declare(strict_types=1);

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

const DB_HOSTNAME = '127.0.0.1';
const DB_USERNAME = 'root';
const DB_PASSWORD = '';
const DB_DATABASE = 'vyapaar_core';
const TENANT_CODE = 'JOGESHWARI-ENTERPRISES';
const TENANT_NAME = 'Jogeshwari Enterprises';

function fail(string $message): never
{
    fwrite(STDERR, "Restore failed: {$message}\n");
    exit(1);
}

function numberValue(mixed $value, float $default = 0): float
{
    if (is_int($value) || is_float($value)) return (float)$value;
    if (is_string($value) && trim($value) !== '') {
        $clean = preg_replace('/[^0-9.\-]/', '', $value);
        return is_numeric($clean) ? (float)$clean : $default;
    }
    return $default;
}

function textValue(mixed $value, string $default = ''): string
{
    return trim((string)($value ?? $default));
}

function mysqlTimestamp(mixed $value): string
{
    $text = textValue($value);
    if ($text === '') return '';
    try {
        return (new DateTime($text))->format('Y-m-d H:i:s');
    } catch (Throwable) {
        return '';
    }
}

function stateCollection(array $state, string $name): array
{
    $aliases = [
        'catalog' => ['catalog', 'products', 'productCatalog', 'product_master'],
        'inventory' => ['inventory', 'stock', 'stockItems', 'warehouse'],
        'ledger' => ['ledger', 'transactions', 'cashBook', 'journal'],
        'dealers' => ['dealers', 'suppliers', 'wholesalers'],
    ];
    foreach ($aliases[$name] ?? [$name] as $alias) {
        if (isset($state[$alias]) && is_array($state[$alias])) return $state[$alias];
    }
    return [];
}

function loadState(string $file): array
{
    if (!is_file($file)) fail("JSON file not found: {$file}");
    $decoded = json_decode((string)file_get_contents($file), true, 512, JSON_THROW_ON_ERROR);
    foreach (['AppState', 'appState', 'state', 'data', 'payload', 'backup'] as $nested) {
        if (isset($decoded[$nested]) && is_array($decoded[$nested])) return $decoded[$nested];
    }
    return is_array($decoded) ? $decoded : fail('JSON root must be an object');
}

function tableColumns(mysqli $db, string $table): array
{
    $safeTable = $db->real_escape_string($table);
    $result = $db->query("SHOW COLUMNS FROM `{$safeTable}`");
    $columns = [];
    while ($row = $result->fetch_assoc()) $columns[] = $row['Field'];
    return $columns;
}

function ensureProductCatalog(mysqli $db): void
{
    $db->query("CREATE TABLE IF NOT EXISTS product_catalog (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        sku VARCHAR(100) NOT NULL,
        product_name VARCHAR(255) NOT NULL,
        category VARCHAR(80) NOT NULL DEFAULT 'OTHERS',
        stock_quantity INT NOT NULL DEFAULT 0,
        mrp DECIMAL(12,2) NOT NULL DEFAULT 0.00,
        cost_price DECIMAL(12,2) NOT NULL DEFAULT 0.00,
        selling_price DECIMAL(12,2) NOT NULL DEFAULT 0.00,
        gst_rate DECIMAL(5,2) NOT NULL DEFAULT 0.00,
        source_status VARCHAR(40) NOT NULL DEFAULT 'BACKUP_RESTORED',
        tenant_code VARCHAR(80) NOT NULL DEFAULT 'JOGESHWARI-ENTERPRISES',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY uq_product_catalog_sku (sku),
        UNIQUE KEY uq_product_catalog_name_tenant (product_name, tenant_code),
        KEY idx_product_catalog_tenant (tenant_code)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
}

    function ensureTenant(mysqli $db): int
    {
        $find = $db->prepare("SELECT tenant_id FROM tenants WHERE business_name = ? LIMIT 1");
        $name = TENANT_NAME;
        $find->bind_param('s', $name);
        $find->execute();
        $row = $find->get_result()->fetch_assoc();
        $find->close();
        if ($row) return (int)$row['tenant_id'];

        $insert = $db->prepare("INSERT INTO tenants (business_name, gst_number) VALUES (?, NULL)");
        $insert->bind_param('s', $name);
        $insert->execute();
        $tenantId = (int)$db->insert_id;
        $insert->close();
        return $tenantId;
    }

function mergeProducts(array $state): array
{
    $catalog = [];
    foreach (stateCollection($state, 'catalog') as $item) {
        if (!is_array($item)) continue;
        $name = textValue($item['name'] ?? $item['product'] ?? $item['productName'] ?? '');
        if ($name === '') continue;
        $key = strtolower($name);
        $catalog[$key] = array_merge($catalog[$key] ?? [], $item, ['name' => $name]);
    }

    foreach (stateCollection($state, 'inventory') as $item) {
        if (!is_array($item)) continue;
        $name = textValue($item['name'] ?? $item['product'] ?? $item['productName'] ?? '');
        if ($name === '') continue;
        $key = strtolower($name);
        $catalog[$key] = array_merge($catalog[$key] ?? [], $item, ['name' => $name]);
    }
    return array_values($catalog);
}

function productSku(array $item): string
{
    $provided = textValue($item['sku'] ?? '');
    if ($provided !== '') return substr($provided, 0, 100);
    $slug = strtoupper(preg_replace('/[^A-Z0-9]+/i', '-', textValue($item['name'])));
    return substr('VYP-SKU-' . substr(trim($slug, '-'), 0, 88), 0, 100);
}

function importProducts(mysqli $db, array $state, bool $dryRun): int
{
    $products = mergeProducts($state);
    $tenantId = $dryRun ? 0 : ensureTenant($db);
    if ($dryRun) return count($products);

    $columns = tableColumns($db, 'inventory');
    $legacy = in_array('id', $columns, true) && in_array('name', $columns, true) && in_array('stock', $columns, true);
    $rich = in_array('item_id', $columns, true) && in_array('item_name', $columns, true) && in_array('stock_quantity', $columns, true);
    if (!$legacy && !$rich) fail('Unsupported inventory table shape. Expected legacy or Django inventory columns.');

    $catalogSql = "INSERT INTO product_catalog
        (sku, product_name, category, stock_quantity, mrp, cost_price, selling_price, gst_rate, source_status, tenant_code)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'BACKUP_RESTORED', ?)
        ON DUPLICATE KEY UPDATE product_name=VALUES(product_name), category=VALUES(category), stock_quantity=VALUES(stock_quantity), mrp=VALUES(mrp), cost_price=VALUES(cost_price), selling_price=VALUES(selling_price), gst_rate=VALUES(gst_rate), source_status='BACKUP_RESTORED'";
    $catalogStmt = $db->prepare($catalogSql);

    if ($legacy) {
        $inventoryStmt = $db->prepare("INSERT INTO inventory (id, name, stock, base, sku) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name=VALUES(name), stock=VALUES(stock), base=VALUES(base), sku=VALUES(sku)");
    }

    foreach ($products as $index => $item) {
        $name = textValue($item['name']);
        $stock = (int)numberValue($item['stock'] ?? $item['current_stock'] ?? $item['currentStock'] ?? 0);
        $mrp = numberValue($item['mrp'] ?? $item['mrpPrice'] ?? 0);
        $cost = numberValue($item['costPrice'] ?? $item['purchasePrice'] ?? $item['purchase_price'] ?? $item['base'] ?? 0);
        $selling = numberValue($item['price'] ?? $item['sellingPrice'] ?? $item['selling_price'] ?? 0);
        $category = strtoupper(substr(textValue($item['category'] ?? 'OTHERS'), 0, 80));
        $sku = productSku($item);
        $gst = numberValue($item['gst'] ?? $item['gst_rate'] ?? $item['gstRate'] ?? 0);

        $tenantCode = TENANT_CODE;
        $catalogStmt->bind_param('sssidddds', $sku, $name, $category, $stock, $mrp, $cost, $selling, $gst, $tenantCode);
        $catalogStmt->execute();

        if ($legacy) {
            $id = substr('VLT-' . str_pad((string)($index + 1), 2, '0', STR_PAD_LEFT), 0, 50);
            $inventoryStmt->bind_param('ssids', $id, $name, $stock, $cost, $sku);
            $inventoryStmt->execute();
        } else {
            $lookup = $db->prepare("SELECT item_id FROM inventory WHERE tenant_id = ? AND item_name = ? LIMIT 1");
            $lookup->bind_param('is', $tenantId, $name);
            $lookup->execute();
            $existing = $lookup->get_result()->fetch_assoc();
            $lookup->close();
            if ($existing) {
                $update = $db->prepare("UPDATE inventory SET stock_quantity = ?, unit_price = ?, sku = ? WHERE item_id = ?");
                $itemId = (int)$existing['item_id'];
                $update->bind_param('idsi', $stock, $selling, $sku, $itemId);
            } else {
                $update = $db->prepare("INSERT INTO inventory (tenant_id, item_name, stock_quantity, unit_price, warning_threshold, sku) VALUES (?, ?, ?, ?, 8, ?)");
                $update->bind_param('isids', $tenantId, $name, $stock, $selling, $sku);
            }
            $update->execute();
            $update->close();
        }
    }
    $catalogStmt->close();
    if ($legacy) $inventoryStmt->close();
    return count($products);
}

function importWholesalers(mysqli $db, array $state, bool $dryRun): int
{
    $dealers = stateCollection($state, 'dealers');
    if ($dryRun) return count($dealers);
    $find = $db->prepare("SELECT id FROM wholesalers WHERE firm_name = ? LIMIT 1");
    $insert = $db->prepare("INSERT INTO wholesalers (firm_name, gstin, address, phone, bank_name, account_number, ifsc_code, status) VALUES (?, ?, ?, ?, ?, ?, ?, 'active')");
    $update = $db->prepare("UPDATE wholesalers SET gstin=?, address=?, phone=?, bank_name=?, account_number=?, ifsc_code=?, status='active' WHERE id=?");

    foreach ($dealers as $dealer) {
        if (!is_array($dealer)) continue;
        $name = textValue($dealer['name'] ?? $dealer['firm_name'] ?? $dealer['companyName'] ?? '');
        if ($name === '') continue;
        $gst = textValue($dealer['gst'] ?? $dealer['gstin'] ?? '');
        $address = textValue($dealer['address'] ?? '');
        $phone = textValue($dealer['phone'] ?? '');
        $bank = textValue($dealer['bank'] ?? $dealer['bank_name'] ?? '');
        $account = textValue($dealer['acc'] ?? $dealer['account_number'] ?? '');
        $ifsc = textValue($dealer['ifsc'] ?? $dealer['ifsc_code'] ?? '');
        $find->bind_param('s', $name);
        $find->execute();
        $existing = $find->get_result()->fetch_assoc();
        if ($existing) {
            $id = (int)$existing['id'];
            $update->bind_param('ssssssi', $gst, $address, $phone, $bank, $account, $ifsc, $id);
            $update->execute();
        } else {
            $insert->bind_param('sssssss', $name, $gst, $address, $phone, $bank, $account, $ifsc);
            $insert->execute();
        }
    }
    $find->close(); $insert->close(); $update->close();
    return count($dealers);
}

function importCompanyProfile(mysqli $db, array $state, bool $dryRun): void
{
    $profile = is_array($state['companyProfile'] ?? null) ? $state['companyProfile'] : [];
    if ($dryRun) return;
    $sql = "INSERT INTO company_profiles
        (tenant_code, company_name, trade_name, owner_name, gstin, pan, cin, license_number, license_valid_till, address, email, phone, bank_name, bank_account, ifsc_code, invoice_prefix, footer_note, is_active)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, NULLIF(?, ''), ?, ?, ?, ?, ?, ?, ?, ?, 1)
        ON DUPLICATE KEY UPDATE company_name=VALUES(company_name), trade_name=VALUES(trade_name), owner_name=VALUES(owner_name), gstin=VALUES(gstin), pan=VALUES(pan), cin=VALUES(cin), license_number=VALUES(license_number), license_valid_till=VALUES(license_valid_till), address=VALUES(address), email=VALUES(email), phone=VALUES(phone), bank_name=VALUES(bank_name), bank_account=VALUES(bank_account), ifsc_code=VALUES(ifsc_code), invoice_prefix=VALUES(invoice_prefix), footer_note=VALUES(footer_note), is_active=1";
    $stmt = $db->prepare($sql);
    $tenant = TENANT_CODE;
    $name = TENANT_NAME;
    $values = [
        textValue($profile['tradeName'] ?? TENANT_NAME), textValue($profile['ownerName'] ?? ''),
        textValue($profile['gstin'] ?? ''), textValue($profile['pan'] ?? ''), textValue($profile['cin'] ?? ''),
        textValue($profile['licenseNumber'] ?? ''), textValue($profile['licenseValidTill'] ?? ''),
        textValue($profile['address'] ?? ''), textValue($profile['email'] ?? ''), textValue($profile['phone'] ?? ''),
        textValue($profile['bankName'] ?? ''), textValue($profile['bankAccount'] ?? ''), textValue($profile['ifscCode'] ?? ''),
        textValue($profile['invoicePrefix'] ?? 'JE-'), textValue($profile['footerNote'] ?? 'This invoice is computer generated and does not require a signature.')
    ];
    $tradeName = $values[0];
    $ownerName = $values[1];
    $gstin = $values[2];
    $pan = $values[3];
    $cin = $values[4];
    $licenseNumber = $values[5];
    $licenseValidTill = $values[6];
    $address = $values[7];
    $email = $values[8];
    $phone = $values[9];
    $bankName = $values[10];
    $bankAccount = $values[11];
    $ifscCode = $values[12];
    $invoicePrefix = $values[13];
    $footerNote = $values[14];
    $stmt->bind_param('sssssssssssssssss', $tenant, $name, $tradeName, $ownerName, $gstin, $pan, $cin, $licenseNumber, $licenseValidTill, $address, $email, $phone, $bankName, $bankAccount, $ifscCode, $invoicePrefix, $footerNote);
    $stmt->execute();
    $stmt->close();
}

function importLedger(mysqli $db, array $state, bool $dryRun): int
{
    $ledger = stateCollection($state, 'ledger');
    if ($dryRun) return count($ledger);
    $find = $db->prepare("SELECT id FROM ledger WHERE ref = ? LIMIT 1");
    $insert = $db->prepare("INSERT INTO ledger (ref, timestamp, debit, credit, amount) VALUES (?, COALESCE(NULLIF(?, ''), CURRENT_TIMESTAMP), ?, ?, ?)");
    foreach ($ledger as $entry) {
        if (!is_array($entry)) continue;
        $ref = textValue($entry['ref'] ?? $entry['reference'] ?? $entry['transactionRef'] ?? '');
        if ($ref === '') continue;
        $find->bind_param('s', $ref); $find->execute();
        if ($find->get_result()->fetch_assoc()) continue;
        $timestamp = mysqlTimestamp($entry['time'] ?? $entry['timestamp'] ?? '');
        $debit = textValue($entry['debit'] ?? 'Imported Debit');
        $credit = textValue($entry['credit'] ?? 'Imported Credit');
        $amount = numberValue($entry['amount'] ?? $entry['total'] ?? $entry['value'] ?? 0);
        $insert->bind_param('ssssd', $ref, $timestamp, $debit, $credit, $amount);
        $insert->execute();
    }
    $find->close(); $insert->close();
    return count($ledger);
}

$args = array_values(array_filter(array_slice($argv, 1), static fn(string $arg): bool => $arg !== '--dry-run'));
$dryRun = in_array('--dry-run', $argv, true);
$jsonPath = $args[0] ?? 'vyapaar_core_state_merged.json';

try {
    $state = loadState($jsonPath);
    $db = new mysqli(DB_HOSTNAME, DB_USERNAME, DB_PASSWORD, DB_DATABASE);
    $db->set_charset('utf8mb4');
    ensureProductCatalog($db);
    if (!$dryRun) $db->begin_transaction();

    $products = importProducts($db, $state, $dryRun);
    $dealers = importWholesalers($db, $state, $dryRun);
    importCompanyProfile($db, $state, $dryRun);
    $ledger = importLedger($db, $state, $dryRun);

    if (!$dryRun) $db->commit();
    $db->close();

    echo json_encode([
        'success' => true,
        'dry_run' => $dryRun,
        'tenant' => TENANT_CODE,
        'products' => $products,
        'wholesalers' => $dealers,
        'ledger_entries_seen' => $ledger,
        'message' => $dryRun ? 'Validation completed; no rows changed.' : 'Backup state imported transactionally.'
    ], JSON_PRETTY_PRINT) . PHP_EOL;
} catch (Throwable $error) {
    if (isset($db) && $db instanceof mysqli && !$dryRun) {
        try { $db->rollback(); } catch (Throwable) { }
    }
    fail($error->getMessage());
}
