const log=console.log.bind(console)
const app = getApp()
let senderId=0
let receiverId=0
Page({
   data:{
    items: [
       { value: '申通' },
       { value: '韵达', checked: 'true' },
       {  value: '顺丰' },
    ],
     array:['文件','数码产品','日用品','服饰','食品','其他'],
     index:0,
     send:{},
     resove:{},
     expresstype:'',
     type:'',
     more:'',
     senderId:0,
     receiverId:0,
     userId:0
   },
 onLoad(e){
   if(e.senderId){
     senderId = Number(e.senderId)
    }
   if (e.receiverId) {
     receiverId = Number(e.receiverId)
   }
 },
  radioChange(e) {
    this.setData({
      expresstype:e.detail.value
    })
  },

  bindtypeChange(e){
    this.setData({
      index:e.detail.value,
      type: this.data.array[e.detail.value]
    })
  },
  addmore(e) {
    this.setData({
      more: e.detail.value,
    })
  },
  
  //获取本地存储
  onShow () {
    let that=this
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        that.setData({
          userId: res.data.userId
        })
        if (senderId) {
          wx.request({
            url: `${app.globalData.host}/get/receiver/sender`,
            data: {
              userId: that.data.userId,
              type: 1,
              orderId: senderId
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
            },
            success(res) {
              log('测试获取', res)
              that.setData({
                send: res.data.data[0]
              })
            }
          })
        }
        if (receiverId) {
          wx.request({
            url: `${app.globalData.host}/get/receiver/sender`,
            data: {
              userId: that.data.userId,
              type: 2,
              orderId: receiverId
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
            },
            success(res) {
              log('测试获取', res)
              that.setData({
                resove: res.data.data[0]
              })
            }
          })
        }
      }
    })
  },

  submit(){
    if(this.data.expresstype==''){
      this.setData({
        expresstype: this.data.items[1].value
      })
    }
    if (this.data.type == '') {
      this.setData({
        type: this.data.array[0]
      })
    }
    
    if (senderId==0){  //判断发件信息是否存在
      wx.showModal({
        title: '提示',
        cancelColor: '#ff6600',
        content: `发件人信息不能为空，请选择发件人信息！`,
        cancelText: '返回',
      }) 
    } else if (receiverId == 0) {  //判断收件信息是否存在
      wx.showModal({
        title: '提示',
        cancelColor: '#ff6600',
        content: `收件人信息不能为空，请选择收件人信息！`,
        cancelText: '返回',
      }) 
    }else{
      let that=this
      wx.showModal({
        title: '确认打印信息',
        content: `发件人：${this.data.send.name}  发件人电话：${this.data.send.phone}  发件人地址：${this.data.send.province}${this.data.send.city}${this.data.send.area}${this.data.send.detailAddress}  收件人：${this.data.resove.name}  收件人电话：${this.data.resove.phone}  收件人地址：${this.data.resove.province}${this.data.resove.city}${this.data.resove.area}${this.data.resove.detailAddress}  快递公司：${this.data.expresstype}  快递类型:${this.data.type}  备注：${this.data.more}`,
        success: function (res) {
          wx.request({
            url: `${app.globalData.host}/add/order`,
            data: {
              receiverId: receiverId,
              senderId: senderId,
              expressCompany: that.data.expresstype,
              goodsType: that.data.type,
              remark: that.data.more,
              userId: that.data.userId
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
            },
            success(res) {
              log(res)
            }
          })
          if (res.confirm) {
            wx.setStorage({
              key: 'print',
              data: {
                print: true
              },
            })
          }
        }
      })
    }
    
  }
})