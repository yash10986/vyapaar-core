<?php
session_start();
header('Content-Type: application/json');
include 'config.php';
require_once __DIR__ . '/services/surge_pricing.php';

function respondJson($payload) {
    echo json_encode($payload);
    exit;
}

function safeText($text) {
    return trim(preg_replace('/\s+/', ' ', (string)$text));
}

function sanitizeAlnum($value) {
    return strtoupper(preg_replace('/[^A-Z0-9]/', '', (string)$value));
}

function validateGSTIN($gstin) {
    return $gstin === '' || preg_match('/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/', $gstin);
}

function validatePAN($pan) {
    return $pan === '' || preg_match('/^[A-Z]{5}[0-9]{4}[A-Z]$/', $pan);
}

function validateIFSC($ifsc) {
    return $ifsc === '' || preg_match('/^[A-Z]{4}0[A-Z0-9]{6}$/', $ifsc);
}

function validateCsrfToken($token) {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], (string)$token);
}

function getCurrentOperator() {
    return [
        'id' => isset($_SESSION['operator_id']) ? intval($_SESSION['operator_id']) : 0,
        'username' => (isset($_SESSION['operator_user']) && $_SESSION['operator_user'] !== '') ? (string)$_SESSION['operator_user'] : 'admin',
        'email' => (isset($_SESSION['operator_email']) && $_SESSION['operator_email'] !== '') ? (string)$_SESSION['operator_email'] : 'admin@local',
        'role' => isset($_SESSION['operator_role']) ? (string)$_SESSION['operator_role'] : 'Administrator'
    ];
}

function requireAuthentication() {
    // Authentication removed: allow all API access by default
    return true;
}

function requireRole(array $allowedRoles, $actionLabel = 'access this feature') {
    $operator = getCurrentOperator();
    if (!in_array($operator['role'], $allowedRoles, true)) {
        respondJson(['success' => false, 'error' => "Operator role '{$operator['role']}' is not permitted to {$actionLabel}.", 'allowed_roles' => $allowedRoles]);
    }
}

function auditLog($conn, $action, $module, $resourceId = null, $detail = null, $metadata = null) {
    $operator = getCurrentOperator();
    $operatorId = $operator['id'] ?? 0;
    $operatorUsername = $operator['username'] ?? 'unknown';
    $ipAddress = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
    $metaJson = null;
    if (is_array($metadata) || is_object($metadata)) {
        $metaJson = json_encode($metadata, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }
    $stmt = mysqli_prepare($conn, "INSERT INTO audit_logs (operator_id, operator_username, action, module, resource_id, detail, ip_address, user_agent, metadata) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    if ($stmt) {
        mysqli_stmt_bind_param($stmt, 'issssssss', $operatorId, $operatorUsername, $action, $module, $resourceId, $detail, $ipAddress, $userAgent, $metaJson);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);
    }
}

function getSessionTenantCode() {
    return isset($_SESSION['tenant_code']) ? strtoupper(trim((string)$_SESSION['tenant_code'])) : '';
}

function getRequestTenantCode() {
    $tenantCode = strtoupper(trim((string)($_GET['tenantCode'] ?? $_POST['tenantCode'] ?? '')));
    return preg_replace('/[^A-Z0-9]/', '', $tenantCode);
}

function getEffectiveTenantCode() {
    $sessionTenant = getSessionTenantCode();
    return $sessionTenant !== '' ? $sessionTenant : getRequestTenantCode();
}

function requireTenantContext($tenantCode) {
    if ($tenantCode === '') {
        respondJson(['success' => false, 'error' => 'Tenant context required']);
    }
}

function verifyTenantContext($tenantCode) {
    $sessionTenant = getSessionTenantCode();
    if ($sessionTenant !== '' && $sessionTenant !== $tenantCode) {
        respondJson(['success' => false, 'error' => 'Tenant mismatch detected']);
    }
    return true;
}

function generateInvoiceLink($invoiceNo) {
    return 'https://vyapaar.pay/settle/' . urlencode($invoiceNo);
}

function buildPdfBytes($title, $rows, $summary) {
    $header = "%PDF-1.3\n";
    $body  = "";
    $objects = [];
    $offset = strlen($header);

    $addObject = function($content) use (&$objects, &$offset) {
        $obj = ($objects ? count($objects) + 1 : 1) . " 0 obj\n" . $content . "endobj\n";
        $objects[] = ['offset' => $offset, 'data' => $obj];
        $offset += strlen($obj);
    };

    $fontObj = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\n";
    $addObject($fontObj);
    $fontRef = count($objects);

    $content = "<< /Length 0 >>\nstream\n";
    $contentEnd = "endstream\n";
    $contentStream = "";
    $contentStream .= "BT /F1 18 Tf 40 770 Td (${title}) Tj ET\n";
    $y = 740;
    foreach ($rows as $row) {
        $line = implode(' | ', array_map('safeText', $row));
        $escaped = str_replace(['\\', '(', ')'], ['\\\\', '\\(', '\\)'], $line);
        $contentStream .= "BT /F1 10 Tf 40 ${y} Td (${escaped}) Tj ET\n";
        $y -= 18;
        if ($y < 80) {
            break;
        }
    }
    $y -= 20;
    foreach ($summary as $label => $value) {
        $escaped = str_replace(['\\', '(', ')'], ['\\\\', '\\(', '\\)'], "${label}: ${value}");
        $contentStream .= "BT /F1 10 Tf 40 ${y} Td (${escaped}) Tj ET\n";
        $y -= 16;
    }
    $stream = "<< /Length " . strlen($contentStream) . " >>\nstream\n" . $contentStream . "endstream\n";
    $addObject($stream);
    $contentRef = count($objects);

    $page = "<< /Type /Page /Parent 3 0 R /MediaBox [0 0 612 792] /Contents ${contentRef} 0 R /Resources << /Font << /F1 ${fontRef} 0 R >> >> >>\n";
    $addObject($page);
    $pages = "<< /Type /Pages /Count 1 /Kids [4 0 R] >>\n";
    $addObject($pages);
    $catalog = "<< /Type /Catalog /Pages 3 0 R >>\n";
    $addObject($catalog);

    $xrefOffset = $offset;
    $header .= implode('', array_column($objects, 'data'));
    $xref = "xref\n0 " . (count($objects) + 1) . "\n0000000000 65535 f \n";
    foreach ($objects as $object) {
        $xref .= str_pad($object['offset'], 10, '0', STR_PAD_LEFT) . " 00000 n \n";
    }
    $trailer = "trailer<< /Size " . (count($objects) + 1) . " /Root " . (count($objects)) . " 0 R >>\nstartxref\n${xrefOffset}\n%%EOF";
    return $header . $xref . $trailer;
}

