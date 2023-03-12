function book_add() {

    var name = document.getElementById("name").value;
    var plan = document.getElementById("plan").value;

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
    var str1 = encodeURI(name);
    var str2 = encodeURI(plan);
    var url = "/book_add/book_add?name=" + str1 + "&plan=" + str2;
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    return false;
}