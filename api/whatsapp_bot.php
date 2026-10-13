<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../config/db.config.php';

if (!isset($pdo)) {
    echo json_encode(['status' => 'error', 'message' => 'Database connection unavailable.']);
    exit;
}

$pdo->exec("CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reference VARCHAR(100) NOT NULL,
    customer_name VARCHAR(150) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)");

$pdo->exec("CREATE TABLE IF NOT EXISTS customer_ledgers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    invoice_no VARCHAR(100) NOT NULL,
    customer_name VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    balance DECIMAL(10,2) NOT NULL,
    due_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)");

$pdo->exec("INSERT INTO orders (reference, customer_name, status) VALUES
    ('ORD-1001', 'Ravi Traders', 'Packed'),
    ('ORD-1002', 'Suresh Supplies', 'In Transit')
    ON DUPLICATE KEY UPDATE reference = reference");

$pdo->exec("INSERT INTO customer_ledgers (invoice_no, customer_name, phone, balance, due_date) VALUES
    ('INV-9001', 'Ravi Traders', '+919999000001', 1250.50, DATE_SUB(CURDATE(), INTERVAL 12 DAY)),
    ('INV-9002', 'Suresh Supplies', '+919999000002', 860.00, DATE_SUB(CURDATE(), INTERVAL 48 DAY))
    ON DUPLICATE KEY UPDATE invoice_no = invoice_no");

function normalizeCommand($text) {
    return trim(strtolower($text));
}

function formatCurrency($amount) {
    return '₹' . number_format((float) $amount, 2);
}

function getInventoryMatches($pdo, $term) {
    $sql = "SELECT name, stock FROM inventory WHERE LOWER(name) LIKE :term ORDER BY name LIMIT 5";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':term' => '%' . strtolower($term) . '%']);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function getOrderStatus($pdo, $reference) {
    $stmt = $pdo->prepare("SELECT reference, customer_name, status FROM orders WHERE LOWER(reference) = LOWER(:reference) LIMIT 1");
    $stmt->execute([':reference' => $reference]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function getPendingBalance($pdo) {
    $stmt = $pdo->prepare("SELECT COALESCE(SUM(balance), 0) AS total_balance FROM customer_ledgers WHERE balance > 0");
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

$payload = json_decode(file_get_contents('php://input'), true);
if (!$payload && !empty($_POST)) {
    $payload = $_POST;
}
if (!$payload && !empty($_GET)) {
    $payload = $_GET;
}

$rawText = '';
if (is_array($payload)) {
    if (!empty($payload['Body'])) {
        $rawText = $payload['Body'];
    } elseif (!empty($payload['body'])) {
        $rawText = $payload['body'];
    } elseif (!empty($payload['message']['text']['body'])) {
        $rawText = $payload['message']['text']['body'];
    } elseif (!empty($payload['text'])) {
        $rawText = $payload['text'];
    }
}

$from = '';
if (is_array($payload)) {
    $from = $payload['From'] ?? $payload['from'] ?? $payload['sender'] ?? '';
}

$command = normalizeCommand((string) $rawText);
$reply = 'Vyapaar Core received your message. Try: check stock [item], order status [ID], or pending balance.';

if (preg_match('/check stock\s*(.+)?/i', $rawText, $matches)) {
    $term = trim($matches[1] ?? '');
    $items = getInventoryMatches($pdo, $term ?: '');
    if (!empty($items)) {
        $lines = [];
        foreach ($items as $item) {
            $lines[] = $item['name'] . ' -> ' . $item['stock'] . ' units';
        }
        $reply = 'Stock update: ' . implode('; ', $lines) . '.';
    } else {
        $reply = 'No matching stock item found. Please try a different product name.';
    }
} elseif (preg_match('/order status\s*(.+)?/i', $rawText, $matches)) {
    $reference = trim($matches[1] ?? '');
    if ($reference !== '') {
        $order = getOrderStatus($pdo, $reference);
        if ($order) {
            $reply = 'Order ' . $order['reference'] . ' for ' . $order['customer_name'] . ' is currently ' . $order['status'] . '.';
        } else {
            $reply = 'No matching order found for that reference.';
        }
    }
} elseif (preg_match('/pending balance/i', $command)) {
    $balance = getPendingBalance($pdo);
    $reply = 'Pending balance across open invoices is ' . formatCurrency($balance['total_balance']) . '.';
}

echo json_encode([
    'status' => 'ok',
    'reply' => [
        'to' => $from,
        'body' => $reply,
    ],
]);
