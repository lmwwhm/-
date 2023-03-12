//导入模板
const multer = require('multer');
const express = require('express');
const mysql = require('mysql');
const app = express();
const path = require("path");
const morgan = require("morgan");
const { request } = require('express');
const cookieParser = require("cookie-parser");
const port = 8000   //本地端口设置
const createError = require("http-errors");

//使用引擎模板

app.set('views', path.join(__dirname, 'views'));
app.set('views2', path.join(__dirname, 'views2'));
app.engine('.html', require('ejs').renderFile);
app.set("view engine", "html");
app.set("view2 engine", "html");

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'views2')));
app.use(express.static(path.join(__dirname, 'scripts')));

var login = require("./routes/loginroutes");
app.use('/login', login);
var register = require("./routes/registerroutes");
app.use('/register', register);

var welcome = require("./routes/welcomeroutes");
app.use('/welcome', welcome);
var welcome2 = require("./routes/welcome2routes");
app.use('/welcome2', welcome2);

var analyze = require("./routes/analyzeroutes");
app.use('/analyze', analyze);

var file_upload = require("./routes/file_uploadroutes");
app.use('/file_upload', file_upload);

var basic_information = require("./routes/basic_informationroutes");
app.use('/basic_information', basic_information);
var basic_information_update = require("./routes/basic_information_updateroutes");
app.use('/basic_information_update', basic_information_update);

var basic_information2 = require("./routes/basic_information2routes");
app.use('/basic_information2', basic_information2);
var basic_information_update2 = require("./routes/basic_information_update2routes");
app.use('/basic_information_update2', basic_information_update2);

var book = require("./routes/bookroutes");
app.use('/book', book);
var book_add = require("./routes/book_addroutes");
app.use('/book_add', book_add);
var book_del = require("./routes/book_delroutes");
app.use('/book_del', book_del);
var book_finish = require("./routes/book_finishroutes");
app.use('/book_finish', book_finish);
var book_update = require("./routes/book_updateroutes");
app.use('/book_update', book_update);

var calendar = require("./routes/calendarroutes");
app.use('/calendar', calendar);
var calendar_add = require("./routes/calendar_addroutes");
app.use('/calendar_add', calendar_add);
var calendar_del = require("./routes/calendar_delroutes");
app.use('/calendar_del', calendar_del);
var calendar_finish = require("./routes/calendar_finishroutes");
app.use('/calendar_finish', calendar_finish);
var calendar_update = require("./routes/calendar_updateroutes");
app.use('/calendar_update', calendar_update);

var diary = require("./routes/diaryroutes");
app.use('/diary', diary);
var diary_add = require("./routes/diary_addroutes");
app.use('/diary_add', diary_add);
var diary_del = require("./routes/diary_delroutes");
app.use('/diary_del', diary_del);
var diary_update = require("./routes/diary_updateroutes");
app.use('/diary_update', diary_update);

var admin = require("./routes/adminroutes");
app.use('/admin', admin);
var admin_add = require("./routes/admin_addroutes");
app.use('/admin_add', admin_add);
var admin_del = require("./routes/admin_delroutes");
app.use('/admin_del', admin_del);
var admin_update = require("./routes/admin_updateroutes");
app.use('/admin_update', admin_update);

var role = require("./routes/roleroutes");
app.use('/role', role);
var role_add = require("./routes/role_addroutes");
app.use('/role_add', role_add);
var role_del = require("./routes/role_delroutes");
app.use('/role_del', role_del);
var role_update = require("./routes/role_updateroutes");
app.use('/role_update', role_update);

var member = require("./routes/memberroutes");
app.use('/member', member);
var member_add = require("./routes/member_addroutes");
app.use('/member_add', member_add);
var member_del = require("./routes/member_delroutes");
app.use('/member_del', member_del);
var member_update = require("./routes/member_updateroutes");
app.use('/member_update', member_update);

var people = require("./routes/peopleroutes");
app.use('/people', people);
var people_add = require("./routes/people_addroutes");
app.use('/people_add', people_add);
var people_del = require("./routes/people_delroutes");
app.use('/people_del', people_del);
var people_update = require("./routes/people_updateroutes");
app.use('/people_update', people_update);

var timetable = require("./routes/timetableroutes");
app.use('/timetable', timetable);
var timetable_add = require("./routes/timetable_addroutes");
app.use('/timetable_add', timetable_add);
var timetable_del = require("./routes/timetable_delroutes");
app.use('/timetable_del', timetable_del);
var timetable_update = require("./routes/timetable_updateroutes");
app.use('/timetable_update', timetable_update);

var wealth = require("./routes/wealthroutes");
app.use('/wealth', wealth);
var wealth_add = require("./routes/wealth_addroutes");
app.use('/wealth_add', wealth_add);
var wealth_del = require("./routes/wealth_delroutes");
app.use('/wealth_del', wealth_del);
var wealth_update = require("./routes/wealth_updateroutes");
app.use('/wealth_update', wealth_update);

var data = require("./routes/dataroutes");
app.use('/data', data);
var data_add = require("./routes/data_addroutes");
app.use('/data_add', data_add);
var data_del = require("./routes/data_delroutes");
app.use('/data_del', data_del);
var data_update = require("./routes/data_updateroutes");
app.use('/data_update', data_update);

var data2 = require("./routes/data2routes");
app.use('/data2', data2);
var data_update2 = require("./routes/data_update2routes");
app.use('/data_update2', data_update2);

var upload = require("./routes/uploadroutes");
app.use('/upload', upload);



/*
*/
// catch 404 and forward to error handler
app.use(function (req, res, next) {

    next(createError(404));
});

// 错误处理
app.use(function (err, req, res, next) {

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
app.listen(port, () => console.log('server running at:', port))



/*const fs = require("fs");

app.listen(8000, "localhost", () => {
    console.log("已经监听8000端口");
});

let objMulter = multer({ dest: "./public/images" }); //实例化multer，传递的参数对象，dest表示上传文件的存储路径
app.use(objMulter.any()); //any表示任意类型的文件
// app.use(objMulter.image())//仅允许上传图片类型

app.use(express.static("./public"));
//app.use(express.static("./views"));


*/
