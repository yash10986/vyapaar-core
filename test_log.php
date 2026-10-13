<?php
$dbPath = __DIR__ . '/master_storage.db';
$pdo = new PDO("sqlite:" . $dbPath);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Automatically create table if it doesn't exist
$pdo->exec("CREATE TABLE IF NOT EXISTS master_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    module_name TEXT,
    action_type TEXT,
    payload TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)");

// Insert a test log
$stmt = $pdo->prepare("INSERT INTO master_logs (module_name, action_type, payload) VALUES (?, ?, ?)");
$stmt->execute(['DASHBOARD', 'INITIAL_TEST', json_encode(['message' => 'System successfully linked!'])]);

// Fetch and display logs
$stmt = $pdo->query("SELECT * FROM master_logs");
$logs = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo "<h2>Master Storage Content Verification:</h2>";
echo "<pre>";
print_r($logs);
echo "</pre>";
?>