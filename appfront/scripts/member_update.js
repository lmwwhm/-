function member_update() {

    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
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
    var str4 = encodeURI(phone);
    var url = "/member_update/member_update?name=" + str1 + "&phone=" + str4 + "&id=" + id;
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    return false;
}