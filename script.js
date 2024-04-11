// Функция для загрузки файла
function uploadFile() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];
    var formData = new FormData();
    formData.append('file', file);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'upload.php', true);

    xhr.upload.onprogress = function(event) {
        var progress = Math.round((event.loaded / event.total) * 100);
        document.getElementById('progress').innerHTML = 'Upload Progress: ' + progress + '%';
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

// Функция для открытия вкладки
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

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

// Функция для скачивания файла
function downloadFile(fileName) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'download.php?file=' + encodeURIComponent(fileName), true);
    xhr.responseType = 'blob';

    xhr.onload = function() {
        if (xhr.status === 200) {
            var blob = new Blob([xhr.response]);
            var downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(blob);
            downloadLink.download = fileName;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        } else {
            alert('Error downloading file');
        }
    };

    xhr.send();
}

// Вызов функции открытия вкладки Upload по умолчанию при загрузке страницы
document.getElementById("defaultOpen").click();
