import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;
window.store = store;
console.log("main.js")
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
