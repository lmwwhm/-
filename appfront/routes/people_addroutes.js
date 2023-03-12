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
router.get('/people_add', function (req, res) {
    var name = decodeURI(req.query.name);
    var age = decodeURI(req.query.age);
    var phone = decodeURI(req.query.phone);
    var 类型 = decodeURI(req.query.类型);
    var 备注 = decodeURI(req.query.备注);

    var xmlHttp;
    xmlHttp = new XMLHttpRequest();
    console.log("people_add is coming");
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
    var urlphone = phone;
    urlphone = "'" + urlphone + "',";
    var urll = 类型;
    urll = "'" + urll + "',";
    var urlb = 备注;
    urlb = "'" + urlb + "'";

    var st1 = decodeURI("关系");
    var str1 = st1;
    var st2 = decodeURI("类型");
    var str2 = st2;
    var st3 = decodeURI("备注");
    var str3 = st3;
    //var sql = str1 + "|(id,date,todo,deadline," + str2 + ")|SELECT (SELECT (MAX(id)+1) from " + str1 + ")," + urlstart + urltodo + urlend + "'0' from " + str1 + " where id=(select max(id) from " + str1 + ")" + "|B";
    var txt = "pe1|" + str1 + "|" + str2 + "|" + str3 + "|" + urlname + "|" + urlage + "|" + urlphone + "|" + urll + "|" + urlb;
    txt = aesEncrypt(txt);
    //str1 + "|(name,age,phone," + str2 + str3 + ")|(" + urlname + urlage + urlphone + urll + urlb + ")|A";
    var url = "http://localhost:56461/Service1.svc/IN?jsoncallback=?&txt=" + txt;
    console.log(url);
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
});

module.exports = router;