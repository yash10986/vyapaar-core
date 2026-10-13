<?php
require_once __DIR__ . '/../config/db.config.php';

if (!isset($pdo)) {
    fwrite(STDERR, "Database connection unavailable.\n");
    exit(1);
}

$pdo->exec("CREATE TABLE IF NOT EXISTS sale_events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL,
    qty INT NOT NULL,
    sold_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)");

$pdo->exec("CREATE TABLE IF NOT EXISTS purchase_orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL,
    qty INT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'draft',
    source VARCHAR(100) NOT NULL DEFAULT 'cron',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)");

$pdo->exec("INSERT INTO sale_events (item_name, qty, sold_at) VALUES
    ('Basmati Rice Premium', 8, DATE_SUB(NOW(), INTERVAL 3 DAY)),
    ('Fortune Mustard Oil', 5, DATE_SUB(NOW(), INTERVAL 10 DAY)),
    ('Aashirvaad Atta 10kg', 6, DATE_SUB(NOW(), INTERVAL 2 DAY))
    ON DUPLICATE KEY UPDATE item_name = item_name");

$stmt = $pdo->query("SELECT id, name, stock, base FROM inventory ORDER BY name");
$inventory = $stmt->fetchAll(PDO::FETCH_ASSOC);
$createdOrders = 0;

foreach ($inventory as $item) {
    $salesStmt = $pdo->prepare("SELECT COALESCE(SUM(qty), 0) AS qty_30d FROM sale_events WHERE item_name = :item_name AND sold_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)");
    $salesStmt->execute([':item_name' => $item['name']]);
    $sales = $salesStmt->fetch(PDO::FETCH_ASSOC);

    $velocity = (int) round((float) $sales['qty_30d'] / 30);
    $safetyThreshold = max(3, (int) round($velocity * 2 + $item['base']));

    if ((int) $item['stock'] <= $safetyThreshold) {
        $orderQty = max(10, (int) round($velocity * 4 + 10));
        $insert = $pdo->prepare("INSERT INTO purchase_orders (item_name, qty, status, source) VALUES (:item_name, :qty, 'draft', 'cron')");
        $insert->execute([':item_name' => $item['name'], ':qty' => $orderQty]);
        $createdOrders++;
    }
}

echo json_encode([
    'status' => 'ok',
    'draft_orders_created' => $createdOrders,
    'checked_items' => count($inventory),
]);
