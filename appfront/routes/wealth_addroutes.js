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
router.get('/wealth_add', function (req, res) {
    var inwealth = decodeURI(req.query.inwealth);
    var outwealth = decodeURI(req.query.outwealth);
    var time = decodeURI(req.query.time);
    var dowhat = decodeURI(req.query.dowhat);
    var 类型 = decodeURI(req.query.类型);
    var xmlHttp;
    xmlHttp = new XMLHttpRequest();
    console.log("wealth_add is coming");
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
    var urlin = inwealth;
    urlin = "'" + urlin + "',";
    var urlout = outwealth;
    urlout = "'" + urlout + "',";
    var urltime = time;
    urltime = "'" + urltime + "',";
    var urldowhat = dowhat;
    urldowhat = "'" + urldowhat + "',";
    var urllei = 类型;
    urllei = "'" + urllei + "'";

    var st1 = decodeURI("财务");
    var str1 = st1;

    var st2 = decodeURI("类型");
    var str2 = st2;
    var txt = "wea1|" + str1 + "|" + str2 + "|" + urlin + "|" + urlout + "|" + urltime + "|" + urldowhat + "|" + urllei;
    txt = aesEncrypt(txt);
    //str1 + "|(income,outcome,time,dowhat," + str2 + ")|(" + urlin + urlout + urltime + urldowhat + urllei + ")|A";

    var url = "http://localhost:56461/Service1.svc/IN?jsoncallback=?&txt=" + txt;
    console.log(url);
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
});

module.exports = router;