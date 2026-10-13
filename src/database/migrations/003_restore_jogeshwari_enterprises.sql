-- Vyapaar Core restore migration
-- Target database: vyapaar_core
-- Safe to run repeatedly. Source backups should be applied with scripts/restore-backup.php
-- when exact backup quantities and prices are available.

CREATE DATABASE IF NOT EXISTS `vyapaar_core`
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `vyapaar_core`;

-- The legacy PHP inventory table stores stock and base cost only.
-- Keep it intact and store the richer catalog pricing in this additive table.
-- Product identity migration for the live inventory table.
SET @inventory_sku_exists = (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'inventory' AND COLUMN_NAME = 'sku');
SET @inventory_sku_sql = IF(@inventory_sku_exists = 0, 'ALTER TABLE inventory ADD COLUMN sku VARCHAR(100) NULL', 'SELECT 1');
PREPARE inventory_sku_stmt FROM @inventory_sku_sql;
EXECUTE inventory_sku_stmt;
DEALLOCATE PREPARE inventory_sku_stmt;
UPDATE inventory SET sku = CONCAT('VYP-SKU-', LPAD(item_id, 4, '0')) WHERE sku IS NULL OR sku = '';
SET @inventory_sku_index_exists = (SELECT COUNT(*) FROM information_schema.STATISTICS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'inventory' AND INDEX_NAME = 'uq_inventory_sku');
SET @inventory_sku_index_sql = IF(@inventory_sku_index_exists = 0, 'ALTER TABLE inventory ADD UNIQUE KEY uq_inventory_sku (sku)', 'SELECT 1');
PREPARE inventory_sku_index_stmt FROM @inventory_sku_index_sql;
EXECUTE inventory_sku_index_stmt;
DEALLOCATE PREPARE inventory_sku_index_stmt;

CREATE TABLE IF NOT EXISTS `product_catalog` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `sku` VARCHAR(100) NOT NULL,
    `product_name` VARCHAR(255) NOT NULL,
    `category` VARCHAR(80) NOT NULL DEFAULT 'OTHERS',
    `stock_quantity` INT NOT NULL DEFAULT 0,
    `mrp` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    `cost_price` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    `selling_price` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    `gst_rate` DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    `source_status` VARCHAR(40) NOT NULL DEFAULT 'BACKUP_RESTORED',
    `tenant_code` VARCHAR(80) NOT NULL DEFAULT 'JOGESHWARI-ENTERPRISES',
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uq_product_catalog_sku` (`sku`),
    UNIQUE KEY `uq_product_catalog_name_tenant` (`product_name`, `tenant_code`),
    KEY `idx_product_catalog_tenant` (`tenant_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Verified from the current Vyapaar Core state in index.php.
INSERT INTO `product_catalog`
    (`sku`, `product_name`, `category`, `stock_quantity`, `mrp`, `cost_price`, `selling_price`, `gst_rate`, `source_status`, `tenant_code`)
VALUES
    ('VY-RICE-PREMIUM', 'Basmati Rice Premium', 'GRAINS', 15, 450.00, 350.00, 420.00, 0.00, 'REPOSITORY_STATE', 'JOGESHWARI-ENTERPRISES'),
    ('VY-SALT-PREMIUM', 'Tata Salt Premium', 'CONDIMENTS', 92, 30.00, 20.00, 28.00, 0.00, 'REPOSITORY_STATE', 'JOGESHWARI-ENTERPRISES'),
    ('VY-MUSTARD-OIL', 'Fortune Mustard Oil', 'EDIBLES', 4, 200.00, 150.00, 185.00, 0.00, 'REPOSITORY_STATE', 'JOGESHWARI-ENTERPRISES'),
    ('VY-ATTA-10KG', 'Ashirvaad Atta 10kg', 'GRAINS', 2, 410.00, 320.00, 390.00, 0.00, 'REPOSITORY_STATE', 'JOGESHWARI-ENTERPRISES'),
    ('VY-TURMERIC', 'Catch Turmeric Powder', 'SPICES', 3, 50.00, 35.00, 45.00, 0.00, 'REPOSITORY_STATE', 'JOGESHWARI-ENTERPRISES'),
    ('VY-STANDARD-M7', 'Standard M7', 'OTHERS', 0, 0.00, 0.00, 0.00, 0.00, 'REQUIRES_BACKUP_VALUE', 'JOGESHWARI-ENTERPRISES')
ON DUPLICATE KEY UPDATE
    `product_name` = VALUES(`product_name`),
    `category` = VALUES(`category`),
    `stock_quantity` = VALUES(`stock_quantity`),
    `mrp` = VALUES(`mrp`),
    `cost_price` = VALUES(`cost_price`),
    `selling_price` = VALUES(`selling_price`),
    `gst_rate` = VALUES(`gst_rate`),
    `source_status` = VALUES(`source_status`),
    `tenant_code` = VALUES(`tenant_code`);

