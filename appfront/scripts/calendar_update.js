function calendar_update() {

    var start;
    var end;
    var todo = document.getElementById("todo").value;
    var fini = document.getElementById("finished").value;
    var id = ReadCookie("id");
    if ($("#start_time").val() == "") {
        alert("请输入开始时间")
    }
    if ($("#end_time").val() == "") {
        alert("请输入截止时间")
    }
    if (todo == "") {
        alert("请输入日程内容")
    }
    if (fini == "") {
        alert("请输入状态")
    }
    start = $("#start_time").val();
    end = $("#end_time").val();
    console.log(id);
    console.log(start);
    console.log(end);
    console.log(todo);

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
    var str1 = encodeURI(start);
    var str2 = encodeURI(end);
    var str3 = encodeURI(todo);
    var str4 = encodeURI(fini);
    var url = "/calendar_update/calendar_update?start=" + str1 + "&end=" + str2 + "&todo=" + str3 + "&fini=" + str4 + "&id=" + id;
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    return false;
}