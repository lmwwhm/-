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
router.get('/timetable_add', function (req, res) {
    var timedur = decodeURI(req.query.timedur);
    var todo = decodeURI(req.query.todo);

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
                res.send("插入失败");
            }
        }
    }
    var urlname = timedur;
    urlname = "'" + urlname + "',";
    var urlphone = todo;
    urlphone = "'" + urlphone + "'";

    var st1 = decodeURI("作息表");
    var str1 = st1;
    //var sql = str1 + "|(id,date,todo,deadline," + str2 + ")|SELECT (SELECT (MAX(id)+1) from " + str1 + ")," + urlstart + urltodo + urlend + "'0' from " + str1 + " where id=(select max(id) from " + str1 + ")" + "|B";
    var txt = "ti1|" + str1 + "|" + urlname + "|" + urlphone;
    txt = aesEncrypt(txt);
    //str1 + "|(timedur,todo)|(" + urlname + urlphone + ")|A";  

    var url = "http://localhost:56461/Service1.svc/IN?jsoncallback=?&txt=" + txt;
    console.log(url);
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
});

module.exports = router;