-- The live database uses the Django inventory shape and a tenant foreign key.
INSERT INTO `tenants` (`business_name`, `gst_number`)
SELECT 'Jogeshwari Enterprises', NULL
WHERE NOT EXISTS (SELECT 1 FROM `tenants` WHERE `business_name` = 'Jogeshwari Enterprises');
SET @jogeshwari_tenant_id = (SELECT `tenant_id` FROM `tenants` WHERE `business_name` = 'Jogeshwari Enterprises' ORDER BY `tenant_id` LIMIT 1);

INSERT INTO `inventory` (`tenant_id`, `item_name`, `stock_quantity`, `unit_price`, `warning_threshold`)
SELECT @jogeshwari_tenant_id, 'Basmati Rice Premium', 15, 420.00, 8
WHERE NOT EXISTS (SELECT 1 FROM `inventory` WHERE `tenant_id` = @jogeshwari_tenant_id AND `item_name` = 'Basmati Rice Premium');
UPDATE `inventory` SET `stock_quantity` = 15, `unit_price` = 420.00, `warning_threshold` = 8
WHERE `tenant_id` = @jogeshwari_tenant_id AND `item_name` = 'Basmati Rice Premium';

INSERT INTO `inventory` (`tenant_id`, `item_name`, `stock_quantity`, `unit_price`, `warning_threshold`)
SELECT @jogeshwari_tenant_id, 'Tata Salt Premium', 92, 28.00, 8
WHERE NOT EXISTS (SELECT 1 FROM `inventory` WHERE `tenant_id` = @jogeshwari_tenant_id AND `item_name` = 'Tata Salt Premium');
UPDATE `inventory` SET `stock_quantity` = 92, `unit_price` = 28.00, `warning_threshold` = 8
WHERE `tenant_id` = @jogeshwari_tenant_id AND `item_name` = 'Tata Salt Premium';

INSERT INTO `inventory` (`tenant_id`, `item_name`, `stock_quantity`, `unit_price`, `warning_threshold`)
SELECT @jogeshwari_tenant_id, 'Fortune Mustard Oil', 4, 185.00, 8
WHERE NOT EXISTS (SELECT 1 FROM `inventory` WHERE `tenant_id` = @jogeshwari_tenant_id AND `item_name` = 'Fortune Mustard Oil');
UPDATE `inventory` SET `stock_quantity` = 4, `unit_price` = 185.00, `warning_threshold` = 8
WHERE `tenant_id` = @jogeshwari_tenant_id AND `item_name` = 'Fortune Mustard Oil';

INSERT INTO `inventory` (`tenant_id`, `item_name`, `stock_quantity`, `unit_price`, `warning_threshold`)
SELECT @jogeshwari_tenant_id, 'Ashirvaad Atta 10kg', 2, 390.00, 8
WHERE NOT EXISTS (SELECT 1 FROM `inventory` WHERE `tenant_id` = @jogeshwari_tenant_id AND `item_name` = 'Ashirvaad Atta 10kg');
UPDATE `inventory` SET `stock_quantity` = 2, `unit_price` = 390.00, `warning_threshold` = 8
WHERE `tenant_id` = @jogeshwari_tenant_id AND `item_name` = 'Ashirvaad Atta 10kg';

INSERT INTO `inventory` (`tenant_id`, `item_name`, `stock_quantity`, `unit_price`, `warning_threshold`)
SELECT @jogeshwari_tenant_id, 'Catch Turmeric Powder', 3, 45.00, 8
WHERE NOT EXISTS (SELECT 1 FROM `inventory` WHERE `tenant_id` = @jogeshwari_tenant_id AND `item_name` = 'Catch Turmeric Powder');
UPDATE `inventory` SET `stock_quantity` = 3, `unit_price` = 45.00, `warning_threshold` = 8
WHERE `tenant_id` = @jogeshwari_tenant_id AND `item_name` = 'Catch Turmeric Powder';

INSERT INTO `inventory` (`tenant_id`, `item_name`, `stock_quantity`, `unit_price`, `warning_threshold`)
SELECT @jogeshwari_tenant_id, 'Standard M7', 0, 0.00, 8
WHERE NOT EXISTS (SELECT 1 FROM `inventory` WHERE `tenant_id` = @jogeshwari_tenant_id AND `item_name` = 'Standard M7');

UPDATE `inventory` SET `sku` = CONCAT('VYP-SKU-', LPAD(`item_id`, 4, '0')) WHERE `sku` IS NULL OR `sku` = '';

-- Wholesaler upserts. firm_name is not unique in the legacy schema,
-- so each update is followed by an insert only when no matching row exists.
UPDATE `wholesalers` SET
    `gstin` = '27AAACA1111A1Z1', `address` = 'Plot 12, APMC Market, Vashi, Mumbai',
    `phone` = '+91 98200 12345', `bank_name` = 'State Bank of India',
    `account_number` = '30129044111', `ifsc_code` = 'SBIN0000512', `status` = 'active'
