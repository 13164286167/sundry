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
    username: '',
    userpwd: ''
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
    btnLogin:function(){
      if(this.username === 'tangbo' && this.userpwd === '123'){
        console.log('登陆成功...');
        wx.navigateTo({
          url: '../user/user',
        })
      }else{
        console.log(this.username)
        console.log('用户名或密码错误！请重新输入！')
      }
    },
    forname: function(e){
      this.setData({
        username:e.detail.value
      });
    },
    forpwd: function (e) {
      console.log(e)
      this.setData({
        userpwd: e.detail.value
      });
    },
  }
})
