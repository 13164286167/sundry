<template>
  <div class="home">
    <div id="echarts">
      以下是test组件
      
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {translate} from '@/assets/tangbo/index'
import main from '@/assets/json/main.json'

import resource from '@/assets/json/resource.json'
export default {
  name: "home",
  data() {
    return {
     
    };
  },
  mounted(){
    translate(main,resource).then((e)=>{
      console.log("haha")
      console.log(e)
    })
    
  },
  components: {
   
  },

  computed: {
   
  },
  methods: {
   
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
