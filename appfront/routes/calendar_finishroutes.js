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
router.get('/calendar_finish', function (req, res) {

    var id = req.query.id;


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


    var st1 = decodeURI("日程");
    var str1 = st1;
    var st2 = decodeURI("状态");
    var str2 = st2;

    var txt = "cal3|" + str1 + "|" + str2 + "|" + id;
    txt = aesEncrypt(txt);
    //str1 + "|" + str2 + "=1|id=" + id;

    var url_save = "http://localhost:56461/Service1.svc/IN?jsoncallback=?&txt=" + txt;
    console.log(url_save);
    xmlHttp.open("GET", url_save, true);
    xmlHttp.send();
});

module.exports = router;