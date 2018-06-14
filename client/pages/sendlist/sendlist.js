
const log=console.log.bind(console)
const app=getApp()
Page({

  data: {
    sendlist: [],
    index:0,
    userId:0,
    mod:'',
    zhengwuData:{}
  },
  onLoad(e) {
    if(e.data){
      let zwdata = JSON.parse(e.data)
      this.setData({
        mod: e.mod,
        zhengwuData: zwdata
      })
      log(this.data.mod, this.data.zhengwuData)
    }
    
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
    wx.redirectTo({
      url: '../sendexpress/sendexpress?senderId=' + arr[index].senderId
    })
  }
})