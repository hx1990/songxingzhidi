// pages/home/home.js
const log=console.log.bind(console)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    url:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    let that=this
    wx.getUserInfo({
      success(res){
        log(res)
        that.setData({
          name:res.userInfo.nickName,
          url:res.userInfo.avatarUrl
        })
        log(that.data.name, that.data.url)
      }
    })
  
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