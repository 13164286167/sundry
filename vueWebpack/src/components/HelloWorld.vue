<template>
  <div class="hello">
    <router-link to="nav">传参数：{{ msg }}</router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  created(){
    this.msg = this.$route.query.msg;
  },
  data () {
    return {
      msg: '默认值'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