$action = $_GET['action'] ?? '';

if ($action === 'get_live_telemetry') {
    $events = [];
    $now = time();
    $threshold = isset($_GET['threshold']) ? max(0, intval($_GET['threshold'])) : 8;
    $columns = [];
    $columnResult = mysqli_query($conn, "SHOW COLUMNS FROM inventory");
    while ($column = mysqli_fetch_assoc($columnResult)) $columns[] = $column['Field'];
    $isDjangoInventory = in_array('item_id', $columns, true);
    $stockColumn = $isDjangoInventory ? 'stock_quantity' : 'stock';
    $nameColumn = $isDjangoInventory ? 'item_name' : 'name';
    $idColumn = $isDjangoInventory ? 'item_id' : 'id';

    $lowResult = mysqli_query($conn, "SELECT `$idColumn` AS product_id, `$nameColumn` AS product_name, `$stockColumn` AS stock FROM inventory WHERE `$stockColumn` <= $threshold ORDER BY `$stockColumn` ASC LIMIT 20");
    while ($row = mysqli_fetch_assoc($lowResult)) {
        $events[] = [
            'id' => 'inventory:' . $row['product_id'] . ':' . $row['stock'],
            'type' => intval($row['stock']) === 0 ? 'error' : 'warning',
            'prefix' => '[ALERT]',
            'message' => safeText($row['product_name']) . ' is below the safety reserve.',
            'detail' => 'Stock ' . intval($row['stock']) . ' · threshold ' . $threshold,
            'title' => 'Stock needs attention',
            'guidance' => 'This item may run out soon. Review the warehouse and arrange replenishment before the next sale.',
            'route' => 'modal-vault',
            'actionLabel' => 'Review Warehouse',
            'stockExempt' => true
        ];
    }

    $dueResult = mysqli_query($conn, "SELECT customer_name, balance, due_date FROM customer_ledgers WHERE balance > 0 ORDER BY due_date ASC LIMIT 20");
    while ($row = mysqli_fetch_assoc($dueResult)) {
        $overdue = !empty($row['due_date']) && strtotime($row['due_date']) < $now;
        $events[] = [
            'id' => 'receivable:' . md5($row['customer_name'] . '|' . $row['due_date'] . '|' . $row['balance']),
            'type' => $overdue ? 'warning' : 'info',
            'prefix' => $overdue ? '[ALERT]' : '[REMINDER]',
            'message' => safeText($row['customer_name']) . ($overdue ? ' has an overdue receivable.' : ' has an open receivable.'),
            'detail' => 'Balance ₹' . number_format((float)$row['balance'], 2) . ' · due ' . ($row['due_date'] ?: 'not dated'),
            'title' => $overdue ? 'Payment is overdue' : 'Payment is still pending',
            'guidance' => $overdue ? 'Contact this client and follow up on the unpaid balance.' : 'Keep this account on your collection list until payment is received.',
            'route' => 'modal-customers',
            'actionLabel' => 'Review Accounts'
        ];
    }

    $revenueResult = mysqli_query($conn, "SELECT COALESCE(SUM(amount), 0) AS total FROM ledger WHERE credit LIKE '%Sale%' OR credit LIKE '%Inflow%'");
    $revenue = (float)(mysqli_fetch_assoc($revenueResult)['total'] ?? 0);
    $expenseResult = mysqli_query($conn, "SELECT COALESCE(SUM(amount), 0) AS total FROM ledger WHERE debit LIKE '%Expense%' OR debit LIKE '%Restock%' OR credit LIKE '%Rent%' OR credit LIKE '%Payroll%'");
    $expenses = (float)(mysqli_fetch_assoc($expenseResult)['total'] ?? 0);
    $margin = $revenue > 0 ? (($revenue - $expenses) / $revenue) * 100 : 0;
    $recentOpsResult = mysqli_query($conn, "SELECT COUNT(*) AS total FROM system_logs WHERE timestamp >= DATE_SUB(NOW(), INTERVAL 1 HOUR)");
    $recentOps = (int)(mysqli_fetch_assoc($recentOpsResult)['total'] ?? 0);
    $events[] = [
        'id' => 'diagnostic:position:' . date('Y-m-d-H-i'),
        'type' => $margin < 20 ? 'warning' : 'info',
        'prefix' => $margin < 20 ? '[ALERT]' : '[INSIGHT]',
        'message' => 'Your current business position has been reviewed.',
        'title' => $margin >= 20 ? 'Today looks financially steady' : 'Profit is under pressure today',
        'guidance' => $margin >= 20
            ? 'Sales are covering recorded costs with room left over. Keep watching stock and collect outstanding payments on time.'
            : 'Recorded costs are taking a large share of sales. Prioritize profitable orders and review expenses before committing new outflows.',
        'detail' => 'Sales ₹' . number_format($revenue, 2) . ' · costs ₹' . number_format($expenses, 2) . ' · margin ' . number_format($margin, 1) . '% · ' . $recentOps . ' recent operations',
        'route' => 'modal-ledger',
        'actionLabel' => 'Inspect Ledger'
    ];

    $catalogExists = mysqli_query($conn, "SHOW TABLES LIKE 'product_catalog'");
    if ($catalogExists && mysqli_num_rows($catalogExists) > 0) {
        $anomalyResult = mysqli_query($conn, "SELECT sku, product_name, cost_price, selling_price FROM product_catalog WHERE selling_price < cost_price OR selling_price > cost_price * 1.75 ORDER BY updated_at DESC LIMIT 10");
        while ($row = mysqli_fetch_assoc($anomalyResult)) {
            $selling = (float)$row['selling_price'];
            $cost = (float)$row['cost_price'];
            $belowCost = $selling < $cost;
            $events[] = [
                'id' => 'pricing:' . md5($row['sku'] . '|' . $row['selling_price'] . '|' . $row['cost_price']),
                'type' => 'warning',
                'prefix' => '[ALERT]',
                'message' => safeText($row['product_name']) . ' has a pricing discrepancy.',
                'title' => $belowCost ? 'Invoice price is below procurement cost' : 'Invoice price changed sharply',
                'guidance' => $belowCost
                    ? 'This item may lose money when sold. Review the Sales Desk price before accepting another order.'
                    : 'This item is priced much higher than its procurement cost. Confirm the latest lot and invoice details.',
                'detail' => 'Code ' . safeText($row['sku']) . ' · cost ₹' . number_format($cost, 2) . ' · sale ₹' . number_format($selling, 2),
                'route' => 'modal-sales-desk',
                'actionLabel' => 'Review Sales Price'
            ];
        }
    }

    $filingDeadline = strtotime(date('Y-m-20 23:59:59'));
    if ($filingDeadline <= $now) $filingDeadline = strtotime('+1 month', $filingDeadline);
    $daysRemaining = max(0, (int)ceil(($filingDeadline - $now) / 86400));
    $events[] = [
        'id' => 'tax:gstr1:' . date('Y-m', $filingDeadline),
        'type' => $daysRemaining <= 5 ? 'warning' : 'info',
        'prefix' => $daysRemaining <= 5 ? '[REMINDER]' : '[INSIGHT]',
        'message' => 'GSTR-1 compliance window remains open.',
        'detail' => $daysRemaining . ' day(s) remaining · deadline ' . date('d M Y', $filingDeadline),
        'title' => 'Tax filing countdown',
        'guidance' => 'Keep sales records and tax details ready before the filing deadline.',
        'route' => 'modal-tax-compliance',
        'actionLabel' => 'Open Tax Desk'
    ];
    $events[] = [
        'id' => 'telemetry:poll:' . date('Y-m-d-H-i'),
        'type' => 'info',
        'prefix' => '[ACTION]',
        'message' => 'Live enterprise telemetry poll completed.',
        'detail' => 'MySQL snapshot inspected at ' . date('H:i:s'),
        'title' => 'Live checks completed',
        'guidance' => 'The latest inventory, payment, and compliance signals are ready for review.',
        'route' => 'modal-analytics',
        'actionLabel' => 'Open Analytics'
    ];
    $events[] = [
        'id' => 'telemetry:heartbeat:' . date('Y-m-d-H-i'),
        'type' => 'success',
        'prefix' => '[COMPLETED]',
        'message' => 'Workspace integrity telemetry synchronized.',
        'detail' => date('H:i:s') . ' · inventory, receivables, and tax checks complete',
        'title' => 'Workspace is up to date',
        'guidance' => 'Live business information has been checked and the dashboard is ready for decisions.'
    ];
    respondJson(['success' => true, 'server_time' => date(DATE_ATOM), 'events' => $events]);
}

