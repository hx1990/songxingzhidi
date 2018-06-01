// pages/searchlist/searchlist.js
const log=console.log.bind(console)
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // doneList: [{ id: 1, name: 'huangxing', phone: 13870492299, address: '浙江杭州西湖区文一路360号', listNumber: 214232512352 }, { id: 2, name: 'huangxing', phone: 13870492299, address: '浙江杭州西湖区文一路360号', listNumber: 214232512352 }, { id: 3, name: 'huangxing', phone: 13870492299, address: '浙江杭州西湖区文一路360号', listNumber: 214232512352 }, { id: 4, name: 'huangxing', phone: 13870492299, address: '浙江杭州西湖区文一路360号', listNumber: 214232512352 }, { id: 5, name: 'huangxing', phone: 13870492299, address: '浙江杭州西湖区文一路360号', listNumber: 214232512352 }],
   doneList:[],
   undoneList:[],
    // undoneList: [{ id: 1, name: 'huangxing', phone: 13870492299, address: '浙江杭州西湖区文一路360号'}, { id: 2, name: 'huangxing', phone: 13870492299, address: '浙江杭州西湖区文一路360号', }, { id: 3, name: 'huangxing', phone: 13870492299, address: '浙江杭州西湖区文一路360号', listNumber: 214232512352 }, { id: 4, name: 'huangxing', phone: 13870492299, address: '浙江杭州西湖区文一路360号', }, { id: 5, name: 'huangxing', phone: 13870492299, address: '浙江杭州西湖区文一路360号', }],
    inow:1,
    index:0,
    userId:0,
  },
  onShow(){
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        this.setData({
          userId:res.data.userId
        })
        wx.request({
          url: `${app.globalData.host}/get/order`,  //查询订单接口
          data: {
            userId: this.data.userId
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          success(res) {
            log(res)
          },
          fail(err) {
            log(err)
          }
        })
      }.bind(this),
    })
  },
  
  radioChange(e) {
    log(e.detail.value)
    this.setData({
      index: e.detail.value
    })
    let arr=this.data.doneList[this.data.index]
    log(arr.listNumber)
   
    wx.request({
      url: `${app.globalData.host}/get/order`,  //查询订单接口
      data:{
        userId:this.data.userId
      },
      success(res){
        log(res)
      },
      fail(err){
        log(err)
      }
    })
  },

  onLoad: function (options) {
  
  },

  change(e){
    this.setData({
      inow: Number(e.target.dataset.value)
    })
  },

  
  onShareAppMessage: function () {
  
  }
})