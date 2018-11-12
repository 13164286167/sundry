// pages/food/food.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    show: false
  },
  bannerClick: function(e){
    console.log(e)
  },
  requestImg: function(){
    var that = this;
    wx.request({
      url: 'http://188.131.155.157/wxkf/data/getFood.php',
      success: function (result) {
        var data = result.data;
        var urlArr = [];
        data.map((item) => {
          urlArr.push(item.img)
        });
        that.setData({
          show: true
        })
        that.setData({
          imgUrls: urlArr
        });
      },
      fail: function (error) {
        console.log(error)
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestImg();
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})