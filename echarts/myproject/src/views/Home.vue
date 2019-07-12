<template>
  <div class="home">
    <div id="echarts">
      <Echarts v-if="show[0]" :edata='homeData'></Echarts>
      <RadarEchart v-else-if="show[1]"></RadarEchart>
      <button @click='handleClick'>change</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
console.log(store)
import Echarts from '@/components/Echarts'
import TimeEchart from '@/components/TimeEchart'
import RadarEchart from '@/components/RadarEchart'
export default {
  name: 'home',
  data(){
    return{
      show:[false,true]
    }
  },
  components: {
    Echarts,
    TimeEchart,
    RadarEchart
  },
  computed:{
    homeData(){
      return store.state.homeData
    }
  },
  methods:{
    handleClick(){
      // store.dispatch("CHANGEHOMEDATA")
      console.log('执行')
      this.show.forEach((element,index  ) => {
        this.show[index] = !element;
      });


    }
  }
}
</script>
<style>
 #echarts{
    width: 621px;
    height: 324px;
  }
</style>
