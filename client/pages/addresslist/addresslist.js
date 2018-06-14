const app = getApp()
const log=console.log.bind(console)
Page({

  data: {
    sendlist: [],
    index: 0,
    userId: 0,
  },
  add() {
    wx.navigateTo({
      url: '../resove/resove',
    })
  },
  radioChange(e) {
    log(e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  
  onShow() {
    let that = this
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        that.setData({
          userId: res.data.userId
        })
        wx.request({
          url: `${app.globalData.host}/get/receiver/sender`,
          data: {
            userId: res.data.userId,
            type: 2,
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          success(res) {
           
            let list = []
            let address = ''
            res.data.data.forEach((item, index) => {
              address = `${item.province}${item.city}${item.area}${item.detailAddress}`
             
              let json = {}
              json.receiverId = item.receiverSenderId
              json.name = item.name
              json.phone = item.phone
              json.address = address
              list.push(json)
            })
           
            that.setData({
              sendlist: list
            })
          },
          fail(err) {
            log('失败', err)
          }
        })
      },
      fail(err) {
        log('shibai', err)
      }
    })
  },

  submit() {
    let arr = this.data.sendlist
    let index = this.data.index
    log('测试index', this.data.index)
    log(arr[index])
    wx.setStorage({
      key: "resove",
      data: {
        name: arr[index].name,
        phone: arr[index].phone,
        address: arr[index].address
      },
      success() {
        wx.redirectTo({
          url: '../sendexpress/sendexpress?receiverId=' + arr[index].receiverId
        })
      }
    })
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