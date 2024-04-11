<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    $file = $_FILES['file'];

    $uploadDir = 'uploads/';
    $uploadFile = $uploadDir . basename($file['name']);

    if (move_uploaded_file($file['tmp_name'], $uploadFile)) {
        echo json_encode(array(
            'fileName' => basename($file['name']),
            'fileURL' => $uploadFile
        ));
    } else {
        http_response_code(500);
    }
} else {
    http_response_code(400);
}
?>
