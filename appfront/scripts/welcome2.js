function cook(x) {
    document.cookie = "";

    var 用户权限 = x;
    console.log(用户权限);
    SetCookie("用户权限", 用户权限, 60 * 24);

}
function SetCookie(cookieName, cookieValue, nDays) {
    /*当前日期*/
    var today = new Date();
    /*Cookie过期时间*/
    var expire = new Date();
    /*如果未设置nDays参数或者nDays为0，取默认值1*/
    if (nDays == null || nDays == 0) {
        nDays = 1;
    }
    /*计算Cookie过期时间*/
    expire.setTime(today.getTime() + 10000 * nDays);
    /*设置Cookie值*/
    document.cookie = cookieName + "=" + escape(cookieValue) + ";expires=" + expire.toGMTString();
}
function ReadCookie(cookieName) {
    var theCookie = "" + document.cookie;
    var ind = theCookie.indexOf(cookieName);
    if (ind == -1 || cookieName == "") {
        return ""
    };
    var ind1 = theCookie.indexOf(';', ind);
    if (ind1 == -1) {
        ind1 = theCookie.length;
    };
    /*读取Cookie值*/
    return unescape(theCookie.substring(ind + cookieName.length + 1, ind1));
}

function day(x) {
    //2022 / 12 / 6 6: 31: 39
    var list = x.split('/');
    var ans = "";
    list = list[2].split(" ");
    ans = ans + list[0];
    return ans;
}
function month(x) {
    //2022 / 12 / 6 6: 31: 39
    var list = x.split('/');
    var ans = "";
    ans = ans + list[1];
    return ans;
}
function welcome0() {
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
            var data = initial_data;
            cook(data[0]["权限"]);
        }

    }
    var url = "/welcome2/welcome2?id=0";
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    return false;
}
function welcome1() {
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
            var data = initial_data;
            document.getElementById("x1").innerHTML = data[0]["count(*)"];
        }

    }
    var url = "/welcome2/welcome2?id=1";
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    return false;
}
function welcome3() {
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
            var data = initial_data;
            document.getElementById("username").innerHTML = data[0]["username"];
        }

    }
    var url = "/welcome2/welcome2?id=3";
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    return false;
}

function welcome4() {
    var quan = ReadCookie("用户权限");
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
            var data = initial_data;
            var n1 = 0, n2 = 0;
            for (var i = 0; i < data.length; i++) {
                if (data[i]["权限"] <= quan) n1++;
                if (data[i]["权限"] <= quan && quan % 2 == 0) n2++;
                if (data[i]["权限"] < quan) n2++;
            }
            document.getElementById("x2").innerHTML = n1
            document.getElementById("x3").innerHTML = n2;
        }

    }
    var str2 = encodeURI("权限");
    var url = "/welcome2/welcome2?id=4" + "&" + str2 + "=" + ReadCookie("用户权限");
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    return false;
}

function welcome2() {
    welcome0();
    welcome1();
    welcome3();
    welcome4();

    return false;
}