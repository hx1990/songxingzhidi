import { citylist } from '../../utils/util.js'
const log = console.log.bind(console)
const app = getApp()
Page({
  data: {
    name: '',
    phone: 0,
    address: '',
    detail: '',
    copyaddress:'',
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    ok:true,
    province: '广东省',
    city: '广州市',
    area: '海珠区',
    userId: 0,
  },

  onLoad() {
    let that = this
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        log('成功', res.data.userId)
        that.setData({
          userId: res.data.userId
        })
      },
      fail(err) {
        log('shibai', err)
      }
    })
  },

  //添加寄件人名字
  addname(e) {
    this.setData({
      name: e.detail.value
    })
  },

  //添加寄件人电话
  addphone(e) {
    let phone = e.detail.value
    if (!(/^1[34578]\d{9}$/.test(phone)) || phone.length>11) {
      this.setData({
        ok: false
      })
      wx.showToast({
        title: '手机号有误！',
        icon: 'none',
        duration: 1500
      })
    }else {
      this.setData({
        phone: e.detail.value,
        ok:true
      })
    }
    
  },

  //选择省市区
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value,
      province: e.detail.value[0],
      city: e.detail.value[1],
      area: e.detail.value[2]
    })
  },
  

  //输入详细地址
  adddetail(e) {
    log('picker发送选择改变，携带值为', e.detail.value)
    //浙江省杭州市滨江区手机号回访
    this.setData({
      detail: e.detail.value
    })
  },
  //粘贴文字
  getcopy(){
    wx.showModal({
      title: '复制粘贴文件要求',
      content: `复制粘贴收信人地址格式必须是：xxx省xxx市xx区后面加上详细地址`,
      success: function (res) {
        if (res.confirm) {
          wx.getClipboardData({
            success: function (res) {
              let str =res.data
              let str1 = str.split('省')
              let provice = str1[0] + '省'
              let str2 = str1[1].split('市')
              let city=str2[0]+'市'
              let str3=str2[1].split('区')
              let area=str3[0]+'区'
              let detail=str3[1]
              // log('测试',provice,city,area,detail)
              this.setData({
                copyaddress: res.data,
                province: provice,
                city,
                area,
                detail
              })
              // log(this.data.copyaddress)
            }.bind(this)
          })
        } else if (res.cancel) {
        }
      }.bind(this)
    })
  },

  submit() {
    let that=this
    let provie = `${this.data.region[0]}${this.data.region[1]}${this.data.region[2]}`
    this.setData({
      address: this.data.copyaddress || `${provie}${this.data.detail}`
    })
    
    if (this.data.name == '') {
      wx.showModal({
        title: '提示',
        cancelColor: '#ff6600',
        content: `您输入用户名为空，请重新输入！`,
        cancelText: '返回',
      })

    } else if (this.data.phone == 0) {
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
    } else if (this.data.detail == '') {
      wx.showModal({
        title: '提示',
        cancelColor: '#ff6600',
        content: `详细地址不能为空，请重新输入！`,
        cancelText: '返回',
      })
    }else{
      wx.showModal({
        title: '确认添加收件人信息',
        content: `${this.data.name}  ${this.data.phone}  ${this.data.address}`,
        success: function (res) {
          if (res.confirm) {
            this.setData({
              address: this.data.copyaddress || `${provie}${this.data.detail}`
            })
            wx.setStorage({
              key: "resove",
              data: {
                name: this.data.name,
                phone: this.data.phone,
                address: this.data.address
              }
            })
            wx.request({
              url: `${app.globalData.host}/add/receiver/sender `,
              method: 'POST',
              data: {
                userId: that.data.userId,
                type: 2,
                name: that.data.name,
                phone: that.data.phone,
                detailAddress: that.data.detail,
                province: that.data.province,
                city: that.data.city,
                area: that.data.area
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success(res) {
                log(res)
                wx.redirectTo({
                  url: '../sendexpress/sendexpress?receiverId='+res.data.data.receiverSenderId
                })
              },
            })
            
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }.bind(this)
      })
    }
  },
  
})