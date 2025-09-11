<?php
// Supported languages
$supportedLangs = ['es', 'en', 'fr'];
$defaultLang = 'es';

// Get browser language from Accept-Language header
$langHeader   = $_SERVER['HTTP_ACCEPT_LANGUAGE'] ?? '';
$browserLang  = strtolower(substr($langHeader, 0, 2));

// Use default if not supported
if (!in_array($browserLang, $supportedLangs)) {
    $browserLang = $defaultLang;
}
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Som de Mar</title>
  <meta name="robots" content="noindex"><!-- optional to keep root out of SEO -->

  <!-- No-JS fallback redirect -->
  <meta http-equiv="refresh" content="0;url=/<?= htmlspecialchars($browserLang) ?>/">

  <!-- Consent Mode v2 defaults: no cookies -->
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied'
    });
  </script>

  <!-- Google tag (scanner sees it, but cookies blocked by consent defaults) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-RE1CFYXF4Q"></script>
  <script>
    gtag('js', new Date());
    gtag('config', 'G-RE1CFYXF4Q', { allow_google_signals: false });
  </script>

  <!-- JS redirect (fast, replaces history so "/" isn’t left in back button) -->
  <script>
    (function () {
      var supported = ['es','en','fr'], dflt = 'es';
      var lang = (navigator.language || '').slice(0,2).toLowerCase();
      if (supported.indexOf(lang) === -1) lang = dflt;
      window.location.replace('/' + lang + '/');
    }());
  </script>
</head>
<body></body>
</html>
