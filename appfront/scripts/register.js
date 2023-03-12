function register() {
    var name = document.getElementById("name");
    var age = document.getElementById("age");
    var password = document.getElementById("password");
    var username = document.getElementById("username");
    var phone = document.getElementById("phone");
    console.log("second");
    if (name.value == "") {
        alert("请输入姓名");
    }
    else if (password.value == "") {
        alert("请输入密码");
    }
    else if (phone.value == "") {
        alert("请输入电话");
    }
    else if (username.value == "") {
        alert("请输入用户名");
    }
    else if (age.value == "") {
        alert("请输入年龄");
    }
    else {
        var xmlHttp;
        xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                if (String(xmlHttp.responseText) == "True") {
                    location.href = "login.html";
                    alert("插入成功");
                }
                else {
                    alert(String(xmlHttp.responseText));
                }
            }
        }
        var str1 = encodeURI(name.value)
        var str2 = encodeURI(age.value)
        var str3 = encodeURI(username.value)
        var str4 = encodeURI(password.value)
        var str5 = encodeURI(phone.value)
        var url = "/register/register?name=" + str1 + "&age=" + str2 + "&username=" + str3 + "&password=" + str4 + "&phone=" + str5;
        xmlHttp.open("GET", url, true);
        xmlHttp.send();
    }
}