if ($action === 'get_whatsapp_sentinel') {
    $rows = [];
    $lowStockCount = 0;
    $paymentDueCount = 0;

    $inventoryColumns = [];
    $inventoryColumnResult = mysqli_query($conn, "SHOW COLUMNS FROM inventory");
    while ($column = mysqli_fetch_assoc($inventoryColumnResult)) $inventoryColumns[] = $column['Field'];
    $stockColumn = in_array('stock_quantity', $inventoryColumns, true) ? 'stock_quantity' : 'stock';
    $nameColumn = in_array('item_name', $inventoryColumns, true) ? 'item_name' : 'name';
    $idColumn = in_array('item_id', $inventoryColumns, true) ? 'item_id' : 'id';

    $lowStockResult = mysqli_query($conn, "SELECT `$idColumn` AS record_id, `$nameColumn` AS entity_name, `$stockColumn` AS stock FROM inventory WHERE `$stockColumn` <= 8 ORDER BY `$stockColumn` ASC LIMIT 50");
    while ($row = mysqli_fetch_assoc($lowStockResult)) {
        $lowStockCount++;
        $rows[] = [
            'id' => 'stock:' . $row['record_id'] . ':' . $row['stock'],
            'occurred_at' => null,
            'entity_name' => safeText($row['entity_name']),
            'entity_type' => 'Inventory',
            'reference' => 'STOCK-' . $row['record_id'],
            'state' => 'Queued',
            'trigger' => 'Low stock warning',
            'recipient' => 'Operations channel',
            'source' => 'inventory'
        ];
    }

    $dueResult = mysqli_query($conn, "SELECT invoice_no, customer_name, phone, balance, due_date, created_at FROM customer_ledgers WHERE balance > 0 ORDER BY due_date ASC LIMIT 50");
    while ($row = mysqli_fetch_assoc($dueResult)) {
        $paymentDueCount++;
        $isPending = empty($row['due_date']) || strtotime($row['due_date']) >= time();
        $rows[] = [
            'id' => 'due:' . md5($row['invoice_no'] . '|' . $row['customer_name'] . '|' . $row['balance']),
            'occurred_at' => $row['created_at'],
            'entity_name' => safeText($row['customer_name']),
            'entity_type' => 'Standard Client',
            'reference' => safeText($row['invoice_no']),
            'state' => $isPending ? 'Pending' : 'Queued',
            'trigger' => 'Customer payment due',
            'recipient' => safeText($row['phone']),
            'source' => 'customer_ledgers'
        ];
    }

    $receiptResult = mysqli_query($conn, "SELECT tx_ref, customer_name, created_at FROM payment_receipts ORDER BY created_at DESC LIMIT 50");
    while ($row = mysqli_fetch_assoc($receiptResult)) {
        $rows[] = [
            'id' => 'receipt:' . safeText($row['tx_ref']),
            'occurred_at' => $row['created_at'],
            'entity_name' => safeText($row['customer_name']),
            'entity_type' => 'Standard Client',
            'reference' => safeText($row['tx_ref']),
            'state' => 'Dispatched',
            'trigger' => 'Incoming settlement',
            'recipient' => 'Payment receipts',
            'source' => 'payment_receipts'
        ];
    }

    $reminderResult = mysqli_query($conn, "SELECT invoice_no, customer_name, contact, sent_at FROM payment_reminders ORDER BY sent_at DESC LIMIT 50");
    while ($row = mysqli_fetch_assoc($reminderResult)) {
        $rows[] = [
            'id' => 'reminder:' . md5($row['invoice_no'] . '|' . $row['sent_at']),
            'occurred_at' => $row['sent_at'],
            'entity_name' => safeText($row['customer_name']),
            'entity_type' => 'Standard Client',
            'reference' => safeText($row['invoice_no']),
            'state' => 'Dispatched',
            'trigger' => 'Payment dues reminder',
            'recipient' => safeText($row['contact']),
            'source' => 'payment_reminders'
        ];
    }

    $wholesalerResult = mysqli_query($conn, "SELECT firm_name, phone, created_at FROM wholesalers WHERE status = 'active' ORDER BY created_at DESC LIMIT 50");
    while ($row = mysqli_fetch_assoc($wholesalerResult)) {
        $rows[] = [
            'id' => 'wholesaler:' . md5($row['firm_name'] . '|' . $row['created_at']),
            'occurred_at' => $row['created_at'],
            'entity_name' => safeText($row['firm_name']),
            'entity_type' => 'Wholesaler',
            'reference' => 'SUPPLIER-' . md5($row['firm_name']),
            'state' => 'Pending',
            'trigger' => 'Purchase order route',
            'recipient' => safeText($row['phone']),
            'source' => 'wholesalers'
        ];
    }

    $ledgerResult = mysqli_query($conn, "SELECT ref, debit, credit, timestamp FROM ledger ORDER BY timestamp DESC LIMIT 50");
    while ($row = mysqli_fetch_assoc($ledgerResult)) {
        $ledgerText = strtolower($row['debit'] . ' ' . $row['credit']);
        if (strpos($ledgerText, 'purchase') === false && strpos($ledgerText, 'restock') === false && strpos($ledgerText, 'payment') === false && strpos($ledgerText, 'settle') === false) continue;
        $rows[] = [
            'id' => 'ledger:' . safeText($row['ref']),
            'occurred_at' => $row['timestamp'],
            'entity_name' => safeText($row['credit'] ?: $row['debit']),
            'entity_type' => strpos($ledgerText, 'purchase') !== false || strpos($ledgerText, 'restock') !== false ? 'Wholesaler' : 'Standard Client',
            'reference' => safeText($row['ref']),
            'state' => 'Dispatched',
            'trigger' => strpos($ledgerText, 'purchase') !== false || strpos($ledgerText, 'restock') !== false ? 'General purchase order' : 'Payment disbursement',
            'recipient' => 'Ledger route',
            'source' => 'ledger'
        ];
    }

    usort($rows, function ($left, $right) {
        return strtotime((string)($right['occurred_at'] ?? '')) <=> strtotime((string)($left['occurred_at'] ?? ''));
    });
    respondJson([
        'success' => true,
        'connection' => 'master_storage.db / MySQL vyapaar_core',
        'summary' => ['low_stock' => $lowStockCount, 'payment_dues' => $paymentDueCount],
        'rows' => array_slice($rows, 0, 100),
        'synced_at' => date('c')
    ]);
}

