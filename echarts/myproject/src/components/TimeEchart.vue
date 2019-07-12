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


function randomData() {
    now = new Date(+now + oneDay);
    value = value + Math.random() * 21 - 10;
    return {
        name: now.toString(),
        value: [
            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
            Math.round(value)
        ]
    }
}
      var base = +new Date(1968, 9, 3);
      var oneDay = 24 * 3600 * 1000;
      var date = [];

      var data = [Math.random() * 300];

      for (var i = 1; i < 20; i++) {
        var now = new Date((base += oneDay));
        date.push(
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/")
        );
        data.push(Math.round((Math.random() - .5) * 20 + data[i - 1]));
      }

//start
let option = {
    color:["#44CA82"],
    title:{
      text:"覆盖人口",
      // textStyle: echartsConfig.title.textStyle,
      left:"2.5%"
    },
    tooltip: {
      trigger: "axis",
      position: function(pt) {
        console.log(pt)
        return [pt[0], "10%"];
      }
    },
    
    xAxis: {
        type: 'category',
        name:"时间",
        nameLocation:"start",
        nameTextStyle:{
          padding:[70,-8,0,0]
        },
        data:date,
        // boundaryGap: false,
        axisLine:{
          lineStyle:{
            color:"#A4ACBF",
            fontSize:16,
            opacity:1     
          }
        },
    },
    yAxis: {
        name:"( 万人 )",
        type : 'value',
        nameTextStyle:{
          // color:"#fff"
          padding:[0,0,0,-40]
        },
        splitLine : {
          lineStyle:{
            type:'dashed',
            color:'rgba(101,113,124,0.3)'
          }
        },
        axisTick:{       //y轴刻度线
          show:false
        },
        axisLine:{
          lineStyle:{
            color:"#A4ACBF",
            fontSize:16,
            opacity:0     //影藏线
          }
        },
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320,820, 932, 901, 934, 1290, 1330, 1320,820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
    }],
    dataZoom: [//给x轴设置滚动条
           {
            start:0,//默认为0
               end: 30,//默认为100
               type: 'slider',
               show: true,
               xAxisIndex: [0],
               handleSize: 0,//滑动条的 左右2个滑动条的大小
               height: 20,//组件高度
              //  left: 50, 
              //  right: 40,
               bottom: 0,
               fillerColor:"#44CA82",
               backgroundColor:"#424F66",
               showDataShadow: false,//是否显示数据阴影 默认auto
               showDetail: false,//即拖拽时候是否显示详细数值信息 默认true
               filterMode: 'filter',
           },
           //下面这个属性是里面拖到
           {
               type: 'inside',
               fillerColor:"#44CA82",
               backgroundColor:"#424F66",
               show: true,
               xAxisIndex: [0],
               start: 0,//默认为1
               end: 30,//默认为100
           },
       ]
};


//end




      // let option = {
      //   tooltip: {
      //     trigger: "axis",
      //     position: function(pt) {
      //       return [pt[0], "10%"];
      //     }
      //   },
      //   title: {
      //     left: "center",
      //     text: "大数据量面积图"
      //   },
      //   toolbox: {
      //     feature: {
      //       dataZoom: {
      //         yAxisIndex: "none"
      //       },
      //       restore: {},
      //       saveAsImage: {}
      //     }
      //   },
      //   xAxis: {
      //     type: "category",
      //     boundaryGap: false,
      //     data: date
      //   },
      //   yAxis: {
      //     type: "value",
      //     boundaryGap: [0, "100%"]
      //   },
      //   dataZoom: [
      //     {
      //       type: "inside",
      //       start: 0,
      //       end: 10
      //     },
      //     {
      //       start: 0,
      //       end: 10,
      //       handleIcon:
      //         "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
      //       handleSize: "80%",
      //       handleStyle: {
      //         color: "#fff",
      //         shadowBlur: 3,
      //         shadowColor: "rgba(0, 0, 0, 0.6)",
      //         shadowOffsetX: 2,
      //         shadowOffsetY: 2
      //       }
      //     }
      //   ],
      //   series: [
      //     {
      //       name: "模拟数据",
      //       type: "line",
      //       smooth: true,
      //       symbol: "none",
      //       sampling: "average",
      //       itemStyle: {
      //         color: "rgb(255, 70, 131)"
      //       },
      //       // areaStyle: {
      //       //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      //       //     {
      //       //       offset: 0,
      //       //       color: "rgb(255, 158, 68)"
      //       //     },
      //       //     {
      //       //       offset: 1,
      //       //       color: "rgb(255, 70, 131)"
      //       //     }
      //       //   ])
      //       // },
      //       data: data
      //     }
      //   ]
      // };
      myChart.setOption(option)
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
