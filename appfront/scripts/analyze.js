var x1, x2, x3, x4, x5, x6, y1, y2, y3, y4, y5, y6, y7, y8, y9, y10;
var a1 = [], a2 = [], a3 = [], a4 = [];
var b1 = [], b2 = [], b3 = [], b4 = [];
var inputmonth, inputyear;
var daypmonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function chart1() {
    var xmlHttp;
    var da = new Date();
    console.log(inputmonth);
    if (inputmonth == "") inputmonth = da.getMonth() + 1, inputmonth = inputmonth.toString();
    x1 = 0, x2 = 0, x3 = 0, x4 = 0, x5 = 0, x6 = 0;
    y1 = 0, y2 = 0, y3 = 0, y4 = 0, y5 = 0, y6 = 0, y7 = 0, y8 = 0, y9 = 0, y10 = 0;
    
    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var temData = (this.responseText).replaceAll("name", "name");
            temData = temData.replaceAll("num", "value");
            temData = JSON.parse(temData);
            console.log("aa", temData);
            var initial_data = temData["Rows"];
            console.log("chart1", initial_data);
            var data = initial_data;
            for (var i = 0; i < data.length; i++) {
                if (month(data[i]["time"]) == inputmonth) {
                    if (data[i]["类型"] == "生活费") x1 = x1 + parseInt(data[i]["income"]);
                    if (data[i]["类型"] == "红包" && data[i]["income"] != "0") x2 = x2 + parseInt(data[i]["income"]);
                    if (data[i]["类型"] == "补助") x3 = x3 + parseInt(data[i]["income"]);
                    if (data[i]["类型"] == "工资") x4 = x4 + parseInt(data[i]["income"]);
                    if (data[i]["类型"] == "利息") x5 = x5 + parseInt(data[i]["income"]);
                    if (data[i]["类型"] == "其他收入") x6 = x6 + parseInt(data[i]["income"]);

                    if (data[i]["类型"] == "餐饮") y1 = y1 + parseInt(data[i]["outcome"]);
                    if (data[i]["类型"] == "交通") y2 = y2 + parseInt(data[i]["outcome"]);
                    if (data[i]["类型"] == "服饰") y3 = y3 + parseInt(data[i]["outcome"]);
                    if (data[i]["类型"] == "日用") y4 = y4 + parseInt(data[i]["outcome"]);
                    if (data[i]["类型"] == "娱乐") y5 = y5 + parseInt(data[i]["outcome"]);
                    if (data[i]["类型"] == "学习") y6 = y6 + parseInt(data[i]["outcome"]);
                    if (data[i]["类型"] == "医疗") y7 = y7 + parseInt(data[i]["outcome"]);
                    if (data[i]["类型"] == "旅游") y8 = y8 + parseInt(data[i]["outcome"]);
                    if (data[i]["类型"] == "红包" && data[i]["outcome"] != "0") y9 = y9 + parseInt(data[i]["outcome"]);
                    if (data[i]["类型"] == "其他支出") y10 = y10 + parseInt(data[i]["outcome"]);
                }
                
            }
        }
    }
    var url = "/analyze/analyze?id=1";
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    return false;
}
function mGetDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var d = new Date(year, month, 0);
    return d.getDate();
}
function day(x) {
    //2022 / 12 / 6 6: 31: 39
    var list = x.split('/');
    var ans = "";
    list = list[2].split(" ");
    ans = ans + list[0];
    return ans;
}
function month(x) {
    //2022 / 12 / 6 6: 31: 39
    var list = x.split('/');
    var ans = "";
    ans = ans + list[1];
    return ans;
}
function year(x) {
    //2022 / 12 / 6 6: 31: 39
    var list = x.split('/');
    var ans = "";
    ans = ans + list[0];
    return ans;
}
function chart2() {
    var mon = daypmonth[parseInt(inputmonth) - 1];//input的月份有多少天
    for (var i = 0; i < mon; i++) {
        a2[i] = 0;
        a3[i] = 0;
        a4[i] = 0;
        a1[i] = "";
        a1[i] = a1[i] + inputmonth + "月\n" + (i + 1) + "号";
    }
    var xmlHttp;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var temData = (this.responseText).replaceAll("name", "name");
            temData = temData.replaceAll("num", "value");
            temData = JSON.parse(temData);
            console.log("aa", temData);
            var initial_data = temData["Rows"];
            console.log("chart2", initial_data);
            var data = initial_data;

            for (var j = 0; j < data.length; j++) {
                if (month(data[j]["time"]) == inputmonth && year(data[j]["time"]) == inputyear) {

                    a2[day(data[j]["time"])-1] += parseInt(data[j]["income"]);
                    a3[day(data[j]["time"])-1] += parseInt(data[j]["outcome"]);
                    a4[day(data[j]["time"])-1] = a4[day(data[j]["time"])-1] + parseInt(data[j]["income"]) - parseInt(data[j]["outcome"]);
                }
            }
            for (var i = 0; i < mon; i++) {
                a2[i] = a2[i].toString();
                a3[i] = a3[i].toString();
                a4[i] = a4[i].toString();
            }
        }
    }
    var url = "/analyze/analyze?id=1";
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    return false;
}
function chart3() {
    var mon = 12;
    for (var i = 0; i < mon; i++) {
        b2[i] = 0;
        b3[i] = 0;
        b4[i] = 0;
        b1[i] = "";
        b1[i] = b1[i] + (i + 1) + "月";
    }
    var xmlHttp;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var temData = (this.responseText).replaceAll("name", "name");
            temData = temData.replaceAll("num", "value");
            temData = JSON.parse(temData);
            console.log("aa", temData);
            var initial_data = temData["Rows"];
            console.log("chart2", initial_data);
            var data = initial_data;

            for (var j = 0; j < data.length; j++) {
                if (year(data[j]["time"]) == inputyear) {
                    b2[month(data[j]["time"])-1] += parseInt(data[j]["income"]);
                    b3[month(data[j]["time"])-1] += parseInt(data[j]["outcome"]);
                    b4[month(data[j]["time"])-1] = b4[month(data[j]["time"])-1] + parseInt(data[j]["income"]) - parseInt(data[j]["outcome"]);
                }
            }
            for (var i = 0; i < mon; i++) {
                b2[i] = b2[i].toString();
                b3[i] = b3[i].toString();
                b4[i] = b4[i].toString();
            }
        }
    }
    var url = "/analyze/analyze?id=1";
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    return false;
}

