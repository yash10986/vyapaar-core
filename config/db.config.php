<?php

// Enable detailed DB errors for local development only. Set to false on production.
if (!defined('DEV_DEBUG')) {
    define('DEV_DEBUG', true);
}

// Local server credentials for XAMPP
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'vyapaar_core');

try {
    // 1. First connect to MySQL without selecting the DB to ensure it exists
    $pdo = new PDO("mysql:host=" . DB_HOST . ";charset=utf8mb4", DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    // 2. Safely create the database if it doesn't exist yet
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `" . DB_NAME . "` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    
    // 3. Now officially switch context to your database
    $pdo->exec("USE `" . DB_NAME . "`");

    // Attempt to convert any pre-existing tables to InnoDB and utf8mb4
    $tablesToEnsure = ['inventory','system_operators','ledger','system_logs','wholesalers','customer_ledgers','company_profiles','payment_receipts','payment_reminders','audit_logs','warehouses','warehouse_stock','stock_transfers','tax_adjustments'];
    foreach ($tablesToEnsure as $tbl) {
        $exists = $pdo->query("SELECT COUNT(*) FROM information_schema.TABLES WHERE TABLE_SCHEMA = '" . DB_NAME . "' AND TABLE_NAME = '" . $tbl . "'")->fetchColumn();
        if (intval($exists) > 0) {
            try {
                $pdo->exec("ALTER TABLE `" . $tbl . "` ENGINE=InnoDB, CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
            } catch (PDOException $e) {
                // Non-fatal: conversion may fail for tables with incompatible structures — continue.
                error_log("Could not convert table $tbl to InnoDB/utf8mb4: " . $e->getMessage());
            }
        }
    }

    // 4. Automatically initialize system application tables if missing
    $pdo->exec("CREATE TABLE IF NOT EXISTS inventory (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        stock INT NOT NULL,
        base INT NOT NULL,
        sku VARCHAR(100) DEFAULT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    // Product identity is shared by the vault, catalog, POS, and invoices.
    $inventoryColumns = $pdo->query("SHOW COLUMNS FROM inventory")->fetchAll(PDO::FETCH_COLUMN);
    if (!in_array('sku', $inventoryColumns, true)) {
        $pdo->exec("ALTER TABLE inventory ADD COLUMN sku VARCHAR(100) DEFAULT NULL");
    }
    if (in_array('item_id', $inventoryColumns, true)) {
        $pdo->exec("UPDATE inventory SET sku = CONCAT('VYP-SKU-', LPAD(item_id, 4, '0')) WHERE sku IS NULL OR sku = ''");
    } elseif (in_array('id', $inventoryColumns, true)) {
        $pdo->exec("UPDATE inventory SET sku = CONCAT('VYP-SKU-', UPPER(SUBSTRING(MD5(CONCAT(id, ':', name)), 1, 8))) WHERE sku IS NULL OR sku = ''");
    }
    try {
        $pdo->exec("ALTER TABLE inventory ADD UNIQUE KEY uq_inventory_sku (sku)");
    } catch (PDOException $e) {
        // The index may already exist on an upgraded installation.
    }

    $pdo->exec("CREATE TABLE IF NOT EXISTS system_operators (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        fullname VARCHAR(150) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        security_key CHAR(6) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'Cashier',
        twofa_enabled TINYINT(1) NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    $pdo->exec("CREATE TABLE IF NOT EXISTS ledger (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        ref VARCHAR(50) NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        debit VARCHAR(100) NOT NULL,
        credit VARCHAR(100) NOT NULL,
        amount DECIMAL(10,2) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    $pdo->exec("CREATE TABLE IF NOT EXISTS system_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(20) NOT NULL,
        message TEXT NOT NULL,
        detail VARCHAR(255),
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    $pdo->exec("CREATE TABLE IF NOT EXISTS wholesalers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        firm_name VARCHAR(255) NOT NULL,
        gstin VARCHAR(20),
        address VARCHAR(255),
        phone VARCHAR(50),
        bank_name VARCHAR(255),
        account_number VARCHAR(50),
        ifsc_code VARCHAR(20),
        status VARCHAR(20) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    $wholesalerCheck = $pdo->query("SELECT COUNT(*) FROM wholesalers")->fetchColumn();
    if ($wholesalerCheck == 0) {
        $pdo->exec("INSERT INTO wholesalers (firm_name, gstin, address, phone, bank_name, account_number, ifsc_code, status) VALUES
            ('Indo-Aryan Wholesale Foods', '27AAACA1111A1Z1', 'Plot 12, APMC Market, Vashi, Mumbai', '+91 98200 12345', 'State Bank of India', '30129044111', 'SBIN0000512', 'active'),
            ('Saraswati Agro Importers', '27AAACS2222B2Z2', 'Grains Yard, Nagpur, Maharashtra', '+91 99300 54321', 'HDFC Bank Ltd', '501002221144', 'HDFC0000060', 'active'),
            ('Lunawat & Associates', '27AAACL3333C1Z3', 'Industrial Estate, Pune, Maharashtra', '+91 90900 77889', 'ICICI Bank', '100410001234', 'ICIC0001004', 'active')");
    }

    $pdo->exec("CREATE TABLE IF NOT EXISTS customer_ledgers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        invoice_no VARCHAR(100) NOT NULL,
        customer_name VARCHAR(150) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        customer_email VARCHAR(150) DEFAULT NULL,
        subtotal DECIMAL(12,2) NOT NULL DEFAULT 0,
        cgst DECIMAL(12,2) NOT NULL DEFAULT 0,
        sgst DECIMAL(12,2) NOT NULL DEFAULT 0,
        balance DECIMAL(10,2) NOT NULL DEFAULT 0,
        payment_status VARCHAR(50) NOT NULL DEFAULT 'pending',
        invoice_link VARCHAR(255) DEFAULT NULL,
        due_date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    $pdo->exec("CREATE TABLE IF NOT EXISTS company_profiles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        tenant_code VARCHAR(80) NOT NULL UNIQUE,
        company_name VARCHAR(255) NOT NULL,
        trade_name VARCHAR(255) DEFAULT NULL,
        owner_name VARCHAR(255) DEFAULT NULL,
        gstin VARCHAR(32) DEFAULT NULL,
        pan VARCHAR(20) DEFAULT NULL,
        cin VARCHAR(30) DEFAULT NULL,
        license_number VARCHAR(100) DEFAULT NULL,
        license_valid_till DATE DEFAULT NULL,
        address TEXT DEFAULT NULL,
        email VARCHAR(150) DEFAULT NULL,
        phone VARCHAR(50) DEFAULT NULL,
        bank_name VARCHAR(150) DEFAULT NULL,
        bank_account VARCHAR(50) DEFAULT NULL,
        ifsc_code VARCHAR(20) DEFAULT NULL,
        invoice_prefix VARCHAR(50) DEFAULT 'VY-',
        footer_note TEXT DEFAULT NULL,
        is_active TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    $profileCount = $pdo->query("SELECT COUNT(*) FROM company_profiles")->fetchColumn();
    if ($profileCount == 0) {
        $pdo->exec("INSERT INTO company_profiles (tenant_code, company_name, trade_name, owner_name, gstin, pan, cin, license_number, license_valid_till, address, email, phone, bank_name, bank_account, ifsc_code, invoice_prefix, footer_note) VALUES
            ('VYAPAARCORE', 'Vyapaar Core Technologies Pvt. Ltd.', 'Vyapaar Core', 'Satkar Sharma', '27AAACA1111A1Z1', 'AAACA1111A', 'U74999MH2024PTC123456', 'LIC-IND-2026-001', '2027-12-31', 'Plot 12, APMC Market, Vashi, Mumbai, Maharashtra, 400703', 'contact@vyapaarcore.in', '+91 98200 12345', 'State Bank of India', '30129044111', 'SBIN0000512', 'VY-', 'This invoice is computer generated and does not require a signature.')");
    }

    $pdo->exec("CREATE TABLE IF NOT EXISTS payment_receipts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        tx_ref VARCHAR(100) NOT NULL UNIQUE,
        customer_name VARCHAR(150) NOT NULL,
        invoice_refs TEXT NOT NULL,
        amount DECIMAL(12,2) NOT NULL,
        payment_method VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    $pdo->exec("CREATE TABLE IF NOT EXISTS payment_reminders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        invoice_no VARCHAR(100) NOT NULL,
        customer_name VARCHAR(150) NOT NULL,
        medium VARCHAR(20) NOT NULL,
        contact VARCHAR(150) NOT NULL,
        reminder_link VARCHAR(255) NOT NULL,
        sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    $pdo->exec("CREATE TABLE IF NOT EXISTS audit_logs (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        operator_id INT UNSIGNED NOT NULL,
        operator_username VARCHAR(100) NOT NULL,
        action VARCHAR(120) NOT NULL,
        module VARCHAR(80) NOT NULL,
        resource_id VARCHAR(100) DEFAULT NULL,
        detail TEXT DEFAULT NULL,
        ip_address VARCHAR(45) DEFAULT NULL,
        user_agent VARCHAR(255) DEFAULT NULL,
        metadata JSON DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    $pdo->exec("CREATE TABLE IF NOT EXISTS warehouses (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        location VARCHAR(255) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    $pdo->exec("CREATE TABLE IF NOT EXISTS warehouse_stock (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        warehouse_id INT UNSIGNED NOT NULL,
        inventory_id VARCHAR(50) NOT NULL,
        stock INT NOT NULL DEFAULT 0,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY warehouse_inventory_unique (warehouse_id, inventory_id),
        FOREIGN KEY (warehouse_id) REFERENCES warehouses(id) ON DELETE CASCADE,
        FOREIGN KEY (inventory_id) REFERENCES inventory(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    $pdo->exec("CREATE TABLE IF NOT EXISTS stock_transfers (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        transfer_ref VARCHAR(100) NOT NULL UNIQUE,
        source_warehouse_id INT UNSIGNED NOT NULL,
        destination_warehouse_id INT UNSIGNED NOT NULL,
        inventory_id VARCHAR(50) NOT NULL,
        quantity INT NOT NULL,
        initiated_by INT UNSIGNED DEFAULT NULL,
        status VARCHAR(30) NOT NULL DEFAULT 'pending',
        reason VARCHAR(255) DEFAULT NULL,
        source_stock_before INT NOT NULL,
        destination_stock_before INT NOT NULL,
        source_stock_after INT NOT NULL,
        destination_stock_after INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        completed_at TIMESTAMP NULL,
        FOREIGN KEY (source_warehouse_id) REFERENCES warehouses(id) ON DELETE RESTRICT,
        FOREIGN KEY (destination_warehouse_id) REFERENCES warehouses(id) ON DELETE RESTRICT,
        FOREIGN KEY (initiated_by) REFERENCES system_operators(id) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    $pdo->exec("CREATE TABLE IF NOT EXISTS tax_adjustments (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        operator_id INT UNSIGNED DEFAULT NULL,
        operator_username VARCHAR(100) NOT NULL,
        profile_id INT DEFAULT NULL,
        adjustment_type VARCHAR(50) NOT NULL,
        previous_value VARCHAR(100) DEFAULT NULL,
        updated_value VARCHAR(100) DEFAULT NULL,
        reason TEXT DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (operator_id) REFERENCES system_operators(id) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    $triggerCheck = $pdo->query("SELECT COUNT(*) FROM information_schema.TRIGGERS WHERE TRIGGER_SCHEMA = DATABASE() AND TRIGGER_NAME = 'audit_logs_no_update'")->fetchColumn();
    if ($triggerCheck == 0) {
        $pdo->exec("CREATE TRIGGER audit_logs_no_update BEFORE UPDATE ON audit_logs FOR EACH ROW SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Audit logs are immutable and cannot be updated.'");
    }

    $triggerCheck = $pdo->query("SELECT COUNT(*) FROM information_schema.TRIGGERS WHERE TRIGGER_SCHEMA = DATABASE() AND TRIGGER_NAME = 'audit_logs_no_delete'")->fetchColumn();
    if ($triggerCheck == 0) {
        $pdo->exec("CREATE TRIGGER audit_logs_no_delete BEFORE DELETE ON audit_logs FOR EACH ROW SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Audit logs are immutable and cannot be deleted.'");
    }

    $warehouseCheck = $pdo->query("SELECT COUNT(*) FROM warehouses")->fetchColumn();
    if ($warehouseCheck == 0) {
        $pdo->exec("INSERT INTO warehouses (code, name, location) VALUES ('CENTRAL', 'Central Warehouse Vault', 'Head Office / Central Stock')");
    }

    $centralWarehouseId = intval($pdo->query("SELECT id FROM warehouses WHERE code = 'CENTRAL' LIMIT 1")->fetchColumn());
    $stmtWarehouseStock = $pdo->prepare("INSERT INTO warehouse_stock (warehouse_id, inventory_id, stock) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE stock = VALUES(stock)");
    $inventoryRows = $pdo->query("SELECT id, stock FROM inventory")->fetchAll(PDO::FETCH_ASSOC);
    foreach ($inventoryRows as $item) {
        $stmtWarehouseStock->execute([$centralWarehouseId, $item['id'], intval($item['stock'])]);
    }

    $ledgerCheck = $pdo->query("SELECT COUNT(*) FROM customer_ledgers")->fetchColumn();
    if ($ledgerCheck == 0) {
        // No seed invoice records are added here so the client payments modules operate on real database entries only.
    }

    // 5. Seed stock records if the vault inventory is empty
    $check = $pdo->query("SELECT COUNT(*) FROM inventory")->fetchColumn();
    if ($check == 0) {
        $stmt = $pdo->prepare("INSERT INTO inventory (id, name, stock, base) VALUES (?, ?, ?, ?)");
        $mockItems = [
            ['VLT-01', 'Basmati Rice Premium', 15, 15],
            ['VLT-02', 'Tata Salt Premium', 2, 2],
            ['VLT-03', 'Fortune Mustard Oil', 12, 12],
            ['VLT-04', 'Taj Mahal Tea 250g', 4, 4],
            ['VLT-05', 'Aashirvaad Atta 10kg', 20, 20]
        ];
        foreach ($mockItems as $item) {
            $stmt->execute($item);
        }
    }

} catch (PDOException $e) {
    // Log the error for diagnostics
    error_log("Vyapaar Core system connection failure: " . $e->getMessage());

    // Instead of terminating execution, set a connection-failed flag so
    // calling scripts (like auth.php) can present a graceful fallback UI.
    $pdo = null;
    $DB_CONN_ERROR = true;
    $DB_CONN_ERROR_MESSAGE = $e->getMessage();
}

// --- Master Storage Auto-Sync Bridge ---
if (!isset($DB_CONN_ERROR) || !$DB_CONN_ERROR) {
    try {
        $masterDbPath = __DIR__ . '/master_storage.db';
        $masterPdo = new PDO("sqlite:" . $masterDbPath);
        $masterPdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $masterPdo->exec("CREATE TABLE IF NOT EXISTS master_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            module_name TEXT,
            action_type TEXT,
            payload TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )");
    } catch (Exception $e) {
        // Non-blocking fallback
    }
}
?>