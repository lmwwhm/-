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
router.get('/role', function (req, res) {
    var username = decodeURI(req.query.username);

    var xmlHttp;
    xmlHttp = new XMLHttpRequest();
    console.log("role is coming");
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
    var urlusername = username;
    urlusername = "'" + urlusername + "'";


    var st1 = decodeURI("用户");
    var str1 = st1;
    var st2 = decodeURI("权限");
    var str2 = st2;
    var st3 = decodeURI("权限修改请求");
    var str3 = st3;
    var st4 = decodeURI("事由");
    var str4 = st4;
    /*  
        var s1 = decodeURI("DATE_FORMAT('date', '%Y-%m-%d %H:%i:%s') as date");
        var s1 = encodeURI(s1);
        var s2 = decodeURI("DATE_FORMAT('deadline', '%Y-%m-%d %H:%i:%s') as deadline");
        var s2 = encodeURI(s2);*/

    //var sql = "id," + str2 +"|" + str1 + "|date >= " + urlstart + " and deadline <="+ urlend + "||||B";
    if (username == "no input") var txt = "ro4|" + str2 + "|" + str3 + "|" + str4 + "|" + str1;
    //"id,name,age,username,phone," + str2 + "," + str3 + "," + str4 + "|" + str1 + "|id >= 0||||B";
    else var txt = "ro5|" + str2 + "|" + str3 + "|" + str4 + "|" + str1 + "|" + urlusername;
    //"id,name,age,username,phone," + str2 + "," + str3 + "," + str4 + "|" + str1 + "|name =" + urlusername + "||||B";
    txt = aesEncrypt(txt);
    var url = "http://localhost:56461/Service1.svc/IN?jsoncallback=?&txt=" + txt;
    console.log(url);
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
});

module.exports = router;