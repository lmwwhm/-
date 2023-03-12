function role_add() {

    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var phone = document.getElementById("phone").value;
    var 权限 = document.getElementById("权限").value;
    var xmlHttp;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            if (String(xmlHttp.responseText) == "True") {
                alert("插入成功");
            }
            else {
                alert(String(xmlHttp.responseText));
            }
        }

    }
    var str1 = encodeURI(name);
    var str2 = encodeURI(age);
    var str3 = encodeURI(username);
    var str4 = encodeURI(password);
    var str5 = encodeURI(phone);
    var str6 = encodeURI(权限);
    var url = "/role_add/role_add?name=" + str1 + "&age=" + str2 + "&username=" + str3 + "&password=" + str4 + "&phone=" + str5 + "&权限=" + str6;
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    return false;
}