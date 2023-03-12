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
router.get('/book_update', function (req, res) {
    var name = decodeURI(req.query.name);
    var plan = decodeURI(req.query.plan);
    var fini = decodeURI(req.query.fini);
    if (fini == "未完成") fini = 0;
    if (fini == "已完成") fini = 1;
    var id = req.query.id;

    var xmlHttp;
    xmlHttp = new XMLHttpRequest();
    console.log("book_update is coming");
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
    var urlplan = plan;
    urlplan = "'" + urlplan + "',";
    var urlfini = fini;
    urlfini = "'" + urlfini + "'";

    var st1 = decodeURI("读书计划");
    var str1 = st1;
    var st2 = decodeURI("状态");
    var str2 = st2;
    console.log(start);

    //var sql = str1 + "|(id,date,todo,deadline," + str2 + ")|SELECT (SELECT (MAX(id)+1) from " + str1 + ")," + urlstart + urltodo + urlend + "'0' from " + str1 + " where id=(select max(id) from " + str1 + ")" + "|B";
    var txt = "bo4|" + str1 + "|" + urlname + "|" + urlplan + "|" + str2 + "|" + urlfini + "|" + id;
    txt = aesEncrypt(txt);
    //str1 + "|name=" + urlname + "plan=" + urlplan + str2 + "=" + urlfini + "|id=" + id;

    var url = "http://localhost:56461/Service1.svc/IN?jsoncallback=?&txt=" + txt;
    console.log(url);
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
});

module.exports = router;