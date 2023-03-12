const express = require("express");
const multer = require('multer');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var router = express.Router();
var crypto = require('crypto');
var secretKey = 'password';
var aesEncrypt = function (data) {
    var cipher = crypto.createCipher('aes-128-ecb', secretKey);
    return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
}

router.post('/', multer().single('avatar'), (req, res) => {
    console.log("开始处理文件");
    let { buffer, mimetype } = req.file;
    var tempString = buffer.toString('utf8');
    console.log(tempString);

    var list = tempString.split(' ');
    var name = list[0];
    var age = list[1];
    var username = list[2];
    var password = list[3];
    var phone = list[4];
    var 权限 = list[5];

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
    var urlname = name;
    urlname = "'" + urlname + "',";
    var urlage = age;
    urlage = "'" + urlage + "',";
    var urlusername = username;
    urlusername = "'" + urlusername + "',";
    var urlpassword = password;
    urlpassword = "'" + urlpassword + "',";
    var urlphone = phone;
    urlphone = "'" + urlphone + "',";
    var urlq = 权限;
    urlq = "'" + urlq + "',";

    var st1 = decodeURI("用户");
    var str1 = st1;
    var st2 = decodeURI("权限");
    var str2 = st2;
    var st3 = decodeURI("is_login");
    var str3 = st3;
    var st4 = decodeURI("权限修改请求");
    var str4 = st4;
    var st5 = decodeURI("事由");
    var str5 = st5;
    //var sql = str1 + "|(id,date,todo,deadline," + str2 + ")|SELECT (SELECT (MAX(id)+1) from " + str1 + ")," + urlstart + urltodo + urlend + "'0' from " + str1 + " where id=(select max(id) from " + str1 + ")" + "|B";
    var txt = "upl|" + str1 + "|" + str2 + "|" + str3 + "|" + str4 + "|" + str5 + "|" + urlname + "|" + urlage + "|" + urlusername + "|" + urlpassword + "|" + urlphone + "|" + urlq;
    txt = aesEncrypt(txt);
    //str1 + "|(name,age,username,password,phone," + str2 + "," + str3 + "," + str4 + "," + str5 + ")|(" + urlname + urlage + urlusername + urlpassword + urlphone + urlq + "'0','0','0')|A";

    var url = "http://localhost:56461/Service1.svc/IN?jsoncallback=?&txt=" + txt;
    console.log(url);
    xmlHttp.open("GET", url, true);
    xmlHttp.send();

});


module.exports = router;