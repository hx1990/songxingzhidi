// pages/qrCode/qrCode.js
const log=console.log.bind(console)
const json={}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bshow:'none',
    name:'',
    company:'',
    phone:0,
    address:'',
    qrcodeData:[],
  },
  submit(){
    log(json)
    let str=JSON.stringify(json)
    this.setData({
      bshow:'block',
      qrcodeData:str
    })
  },
  addName(e){
    json.name=e.detail.value
  },
  addCompany(e) {
    json.company = e.detail.value
  },
  addPhone(e) {
    json.phone = e.detail.value
  },
  addAddress(e) {
    json.address = e.detail.value
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
     wx.getStorage({
       key: 'userInfo',
       success: function(res) {
         json.userId=res.data.userId
       },
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