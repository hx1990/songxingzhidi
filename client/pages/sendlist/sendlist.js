
const log=console.log.bind(console)
const app=getApp()
Page({

  data: {
    sendlist: [],
    index:0,
    userId:0,
  },
  onLoad(){
  },
  add(){
    wx.redirectTo({
      url: '../addsend/addsend',
    })
  },
  onShow(){
    let that=this
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
            type: 1,
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          success(res) {
            log('添加收件人',res)
            let list=[] 
            let address=''
            res.data.data.forEach((item,index)=>{
              address = `${item.province}${item.city}${item.area}${item.detailAddress}`
              let json = {}
              json.senderId=item.receiverSenderId
              json.name = item.name
              json.phone=item.phone
              json.address=address
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
  radioChange(e){
    this.setData({
      index:e.detail.value
    })
  },
  submit(){
    let arr=this.data.sendlist
    let index=this.data.index
    log('sendId', arr[index].senderId)
    // wx.setStorage({
    //   key: "send",
    //   data: {
    //     name: arr[index].name,
    //     phone: arr[index].phone,
    //     address: arr[index].address
    //   },
    //   success(){
        wx.redirectTo({
          url: '../sendexpress/sendexpress?senderId=' + arr[index].senderId
        })
    //   }
    // })
  }
})