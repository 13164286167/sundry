<template>
  <div class="home">
    <div id="echarts">
      <!-- <button @click='handleClick'>change</button>
      <Echarts :edata='aboutData'></Echarts> -->111
      <RadarEchart></RadarEchart>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
console.log(store)
import Echarts from '@/components/Echarts'
import RadarEchart from '@/components/RadarEchart'
export default {
  name: 'home',
  data(){
    return{
    }
  },
  components: {
    Echarts,
    RadarEchart
  },
  computed:{
    aboutData(){
      return store.state.aboutData
    }
  },
  methods:{
    handleClick(){
      store.dispatch("CHANGEABOUTDATA")
    }
  }
}
</script>
