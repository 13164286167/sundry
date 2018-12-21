<template>
  <div class="hello">
    <input type="text" v-model="num" >
    {{num}}
    <br>
    <router-link to="nav">传参数：{{ msg||"默认值" }}</router-link>
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
      msg: '',
      num:1
    }
  },
  watch:{
    num:{
      handler:function(newValue,oldValue){
        if(!/[^\d^\.]+/g.test(newValue)){
          this.msg = oldValue;
        }
      },
      deep:true
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
