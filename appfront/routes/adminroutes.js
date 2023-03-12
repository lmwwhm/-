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
//console.log(aesEncrypt('hello world!'));
//输出 c552d8545e864fd8f8b73e442cca9276 ,注意这里是16位形式的字符串

router.get('/admin', function (req, res) {
    var username = decodeURI(req.query.username);

    var xmlHttp;
    xmlHttp = new XMLHttpRequest();
    console.log("admin is coming");
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
    var urlusername = encodeURI(username);
    urlusername = "'" + urlusername + "'";


    var st1 = decodeURI("基本信息");
    var str1 = st1;

    /*  
        var s1 = decodeURI("DATE_FORMAT('date', '%Y-%m-%d %H:%i:%s') as date");
        var s1 = encodeURI(s1);
        var s2 = decodeURI("DATE_FORMAT('deadline', '%Y-%m-%d %H:%i:%s') as deadline");
        var s2 = encodeURI(s2);*/

    //var txt = "id," + str2 +"|" + str1 + "|date >= " + urlstart + " and deadline <="+ urlend + "||||B";
    if (username == "no input") var txt = "admin40|" + str1;
    //"id, name, age, username, phone | " + str1 + " | id >= 0 |||| B";
    else var txt = "admin41|" + str1 + "|"+ urlusername;
    //"id,name,age,username,phone|" + str1 + "|username =" + urlusername + "||||B";
    txt=aesEncrypt(txt);
    var url = "http://localhost:56461/Service1.svc/IN?jsoncallback=?&txt=" + txt;
    console.log(url);
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
});

module.exports = router;