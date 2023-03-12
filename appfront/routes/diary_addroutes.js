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
router.get('/diary_add', function (req, res) {
    var date = decodeURI(req.query.date);
    var dowhat = decodeURI(req.query.dowhat);

    var xmlHttp;
    xmlHttp = new XMLHttpRequest();
    console.log("diary_add is coming");
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
    var urldate = date;
    urldate = "'" + urldate + "',";
    var urldowhat = dowhat;
    urldowhat = "'" + urldowhat + "'";

    var st1 = decodeURI("日记");
    var str1 = st1;
    var txt = "dir1|" + str1 + "|" + urldate + "|" + urldowhat;
    txt = aesEncrypt(txt);
    //str1 + "|(date,dowhat)|(" + urldate + urldowhat + ")|A";

    var url = "http://localhost:56461/Service1.svc/IN?jsoncallback=?&txt=" + txt;
    console.log(url);
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
});

module.exports = router;