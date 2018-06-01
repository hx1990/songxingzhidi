// pages/addsend/addsend.js
import { citylist } from '../../utils/util.js'
const app = getApp()
const log = console.log.bind(console)
Page({
  data: {
    name: '',
    phone: 0,
    address: '',
    detail: '',
    region: ['浙江省', '杭州市', '滨江区'],
    customItem: '全部',
    ok:true,
    userId:0,
    province:'浙江省',
    city:'杭州市',
    area:'滨江区',
  },

  onLoad() {
    let that=this
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        that.setData({
          userId: res.data.userId
        })
      },
      fail(err){
        log('shibai',err)
      }
    })
  },

  //添加寄件人电话
  addphone(e) {
    let phone = e.detail.value
    if (!(/^1[34578]\d{9}$/.test(phone)) || phone.length > 11) {
      this.setData({
        ok:false
      })
      wx.showToast({
        title: '手机号有误！',
        icon: 'none',
        duration: 1500
      })
    } else {
      this.setData({
        phone: e.detail.value,
        ok: true
      })
    }
    log(this.data.phone)
  },

  //添加寄件人名字
  addname(e) {
    this.setData({
      name: e.detail.value
    })
  },

  //选择省市区
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value,
      province: e.detail.value[0],
      city: e.detail.value[1],
      area: e.detail.value[2]
    })
  },

  //输入详细地址
  adddetail(e) {
    log('picker发送选择改变，携带值为', e)
    this.setData({
      detail: e.detail.value
    })
  },
  
  submit() {
    
    let that=this
    let provie = `${this.data.region[0]}${this.data.region[1]}${this.data.region[2]}`
    this.setData({
      address: `${provie}${this.data.detail}`
    })
    if (this.data.name == '' ) {
      wx.showModal({
        title: '提示',
        cancelColor: '#ff6600',
        content: `您输入用户名为空，请重新输入！`,
        cancelText: '返回',
      })

    } else if (this.data.phone ==0){
      wx.showModal({
        title: '提示',
        cancelColor: '#ff6600',
        content: `电话号码不能为空，请重新输入！`,
        cancelText: '返回',
      })
    } else if (!this.data.ok) {
      wx.showModal({
        title: '提示',
        cancelColor: '#ff6600',
        content: `您输入电话号码有误，请重新输入！`,
        cancelText: '返回',
      })
    } else if (this.data.detail=='') {
      wx.showModal({
        title: '提示',
        cancelColor: '#ff6600',
        content: `详细地址不能为空，请重新输入！`,
        cancelText: '返回',
      })
    } else {
      wx.showModal({
        title: '确认添加收件人信息',
        content: `${this.data.name}  ${this.data.phone}  ${this.data.address}` ,
        success: function (res) {
          if (res.confirm) {
            this.setData({
              address: `${provie}${this.data.detail}`
            })
            wx.setStorage({
              key: "send",
              data: {
                name: this.data.name,
                phone: this.data.phone,
                address: this.data.address
              }
            })
            
            wx.request({
              url: `${app.globalData.host}/add/receiver/sender `,
              method:'POST',
              data: {
                userId: that.data.userId,
                type: 1,
                name: that.data.name,
                phone: that.data.phone,
                detailAddress: that.data.detail,
                province: that.data.province,
                city:that.data.city,
                area:that.data.area
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success(res){
                  log(res)
                  wx.redirectTo({
                    url: '../sendexpress/sendexpress?senderId='+res.data.data.receiverSenderId
                  })
              },
            })  
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }.bind(this)
      })
    }
    log('提交完成')
  },

})