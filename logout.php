<?php
/**
 * VYAPAAR CORE - Secure Logout Handler
 * Safely destroys user session and redirects to welcome page
 * 
 * @package vyapaar-core
 * @version 1.0
 */

// Start session to access session variables
session_start();

// Capture user info for logging (optional - before destroying session)
$logged_out_user = isset($_SESSION['operator_user']) ? $_SESSION['operator_user'] : 'Unknown User';

// Optional: Validate CSRF token if provided (extra security layer)
$csrf_valid = true;
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['csrf_token'])) {
    if (!isset($_SESSION['csrf_token']) || !hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'])) {
        $csrf_valid = false;
        // Log as security event
        error_log("SECURITY: Invalid CSRF token on logout attempt for user: $logged_out_user at " . date('Y-m-d H:i:s'));
    }
}

// ============================================
// SECURE SESSION DESTRUCTION
// ============================================

// Clear all session variables
$_SESSION = array();

// Destroy the session cookie
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(
        session_name(),
        '',
        time() - 42000,
        $params["path"],
        $params["domain"],
        $params["secure"],
        $params["httponly"]
    );
}

// Destroy the session server-side
session_destroy();

// ============================================
// PREVENT CACHING OF SENSITIVE PAGES
// ============================================
header('Cache-Control: no-cache, no-store, must-revalidate, private');
header('Pragma: no-cache');
header('Expires: 0');

// ============================================
// REDIRECT TO WELCOME PAGE
// ============================================
$message = urlencode('You have been successfully logged out. See you soon!');
header('Location: welcome.php?message=' . $message . '&type=success', true, 302);
exit();
?>