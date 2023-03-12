function diary_update() {

    var date;
    var dowhat = document.getElementById("dowhat").value;
    var id = ReadCookie("id");
    if ($("#date").val() == "") {
        alert("请输入时间")
    }
    if (dowhat == "") {
        alert("请输入日记内容")
    }

    date = $("#date").val();

    var xmlHttp;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            if (String(xmlHttp.responseText) == "True") {
                alert("修改成功");
            }
            else {
                alert(String(xmlHttp.responseText));
            }
        }

    }
    var str1 = encodeURI(date);
    var str3 = encodeURI(dowhat);
    var url = "/diary_update/diary_update?date=" + str1 + "&dowhat=" + str3 + "&id=" + id;
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    return false;
}