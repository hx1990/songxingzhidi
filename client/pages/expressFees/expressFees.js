import {citylist} from "../../utils/util"
const log=console.log.bind(console)
Page({
  data: {
    array:[],
    index:10,
    expressCompany:[
      '杭州余杭区中通快递','杭州西湖区韵达','杭州滨江顺丰','杭州上城圆通'
    ],
    companyIndex:0,
    loopLine: ['第一环线', '第二环线', '第三环线', '第四环线', '第五环线'],
    loopIndex:0
  },
  companyChange(e){
    this.setData({
      companyIndex: e.detail.value
    })
  },
  loopChange(e){
    this.setData({
      loopIndex:e.detail.value
    })
  },
 
  onLoad: function (options) {
      let arr=[]
      citylist.forEach((key,index)=>{
        arr.push(key.name)
      })
      this.setData({
        array:arr
      })
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
 
  onReady: function () {
  
  },

 
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