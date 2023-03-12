function cook(x) {
    document.cookie = "";
    var 用户权限 = document.getElementById('x6').value;
    SetCookie("用户权限", 用户权限, 60*24);
}
function SetCookie(cookieName, cookieValue, nminutes) {
    /*当前日期*/
    var today = new Date();
    /*Cookie过期时间*/
    var expire = new Date();
    /*如果未设置nminutes参数或者nminutes为0，取默认值1*/
    if (nminutes == null || nminutes == 0) {
        nminutes = 1;
    }
    /*计算Cookie过期时间*/
    expire.setTime(today.getTime() + 60*1000 * nminutes);
    /*设置Cookie值*/
    document.cookie = cookieName + "=" + escape(cookieValue) + ";expires=" + expire.toGMTString();
}
function basic_information2() {
    var xmlHttp;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var temData = (this.responseText).replaceAll("name", "name");
            temData = temData.replaceAll("num", "value");
            temData = JSON.parse(temData);
            console.log("aa", temData);
            var initial_data = temData["Rows"];
            console.log("bb", initial_data);

            var x1 = initial_data[0].name;
            document.getElementById('x1').value = x1;
            var x2 = initial_data[0].age;
            document.getElementById('x2').value = x2;
            var x3 = initial_data[0].username;
            document.getElementById('x3').value = x3;
            var x4 = initial_data[0].password;
            document.getElementById('x4').value = x4;
            var x5 = initial_data[0].phone;
            document.getElementById('x5').value = x5;
            var x6 = initial_data[0].权限;
            document.getElementById('x6').value = x6;

            var x7 = initial_data[0].权限修改请求;
            document.getElementById('x7').value = x7;
            var x8 = initial_data[0].事由;
            document.getElementById('x8').value = x8;
            cook();
        }
    }
    var url = "/basic_information2/basic_information2";
    console.log(url);
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
}