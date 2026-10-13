<?php
/**
 * Daily Quantum Vault runner.
 * Configure Windows Task Scheduler or cron to run this file once per day.
 * Example cron: 0 2 * * * php /path/to/vyapaar-core/cron/quantum_backup_daily.php
 */
declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    http_response_code(403);
    exit("CLI only\n");
}

$root = dirname(__DIR__);
$scheduleFile = $root . DIRECTORY_SEPARATOR . 'backups' . DIRECTORY_SEPARATOR . 'schedule.json';
if (!is_file($scheduleFile)) {
    $legacySchedule = $root . DIRECTORY_SEPARATOR . 'storage' . DIRECTORY_SEPARATOR . 'backups' . DIRECTORY_SEPARATOR . 'schedule.json';
    if (is_file($legacySchedule)) {
        $scheduleFile = $legacySchedule;
    }
}
$schedule = is_file($scheduleFile) ? json_decode((string)file_get_contents($scheduleFile), true) : ['enabled' => true];
if (is_array($schedule) && ($schedule['enabled'] ?? true) === false) {
    exit("Quantum Vault daily schedule disabled\n");
}

session_start();
$_SESSION['csrf_token'] = 'quantum-vault-cron';
$_POST['csrfToken'] = $_SESSION['csrf_token'];
$_GET['action'] = 'snapshot';
require $root . DIRECTORY_SEPARATOR . 'backup_vault.php';
