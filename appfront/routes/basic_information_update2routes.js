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

router.get('/basic_information_update2', function (req, res) {
    console.log("save is coming");
    var name = decodeURI(req.query.name);
    var age = decodeURI(req.query.age);
    var username = decodeURI(req.query.username);
    var password = decodeURI(req.query.password);
    var phone = decodeURI(req.query.phone);
    var power = decodeURI(req.query.power);
    var thing = decodeURI(req.query.thing);
    console.log("name", name);
    console.log("password", password);


    var xmlHttp;
    xmlHttp = new XMLHttpRequest();
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
                res.send("修改失败");
            }
        }
    }
    var urlname = name;
    urlname = "'" + urlname + "'";
    var urlage = age;
    urlage = "'" + urlage + "'";
    var urlusername = username;
    urlusername = "'" + urlusername + "'";
    var urlpassword = password;
    urlpassword = "'" + urlpassword + "'";
    var urlphone = phone;
    urlphone = "'" + urlphone + "'";
    var urlpower = power;
    urlpower = "'" + urlpower + "'";
    var urlthing = thing;
    urlthing = "'" + urlthing + "'";

    var st = decodeURI("用户");
    var str = st;
    var st2 = decodeURI("权限修改请求");
    var str2 = st2;
    var st3 = decodeURI("事由");
    var str3 = st3;
    var txt = "bas12|" + str + "|" + urlname + "|" + urlage + "|" + urlusername + "|" + urlpassword + "|" + urlphone + "|" + str2 + "|" + urlpower + "|" + str3 + "|" + urlthing;
    txt = aesEncrypt(txt);
    //str + "|name=" + urlname + ",age=" + urlage + ",username=" + urlusername + ",password=" + urlpassword + ",phone=" + urlphone + "," + str2 + "=" + urlpower + "," + str3 + "=" + urlthing + "|is_login=1";
    var url_save = "http://localhost:56461/Service1.svc/IN?jsoncallback=?&txt=" + txt;
    console.log(url_save);
    xmlHttp.open("GET", url_save, true);
    xmlHttp.send();
});

module.exports = router;