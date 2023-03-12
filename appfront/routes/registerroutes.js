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
router.get('/register', function (req, res) {
    var name = decodeURI(req.query.name);
    var age = decodeURI(req.query.age);
    var username = decodeURI(req.query.username);
    var password = decodeURI(req.query.password);
    var phone = decodeURI(req.query.phone);
    var 权限 = 1;
    var xmlHttp;
    xmlHttp = new XMLHttpRequest();
    console.log("register is coming");
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var result = xmlHttp.responseText;
            console.log(result);
            result = result.substr(result.indexOf(":") + 2, result.lastIndexOf("}") - result.indexOf(":") - 3);
            console.log(result);
            if (result == "True") {
                res.send("True");
            }
            else {
                res.send("插入失败");
            }
        }
    }
    var urlname = name;
    urlname = "'" + urlname + "',";
    var urlage = age;
    urlage = "'" + urlage + "',";
    var urlusername = username;
    urlusername = "'" + urlusername + "',";
    var urlpassword = password;
    urlpassword = "'" + urlpassword + "',";
    var urlphone = phone;
    urlphone = "'" + urlphone + "',";
    var urlq = 权限;
    urlq = "'" + urlq + "',";

    var st1 = decodeURI("用户");
    var str1 = st1;
    var st2 = decodeURI("权限");
    var str2 = st2;
    var st3 = decodeURI("is_login");
    var str3 = st3;
    var st4 = decodeURI("权限修改请求");
    var str4 = st4;
    var st5 = decodeURI("事由");
    var str5 = st5;
    //var sql = str1 + "|(id,date,todo,deadline," + str2 + ")|SELECT (SELECT (MAX(id)+1) from " + str1 + ")," + urlstart + urltodo + urlend + "'0' from " + str1 + " where id=(select max(id) from " + str1 + ")" + "|B";
    var txt = "reg|" + str1 + "|" + str2 + "|" + str3 + "|" + str4 + "|" + str5 + "|" + urlname + "|" + urlage + "|" + urlusername + "|" + urlpassword + "|" + urlphone + "|" + urlq;
    txt = aesEncrypt(txt);
    //str1 + "|(name,age,username,password,phone," + str2 + "," + str3 + "," + str4 + "," + str5 + ")|(" + urlname + urlage + urlusername + urlpassword + urlphone + urlq + "'0','0','0')|A";

    var url = "http://localhost:56461/Service1.svc/IN?jsoncallback=?&txt=" + txt;
    console.log(url);
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
});

module.exports = router;