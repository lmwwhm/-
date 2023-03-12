function data_update() {

    var name = document.getElementById("name").value;
    var 内容 = document.getElementById("内容").value;
    var 权限 = document.getElementById("权限").value;
    var id = ReadCookie("id");

    var xmlHttp;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            if (String(xmlHttp.responseText) == "True") {
                alert("修改成功");
            }
            else {
                alert(String(xmlHttp.responseText));
            }
        }

    }
    var str1 = encodeURI(name);
    var str2 = encodeURI(内容);
    var str3 = encodeURI(权限);
    var url = "/data_update/data_update?name=" + str1 + "&内容=" + str2 + "&权限=" + str3 + "&id=" + id;
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    return false;
}