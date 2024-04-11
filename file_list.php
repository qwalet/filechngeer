<?php
$fileList = array();
$uploadDir = 'uploads/';
$files = scandir($uploadDir);

foreach ($files as $file) {
    if ($file !== '.' && $file !== '..') {
        $fileList[] = array(
            'fileName' => $file,
            'fileURL' => $uploadDir . $file
        );
    }
}

echo json_encode($fileList);
?>