WHERE `firm_name` = 'Indo-Aryan Wholesale Foods';
INSERT INTO `wholesalers` (`firm_name`, `gstin`, `address`, `phone`, `bank_name`, `account_number`, `ifsc_code`, `status`)
SELECT 'Indo-Aryan Wholesale Foods', '27AAACA1111A1Z1', 'Plot 12, APMC Market, Vashi, Mumbai', '+91 98200 12345', 'State Bank of India', '30129044111', 'SBIN0000512', 'active'
WHERE NOT EXISTS (SELECT 1 FROM `wholesalers` WHERE `firm_name` = 'Indo-Aryan Wholesale Foods');

UPDATE `wholesalers` SET
    `gstin` = '27AAACS2222B2Z2', `address` = 'Grains Yard, Nagpur, Maharashtra',
    `phone` = '+91 99300 54321', `bank_name` = 'HDFC Bank Ltd',
    `account_number` = '501002221144', `ifsc_code` = 'HDFC0000060', `status` = 'active'
WHERE `firm_name` = 'Saraswati Agro Importers';
INSERT INTO `wholesalers` (`firm_name`, `gstin`, `address`, `phone`, `bank_name`, `account_number`, `ifsc_code`, `status`)
SELECT 'Saraswati Agro Importers', '27AAACS2222B2Z2', 'Grains Yard, Nagpur, Maharashtra', '+91 99300 54321', 'HDFC Bank Ltd', '501002221144', 'HDFC0000060', 'active'
WHERE NOT EXISTS (SELECT 1 FROM `wholesalers` WHERE `firm_name` = 'Saraswati Agro Importers');

UPDATE `wholesalers` SET
    `gstin` = '27AAACL3333C1Z3', `address` = 'Industrial Estate, Pune, Maharashtra',
    `phone` = '+91 90900 77889', `bank_name` = 'ICICI Bank',
    `account_number` = '100410001234', `ifsc_code` = 'ICIC0001004', `status` = 'active'
WHERE `firm_name` = 'Lunawat & Associates';
INSERT INTO `wholesalers` (`firm_name`, `gstin`, `address`, `phone`, `bank_name`, `account_number`, `ifsc_code`, `status`)
SELECT 'Lunawat & Associates', '27AAACL3333C1Z3', 'Industrial Estate, Pune, Maharashtra', '+91 90900 77889', 'ICICI Bank', '100410001234', 'ICIC0001004', 'active'
WHERE NOT EXISTS (SELECT 1 FROM `wholesalers` WHERE `firm_name` = 'Lunawat & Associates');

-- Active tenant profile for Jogeshwari Enterprises.
INSERT INTO `company_profiles`
    (`tenant_code`, `company_name`, `trade_name`, `owner_name`, `gstin`, `pan`, `cin`, `license_number`, `license_valid_till`, `address`, `email`, `phone`, `bank_name`, `bank_account`, `ifsc_code`, `invoice_prefix`, `footer_note`, `is_active`)
VALUES
    ('JOGESHWARI-ENTERPRISES', 'Jogeshwari Enterprises', 'Jogeshwari Enterprises', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'JE-', 'This invoice is computer generated and does not require a signature.', 1)
ON DUPLICATE KEY UPDATE
    `company_name` = VALUES(`company_name`),
    `trade_name` = VALUES(`trade_name`),
    `invoice_prefix` = VALUES(`invoice_prefix`),
    `footer_note` = VALUES(`footer_note`),
    `is_active` = 1;

-- Verified repository ledger seed. The PHP backup importer adds the complete ledger.
INSERT INTO `ledger` (`ref`, `timestamp`, `debit`, `credit`, `amount`)
SELECT 'TX-001-OPEN', '2026-07-11 09:00:00', 'Cash-in-Hand', 'Sales Inflow', 48500.00
WHERE NOT EXISTS (SELECT 1 FROM `ledger` WHERE `ref` = 'TX-001-OPEN');
INSERT INTO `ledger` (`ref`, `timestamp`, `debit`, `credit`, `amount`)
SELECT 'TX-002-RENT', '2026-07-12 11:00:00', 'Real Estate Inc', 'Shop Rent', 12000.00
WHERE NOT EXISTS (SELECT 1 FROM `ledger` WHERE `ref` = 'TX-002-RENT');

-- Verification queries.
SELECT 'product_catalog' AS table_name, COUNT(*) AS rows_loaded FROM `product_catalog`;
SELECT 'inventory' AS table_name, COUNT(*) AS rows_loaded FROM `inventory`;
SELECT 'wholesalers' AS table_name, COUNT(*) AS rows_loaded FROM `wholesalers`;
SELECT 'company_profiles' AS table_name, COUNT(*) AS rows_loaded FROM `company_profiles` WHERE `tenant_code` = 'JOGESHWARI-ENTERPRISES';
SELECT COALESCE(SUM(`amount`), 0) AS ledger_total FROM `ledger`;