if ($action === 'get_dashboard') {
    // 1. Calculate revenue from sales inflows
    $revRes = mysqli_query($conn, "SELECT SUM(amount) as total FROM ledger WHERE credit = 'Sales Inflow'");
    $revRow = mysqli_fetch_assoc($revRes);
    $revenue = floatval($revRow['total'] ?? 0);

    // 2. Fetch live stock threshold tracking
    $threshold = isset($_GET['threshold']) ? intval($_GET['threshold']) : 8;
    $inventoryColumns = [];
    $columnsResult = mysqli_query($conn, "SHOW COLUMNS FROM inventory");
    while ($column = mysqli_fetch_assoc($columnsResult)) {
        $inventoryColumns[] = $column['Field'];
    }
    $isDjangoInventory = in_array('item_id', $inventoryColumns, true);
    $stockColumn = $isDjangoInventory ? 'stock_quantity' : 'stock';
    $stockRes = mysqli_query($conn, "SELECT COUNT(*) as low_count FROM inventory WHERE `$stockColumn` <= $threshold");
    $stockRow = mysqli_fetch_assoc($stockRes);

    // 3. Gather active inventory array
    $inventory = [];
    $inventorySelect = $isDjangoInventory
        ? "SELECT item_id AS id, item_name AS name, stock_quantity AS stock, unit_price AS base, sku FROM inventory"
        : "SELECT id, name, stock, base, sku FROM inventory";
    $invRes = mysqli_query($conn, $inventorySelect);
    while ($row = mysqli_fetch_assoc($invRes)) {
        $inventory[] = [
            'id' => $row['id'],
            'item_id' => $row['id'],
            'name' => $row['name'] ?? $row['item_name'] ?? 'Inventory Item',
            'sku' => $row['sku'] ?? ('VYP-SKU-' . strtoupper(substr(md5(($row['id'] ?? '') . ':' . ($row['name'] ?? $row['item_name'] ?? '')), 0, 8))),
            'stock' => intval($row['stock']),
            'base' => intval($row['base'])
        ];
    }

    // 4. Fetch last 15 system logs
    $logs = [];
    $logRes = mysqli_query($conn, "SELECT * FROM system_logs ORDER BY id DESC LIMIT 15");
    while ($row = mysqli_fetch_assoc($logRes)) {
        $logs[] = [
            'type' => $row['type'],
            'message' => $row['message'],
            'detail' => $row['detail'],
            'time' => date('h:i A', strtotime($row['timestamp']))
        ];
    }

    // 5. Calculate pending dues and live collection throughput
    $pendingRes = mysqli_query($conn, "SELECT COUNT(*) as total_pending, SUM(balance) as total_due FROM customer_ledgers WHERE balance > 0");
    $pendingRow = mysqli_fetch_assoc($pendingRes);
    $pendingDues = intval($pendingRow['total_pending'] ?? 0);
    $pendingAmount = floatval($pendingRow['total_due'] ?? 0);

    $dailyWindow = date('Y-m-d H:i:s', strtotime('-24 hours'));
    $dailyRes = mysqli_query($conn, "SELECT SUM(amount) as total_daily FROM ledger WHERE credit = 'Sales Inflow' AND timestamp >= '$dailyWindow'");
    $dailyRow = mysqli_fetch_assoc($dailyRes);
    $dailyCollections = floatval($dailyRow['total_daily'] ?? 0);

    $recentLogRes = mysqli_query($conn, "SELECT COUNT(*) as recent_count FROM system_logs WHERE timestamp >= DATE_SUB(NOW(), INTERVAL 1 HOUR)");
    $recentLogRow = mysqli_fetch_assoc($recentLogRes);
    $recentLogs = intval($recentLogRow['recent_count'] ?? 0);

    $gatewayHealth = 'amber';
    $gatewayCheck = mysqli_query($conn, "SELECT COUNT(*) as gateway_events FROM system_logs WHERE (message LIKE '%UPI Receivables%' OR message LIKE '%Payment reminder%' OR message LIKE '%Collection%' OR message LIKE '%Payment gateway%') AND timestamp >= DATE_SUB(NOW(), INTERVAL 4 HOUR)");
    if ($gatewayCheck && intval(mysqli_fetch_assoc($gatewayCheck)['gateway_events']) > 0) {
        $gatewayHealth = 'green';
    }

    $dbHealth = 'amber';
    if ($recentLogs > 0) {
        $dbHealth = 'green';
    }

    $serverHealth = 'green';

    echo json_encode([
        'revenue' => $revenue,
        'lowStockCount' => intval($stockRow['low_count']),
        'inventory' => $inventory,
        'logs' => $logs,
        'pending_dues' => $pendingDues,
        'pending_amount' => $pendingAmount,
        'daily_collections' => $dailyCollections,
        'statuses' => [
            'gateway' => $gatewayHealth,
            'db_sync' => $dbHealth,
            'server' => $serverHealth,
        ],
        'activity_feed' => $logs,
        // Inventory is the canonical product source for legacy PHP clients.
        'products' => $inventory,
        'last_updated' => date('h:i A'),
    ]);
    exit;
}

