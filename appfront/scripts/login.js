function login() {
    var username = document.getElementById("username");
    var password = document.getElementById("password");
    var rot = document.getElementById("root");
    console.log("second");
    if (username.value == "") {
        alert("请输入用户名");
    }
    else if (password.value == "") {
        alert("请输入密码");
    }
    else if (rot.value == "") {
        rot = 0;
    }
    console.log(rot);

    var xmlHttp;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            if (String(xmlHttp.responseText) == "Root") {
                alert("登录成功 , 欢迎 root 用户");
                location.href = "index.html";
            }
            else if (String(xmlHttp.responseText) == "True") {

                location.href = "index2.html";
                alert("登录成功");
            }
            else {
                alert(String(xmlHttp.responseText));
            }
        }
    }
    const str = encodeURI(username.value)
    var url = "/login/in?name=" + str + "&password=" + password.value + "&rot=" + rot.value;
    xmlHttp.open("GET", url, true);
    xmlHttp.send();

}