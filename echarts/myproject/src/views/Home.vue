<template>
  <div class="home">
    <div id="echarts">
      {{testData.text}}
      <br />以下是test组件
      <br />--------------
      <br />

      <Test :test3="isChange" :test="testData" :test2="testArr"></Test>

      <button @click="changeData">更改数据</button>
      <!-- <Layout @close="alertClose" v-if="!close"></Layout> -->
      <!-- <Echarts v-if="show[0]" :edata='homeData'></Echarts>
      <RadarEchart v-else-if="show[1]"></RadarEchart>
      <button @click='handleClick'>change</button>-->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
console.log(store);
import Echarts from "@/components/Echarts";
import Layout from "@/components/Layout";
import Test from "@/components/Test";

import TimeEchart from "@/components/TimeEchart";
import RadarEchart from "@/components/RadarEchart";
export default {
  name: "home",
  data() {
    return {
      show: [false, true],
      close: false,
      testData: {
        text: "这是home里的数据"
      },
      testArr: [{}],
      index: 0,
      isChange: { a: "1" }
    };
  },
  components: {
    Echarts,
    TimeEchart,
    RadarEchart,
    Layout,
    Test
  },

  computed: {
    homeData() {
      return store.state.homeData;
    }
  },
  methods: {
    changeData() {
      this.index++;
      this.isChange.a = this.isChange.a + 1;
      let data = {data:[1,2,this.index]}
      this.testArr.splice(0,1,{data})
      // this.testData.text = "这是更改后的数据来自home"+this.index
    },
    handleClick() {
      // store.dispatch("CHANGEHOMEDATA")
      console.log("执行");
      this.show.forEach((element, index) => {
        this.show[index] = !element;
      });
    },
    alertClose() {
      this.close = true;
    }
  }
};
</script>
<style>
#echarts {
  /* 给边框多给了4 */
  width: 825px;
  height: 261px;
  box-sizing: border-box;
  /* border:1px solid red; */
}
</style>
