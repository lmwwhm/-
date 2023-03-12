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
    var url = "/welcome/welcome?id=1";
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    return false;
}
function welcome2() {
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
            document.getElementById("x2").innerHTML = data[0]["count(*)"];
        }

    }
    var url = "/welcome/welcome?id=2";
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
            document.getElementById("x3").innerHTML = data[0]["count(*)"];
        }

    }
    var url = "/welcome/welcome?id=3";
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    return false;
}
function welcome4() {
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
            document.getElementById("x4").innerHTML = data[0]["count(*)"];
            document.getElementById("y1").innerHTML = data[0]["count(*)"];
        }

    }
    var url = "/welcome/welcome?id=4";
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    return false;
}
function welcome5() {
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
            document.getElementById("x5").innerHTML = data[0]["count(*)"];
            document.getElementById("y2").innerHTML = data[0]["count(*)"];
        }

    }
    var url = "/welcome/welcome?id=5";
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    return false;
}
function welcome6() {
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
            document.getElementById("x6").innerHTML = data[0]["count(*)"];
        }

    }
    var url = "/welcome/welcome?id=6";
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    return false;
}
function welcome7() {
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
            document.getElementById("y3").innerHTML = data[0]["count(*)"];
        }

    }
    var url = "/welcome/welcome?id=7";
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    return false;
}
function welcome8() {
    var xmlHttp;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var temData = (this.responseText).replaceAll("name", "name");
            temData = temData.replaceAll("num", "value");
            temData = JSON.parse(temData);
            console.log("aa", temData);
            var initial_data = temData["Rows"];
            console.log("welcome8", initial_data);
            var data = initial_data;
            var today = 0, yesterday = 0, tomonth = 0;
            var nowdate = new Date();

            for (var i = 0; i < data.length; i++) {

                if (nowdate.getDate() == day(data[i]["date"])) today++;
                if (nowdate.getDate() == day(data[i]["date"])+1) yesterday++;
                if (nowdate.getMonth()+1 == month(data[i]["date"])) tomonth++;
            }
            document.getElementById("y4").innerHTML = today;
            document.getElementById("y7").innerHTML = yesterday;
            document.getElementById("y10").innerHTML = tomonth;
        }

    }
    var url = "/welcome/welcome?id=8";
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    return false;
}
function welcome9() {
    var xmlHttp;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var temData = (this.responseText).replaceAll("name", "name");
            temData = temData.replaceAll("num", "value");
            temData = JSON.parse(temData);
            console.log("aa", temData);
            var initial_data = temData["Rows"];
            console.log("welcome9", initial_data);
            var data = initial_data;
            var today = 0, yesterday = 0, tomonth = 0;
            var nowdate = new Date();

            for (var i = 0; i < data.length; i++) {

                if (nowdate.getDate() == day(data[i]["date"])) today++;
                if (nowdate.getDate() == day(data[i]["date"]) + 1) yesterday++;
                if (nowdate.getMonth() + 1 == month(data[i]["date"])) tomonth++;
            }
            document.getElementById("y5").innerHTML = today;
            document.getElementById("y8").innerHTML = yesterday;
            document.getElementById("y11").innerHTML = tomonth;
        }

    }
    var url = "/welcome/welcome?id=9";
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    return false;
}
function welcome10() {
    var xmlHttp;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var temData = (this.responseText).replaceAll("name", "name");
            temData = temData.replaceAll("num", "value");
            temData = JSON.parse(temData);
            console.log("aa", temData);
            var initial_data = temData["Rows"];
            console.log("welcome10", initial_data);
            var data = initial_data;
            var today = 0, yesterday = 0, tomonth = 0;
            var nowdate = new Date();

            for (var i = 0; i < data.length; i++) {

                if (nowdate.getDate() == day(data[i]["time"])) today++;
                if (nowdate.getDate() == day(data[i]["time"]) + 1) yesterday++;
                if (nowdate.getMonth() + 1 == month(data[i]["time"])) tomonth++;
            }
            document.getElementById("y6").innerHTML = today;
            document.getElementById("y9").innerHTML = yesterday;
            document.getElementById("y12").innerHTML = tomonth;
        }

    }
    var url = "/welcome/welcome?id=10";
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    return false;
}

function welcome() {
    welcome1();
    welcome2();
    welcome3();
    welcome4();
    welcome5();
    welcome6();

    welcome7();
    welcome8();
    welcome9();
    welcome10();

    var xmlHttp;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var temData = (this.responseText).replaceAll("name", "name");
            temData = temData.replaceAll("num", "value");
            temData = temData.replaceAll("num", "value");
            temData = JSON.parse(temData);
            console.log("aa", temData);
            var initial_data = temData["Rows"];
            console.log("bb", initial_data);
            var data = initial_data;

        }

    }

    var url = "/welcome/welcome?id=0";
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    return false;
}