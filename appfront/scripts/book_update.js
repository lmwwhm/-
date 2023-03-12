function book_update() {

    var name = document.getElementById("name").value;
    var plan = document.getElementById("plan").value;
    var fini = document.getElementById("finished").value;
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
    var str1 = encodeURI(name);
    var str2 = encodeURI(plan);
    var str4 = encodeURI(fini);
    var url = "/book_update/book_update?name=" + str1 + "&plan=" + str2 + "&fini=" + str4 + "&id=" + id;
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    return false;
}