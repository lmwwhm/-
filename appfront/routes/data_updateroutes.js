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
router.get('/data_update', function (req, res) {
    var name = decodeURI(req.query.name);
    var 内容 = decodeURI(req.query.内容);
    var 权限 = decodeURI(req.query.权限);
    var id = req.query.id;

    var xmlHttp;
    xmlHttp = new XMLHttpRequest();
    console.log("data_update is coming");
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
    urlname = "'" + urlname + "',";
    var urln = 内容;
    urln = "'" + urln + "'";
    var urlq = 权限;
    urlq = "'" + urlq + "'";

    var st1 = decodeURI("information");
    var str1 = st1;
    var st2 = decodeURI("文件名=");
    var str2 = st2;
    var st3 = decodeURI("内容=");
    var str3 = st3;
    var st4 = decodeURI("权限=");
    var str4 = st4;
    //var sql = str1 + "|(id,date,todo,deadline," + str2 + ")|SELECT (SELECT (MAX(id)+1) from " + str1 + ")," + urlstart + urltodo + urlend + "'0' from " + str1 + " where id=(select max(id) from " + str1 + ")" + "|B";
    var txt = "dat4|" + str1 + "|" + str2 + "|" + urlname + "|" + str3 + "|" + urlphone + "|" + str4 + "|" + urlq + "|" + id;
    txt = aesEncrypt(txt);
    //str1 + "|" + str2 + urlname + str3 + urlphone + str4 + urlq + "|id=" + id;

    var url = "http://localhost:56461/Service1.svc/IN?jsoncallback=?&txt=" + txt;
    console.log(url);
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
});

module.exports = router;