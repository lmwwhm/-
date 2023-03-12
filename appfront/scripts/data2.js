function cook(x) {
    document.cookie = "";
    var id = x.cells[1].innerText;
    var name = x.cells[2].innerText;
    var 内容 = x.cells[3].innerText;
    var 权限 = x.cells[4].innerText;
    SetCookie("id", id, 1);
    SetCookie("name", name, 1);
    SetCookie("内容", 内容, 1);
    SetCookie("权限", 权限, 1);
}
function SetCookie(cookieName, cookieValue, nDays) {
    /*当前日期*/
    var today = new Date();
    /*Cookie过期时间*/
    var expire = new Date();
    /*如果未设置nDays参数或者nDays为0，取默认值1*/
    if (nDays == null || nDays == 0) {
        nDays = 1;
    }
    /*计算Cookie过期时间*/
    expire.setTime(today.getTime() + 10000 * nDays);
    /*设置Cookie值*/
    document.cookie = cookieName + "=" + escape(cookieValue) + ";expires=" + expire.toGMTString();
}
function ReadCookie(cookieName) {
    var theCookie = "" + document.cookie;
    var ind = theCookie.indexOf(cookieName);
    if (ind == -1 || cookieName == "") {
        return ""
    };
    var ind1 = theCookie.indexOf(';', ind);
    if (ind1 == -1) {
        ind1 = theCookie.length;
    };
    /*读取Cookie值*/
    return unescape(theCookie.substring(ind + cookieName.length + 1, ind1));
}

function data2() {
    var name = document.getElementById("name").value;
    if (name == "") name = "no input";
    var xmlHttp;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var temData = (this.responseText).replaceAll("name", "name");
            temData = temData.replaceAll("num", "value");
            temData = JSON.parse(temData);
            console.log("aa", temData);
            var initial_data = temData["Rows"];
            console.log("bb", initial_data);
            var data = initial_data;
            $("#table  tr:not(:first)").empty("");
            var sta = document.querySelector('tbody'); //找到tbody标签
            for (var i = 0; i < data.length; i++) {
                var tr = document.createElement('tr');
                sta.appendChild(tr);
                tr.id = i + 1;
                var td = document.createElement('td'); //新建td
                td.innerHTML = "<td><input type='checkbox' name='' lay-skin='primary'></td>";
                tr.appendChild(td);
                for (var k in data[i]) { //对假数据进行遍历
                    var td = document.createElement('td'); //新建td
                    td.innerHTML = data[i][k]; //将对象数据写进td中
                    tr.appendChild(td);
                }
                var td = document.createElement('td'); //新建td
                td.innerHTML = "<td><a title='编辑' onclick='cook(this.parentNode.parentNode);xadmin.open(\"修改文件信息\", \"./data_update2.html\", 800, 380)'><i class='layui-icon'>&#xe642;</i></a></td>";
                tr.appendChild(td);
            }
        }
    }
    var str1 = encodeURI(name);
    var str2 = encodeURI("权限");
    var url = "/data2/data2?name=" + str1 + "&" + str2 + "=" + ReadCookie("用户权限");
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    return false;
}

