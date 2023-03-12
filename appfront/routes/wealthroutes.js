﻿// 引入包express swig fs MySQL
const express = require("express");
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var router = express.Router();
var crypto = require('crypto');
var secretKey = 'password';
var aesEncrypt = function (data) {
    var cipher = crypto.createCipher('aes-128-ecb', secretKey);
    return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
}

router.get('/wealth', function (req, res) {
    var start = decodeURI(req.query.start);
    var end = decodeURI(req.query.end);

    var xmlHttp;
    xmlHttp = new XMLHttpRequest();
    console.log("wealth is coming");
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
    var urlstart = start;
    urlstart = "'" + urlstart + "'";
    var urlend = end;
    urlend = "'" + urlend + "'";

    var st1 = decodeURI("财务");
    var str1 = st1;
    var st2 = decodeURI("类型");
    var str2 = st2;
    var txt = "wea4|" + str2 + "|" + str1 + "|" + urlstart + "|" + urlend;
    txt = aesEncrypt(txt);
    //"id,income,outcome,time,dowhat," + str2 + "|" + str1 + "|time >=" + urlstart + " and time<=" + urlend + "||||B";
    var url = "http://localhost:56461/Service1.svc/IN?jsoncallback=?&txt=" + txt;
    console.log(url);
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
});

module.exports = router;