chart1();
chart2();
chart3();
function analyze() {
    inputmonth = document.getElementById("month").value;
    inputyear = document.getElementById("year").value;
    ceshis1();
    ceshis2();
    ceshis3();
    ceshis4();

    function ceshis1() {
        var myChart = echarts.init(document.getElementById('chart1'));
        var ydata = [
            {
                name: '生活费',
                value: x1
            },
            {
                name: '红包',
                value: x2
            },
            {
                name: '补助',
                value: x3
            },
            {
                name: '工资',
                value: x4
            },
            {
                name: '利息',
                value: x5
            },
            {
                name: '其他收入',
                value: x6
            },
        ];
        var color = ["#8d7fec", "#5085f2", "#e75fc3", "#f87be2", "#f2719a", "#fca4bb"]
        var xdata = ['生活费', "红包", "补助", "工资", '利息', '其他收入'];


        option = {
            /*backgroundColor: "rgba(255,255,255,1)",*/
            color: color,
            legend: {
                orient: "vartical",
                x: "left",
                top: "center",
                left: "53%",
                bottom: "0%",
                data: xdata,
                itemWidth: 8,
                itemHeight: 8,
                textStyle: {
                    color: '#000'
                },
                /*itemGap: 16,*/
                /*formatter:function(name){
                  var oa = option.series[0].data;
                  var num = oa[0].value + oa[1].value + oa[2].value + oa[3].value+oa[4].value + oa[5].value + oa[6].value + oa[7].value+oa[8].value + oa[9].value ;
                  for(var i = 0; i < option.series[0].data.length; i++){
                      if(name==oa[i].name){
                          return ' '+name + '    |    ' + oa[i].value + '    |    ' + (oa[i].value/num * 100).toFixed(2) + '%';
                      }
                  }
                }*/

                formatter: function (name) {
                    return '' + name
                }
            },
            series: [{
                type: 'pie',
                clockwise: false, //饼图的扇区是否是顺时针排布
                minAngle: 2, //最小的扇区角度（0 ~ 360）
                radius: ["20%", "60%"],
                center: ["30%", "45%"],
                avoidLabelOverlap: false,
                itemStyle: { //图形样式
                    normal: {
                        borderColor: '#ffffff',
                        borderWidth: 1,
                    },
                },
                label: {
                    normal: {
                        show: false,
                        position: 'center',
                        formatter: '{text|{b}}\n{c} ({d}%)',
                        rich: {
                            text: {
                                color: "#000",
                                fontSize: 14,
                                align: 'center',
                                verticalAlign: 'middle',
                                padding: 8
                            },
                            value: {
                                color: "#8693F3",
                                fontSize: 24,
                                align: 'center',
                                verticalAlign: 'middle',
                            },
                        }
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: 24,
                        }
                    }
                },
                data: ydata
            }]
        };
        myChart.setOption(option);

        setTimeout(function () {
            myChart.on('mouseover', function (params) {
                if (params.name == ydata[0].name) {
                    myChart.dispatchAction({
                        type: 'highlight',
                        seriesIndex: 0,
                        dataIndex: 0
                    });
                } else {
                    myChart.dispatchAction({
                        type: 'downplay',
                        seriesIndex: 0,
                        dataIndex: 0
                    });
                }
            });

            myChart.on('mouseout', function (params) {
                myChart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: 0
                });
            });
            /*myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: 0
            });*/
        }, 1000);

        myChart.currentIndex = -1;

        /*setInterval(function () {
            var dataLen = option.series[0].data.length;

            // 取消之前高亮的图形
            myChart.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: myChart.currentIndex
            });
            myChart.currentIndex = (myChart.currentIndex + 1) % dataLen;
            // 高亮当前图形
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: myChart.currentIndex
            });
        }, 1000);*/

        // 使用刚指定的配置项和数据显示图表。
        /*myChart.setOption(option);*/
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }
    function ceshis2() {
        var myChart = echarts.init(document.getElementById('chart2'));

        var ydata = [
            {
                name: '餐饮',
                value: y1
            },
            {
                name: '交通',
                value: y2
            },
            {
                name: '服饰',
                value: y3
            },
            {
                name: '日用',
                value: y4
            },
            {
                name: '娱乐',
                value: y5
            },
            {
                name: '学习',
                value: y6
            },
            {
                name: '医疗',
                value: y7
            },
            {
                name: '旅游',
                value: y8
            },
            {
                name: '红包',
                value: y9
            },
            {
                name: '其他支出',
                value: y10
            },
        ];
        var color = ["#8d7fec", "#5085f2", "#e75fc3", "#f87be2", "#f2719a", "#fca4bb", "#f59a8f", "#fdb301", "#57e7ec", "#cf9ef1"]
        var xdata = ['餐饮', "交通", "服饰", "日用", '娱乐', '学习', '医疗', '旅游', '红包', '其他支出'];


        option = {
            /*backgroundColor: "rgba(255,255,255,1)",*/
            color: color,
            legend: {
                orient: "vartical",
                x: "left",
                top: "center",
                left: "53%",
                bottom: "0%",
                data: xdata,
                itemWidth: 8,
                itemHeight: 8,
                textStyle: {
                    color: '#000'
                },
                /*itemGap: 16,*/
                /*formatter:function(name){
                  var oa = option.series[0].data;
                  var num = oa[0].value + oa[1].value + oa[2].value + oa[3].value+oa[4].value + oa[5].value + oa[6].value + oa[7].value+oa[8].value + oa[9].value ;
                  for(var i = 0; i < option.series[0].data.length; i++){
                      if(name==oa[i].name){
                          return ' '+name + '    |    ' + oa[i].value + '    |    ' + (oa[i].value/num * 100).toFixed(2) + '%';
                      }
                  }
                }*/

                formatter: function (name) {
                    return '' + name
                }
            },
            series: [{
                type: 'pie',
                clockwise: false, //饼图的扇区是否是顺时针排布
                minAngle: 2, //最小的扇区角度（0 ~ 360）
                radius: ["20%", "60%"],
                center: ["30%", "45%"],
                avoidLabelOverlap: false,
                itemStyle: { //图形样式
                    normal: {
                        borderColor: '#ffffff',
                        borderWidth: 1,
                    },
                },
                label: {
                    normal: {
                        show: false,
                        position: 'center',
                        formatter: '{text|{b}}\n{c} ({d}%)',
                        rich: {
                            text: {
                                color: "#000",
                                fontSize: 14,
                                align: 'center',
                                verticalAlign: 'middle',
                                padding: 8
                            },
                            value: {
                                color: "#8693F3",
                                fontSize: 24,
                                align: 'center',
                                verticalAlign: 'middle',
                            },
                        }
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: 24,
                        }
                    }
                },
                data: ydata
            }]
        };
        myChart.setOption(option);

        setTimeout(function () {
            myChart.on('mouseover', function (params) {
                if (params.name == ydata[0].name) {
                    myChart.dispatchAction({
                        type: 'highlight',
                        seriesIndex: 0,
                        dataIndex: 0
                    });
                } else {
                    myChart.dispatchAction({
                        type: 'downplay',
                        seriesIndex: 0,
                        dataIndex: 0
                    });
                }
            });

            myChart.on('mouseout', function (params) {
                myChart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: 0
                });
            });
            /*myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: 0
            });*/
        }, 1000);

        myChart.currentIndex = -1;

        /*setInterval(function () {
            var dataLen = option.series[0].data.length;

            // 取消之前高亮的图形
            myChart.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: myChart.currentIndex
            });
            myChart.currentIndex = (myChart.currentIndex + 1) % dataLen;
            // 高亮当前图形
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: myChart.currentIndex
            });
        }, 1000);*/

        // 使用刚指定的配置项和数据显示图表。
        /*myChart.setOption(option);*/
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }
    function ceshis3() {
        var myChart = echarts.init(document.getElementById('chart3'));

        var option = {
            tooltip: { trigger: 'axis', axisPointer: { lineStyle: { color: '#000' } } },
            legend: {
                icon: 'rect',
                itemWidth: 14, itemHeight: 5, itemGap: 10,
                data: ['收入', '支出', '盈余'],
                right: '10px', top: '0px',
                textStyle: { fontSize: 12, color: '#000' }
            },
            grid: { x: 40, y: 50, x2: 45, y2: 40 },
            xAxis: [{
                type: 'category', boundaryGap: false, axisLine: { lineStyle: { color: '#57617B' } }, axisLabel: { textStyle: { color: '#000' } },
                data: a1

            }],
            yAxis: [{
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLine: { lineStyle: { color: '#57617B' } },
                axisLabel: { margin: 3, textStyle: { fontSize: 4 }, textStyle: { color: '#000' }, formatter: '{value}元' },
                splitLine: { lineStyle: { color: '#57617B' } }
            }, {
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLine: { lineStyle: { color: '#57617B' } },
                axisLabel: { margin: 3, textStyle: { fontSize: 4 }, textStyle: { color: '#fff' }, formatter: '{value}元' },
                splitLine: { show: false, lineStyle: { color: '#57617B' } }
            }],
            series: [{
                name: '收入', type: 'line', smooth: true, lineStyle: { normal: { width: 2 } },
                yAxisIndex: 0,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(185,150,248,0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(185,150,248,0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: { normal: { color: '#B996F8' } },
                data: a2
            }, {
                name: '支出', type: 'line', smooth: true, lineStyle: { normal: { width: 2 } },
                yAxisIndex: 1,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(218, 57, 20, 0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(218, 57, 20, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: { normal: { color: '#DA3914' } },
                data: a3
            }, {
                name: '盈余', type: 'line', smooth: true, lineStyle: { normal: { width: 2 } },
                yAxisIndex: 1,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(232, 190, 49, 0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(232, 190, 49, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: { normal: { color: '#E8BE31' } },
                data: a4
            }]
        };
        /*var myChart = echarts.init(document.getElementById('channel_handle_detail'));
        myChart.clear();
        if(data.handleTimeData.length>0){
            myChart.setOption(option);
        }else{
            noDataTip($("#channel_handle_detail"));
        }*/
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }
    function ceshis4() {
        var myChart = echarts.init(document.getElementById('chart4'));

        var option = {
            tooltip: { trigger: 'axis', axisPointer: { lineStyle: { color: '#000' } } },
            legend: {
                icon: 'rect',
                itemWidth: 14, itemHeight: 5, itemGap: 10,
                data: ['收入', '支出', '盈余'],
                right: '10px', top: '0px',
                textStyle: { fontSize: 12, color: '#000' }
            },
            grid: { x: 40, y: 50, x2: 45, y2: 40 },
            xAxis: [{
                type: 'category', boundaryGap: false, axisLine: { lineStyle: { color: '#57617B' } }, axisLabel: { textStyle: { color: '#000' } },
                data: b1

            }],
            yAxis: [{
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLine: { lineStyle: { color: '#57617B' } },
                axisLabel: { margin: 3, textStyle: { fontSize: 12 }, textStyle: { color: '#000' }, formatter: '{value}元' },
                splitLine: { lineStyle: { color: '#57617B' } }
            }, {
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLine: { lineStyle: { color: '#57617B' } },
                axisLabel: { margin: 3, textStyle: { fontSize: 12 }, textStyle: { color: '#fff' }, formatter: '{value}元' },
                splitLine: { show: false, lineStyle: { color: '#57617B' } }
            }],
            series: [{
                name: '收入', type: 'line', smooth: true, lineStyle: { normal: { width: 2 } },
                yAxisIndex: 0,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(185,150,248,0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(185,150,248,0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: { normal: { color: '#B996F8' } },
                data: b2
            }, {
                name: '支出', type: 'line', smooth: true, lineStyle: { normal: { width: 2 } },
                yAxisIndex: 1,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(218, 57, 20, 0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(218, 57, 20, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: { normal: { color: '#DA3914' } },
                data: b3
            }, {
                name: '盈余', type: 'line', smooth: true, lineStyle: { normal: { width: 2 } },
                yAxisIndex: 1,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(232, 190, 49, 0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(232, 190, 49, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: { normal: { color: '#E8BE31' } },
                data: b4
            }]
        };
        /*var myChart = echarts.init(document.getElementById('channel_handle_detail'));
        myChart.clear();
        if(data.handleTimeData.length>0){
            myChart.setOption(option);
        }else{
            noDataTip($("#channel_handle_detail"));
        }*/
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }
}
/*var cnt = 0;
function relo() {
    console.log("relo");
    if (cnt <=2) {
        cnt++;
        re.onclick();
    }
    else return;
}
*/