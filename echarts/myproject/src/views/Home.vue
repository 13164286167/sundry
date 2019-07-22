<template>
  <div class="home">
    <div id="echarts">
      <Layout @close="alertClose" v-if="!close"></Layout>
      <!-- <Echarts v-if="show[0]" :edata='homeData'></Echarts>
      <RadarEchart v-else-if="show[1]"></RadarEchart>
      <button @click='handleClick'>change</button> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
console.log(store)
import Echarts from '@/components/Echarts'
import Layout from '@/components/Layout'

import TimeEchart from '@/components/TimeEchart'
import RadarEchart from '@/components/RadarEchart'
export default {
  name: 'home',
  data(){
    return{
      show:[false,true],
      close:false
    }
  },
  components: {
    Echarts,
    TimeEchart,
    RadarEchart,
    Layout
  },
  computed:{
    homeData(){
      return store.state.homeData
    },
    
  },
  methods:{
    handleClick(){
      // store.dispatch("CHANGEHOMEDATA")
      console.log('执行')
      this.show.forEach((element,index  ) => {
        this.show[index] = !element;
      });
    },
    alertClose(){
      this.close = true;
    }
  }
}
</script>
<style>
 #echarts{
   /* 给边框多给了4 */
   width: 825px;  
   height: 261px;
   box-sizing: border-box;
   /* border:1px solid red; */
  }
</style>
