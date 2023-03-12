function basic_information_update() {
    var name = document.getElementById("x1");
    var age = document.getElementById("x2");
    var username = document.getElementById("x3");
    var password = document.getElementById("x4");
    var phone = document.getElementById("x5");
    var power = document.getElementById("x6");//权限
    console.log(phone.value);
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
    const str1 = encodeURI(name.value);
    const str2 = encodeURI(age.value);
    const str3 = encodeURI(username.value);
    const str4 = encodeURI(password.value);
    const str5 = encodeURI(phone.value);
    const str6 = encodeURI(power.value);

    var url = "/basic_information_update/basic_information_update?name=" + str1 + "&age=" + str2 + "&username=" + str3 + "&password=" + str4 + "&phone=" + str5 + "&power=" + str6;
    xmlHttp.open("GET", url, true);
    xmlHttp.send();

}