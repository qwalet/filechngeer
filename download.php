<?php
if (isset($_GET['file'])) {
    $fileName = $_GET['file'];
    $filePath = 'uploads/' . $fileName;

    if (file_exists($filePath)) {
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="' . $fileName . '"');
        readfile($filePath);
        exit;
    } else {
        http_response_code(404);
        exit;
    }
} else {
    http_response_code(400);
    exit;
}
?>
