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
router.get('/welcome2', function (req, res) {
    var id = decodeURI(req.query.id);
    if (id == 0) {
        var xmlHttp;
        xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var tempData = xmlHttp.responseText;
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
        var st1 = decodeURI("权限");
        var str1 = st1;
        var st2 = decodeURI("用户");
        var str2 = st2;

        var txt = "wel1|" + str1 + "|" + str2;
        txt = aesEncrypt(txt);
        //str1 + "|" + str2 + "|is_login='" + 1 + "'||||B";

        var url = "http://localhost:56461/Service1.svc/IN?jsoncallback=?&txt=" + txt;
        console.log(url);
        xmlHttp.open("GET", url, true);
        xmlHttp.send();
    }
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
        var txt = "wel2|" + str1;
        txt = aesEncrypt(txt);
        //"count(*)|" + str1 + "|||||A";
        var url = "http://localhost:56461/Service1.svc/IN?jsoncallback=?&txt=" + txt;
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
        var txt = "wel3|" + str1;
        txt = aesEncrypt(txt);
        //"username|" + str1 + "|is_login = 1||||B";
        var url = "http://localhost:56461/Service1.svc/IN?jsoncallback=?&txt=" + txt;
        console.log(url);
        xmlHttp.open("GET", url, true);
        xmlHttp.send();
    }
    if (id == 4) {
        var 权限 = decodeURI(req.query.权限);
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
        var st1 = decodeURI("information");
        var str1 = st1;

        var st2 = decodeURI("权限");
        var str2 = st2;
        var txt = "wel4|" + str2 + "|" + str1 + "|" + str2 + "|" + 权限;
        txt = aesEncrypt(txt);
        //str2 + "|" + str1 + " |" + str2 + "<=" + 权限 + "||||B";
        var url = "http://localhost:56461/Service1.svc/IN?jsoncallback=?&txt=" + txt;
        console.log(url);
        xmlHttp.open("GET", url, true);
        xmlHttp.send();
    }
});

module.exports = router;