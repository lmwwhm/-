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
router.get('/timetable_update', function (req, res) {
    var name = decodeURI(req.query.timedur);
    var phone = decodeURI(req.query.todo);
    var id = req.query.id;

    var xmlHttp;
    xmlHttp = new XMLHttpRequest();
    console.log("member_update is coming");
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
    var urlphone = phone;
    urlphone = "'" + urlphone + "'";

    var st1 = decodeURI("作息表");
    var str1 = st1;

    //var sql = str1 + "|(id,date,todo,deadline," + str2 + ")|SELECT (SELECT (MAX(id)+1) from " + str1 + ")," + urlstart + urltodo + urlend + "'0' from " + str1 + " where id=(select max(id) from " + str1 + ")" + "|B";
    var txt = "ti3|" + str1 + "|" + urlname + "|" + urlphone + "|" + id;
    txt = aesEncrypt(txt);
    //str1 + "|timedur=" + urlname + "todo=" + urlphone + "|id=" + id;

    var url = "http://localhost:56461/Service1.svc/IN?jsoncallback=?&txt=" + txt;
    console.log(url);
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
});

module.exports = router;