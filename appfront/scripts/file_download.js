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

function file_download() {

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

            var csv = 'ID,姓名,年龄,用户名,电话,权限,权限修改请求,事由\n';
            for (var i = 0; i < data.length; i++) {
                for (var k in data[i]) {
                    if (data[i][k] != "" && data[i][k] != undefined ) csv += data[i][k];
                    //else csv += " ";
                    csv += ",";
                }
                
                csv += "\n";
            }
            console.log(csv);
            var a = document.createElement('a');
            a.href = 'data:text/txt;charset=utf-8,\ufeff' + encodeURIComponent(csv);
            a.download = '人员.csv';
            a.click(); //直接用click模拟

        }

    }

    var str1 = encodeURI(username);
    var url = "/role/role?username=" + str1;
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    return false;
}



/*function file_download() {

	var x = document.querySelector('tbody'); //找到tbody标签
	var csv = 'ID,姓名,年龄,用户名,电话,权限,权限修改请求,事由\n';
	for (var i = 0; i < x.childNodes.length-1; i++) {
		for (var k = 1; k < 8; k++) {
			console.log(x.children[i].children[k].innerHTML);
			if (x.children[i].children[k] != "") csv += x.children[i].children[k].innerHTML;
			else csv += " ";
			csv += ",";
		}
		csv += x.children[i].children[8].innerHTML;
		csv += "\n";
	}
	console.log(csv);
	var a = document.createElement('a');
	a.href = 'data:text/txt;charset=utf-8,\ufeff' + encodeURIComponent(csv);
	a.download = '人员.csv';
	a.click(); //直接用click模拟
}*/
