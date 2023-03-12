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
router.get('/calendar_add', function (req, res) {
    var start = decodeURI(req.query.start);
    var end = decodeURI(req.query.end);
    var todo = decodeURI(req.query.todo);

    var xmlHttp;
    xmlHttp = new XMLHttpRequest();
    console.log("calendar_add is coming");
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
    var urlstart = start;
    urlstart = "'" + urlstart + "',";
    var urlend = end;
    urlend = "'" + urlend + "',";
    var urltodo = todo;
    urltodo = "'" + urltodo + "',";

    var st1 = decodeURI("日程");
    var str1 = st1;
    var st2 = decodeURI("状态");
    var str2 = st2;
    console.log(start);

    //var sql = str1 + "|(id,date,todo,deadline," + str2 + ")|SELECT (SELECT (MAX(id)+1) from " + str1 + ")," + urlstart + urltodo + urlend + "'0' from " + str1 + " where id=(select max(id) from " + str1 + ")" + "|B";
    var txt = "cal1|" + "|" + str1 + "|" + str2 + "|" + urlstart + "|" + urltodo + "|" + urlend;
    txt = aesEncrypt(txt);
    //str1 + "|(date,todo,deadline," + str2 + ")|(" + urlstart + urltodo + urlend + "'0')|A";



    var url = "http://localhost:56461/Service1.svc/IN?jsoncallback=?&txt=" + txt;
    console.log(url);
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
});

module.exports = router;