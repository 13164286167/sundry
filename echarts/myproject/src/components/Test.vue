<template>
  <div>
    <div ref="test">1</div>
    {{this.test.text}}
    
  </div>
</template>
<script>
export default {
  name: "test",
  props: ["test", "test2", "test3"],
  methods: {
    handleDiv() {
      this.$refs.test.innerHTML = this.test3.a;
    }
  },
  watch: {
    test(newValue) {
      console.log(newValue);
    },
    test2: {
      //深度监听，可监听到对象、数组的变化
      handler(newV, oldV) {
        // do something, 可使用this
        console.log(newV, oldV);
      },
      deep: true
    }
  },
  updated() {
    console.log("update--test2", this.test2);
    this.handleDiv();
  },
  mounted() {
    console.log(this.test2);
    console.log(this.test3);
    this.handleDiv();
  }
};
</script>
