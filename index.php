<?php
// Supported languages
$supportedLangs = ['es', 'en', 'fr'];
$defaultLang = 'es';

// Get browser language from Accept-Language header
$langHeader = $_SERVER['HTTP_ACCEPT_LANGUAGE'] ?? '';
$browserLang = strtolower(substr($langHeader, 0, 2));

// Use default if not supported
if (!in_array($browserLang, $supportedLangs)) {
    $browserLang = $defaultLang;
}

// Redirect to the matching language folder
header("Location: /{$browserLang}/");
exit;
?>
