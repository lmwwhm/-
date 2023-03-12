function cook(x) {
    document.cookie = "";
    var id = x.cells[1].innerText;
    var name = x.cells[2].innerText;
    var phone = x.cells[3].innerText;

    SetCookie("id", id, 1);
    SetCookie("name", name, 1);
    SetCookie("phone", phone, 1);

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

function member() {
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
                    if (data[i].状态 == 0) data[i].状态 = "未完成";
                    if (data[i].状态 == 1) data[i].状态 = "已完成";
                    var td = document.createElement('td'); //新建td
                    td.innerHTML = data[i][k]; //将对象数据写进td中
                    tr.appendChild(td);
                }
                var td = document.createElement('td'); //新建td
                td.innerHTML = "<td><a title='编辑' onclick='cook(this.parentNode.parentNode);xadmin.open(\"修改管理员信息\", \"./member_update.html\", 800, 380)'><i class='layui-icon'>&#xe642;</i></a><a title='删除' onclick='member_del(this)' style='text-decoration:none'><i class='layui-icon'>&#xe640;</i></a></td>";
                tr.appendChild(td);
            }
        }

    }

    var str1 = encodeURI(name);
    var url = "/member/member?name=" + str1;
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    return false;
}

