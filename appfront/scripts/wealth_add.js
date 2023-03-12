function wealth_add() {

    var time;
    var inwealth = document.getElementById("inwealth").value;
    var outwealth = document.getElementById("outwealth").value;
    var dowhat = document.getElementById("dowhat").value;
    var 类型 = document.getElementById("类型").value;
    if ($("#time").val() == "") {
        alert("请输入时间")
    }
    if (dowhat == "") {
        alert("请输入日记内容")
    }

    time = $("#time").val();

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
    var str1 = encodeURI(inwealth);
    var str2 = encodeURI(outwealth);
    var str3 = encodeURI(time);
    var str4 = encodeURI(dowhat);
    var str5 = encodeURI(类型);
    var url = "/wealth_add/wealth_add?inwealth=" + str1 + "&outwealth=" + str2 + "&time=" + str3 + "&dowhat=" + str4 + "&类型=" + str5;
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    return false;
}