var x1, x2, x3, x4, x5, x6, x7;
var y1=[], y2=[], y3=[],y4=[];
function chart1() {
    var xmlHttp;
    x1 = 0, x2 = 0, x3 = 0, x4 = 0, x5 = 0, x6 = 0, x7 = 0;
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
                
                if (data[i]["权限"] == 1) x1++;
                if (data[i]["权限"] == 2) x2++;
                if (data[i]["权限"] == 3) x3++;
                if (data[i]["权限"] == 4) x4++;
                if (data[i]["权限"] == 5) x5++;
                if (data[i]["权限"] == 6) x6++;
                if (data[i]["权限"] == 7) x7++;
            }
        }
    }
    var url = "/welcome/welcome?id=11";
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
function chart2() {
    var mon = mGetDate();
    var nowmon = new Date();
    nowmon = nowmon.getMonth() + 1;//"2月\n01号",
    nowmon = nowmon.toString();
    for (var i = 0; i < mon; i++) {
        y2[i] = 0;
        y3[i] = 0;
        y4[i] = 0;
        y1[i] = "";
        y1[i] = y1[i] + nowmon + "月\n" + (i+1) + "号";
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
                if (month(data[j]["date"]) == nowmon) {

                    y2[day(data[j]["date"])-1]++;
                    for (var i = 1; i <= mon; i++) {
                        if (data[j]["状态"] == 0 && day(data[j]["deadline"]) < i) {
                            y3[i]++;
                        }
                        if (data[j]["状态"] == 1 && day(data[j]["deadline"]) < i) {
                            y4[i]++;
                        }
                    }
                }
            }
            for (var i = 0; i < mon; i++) {
                y2[i] = y2[i].toString();
                y3[i] = y3[i].toString();
                y4[i] = y4[i].toString();
            }
        }
    }
    var url = "/welcome/welcome?id=12";
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    return false;
}
chart1();
chart2();
$(function () {
    ceshis1();
    ceshis3();
    function ceshis1() {
        var myChart = echarts.init(document.getElementById('chart2'));

        var ydata = [
            {
                name: '1级权限',
                value: x1
            },
            {
                name: '2级权限',
                value: x2
            },
            {
                name: '3级权限',
                value: x3
            },
            {
                name: '4级权限',
                value: x4
            },
            {
                name: '5级权限',
                value: x5
            },
            {
                name: '6级权限',
                value: x6
            },
            {
                name: '7级权限',
                value: x7
            },
        ];
        var color = ["#8d7fec", "#5085f2", "#e75fc3", "#f87be2", "#f2719a", "#fca4bb", "#f59a8f"]
        var xdata = ['1级权限', "2级权限", "3级权限", "4级权限", '5级权限', '6级权限', '7级权限'];


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

                formatter: function(name) {
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

        setTimeout(function() {
            myChart.on('mouseover', function(params) {
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

            myChart.on('mouseout', function(params) {
                myChart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: 0
                });
            });
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: 0
            });
        }, 1000);

        myChart.currentIndex = -1;

        setInterval(function () {
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
        }, 1000);

        // 使用刚指定的配置项和数据显示图表。
        /*myChart.setOption(option);*/
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
    function ceshis3() {
        var myChart = echarts.init(document.getElementById('chart4'));

        var option = {
            tooltip: {trigger: 'axis',axisPointer: {lineStyle: {color: '#000'}}},
            legend: {
                icon: 'rect',
                itemWidth: 14,itemHeight: 5,itemGap:10,
                data: ['新增日程', '未完成日程','已完成日程'],
                right: '10px',top: '0px',
                textStyle: {fontSize: 12,color: '#000'}
            },
            grid: {x:40,y:50,x2:45,y2:40},
            xAxis: [{
                type: 'category',boundaryGap: false,axisLine: {lineStyle: {color: '#57617B'}},axisLabel: {textStyle: {color:'#000'}},
                data: y1

            }],
            yAxis: [{
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLine: {lineStyle: {color: '#57617B'}},
                axisLabel: {margin: 10,textStyle: {fontSize: 12},textStyle: {color:'#000'},formatter:'{value}个'},
                splitLine: {lineStyle: {color: '#57617B'}}
            },{
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLine: {lineStyle: {color: '#57617B'}},
                axisLabel: {margin: 10,textStyle: {fontSize: 12},textStyle: {color:'#fff'},formatter:'{value}个'},
                splitLine: {show: false,lineStyle: {color: '#57617B'}}
            }],
            series: [{
                name: '新增日程',type: 'line',smooth: true,lineStyle: {normal: {width: 2}},
                yAxisIndex:0,
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
                itemStyle: {normal: { color: '#B996F8'}},
                data: y2
            },{
                name: '未完成日程',type: 'line',smooth: true,lineStyle: {normal: {width: 2}},
                yAxisIndex:1,
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
                itemStyle: {normal: {color: '#DA3914'}},
                data:y3
            },{
                name: '已完成日程',type: 'line',smooth: true,lineStyle: {normal: {width: 2}},
                yAxisIndex:1,
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
                itemStyle: {normal: {color: '#E8BE31'}},
                data:y4
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
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
});