﻿function people_update() {

    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var phone = document.getElementById("phone").value;
    var 类型 = document.getElementById("类型").value;
    var 备注 = document.getElementById("备注").value;
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
    var str2 = encodeURI(age);
    var str3 = encodeURI(phone);
    var str4 = encodeURI(类型);
    var str5 = encodeURI(备注);
    var url = "/people_update/people_update?name=" + str1 + "&age=" + str2 + "&phone=" + str3 + "&类型=" + str4 + "&备注=" + str5 + "&id=" + id;
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    return false;
}