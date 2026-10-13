<?php
require_once __DIR__ . '/../config/db.config.php';

if (!isset($pdo)) {
    fwrite(STDERR, "Database connection unavailable.\n");
    exit(1);
}

$pdo->exec("CREATE TABLE IF NOT EXISTS customer_ledgers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    invoice_no VARCHAR(100) NOT NULL,
    customer_name VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    balance DECIMAL(10,2) NOT NULL,
    due_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)");

$pdo->exec("CREATE TABLE IF NOT EXISTS reminder_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    invoice_no VARCHAR(100) NOT NULL,
    customer_name VARCHAR(150) NOT NULL,
    payload TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)");

$pdo->exec("INSERT INTO customer_ledgers (invoice_no, customer_name, phone, balance, due_date) VALUES
    ('INV-9001', 'Ravi Traders', '+919999000001', 1250.50, DATE_SUB(CURDATE(), INTERVAL 12 DAY)),
    ('INV-9002', 'Suresh Supplies', '+919999000002', 860.00, DATE_SUB(CURDATE(), INTERVAL 48 DAY))
    ON DUPLICATE KEY UPDATE invoice_no = invoice_no");

$stmt = $pdo->query("SELECT * FROM customer_ledgers WHERE balance > 0 ORDER BY due_date ASC");
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
$processed = 0;
$queued = 0;

foreach ($rows as $row) {
    $dueDate = new DateTime($row['due_date']);
    $now = new DateTime('now');
    $days = (int) $dueDate->diff($now)->format('%r%a');

    $bracket = $days <= 30 ? '0-30' : ($days <= 60 ? '31-60' : '60+');
    $qrLink = 'https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=' . urlencode('upi://pay?pa=vyapaar@upi&am=' . $row['balance'] . '&tn=Invoice%20' . $row['invoice_no']);

    $payload = [
        'invoice_no' => $row['invoice_no'],
        'customer_name' => $row['customer_name'],
        'phone' => $row['phone'],
        'balance' => (float) $row['balance'],
        'days_overdue' => $days,
        'aging_bracket' => $bracket,
        'qr_link' => $qrLink,
    ];

    $sent = dispatchReminder($payload);
    $queued += $sent ? 1 : 0;
    $processed++;

    $insert = $pdo->prepare("INSERT INTO reminder_messages (invoice_no, customer_name, payload) VALUES (:invoice_no, :customer_name, :payload)");
    $insert->execute([
        ':invoice_no' => $row['invoice_no'],
        ':customer_name' => $row['customer_name'],
        ':payload' => json_encode($payload),
    ]);
}

echo json_encode([
    'status' => 'ok',
    'processed_invoices' => $processed,
    'queued_messages' => $queued,
]);

function dispatchReminder(array $payload): bool
{
    $endpoint = getenv('WHATSAPP_WEBHOOK_URL') ?: getenv('SMS_GATEWAY_URL');
    if (!$endpoint) {
        return true;
    }

    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/json\r\n",
            'content' => json_encode($payload),
            'timeout' => 5,
        ],
    ]);

    $result = @file_get_contents($endpoint, false, $context);
    return $result !== false;
}
