function data_update2() {

    var name = document.getElementById("name").value;
    var 内容 = document.getElementById("内容").value;
    var id = ReadCookie("id");
    var quan = ReadCookie("用户权限");
    var q = document.getElementById("权限").value;
    console.log(quan);

    if (quan < q) {
        alert("您没有权限修改此文件")
        return false;
    }
    if (quan == q && (q == 1 || q == 3 || q == 5)) {
        alert("您没有权限修改此文件")
        return false;
    }
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
    var url = "/data_update2/data_update2?name=" + str1 + "&内容=" + str2 + "&id=" + id;
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    return false;
}