if ($action === 'surge_pricing') {
    $service = new SurgePricingService();
    $market = $service->fetchMarketRates();
    $inventory = [];
    $inventoryResult = mysqli_query($conn, "SELECT * FROM inventory");
    while ($row = mysqli_fetch_assoc($inventoryResult)) {
        $name = $row['item_name'] ?? $row['name'] ?? 'Inventory Item';
        $costPrice = isset($row['unit_price']) ? floatval($row['unit_price']) : (isset($row['base']) ? floatval($row['base']) : 0);
        $inventory[] = [
            'name' => $name,
            'costPrice' => $costPrice,
            'price' => $costPrice > 0 ? $costPrice * 1.15 : 0,
        ];
    }

    echo json_encode([
        'success' => true,
        'market' => $market,
        'recommendations' => $service->recommendPrices($inventory, $market),
    ]);
    exit;
}

if ($action === 'commit_checkout') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!$data || empty($data['cart'])) {
        echo json_encode(['success' => false, 'error' => 'Cart is empty']);
        exit;
    }

    mysqli_begin_transaction($conn);
    try {
        $subtotal = 0;
        foreach ($data['cart'] as $item) {
            $name = mysqli_real_escape_with_like_wildcards($conn, $item['name']);
            $qty = intval($item['qty']);
            $price = floatval($item['price']);
            $subtotal += ($price * $qty);

            // Deduct stock balance safely
            mysqli_query($conn, "UPDATE inventory SET stock = GREATEST(0, stock - $qty) WHERE name = '$name'");
        }

        $grandTotal = $subtotal * 1.18;
        
        // Generate Invoice reference block
        $countRes = mysqli_query($conn, "SELECT COUNT(*) as total FROM ledger");
        $countRow = mysqli_fetch_assoc($countRes);
        $txRef = "TX-00" . ($countRow['total'] + 1) . "-SALE";

        // Insert double-entry rows
        mysqli_query($conn, "INSERT INTO ledger (ref, debit, credit, amount) VALUES ('$txRef', 'UPI Receivables', 'Sales Inflow', $grandTotal)");
        
        // Record pipeline system events log
        $logMsg = "Invoice <span class='code-font text-indigo-400 font-bold'>#$txRef</span> Paid via UPI";
        $logDet = "₹" . number_format($grandTotal, 2);
        mysqli_query($conn, "INSERT INTO system_logs (type, message, detail) VALUES ('success', '$logMsg', '$logDet')");

        mysqli_commit($conn);
        echo json_encode(['success' => true, 'txRef' => $txRef, 'amount' => $grandTotal]);
    } catch (Exception $e) {
        mysqli_rollback($conn);
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
}

if ($action === 'get_client_collection_directory') {
    $clients = [];
    $invoices = [];

    $clientSql = "SELECT customer_name, phone, SUM(balance) AS outstanding, MIN(due_date) AS next_due, COUNT(*) AS invoice_count FROM customer_ledgers WHERE balance > 0 GROUP BY customer_name, phone ORDER BY outstanding DESC";
    $clientRes = mysqli_query($conn, $clientSql);
    while ($row = mysqli_fetch_assoc($clientRes)) {
        $clients[] = [
            'customer_name' => $row['customer_name'],
            'phone' => $row['phone'],
            'outstanding' => floatval($row['outstanding']),
            'next_due' => $row['next_due'],
            'invoice_count' => intval($row['invoice_count']),
        ];
    }

    $invoiceSql = "SELECT invoice_no, customer_name, phone, balance, due_date FROM customer_ledgers WHERE balance > 0 ORDER BY due_date ASC";
    $invoiceRes = mysqli_query($conn, $invoiceSql);
    while ($row = mysqli_fetch_assoc($invoiceRes)) {
        $invoices[] = [
            'invoice_no' => $row['invoice_no'],
            'customer_name' => $row['customer_name'],
            'phone' => $row['phone'],
            'balance' => floatval($row['balance']),
            'due_date' => $row['due_date'],
        ];
    }

    echo json_encode(['success' => true, 'clients' => $clients, 'invoices' => $invoices]);
    exit;
}

if ($action === 'get_client_invoice_history') {
    $customer = $_GET['customer_name'] ?? '';
    if (!$customer) {
        echo json_encode(['success' => false, 'error' => 'Missing customer_name']);
        exit;
    }

    $history = [];
    $cust = mysqli_real_escape_string($conn, $customer);
    $histSql = "SELECT invoice_no, subtotal, cgst, sgst, balance, due_date, payment_status, invoice_link FROM customer_ledgers WHERE customer_name = '$cust' ORDER BY due_date DESC";
    $histRes = mysqli_query($conn, $histSql);
    while ($row = mysqli_fetch_assoc($histRes)) {
        $history[] = [
            'invoice_no' => $row['invoice_no'],
            'subtotal' => floatval($row['subtotal']),
            'cgst' => floatval($row['cgst']),
            'sgst' => floatval($row['sgst']),
            'balance' => floatval($row['balance']),
            'due_date' => $row['due_date'],
            'payment_status' => $row['payment_status'],
            'invoice_link' => $row['invoice_link'],
        ];
    }

    echo json_encode(['success' => true, 'history' => $history]);
    exit;
}

