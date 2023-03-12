function cook(x) {
    document.cookie = "";
    var id = x.cells[1].innerText;
    var name = x.cells[2].innerText;
    var age = x.cells[3].innerText;
    var username = x.cells[4].innerText;
    var phone = x.cells[5].innerText;
    var 权限 = x.cells[6].innerText;
    var 权限修改请求 = x.cells[7].innerText;
    var 事由 = x.cells[8].innerText;

    SetCookie("id", id, 1);
    SetCookie("name", name, 1);
    SetCookie("age", age, 1);
    SetCookie("username", username, 1);
    SetCookie("phone", phone, 1);
    SetCookie("权限", 权限, 1);
    SetCookie("权限修改请求", 权限修改请求, 1);
    SetCookie("事由", 事由, 1);
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

function role() {

    var username = document.getElementById("username").value;
    if (username == "") username = "no input";
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
                td.innerHTML = "<td><a title='编辑' onclick='cook(this.parentNode.parentNode);xadmin.open(\"修改人员信息\", \"./role_update.html\", 800, 500)'><i class='layui-icon'>&#xe642;</i></a><a title='删除' onclick='role_del(this)' style='text-decoration:none'><i class='layui-icon'>&#xe640;</i></a></td>";
                tr.appendChild(td);
            }
        }

    }

    var str1 = encodeURI(username);
    var url = "/role/role?username=" + str1;
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    return false;
}

