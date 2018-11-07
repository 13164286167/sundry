// pages/login/login.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  
  /**
   * 组件的初始数据
   */
  data: {
    comfire: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
    back:function(){
      wx.navigateTo({
        url: '../index/index',
      })
    },
    btnClick: function(){
      this.setData({
        comfire: true
      });
      wx.navigateTo({
        url: '../banner/banner',
      })
    }
  }
})