if ($action === 'send_payment_reminder') {
    $invoiceNo = trim($_GET['invoice_no'] ?? '');
    $customerName = trim($_GET['customer_name'] ?? '');
    $medium = strtolower(trim($_GET['medium'] ?? 'whatsapp'));
    if (!$invoiceNo && !$customerName) {
        respondJson(['success' => false, 'error' => 'Missing invoice or customer identifier']);
    }
    if (!in_array($medium, ['whatsapp', 'email'], true)) {
        respondJson(['success' => false, 'error' => 'Invalid reminder medium']);
    }

    if ($invoiceNo) {
        $invoiceNoEscaped = mysqli_real_escape_string($conn, $invoiceNo);
        $remSql = "SELECT customer_name, phone, customer_email, invoice_link, invoice_no FROM customer_ledgers WHERE invoice_no = '$invoiceNoEscaped' LIMIT 1";
    } else {
        $customerEscaped = mysqli_real_escape_string($conn, $customerName);
        $remSql = "SELECT customer_name, phone, customer_email, invoice_link, invoice_no FROM customer_ledgers WHERE customer_name = '$customerEscaped' AND balance > 0 ORDER BY due_date ASC LIMIT 1";
    }

    $remRes = mysqli_query($conn, $remSql);
    if (!$remRes || mysqli_num_rows($remRes) === 0) {
        respondJson(['success' => false, 'error' => 'No open invoice found for reminder']);
    }

    $row = mysqli_fetch_assoc($remRes);
    $contact = $medium === 'email' ? ($row['customer_email'] ?? '') : $row['phone'];
    if (!$contact) {
        respondJson(['success' => false, 'error' => 'No contact available for selected medium']);
    }

    $reminderLink = $row['invoice_link'] ?: generateInvoiceLink($row['invoice_no']);
    $message = "Dear {$row['customer_name']}, your invoice {$row['invoice_no']} is due. Settle securely here: {$reminderLink}";

    mysqli_query($conn, "INSERT INTO payment_reminders (invoice_no, customer_name, medium, contact, reminder_link) VALUES ('" . mysqli_real_escape_string($conn, $row['invoice_no']) . "', '" . mysqli_real_escape_string($conn, $row['customer_name']) . "', '{$medium}', '" . mysqli_real_escape_string($conn, $contact) . "', '" . mysqli_real_escape_string($conn, $reminderLink) . "')");
    mysqli_query($conn, "INSERT INTO system_logs (type, message, detail) VALUES ('info', 'Payment reminder queued for " . mysqli_real_escape_string($conn, $row['invoice_no']) . "', 'Medium: {$medium}, Contact: {$contact}')");

    respondJson(['success' => true, 'message' => 'Reminder queued successfully', 'medium' => $medium, 'contact' => $contact, 'invoice_link' => $reminderLink, 'reminder_text' => $message]);
}

if ($action === 'get_company_profiles') {
    $tenantCode = getEffectiveTenantCode();
    if ($tenantCode !== '') {
        verifyTenantContext($tenantCode);
        $tenantEscaped = mysqli_real_escape_string($conn, $tenantCode);
        $sql = "SELECT id, tenant_code, company_name, trade_name, owner_name, gstin, pan, cin, license_number, license_valid_till, address, email, phone, bank_name, bank_account, ifsc_code, invoice_prefix, footer_note FROM company_profiles WHERE is_active = 1 AND tenant_code = '$tenantEscaped' ORDER BY updated_at DESC, id DESC";
    } else {
        $sql = "SELECT id, tenant_code, company_name, trade_name, owner_name, gstin, pan, cin, license_number, license_valid_till, address, email, phone, bank_name, bank_account, ifsc_code, invoice_prefix, footer_note FROM company_profiles WHERE is_active = 1 ORDER BY updated_at DESC, id DESC";
    }
    $res = mysqli_query($conn, $sql);
    $profiles = [];
    while ($row = mysqli_fetch_assoc($res)) {
        $profiles[] = [
            'id' => intval($row['id']),
            'tenantCode' => $row['tenant_code'],
            'companyName' => $row['company_name'],
            'tradeName' => $row['trade_name'],
            'ownerName' => $row['owner_name'],
            'gstin' => $row['gstin'],
            'pan' => $row['pan'],
            'cin' => $row['cin'],
            'licenseNumber' => $row['license_number'],
            'licenseValidTill' => $row['license_valid_till'],
            'address' => $row['address'],
            'email' => $row['email'],
            'phone' => $row['phone'],
            'bankName' => $row['bank_name'],
            'bankAccount' => $row['bank_account'],
            'ifscCode' => $row['ifsc_code'],
            'invoicePrefix' => $row['invoice_prefix'],
            'footerNote' => $row['footer_note'],
        ];
    }
    respondJson(['success' => true, 'profiles' => $profiles]);
}

