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
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: "rgba(101,113,124,0)"
            }
          }
        },
        yAxis: {
          type: "category",
          max: 20,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "rgba(101,113,124,1)"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#A4ACBF",
              fontSize: 16,
              opacity: 0
            }
          },
          axisTick: {
            //y轴刻度线
            show: false
          }
        },
        series: [
          {
            height: 10,
            barWidth: "50%",
            barGap: "-5%",
            name: "直接访问",
            type: "bar",
            stack: "总量",
            data: [320, 302, 301, 334, 390, 330, 320]
          },
          {
            name: "邮件营销",
            type: "bar",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "bar",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "bar",
            stack: "总量",
            data: [150, 212, 201, 154, 190, 330, 410]
          },
          {
            name: "搜索引擎",
            type: "bar",
            stack: "总量",

            data: [820, 832, 901, 934, 1290, 1330, 1320]
          }
        ]
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
