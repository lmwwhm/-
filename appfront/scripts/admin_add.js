function admin_add() {

    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var phone=document.getElementById("phone").value;

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
    var url = "/admin_add/admin_add?name=" + str1 + "&age=" + str2 + "&username=" + str3 + "&password=" + str4 + "&phone=" + str5;
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    return false;
}