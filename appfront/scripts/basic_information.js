function basic_information() {
    var xmlHttp;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var temData = (this.responseText).replaceAll("name", "name");
            temData = temData.replaceAll("num", "value");
            temData = JSON.parse(temData);
            console.log("aa", temData);
            var initial_data = temData["Rows"];
            console.log("bb", initial_data);

            var x1 = initial_data[0].name;
            document.getElementById('x1').value = x1;
            var x2 = initial_data[0].age;
            document.getElementById('x2').value = x2;
            var x3 = initial_data[0].username;
            document.getElementById('x3').value = x3;
            var x4 = initial_data[0].password;
            document.getElementById('x4').value = x4;
            var x5 = initial_data[0].phone;
            document.getElementById('x5').value = x5;
            var x6 = initial_data[0].权限;
            document.getElementById('x6').value = x6;
        }
    }
    var url = "/basic_information/basic_information";
    console.log(url);
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
}