if ($action === 'get_company_profile') {
    $profileId = intval($_GET['id'] ?? 0);
    $tenantCode = getEffectiveTenantCode();
    $tenantCondition = '';
    if ($tenantCode !== '') {
        verifyTenantContext($tenantCode);
        $tenantEscaped = mysqli_real_escape_string($conn, $tenantCode);
        $tenantCondition = " AND tenant_code = '$tenantEscaped'";
    }
    if ($profileId > 0) {
        $sql = "SELECT id, tenant_code, company_name, trade_name, owner_name, gstin, pan, cin, license_number, license_valid_till, address, email, phone, bank_name, bank_account, ifsc_code, invoice_prefix, footer_note FROM company_profiles WHERE id = $profileId$tenantCondition LIMIT 1";
    } else {
        $sql = "SELECT id, tenant_code, company_name, trade_name, owner_name, gstin, pan, cin, license_number, license_valid_till, address, email, phone, bank_name, bank_account, ifsc_code, invoice_prefix, footer_note FROM company_profiles WHERE is_active = 1$tenantCondition ORDER BY updated_at DESC, id DESC LIMIT 1";
    }
    $res = mysqli_query($conn, $sql);
    if ($res && mysqli_num_rows($res) > 0) {
        $row = mysqli_fetch_assoc($res);
        respondJson(['success' => true, 'profile' => [
            'id' => intval($row['id']),
            'tenantCode' => $row['tenant_code'],
            'companyName' => $row['company_name'],
            'tradeName' => $row['trade_name'],
            'ownerName' => $row['owner_name'],
            'gstin' => $row['gstin'],
            'pan' => $row['pan'],
            'cin' => $row['cin'],
            'licenseNumber' => $row['license_number'],
            'licenseValidTill' => $row['license_valid_till'],
            'address' => $row['address'],
            'email' => $row['email'],
            'phone' => $row['phone'],
            'bankName' => $row['bank_name'],
            'bankAccount' => $row['bank_account'],
            'ifscCode' => $row['ifsc_code'],
            'invoicePrefix' => $row['invoice_prefix'],
            'footerNote' => $row['footer_note']
        ]] );
    } else {
        respondJson(['success' => false, 'error' => 'Company profile not found']);
    }
}

if ($action === 'save_company_profile') {
    $payload = json_decode(file_get_contents('php://input'), true);
    $profile = is_array($payload['profile'] ?? null) ? $payload['profile'] : null;
    if (!$profile) {
        respondJson(['success' => false, 'error' => 'Missing profile data']);
    }

    $csrfToken = $profile['csrfToken'] ?? '';
    if (!validateCsrfToken($csrfToken)) {
        respondJson(['success' => false, 'error' => 'Invalid CSRF token']);
    }

    $profileId = intval($profile['id'] ?? 0);
    $tenantCode = sanitizeAlnum($profile['tenantCode'] ?? '');
    $companyName = trim((string)$profile['companyName'] ?? '');
    $tradeName = trim((string)$profile['tradeName'] ?? '');
    $ownerName = trim((string)$profile['ownerName'] ?? '');
    $gstin = sanitizeAlnum($profile['gstin'] ?? '');
    $pan = sanitizeAlnum($profile['pan'] ?? '');
    $cin = trim((string)$profile['cin'] ?? '');
    $licenseNumber = trim((string)$profile['licenseNumber'] ?? '');
    $licenseValidTill = trim((string)$profile['licenseValidTill'] ?? '');
    $address = trim((string)$profile['address'] ?? '');
    $email = trim((string)$profile['email'] ?? '');
    $phone = trim((string)$profile['phone'] ?? '');
    $bankName = trim((string)$profile['bankName'] ?? '');
    $bankAccount = trim((string)$profile['bankAccount'] ?? '');
    $ifscCode = sanitizeAlnum($profile['ifscCode'] ?? '');
    $invoicePrefix = trim((string)$profile['invoicePrefix'] ?? 'VY-');
    $footerNote = trim((string)$profile['footerNote'] ?? '');

    if ($tenantCode === '' || $companyName === '') {
        respondJson(['success' => false, 'error' => 'Tenant code and company name are required']);
    }
    if (!validateGSTIN($gstin)) {
        respondJson(['success' => false, 'error' => 'Invalid GSTIN format']);
    }
    if (!validatePAN($pan)) {
        respondJson(['success' => false, 'error' => 'Invalid PAN format']);
    }
    if (!validateIFSC($ifscCode)) {
        respondJson(['success' => false, 'error' => 'Invalid IFSC format']);
    }

    verifyTenantContext($tenantCode);

    if ($profileId > 0) {
        $stmt = $conn->prepare("UPDATE company_profiles SET tenant_code = ?, company_name = ?, trade_name = ?, owner_name = ?, gstin = ?, pan = ?, cin = ?, license_number = ?, license_valid_till = ?, address = ?, email = ?, phone = ?, bank_name = ?, bank_account = ?, ifsc_code = ?, invoice_prefix = ?, footer_note = ? WHERE id = ? AND tenant_code = ?");
        if (!$stmt) {
            respondJson(['success' => false, 'error' => 'DB prepare failed']);
        }
        $stmt->bind_param('ssssssssssssssssis', $tenantCode, $companyName, $tradeName, $ownerName, $gstin, $pan, $cin, $licenseNumber, $licenseValidTill, $address, $email, $phone, $bankName, $bankAccount, $ifscCode, $invoicePrefix, $footerNote, $profileId, $tenantCode);
        if ($stmt->execute()) {
            $profile['id'] = $profileId;
            respondJson(['success' => true, 'profile' => $profile]);
        }
    } else {
        $stmt = $conn->prepare("INSERT INTO company_profiles (tenant_code, company_name, trade_name, owner_name, gstin, pan, cin, license_number, license_valid_till, address, email, phone, bank_name, bank_account, ifsc_code, invoice_prefix, footer_note) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        if (!$stmt) {
            respondJson(['success' => false, 'error' => 'DB prepare failed']);
        }
        $stmt->bind_param('sssssssssssssssss', $tenantCode, $companyName, $tradeName, $ownerName, $gstin, $pan, $cin, $licenseNumber, $licenseValidTill, $address, $email, $phone, $bankName, $bankAccount, $ifscCode, $invoicePrefix, $footerNote);
        if ($stmt->execute()) {
            $profile['id'] = $stmt->insert_id;
            respondJson(['success' => true, 'profile' => $profile]);
        }
    }

    respondJson(['success' => false, 'error' => 'Unable to save profile']);
}

if ($action === 'delete_company_profile') {
    $payload = json_decode(file_get_contents('php://input'), true);
    $profileId = intval($payload['id'] ?? 0);
    $tenantCode = sanitizeAlnum($payload['tenantCode'] ?? '');
    $csrfToken = $payload['csrfToken'] ?? '';

    if ($profileId <= 0) {
        respondJson(['success' => false, 'error' => 'Missing profile id']);
    }
    if (!validateCsrfToken($csrfToken)) {
        respondJson(['success' => false, 'error' => 'Invalid CSRF token']);
    }
    if ($tenantCode === '') {
        respondJson(['success' => false, 'error' => 'Tenant context required']);
    }
    verifyTenantContext($tenantCode);

    $stmt = $conn->prepare("DELETE FROM company_profiles WHERE id = ? AND tenant_code = ?");
    if (!$stmt) {
        respondJson(['success' => false, 'error' => 'DB prepare failed']);
    }
    $stmt->bind_param('is', $profileId, $tenantCode);
    if ($stmt->execute()) {
        respondJson(['success' => true, 'message' => 'Profile deleted successfully']);
    }
    respondJson(['success' => false, 'error' => 'Unable to delete profile']);
}

