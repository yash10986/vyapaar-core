<?php
// Increase memory limit and execution time for high-capacity 1TB scaling
ini_set('memory_limit', '2048M');
set_time_limit(600);

// Direct MySQL connection parameters for XAMPP
$dbHost = 'localhost';
$dbUser = 'root';
$dbPass = '';
$dbName = 'vyapaar_core';
$masterDbPath = __DIR__ . '/master_storage.db';

try {
    // 1. Connect directly to MySQL
    $pdo = new PDO("mysql:host=" . $dbHost . ";dbname=" . $dbName . ";charset=utf8mb4", $dbUser, $dbPass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    // 2. Connect to the Master SQLite Database with 1TB-Ready Performance Settings
    $masterPdo = new PDO("sqlite:" . $masterDbPath);
    $masterPdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $masterPdo->exec("PRAGMA journal_mode = WAL;"); 
    $masterPdo->exec("PRAGMA synchronous = NORMAL;"); 
    $masterPdo->exec("PRAGMA page_size = 4096;"); 

    // 3. Create enterprise snapshot tables
    $masterPdo->exec("CREATE TABLE IF NOT EXISTS system_snapshots (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        table_name TEXT,
        row_data TEXT,
        synced_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    $masterPdo->exec("CREATE INDEX IF NOT EXISTS idx_table_name ON system_snapshots(table_name);");

    echo "<h2>Vyapaar Core: 1TB-Ready Master Storage Sync in Progress...</h2><hr><pre>";

    // 4. Fetch all tables from MySQL and sync 100% of data
    $tablesQuery = $pdo->query("SHOW TABLES");
    $tables = $tablesQuery->fetchAll(PDO::FETCH_COLUMN);

    $totalRowsSynced = 0;

    foreach ($tables as $table) {
        echo "Processing table: <b>{$table}</b>...\n";
        
        $rowsQuery = $pdo->query("SELECT * FROM `$table`");
        $rows = $rowsQuery->fetchAll(PDO::FETCH_ASSOC);

        $delStmt = $masterPdo->prepare("DELETE FROM system_snapshots WHERE table_name = ?");
        $delStmt->execute([$table]);

        $masterPdo->beginTransaction();
        $insertStmt = $masterPdo->prepare("INSERT INTO system_snapshots (table_name, row_data) VALUES (?, ?)");
        
        foreach ($rows as $row) {
            $insertStmt->execute([$table, json_encode($row)]);
            $totalRowsSynced++;
        }
        
        $masterPdo->commit();
    }

    echo "\n<hr><b>Success!</b> Total of <b>{$totalRowsSynced} rows</b> across all tables have been fully synchronized and stored inside <b>master_storage.db</b>.\n";
    echo "</pre>";

} catch (Exception $e) {
    if (isset($masterPdo) && $masterPdo->inTransaction()) {
        $masterPdo->rollBack();
    }
    echo "<h3>Sync Error:</h3> " . $e->getMessage();
}
?>