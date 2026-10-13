<?php
function logToMaster($moduleName, $actionType, $payloadData = []) {
    try {
        $dbPath = __DIR__ . '/master_storage.db';
        $pdo = new PDO("sqlite:" . $dbPath);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $stmt = $pdo->prepare("INSERT INTO master_logs (module_name, action_type, payload) VALUES (?, ?, ?)");
        $stmt->execute([
            $moduleName,
            $actionType,
            json_encode($payloadData)
        ]);
        return true;
    } catch (Exception $e) {
        return false;
    }
}
?>