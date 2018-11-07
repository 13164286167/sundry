// components/banner/banner.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgUrls: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    bannerClick: function(e){
      var ind = e.target.dataset.id;
      this.triggerEvent('bannerEvent', {id:ind})
    }
  }
})
