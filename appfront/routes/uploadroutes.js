// 引入包express swig fs MySQL
const express = require("express");
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var router = express.Router();
const fs = require("fs")
const path = require("path");
router.post("/xxx", function (req, res) {
    let oldName = req.files[0].path;
    let newName = req.files[0].path + path.parse(req.files[0].originalname).ext;
    fs.renameSync(oldName, newName);
    res.send();
});
module.exports = router;