<template>
  <div class="home">
    <div id="echarts">
      <!-- <button @click='handleClick'>change</button>
      <Echarts :edata='aboutData'></Echarts> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
console.log(store)
import Echarts from '@/components/Echarts'
export default {
  name: 'home',
  data(){
    return{
    }
  },
  components: {
    Echarts
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
