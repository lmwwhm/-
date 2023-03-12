function book_del(node) {
    console.log(node);
    var x = node.parentNode.parentNode;
    console.log(x);

    var id = x.cells[1].innerText;
    var xmlHttp;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            if (String(xmlHttp.responseText) == "True") {
                alert("删除成功");
            }
            else {
                alert(String(xmlHttp.responseText));
            }
        }
    }
    var url = "/book_del/book_del?id=" + id;
    console.log(url);
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
}