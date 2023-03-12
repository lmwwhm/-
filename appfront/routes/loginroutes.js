// 引入包express swig fs MySQL
const express = require("express");
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var router = express.Router();


router.get('/in', function (req, res) {
    console.log("i an coming");
    var name = decodeURI(req.query.name);
    var password = req.query.password;
    var rot = req.query.rot;
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
            if (result == "Root") {
                res.send("Root");
            }
            else if (result == "True") {
                res.send("True");
            }
            else {
                res.send("用户名或密码错误");
            }
        }
    }
    var urlname = encodeURI(name);
    urlname = "'" + urlname + "'";
    var urlpassword = "'" + password + "'";
    console.log(urlname);

    var url_login;
    if (rot == 1) url_login = "http://localhost:56461/Service1.svc/LOGIN?jsoncallback=?&username=" + urlname + "&password=" + urlpassword;
    else url_login = "http://localhost:56461/Service1.svc/LOGIN2?jsoncallback=?&username=" + urlname + "&password=" + urlpassword;
    console.log(url_login);
    xmlHttp.open("GET", url_login, true);
    xmlHttp.send();
});

module.exports = router;