if ($action === 'download_receipt_pdf') {
    $receiptRef = trim($_GET['receipt_ref'] ?? '');
    if (!$receiptRef) {
        respondJson(['success' => false, 'error' => 'Missing receipt reference']);
    }

    $receiptRefEscaped = mysqli_real_escape_string($conn, $receiptRef);
    $stmt = mysqli_query($conn, "SELECT tx_ref, customer_name, invoice_refs, amount, payment_method, created_at FROM payment_receipts WHERE tx_ref = '$receiptRefEscaped' LIMIT 1");
    if (!$stmt || mysqli_num_rows($stmt) === 0) {
        respondJson(['success' => false, 'error' => 'Receipt not found']);
    }

    $row = mysqli_fetch_assoc($stmt);
    $invoiceRefs = json_decode($row['invoice_refs'], true);
    $invoiceList = is_array($invoiceRefs) ? $invoiceRefs : [];
    $rows = [
        ['Receipt', $row['tx_ref']],
        ['Customer', $row['customer_name']],
        ['Paid Amount', '₹' . number_format($row['amount'], 2)],
        ['Payment Method', $row['payment_method']],
        ['Settled Invoices', implode(', ', $invoiceList)],
        ['Timestamp', $row['created_at']],
    ];
    $summary = [
        'Reference' => $row['tx_ref'],
        'Total amount' => '₹' . number_format($row['amount'], 2),
        'Payment method' => $row['payment_method'],
        'Customer' => $row['customer_name'],
    ];
    $pdf = buildPdfBytes('Vyapaar Payment Receipt', $rows, $summary);

    header('Content-Type: application/pdf');
    header('Content-Disposition: attachment; filename="' . $row['tx_ref'] . '.pdf"');
    echo $pdf;
    exit;
}

if ($action === 'commit_client_payment') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!$data || empty($data['customer_name']) || empty($data['invoice_refs']) || !is_array($data['invoice_refs'])) {
        respondJson(['success' => false, 'error' => 'Missing payment payload']);
    }

    $customerName = mysqli_real_escape_string($conn, $data['customer_name']);
    $invoiceRefs = array_filter(array_map(function ($ref) use ($conn) {
        return trim(mysqli_real_escape_string($conn, (string) $ref));
    }, $data['invoice_refs']));
    $amount = max(0.0, floatval($data['amount'] ?? 0));
    $paymentMethod = mysqli_real_escape_string($conn, strtoupper($data['payment_method'] ?? 'UNKNOWN'));
    $partialAmounts = is_array($data['partial_amounts']) ? $data['partial_amounts'] : [];

    if ($amount <= 0 || empty($invoiceRefs)) {
        respondJson(['success' => false, 'error' => 'Invalid payment amount or selected invoices']);
    }

    mysqli_begin_transaction($conn);
    try {
        $remaining = $amount;
        $invoiceSettlements = [];
        foreach ($invoiceRefs as $invoiceNo) {
            $invoiceNoEscaped = mysqli_real_escape_string($conn, $invoiceNo);
            $invRes = mysqli_query($conn, "SELECT invoice_no, balance FROM customer_ledgers WHERE invoice_no = '$invoiceNoEscaped' AND customer_name = '$customerName' LIMIT 1");
            if (!$invRes || mysqli_num_rows($invRes) === 0) {
                continue;
            }

            $row = mysqli_fetch_assoc($invRes);
            $balance = floatval($row['balance']);
            if ($balance <= 0) {
                continue;
            }

            $requested = isset($partialAmounts[$invoiceNo]) ? floatval($partialAmounts[$invoiceNo]) : $balance;
            $payAmount = max(0, min($remaining, $balance, $requested));
            if ($payAmount <= 0) {
                continue;
            }

            $newBalance = max(0, $balance - $payAmount);
            $status = $newBalance > 0 ? 'partial' : 'paid';
            mysqli_query($conn, "UPDATE customer_ledgers SET balance = $newBalance, payment_status = '$status' WHERE invoice_no = '$invoiceNoEscaped' AND customer_name = '$customerName'");

            $invoiceSettlements[] = ['invoice_no' => $invoiceNo, 'paid' => $payAmount, 'remaining_balance' => $newBalance];
            $remaining -= $payAmount;
            if ($remaining <= 0) {
                break;
            }
        }

        $receiptRef = 'RECEIPT-' . strtoupper(substr(md5($customerName . microtime(true)), 0, 10));
        $invoiceRefsJson = mysqli_real_escape_string($conn, json_encode(array_map(function ($settlement) {
            return $settlement['invoice_no'];
        }, $invoiceSettlements)));

        mysqli_query($conn, "INSERT INTO payment_receipts (tx_ref, customer_name, invoice_refs, amount, payment_method) VALUES ('$receiptRef', '$customerName', '$invoiceRefsJson', $amount, '$paymentMethod')");
        $ledgerRef = mysqli_real_escape_string($conn, 'COLL-' . strtoupper(substr(md5($customerName . time()), 0, 8)));
        mysqli_query($conn, "INSERT INTO ledger (ref, debit, credit, amount) VALUES ('$ledgerRef', 'Client Receivables', 'Cash Collected', $amount)");
        $logMsg = "Collection of ₹" . number_format($amount, 2) . " for $customerName via $paymentMethod";
        mysqli_query($conn, "INSERT INTO system_logs (type, message, detail) VALUES ('success', '$logMsg', 'Invoice settlement updated')");

        mysqli_commit($conn);
        respondJson(['success' => true, 'receipt_ref' => $receiptRef, 'invoice_settlements' => $invoiceSettlements]);
    } catch (Exception $e) {
        mysqli_rollback($conn);
        respondJson(['success' => false, 'error' => $e->getMessage()]);
    }
    exit;
}

// Clean helper to scrub string entries
function mysqli_real_escape_with_like_wildcards($conn, $str) {
    return mysqli_real_escape_string($conn, $str);
}
?>