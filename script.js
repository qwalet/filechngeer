// Функция для загрузки файла
function uploadFile() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];
    var formData = new FormData();
    formData.append('file', file);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'upload.php', true);

    xhr.upload.onprogress = function(event) {
        if (event.lengthComputable) {
            var percentComplete = (event.loaded / event.total) * 100;
            document.getElementById('progress').innerHTML = 'Upload Progress: ' + percentComplete.toFixed(2) + '%';
        }
    };

    xhr.onload = function() {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            document.getElementById('fileURL').innerHTML = 'File URL: <a href="' + response.fileURL + '">' + response.fileName + '</a>';
            loadFileList(); // После загрузки файла обновляем список файлов
        } else {
            alert('Error uploading file');
        }
    };

    xhr.send(formData);
}

// Привязка функции uploadFile() к кнопке "Upload"
document.getElementById('uploadButton').addEventListener('click', uploadFile);

// Функция для загрузки списка файлов
function loadFileList() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'file_list.php', true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            var fileList = JSON.parse(xhr.responseText);
            var fileListHTML = '';
            fileList.forEach(function(file) {
                fileListHTML += '<li><a href="' + file.fileURL + '">' + file.fileName + '</a> (<a href="#" onclick="downloadFile(\'' + file.fileName + '\')">Download</a>)</li>';
            });
            document.getElementById('fileList').innerHTML = fileListHTML;
        } else {
            alert('Error loading file list');
        }
    };

    xhr.send();
}
