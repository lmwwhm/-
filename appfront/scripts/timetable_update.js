function timetable_update() {

    var timedur = document.getElementById("timedur").value;
    var todo = document.getElementById("todo").value;
    var id = ReadCookie("id");

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
    var str1 = encodeURI(timedur);
    var str4 = encodeURI(todo);
    var url = "/timedur_update/timedur_update?timedur=" + str1 + "&todo=" + str4 + "&id=" + id;
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    return false;
}