import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
let store = new Vuex.Store({
  state: {
    homeData:1,
    aboutData:2
  },
  
  mutations: {

  },
  actions: {
    CHANGEHOMEDATA({state}){
      state.homeData = ~~(Math.random()*100)
      console.log(state.homeData)
    },
    CHANGEABOUTDATA({state}){
      state.aboutData = ~~(Math.random()*100)
    }
  }
})
window.store = store;
export default store;