function calendar_finish(node) {

    var x = node.parentNode.parentNode;
    console.log(x);
    var id = x.cells[1].innerText;

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

    var url = "/calendar_finish/calendar_finish?id=" + id;
    xmlHttp.open("GET", url, true);
    xmlHttp.send();

}