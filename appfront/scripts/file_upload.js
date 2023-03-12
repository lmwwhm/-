function file_upload() {
	//获得文件列表，注意这里不是数组，而是对象
    var file = document.querySelector('#file').files;
    if (!file.length) {
        alert('请选择文件');
    }
    else {
        var fd = new FormData();
        fd.append('avatar', file[0]);
        console.log(fd.get("avatar"));
        $.ajax({
            type: "POST",
            url: "/file_upload",
            data: fd,
            processData: false,
            contentType: false,
            error: function (data) {
                setTimeout(function () {
                    alert("文件上传失败");
                }, 50);
            },
            success: function (data) {
                setTimeout(function () {
                    alert("文件上传成功");
                }, 1000);
            },
            xhr: function () {
                myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', progressHandlingFunction, false);
                }
                return myXhr;
            }
        });
    }

    function progressHandlingFunction(event) {
        var loaded = Math.floor(100 * (event.loaded / event.total));
        $("#progress-bar").html(loaded + "%").css("width", loaded + "%");
    }

}