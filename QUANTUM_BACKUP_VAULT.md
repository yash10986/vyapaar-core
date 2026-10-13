# Quantum Backup Vault

The vault endpoint is `backup_vault.php`.

## What is captured

Each snapshot dynamically enumerates every MySQL base table in `vyapaar_core` and stores:

- `SHOW CREATE TABLE` schema for every table
- Every row and column value
- A SQL companion dump inside the JSON archive
- Table and row counts
- UTC timestamp, operator, and SHA-256 integrity stamp

Archives are stored under `storage/backups/`, which is denied by `.htaccess` and written with restrictive permissions.

## Daily automation

The runner is `cron/quantum_backup_daily.php`. It checks `storage/backups/schedule.json` before creating a snapshot.

### Windows Task Scheduler

Create a daily task with:

- Program: `C:\xampp\php\php.exe`
- Arguments: `C:\xampp\htdocs\vyapaar-core\cron\quantum_backup_daily.php`
- Start in: `C:\xampp\htdocs\vyapaar-core`
- Trigger: Daily at 02:00

### Linux cron

```text
0 2 * * * /usr/bin/php /var/www/vyapaar-core/cron/quantum_backup_daily.php
```

The Quantum Vault schedule toggle updates `schedule.json`. The runner must still be registered once with Task Scheduler or cron.

## Restore safeguards

The browser submits the archive through `backup_vault.php?action=restore`. The handler requires:

1. A valid session CSRF token.
2. A JSON archive with the expected vault format.
3. A matching SHA-256 stamp calculated from the archive schema and rows.
4. An explicit `RESTORE_VERIFIED_VAULT` confirmation value.
5. A 100 MB upload limit.

Only tables already present in the current database are restored, and only intersecting columns are written. The operation runs inside a transaction with foreign-key checks temporarily disabled and rolls back on failure.
