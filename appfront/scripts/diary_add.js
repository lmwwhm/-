function diary_add() {

    var date;
    var dowhat = document.getElementById("dowhat").value;
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
                alert("插入成功");
            }
            else {
                alert(String(xmlHttp.responseText));
            }
        }

    }
    var str1 = encodeURI(date);
    var str2 = encodeURI(dowhat);
    var url = "/diary_add/diary_add?date=" + str1 + "&dowhat=" + str2;
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    return false;
}