<template>
  <div class="mainEcharts" ref="mainEcharts"></div>
</template>

<script>
export default {
  name: "echarts",
  props: ["edata"],
  data() {
    return {};
  },
  computed: {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let myChart = this.$echarts.init(this.$refs.mainEcharts);

      let option = {
        backgroundColor:'#fff',
        tooltip: {
            trigger: 'item',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            padding: 10,
            formatter: function(params) {
                return params.name + '</br>' + '总&emsp;数：' + params.value + '</br>' + '待处理：' + params.data.cost + '<br/>'  + '已授权：' + params.data.early + '<br/>' + '已拒绝：' + params.data.index + '<br/>' + '回收授权：' + params.data.cur
            }
        },
        xAxis: [
          {
            type : 'category',
            axisLine:{
                // show:false,
                lineStyle:{
                    color:'#DDDDDD',
                    // width:0
                }
            },
            splitLine:{
                // show:false
            },
            axisTick:{
                // show:false
            },
            axisLabel:{
                // show:false,
                textStyle:{
                    color:'#999'
                }
            },
            data: function () {
                var list = [];
                for(var i = 1;i<=12;i++){
                    list.push(i+'月份');
                }
                return list;
            }()
          }
        ],
        yAxis : [
            {
                type : 'value',
                axisLine:{
                    // show:false,
                    lineStyle:{
                        color:'#DDDDDD',
                        // width:1
                    }
                },
                splitLine:{
                    // show:false
                },
                axisLabel:{
                    // show:false,
                    textStyle:{
                        color:'#999'
                    }
                }
            }
        ],
        grid: {
            x: 45,
            x2: 15,
            y: 25,
            y2: 15,
            backgroundColor:'#fff',
            borderWidth: 0
        },
        series: [{
            name: '指标',
            type: 'bar',
            // barWidth: 20,
            itemStyle:{
                normal:{
                    barBorderRadius: 5,
                    color: function(params) {
                        console.log(params)
                        var colorList = [     //柱子颜色
                            '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                            '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                            '#D7504B','#C6E579','#F4E001'
                        ];
                        return colorList[params.dataIndex]
                    }
                },
                emphasis:{
                    barBorderRadius: 5
                }
            },
            data: [{
                value: 20,
                cost: 4,
                early: 6,
                index: 2,
                cur:1
            }, {
                value: 15,
                cost: 4,
                early: 6,
                index: 2,
                cur:1
            }, {
                value: 18,
                cost: 4,
                early: 6,
                index: 2,
                cur:1
            }, {
                value: 10,
                cost: 4,
                early: 6,
                index: 2,
                cur:1
            },{
                value: 13,
                cost: 4,
                early: 6,
                index: 2,
                cur:0
            },{
                value: 13,
                cost: 4,
                early: 6,
                index: 2,
                cur:0
            },{
                value: 14,
                cost: 4,
                early: 6,
                index: 2,
                cur:0
            },{
                value: 13,
                cost: 4,
                early: 6,
                index: 2,
                cur:0
            },{
                value: 16,
                cost: 4,
                early: 6,
                index: 2,
                cur:0
            },{
                value: 25,
                cost: 4,
                early: 6,
                index: 2,
                cur:0
            },{
                value: 21,
                cost: 4,
                early: 6,
                index: 2,
                cur:0
            },{
                value: 14,
                cost: 4,
                early: 6,
                index: 2,
                cur:0
            }
            ]
        }]
      };

      myChart.setOption(option);
    }
  }
};
</script>

<style scoped>
.mainEcharts {
  width: 100%;
  height: 100%;
}
</style>
