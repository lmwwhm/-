// 引入包express swig fs MySQL
const express = require("express");
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var router = express.Router();
var crypto = require('crypto');
var secretKey = 'password';
var aesEncrypt = function (data) {
    var cipher = crypto.createCipher('aes-128-ecb', secretKey);
    return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
}
router.get('/welcome', function (req, res) {
    var id = decodeURI(req.query.id);
    if (id == 1) {
        var xmlHttp;
        xmlHttp = new XMLHttpRequest();
        console.log("welcome1 is coming");
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var tempData = xmlHttp.responseText;
                console.log(tempData);
                if (tempData.indexOf(":]}") == -1) {
                    tempData = tempData.substr(tempData.indexOf(":") + 2, tempData.lastIndexOf("}") - tempData.indexOf(":") - 3);
                    //使用replace方法将全部匹配正则表达式的转义符替换为空
                    tempData = tempData.replace(/\\/g, '');
                    tempData = JSON.parse(tempData);
                    /*console.log(“查询结果(JSON):tempData.Tables[0]["Rows"]);*/
                    //console.log("查询结果(JSON):",tempData.Tables[0]);
                    console.log("查询结果(JSON):", JSON.stringify(tempData.Tables[0]));
                    res.send(JSON.stringify(tempData.Tables[0]));
                }
            }
        }
        var st1 = decodeURI("information");
        var str1 = st1;
        var txt = "wel21|" + str1;
        txt = aesEncrypt(txt);
        //"count(*)|" + str1 + "|||||A";
        var url = "http://localhost:56461/Service1.svc/IN?jsoncallback=?&txt=" + txt;
        console.log(url);
        xmlHttp.open("GET", url, true);
        xmlHttp.send();
    }
    if (id == 2) {
        var xmlHttp;
        xmlHttp = new XMLHttpRequest();
        console.log("welcome2 is coming");
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var tempData = xmlHttp.responseText;
                console.log(tempData);
                if (tempData.indexOf(":]}") == -1) {
                    tempData = tempData.substr(tempData.indexOf(":") + 2, tempData.lastIndexOf("}") - tempData.indexOf(":") - 3);
                    //使用replace方法将全部匹配正则表达式的转义符替换为空
                    tempData = tempData.replace(/\\/g, '');
                    tempData = JSON.parse(tempData);
                    /*console.log(“查询结果(JSON):tempData.Tables[0]["Rows"]);*/
                    //console.log("查询结果(JSON):",tempData.Tables[0]);
                    console.log("查询结果(JSON):", JSON.stringify(tempData.Tables[0]));
                    res.send(JSON.stringify(tempData.Tables[0]));
                }
            }
        }
        var st1 = decodeURI("基本信息");
        var str1 = st1;
        var sql = "wel22|" + str1;
        sql = aesEncrypt(sql);
        //"count(*)|" + str1 + "|||||A";
        var url = "http://localhost:56461/Service1.svc/IN?jsoncallback=?&txt=" + sql;
        console.log(url);
        xmlHttp.open("GET", url, true);
        xmlHttp.send();
    }
    if (id == 3) {
        var xmlHttp;
        xmlHttp = new XMLHttpRequest();
        console.log("welcome3 is coming");
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var tempData = xmlHttp.responseText;
                console.log(tempData);
                if (tempData.indexOf(":]}") == -1) {
                    tempData = tempData.substr(tempData.indexOf(":") + 2, tempData.lastIndexOf("}") - tempData.indexOf(":") - 3);
                    //使用replace方法将全部匹配正则表达式的转义符替换为空
                    tempData = tempData.replace(/\\/g, '');
                    tempData = JSON.parse(tempData);
                    /*console.log(“查询结果(JSON):tempData.Tables[0]["Rows"]);*/
                    //console.log("查询结果(JSON):",tempData.Tables[0]);
                    console.log("查询结果(JSON):", JSON.stringify(tempData.Tables[0]));
                    res.send(JSON.stringify(tempData.Tables[0]));
                }
            }
        }
        var st1 = decodeURI("用户");
        var str1 = st1;
        var txt = "wel21|" + str1;
        txt = aesEncrypt(txt);
        //"count(*)|" + str1 + "|||||A";
        var url = "http://localhost:56461/Service1.svc/IN?jsoncallback=?&txt=" + txt;
        console.log(url);
        xmlHttp.open("GET", url, true);
        xmlHttp.send();
    }
    if (id == 4) {
        var xmlHttp;
        xmlHttp = new XMLHttpRequest();
        console.log("welcome4 is coming");
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var tempData = xmlHttp.responseText;
                console.log(tempData);
                if (tempData.indexOf(":]}") == -1) {
                    tempData = tempData.substr(tempData.indexOf(":") + 2, tempData.lastIndexOf("}") - tempData.indexOf(":") - 3);
                    //使用replace方法将全部匹配正则表达式的转义符替换为空
                    tempData = tempData.replace(/\\/g, '');
                    tempData = JSON.parse(tempData);
                    /*console.log(“查询结果(JSON):tempData.Tables[0]["Rows"]);*/
                    //console.log("查询结果(JSON):",tempData.Tables[0]);
                    console.log("查询结果(JSON):", JSON.stringify(tempData.Tables[0]));
                    res.send(JSON.stringify(tempData.Tables[0]));
                }
            }
        }
        var st1 = decodeURI("日程");
        var str1 = st1;
        var txt = "wel21|" + str1;
        txt = aesEncrypt(txt);
        //"count(*)|" + str1 + "|||||A";
        var url = "http://localhost:56461/Service1.svc/IN?jsoncallback=?&txt=" + txt;
        console.log(url);
        xmlHttp.open("GET", url, true);
        xmlHttp.send();
    }
    if (id == 5) {
        var xmlHttp;
        xmlHttp = new XMLHttpRequest();
        console.log("welcome5 is coming");
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var tempData = xmlHttp.responseText;
                console.log(tempData);
                if (tempData.indexOf(":]}") == -1) {
                    tempData = tempData.substr(tempData.indexOf(":") + 2, tempData.lastIndexOf("}") - tempData.indexOf(":") - 3);
                    //使用replace方法将全部匹配正则表达式的转义符替换为空
                    tempData = tempData.replace(/\\/g, '');
                    tempData = JSON.parse(tempData);
                    /*console.log(“查询结果(JSON):tempData.Tables[0]["Rows"]);*/
                    //console.log("查询结果(JSON):",tempData.Tables[0]);
                    console.log("查询结果(JSON):", JSON.stringify(tempData.Tables[0]));
                    res.send(JSON.stringify(tempData.Tables[0]));
                }
            }
        }
        var st1 = decodeURI("日记");
        var str1 = st1;
        var txt = "wel21|" + str1;
        txt = aesEncrypt(txt);
        //"count(*)|" + str1 + "|||||A";
        var url = "http://localhost:56461/Service1.svc/IN?jsoncallback=?&txt=" + txt;
        console.log(url);
        xmlHttp.open("GET", url, true);
        xmlHttp.send();
    }
    if (id == 6) {
        var xmlHttp;
        xmlHttp = new XMLHttpRequest();
        console.log("welcome6 is coming");
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var tempData = xmlHttp.responseText;
                console.log(tempData);
                if (tempData.indexOf(":]}") == -1) {
                    tempData = tempData.substr(tempData.indexOf(":") + 2, tempData.lastIndexOf("}") - tempData.indexOf(":") - 3);
                    //使用replace方法将全部匹配正则表达式的转义符替换为空
                    tempData = tempData.replace(/\\/g, '');
                    tempData = JSON.parse(tempData);
                    /*console.log(“查询结果(JSON):tempData.Tables[0]["Rows"]);*/
                    //console.log("查询结果(JSON):",tempData.Tables[0]);
                    console.log("查询结果(JSON):", JSON.stringify(tempData.Tables[0]));
                    res.send(JSON.stringify(tempData.Tables[0]));
                }
            }
        }
        var st1 = decodeURI("联系人");
        var str1 = st1;
        var txt = "wel21|" + str1;
        txt = aesEncrypt(txt);
        //"count(*)|" + str1 + "|||||A";
        var url = "http://localhost:56461/Service1.svc/IN?jsoncallback=?&txt=" + txt;
        console.log(url);
        xmlHttp.open("GET", url, true);
        xmlHttp.send();
    }
    if (id == 7) {
        var xmlHttp;
        xmlHttp = new XMLHttpRequest();
        console.log("welcome7 is coming");
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var tempData = xmlHttp.responseText;
                console.log(tempData);
                if (tempData.indexOf(":]}") == -1) {
                    tempData = tempData.substr(tempData.indexOf(":") + 2, tempData.lastIndexOf("}") - tempData.indexOf(":") - 3);
                    //使用replace方法将全部匹配正则表达式的转义符替换为空
                    tempData = tempData.replace(/\\/g, '');
                    tempData = JSON.parse(tempData);
                    /*console.log(“查询结果(JSON):tempData.Tables[0]["Rows"]);*/
                    //console.log("查询结果(JSON):",tempData.Tables[0]);
                    console.log("查询结果(JSON):", JSON.stringify(tempData.Tables[0]));
                    res.send(JSON.stringify(tempData.Tables[0]));
                }
            }
        }
        var st1 = decodeURI("财务");
        var str1 =st1;
        var txt = "wel21|" + str1;
        txt = aesEncrypt(txt);
        //"count(*)|" + str1 + "|||||A";
        var url = "http://localhost:56461/Service1.svc/IN?jsoncallback=?&txt=" + txt;
        console.log(url);
        xmlHttp.open("GET", url, true);
        xmlHttp.send();
    }
    if (id == 8) {
        var xmlHttp;
        xmlHttp = new XMLHttpRequest();
        console.log("welcome8 is coming");
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var tempData = xmlHttp.responseText;
                console.log(tempData);
                if (tempData.indexOf(":]}") == -1) {
                    tempData = tempData.substr(tempData.indexOf(":") + 2, tempData.lastIndexOf("}") - tempData.indexOf(":") - 3);
                    //使用replace方法将全部匹配正则表达式的转义符替换为空
                    tempData = tempData.replace(/\\/g, '');
                    tempData = JSON.parse(tempData);
                    /*console.log(“查询结果(JSON):tempData.Tables[0]["Rows"]);*/
                    //console.log("查询结果(JSON):",tempData.Tables[0]);
                    console.log("查询结果(JSON):", JSON.stringify(tempData.Tables[0]));
                    res.send(JSON.stringify(tempData.Tables[0]));
                }
            }
        }
        var st1 = decodeURI("日程");
        var str1 = st1;
        var txt = "wel23|" + str1;
        txt = aesEncrypt(txt);
        //"date|" + str1 + "|||||A";
        var url = "http://localhost:56461/Service1.svc/IN?jsoncallback=?&txt=" + txt;
        console.log(url);
        xmlHttp.open("GET", url, true);
        xmlHttp.send();
    }
    if (id == 9) {
        var xmlHttp;
        xmlHttp = new XMLHttpRequest();
        console.log("welcome9 is coming");
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var tempData = xmlHttp.responseText;
                console.log(tempData);
                if (tempData.indexOf(":]}") == -1) {
                    tempData = tempData.substr(tempData.indexOf(":") + 2, tempData.lastIndexOf("}") - tempData.indexOf(":") - 3);
                    //使用replace方法将全部匹配正则表达式的转义符替换为空
                    tempData = tempData.replace(/\\/g, '');
                    tempData = JSON.parse(tempData);
                    /*console.log(“查询结果(JSON):tempData.Tables[0]["Rows"]);*/
                    //console.log("查询结果(JSON):",tempData.Tables[0]);
                    console.log("查询结果(JSON):", JSON.stringify(tempData.Tables[0]));
                    res.send(JSON.stringify(tempData.Tables[0]));
                }
            }
        }
        var st1 = decodeURI("日记");
        var str1 = st1;
        var txt = "wel24|" + str1;
        txt = aesEncrypt(txt);
        //"date|" + str1 + "|||||A";
        var url = "http://localhost:56461/Service1.svc/IN?jsoncallback=?&txt=" + txt;
        console.log(url);
        xmlHttp.open("GET", url, true);
        xmlHttp.send();
    }
    if (id == 10) {
        var xmlHttp;
        xmlHttp = new XMLHttpRequest();
        console.log("welcome10 is coming");
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var tempData = xmlHttp.responseText;
                console.log(tempData);
                if (tempData.indexOf(":]}") == -1) {
                    tempData = tempData.substr(tempData.indexOf(":") + 2, tempData.lastIndexOf("}") - tempData.indexOf(":") - 3);
                    //使用replace方法将全部匹配正则表达式的转义符替换为空
                    tempData = tempData.replace(/\\/g, '');
                    tempData = JSON.parse(tempData);
                    /*console.log(“查询结果(JSON):tempData.Tables[0]["Rows"]);*/
                    //console.log("查询结果(JSON):",tempData.Tables[0]);
                    console.log("查询结果(JSON):", JSON.stringify(tempData.Tables[0]));
                    res.send(JSON.stringify(tempData.Tables[0]));
                }
            }
        }
        var st1 = decodeURI("财务");
        var str1 = st1;
        var txt = "wel25|" + str1;
        txt = aesEncrypt(txt);
        //"time|" + str1 + "|||||A";
        var url = "http://localhost:56461/Service1.svc/IN?jsoncallback=?&txt=" + txt;
        console.log(url);
        xmlHttp.open("GET", url, true);
        xmlHttp.send();
    }
    if (id == 11) {
        var xmlHttp;
        xmlHttp = new XMLHttpRequest();
        console.log("welcome11 is coming");
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var tempData = xmlHttp.responseText;
                console.log(tempData);
                if (tempData.indexOf(":]}") == -1) {
                    tempData = tempData.substr(tempData.indexOf(":") + 2, tempData.lastIndexOf("}") - tempData.indexOf(":") - 3);
                    //使用replace方法将全部匹配正则表达式的转义符替换为空
                    tempData = tempData.replace(/\\/g, '');
                    tempData = JSON.parse(tempData);
                    /*console.log(“查询结果(JSON):tempData.Tables[0]["Rows"]);*/
                    //console.log("查询结果(JSON):",tempData.Tables[0]);
                    console.log("查询结果(JSON):", JSON.stringify(tempData.Tables[0]));
                    res.send(JSON.stringify(tempData.Tables[0]));
                }
            }
        }
        var st1 = decodeURI("information");
        var str1 = st1;
        var st2 = decodeURI("权限");
        var str2 = st2;
        var txt = "wel26|" + str2 + "|" + str1;
        txt = aesEncrypt(txt);
        //str2 + "|" + str1 + "|||||A";
        var url = "http://localhost:56461/Service1.svc/IN?jsoncallback=?&txt=" + txt;
        console.log(url);
        xmlHttp.open("GET", url, true);
        xmlHttp.send();
    }
    if (id == 12) {
        var xmlHttp;
        xmlHttp = new XMLHttpRequest();
        console.log("welcome11 is coming");
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var tempData = xmlHttp.responseText;
                console.log(tempData);
                if (tempData.indexOf(":]}") == -1) {
                    tempData = tempData.substr(tempData.indexOf(":") + 2, tempData.lastIndexOf("}") - tempData.indexOf(":") - 3);
                    //使用replace方法将全部匹配正则表达式的转义符替换为空
                    tempData = tempData.replace(/\\/g, '');
                    tempData = JSON.parse(tempData);
                    /*console.log(“查询结果(JSON):tempData.Tables[0]["Rows"]);*/
                    //console.log("查询结果(JSON):",tempData.Tables[0]);
                    console.log("查询结果(JSON):", JSON.stringify(tempData.Tables[0]));
                    res.send(JSON.stringify(tempData.Tables[0]));
                }
            }
        }
        var st1 = decodeURI("日程");
        var str1 = st1;
        var st2 = decodeURI("状态");
        var str2 = st2;
        var txt = "wel27|" + str2 + "|" + str1;
        txt = aesEncrypt(txt);
        //"date,deadline," + str2 + "|" + str1 + "|||||A";
        var url = "http://localhost:56461/Service1.svc/IN?jsoncallback=?&txt=" + txt;
        console.log(url);
        xmlHttp.open("GET", url, true);
        xmlHttp.send();
    }

});

module.exports = router;