<?php
define('APP_DB_NAME', 'aed.net_db');
define('APP_DB_HOST', 'localhost');
define('APP_DB_USER', 'root');
define('APP_DB_PASSWORD', '');

try {
    $dsn = 'mysql:host=' . APP_DB_HOST . ';dbname=' . APP_DB_NAME . ';charset=UTF8';
    $dbh = new PDO(
        $dsn,
        APP_DB_USER,
        APP_DB_PASSWORD,
        [
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "<h3>ERREUR</h3><p>{$e->getMessage()}</p>";
    die();
}
