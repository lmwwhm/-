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
router.get('/data2', function (req, res) {
    var name = decodeURI(req.query.name);
    var quan = decodeURI(req.query.权限);

    var xmlHttp;
    xmlHttp = new XMLHttpRequest();
    console.log("data2 is coming");
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
    var urlname = name;
    urlname = "'" + urlname + "'";
    var urlq = quan;
    urlq = "'" + urlq + "'";

    var st1 = decodeURI("information");
    var str1 = st1;
    var st2 = decodeURI("文件名,");
    var str2 = st2;
    var st3 = decodeURI("内容,");
    var str3 = st3;
    var st4 = decodeURI("权限");
    var str4 = st4;

    //var sql = "id," + str2 +"|" + str1 + "|date >= " + urlstart + " and deadline <="+ urlend + "||||B";
    if (name == "no input") var txt = "dat5|" + str2 + "|" + str3 + "|" + str4 + "|" + str1 + "|" + str4 + "|" + urlq;
    //"id," + str2 + str3 + str4 + "|" + str1 + "|id >= 0 and " + str4 + "<=" + urlq + "||||B";

    else var txt = "dat6|" + str2 + "|" + str3 + "|" + str4 + "|" + str1 + "|" + urlname + "|" + str4 + "|" + urlq;
    txt = aesEncrypt(txt);
    //"id," + str2 + str3 + str4 + "|" + str1 + "|'文件名' =" + urlname + " and" + str4 + " <=" + urlq + "||||B";
    var url = "http://localhost:56461/Service1.svc/IN?jsoncallback=?&txt=" + txt;
    console.log(url);
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
});

module.exports = router;