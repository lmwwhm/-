function member_add() {

    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;

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
    var str5 = encodeURI(phone);
    var url = "/member_add/member_add?name=" + str1 + "&phone=" + str5;
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    return false;
}