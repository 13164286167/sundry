<template>
  <div class="mainEcharts" ref="mainEcharts" v-text="edata">
    
  </div>
</template>

<script>
  export default {
    name: 'echarts',
    props:['edata'],
    data(){
      return {

      }
    },
    computed:{

    },
    mounted(){
      console.log('这是echarts.vue--->',this.$echarts)
    },
    methods:{
      init(){
        this.$echarts.init(this.$refs.mainEcharts)
      }
    },
  }
</script>

<style scoped>

</style>
