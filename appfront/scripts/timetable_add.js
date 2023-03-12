function timetable_add() {

    var timedur = document.getElementById("timedur").value;
    var todo = document.getElementById("todo").value;

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
    var str1 = encodeURI(timedur);
    var str5 = encodeURI(todo);
    var url = "/timetable_add/timetable_add?timedur=" + str1 + "&todo=" + str5;
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    return false;
}