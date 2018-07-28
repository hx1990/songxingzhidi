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
    ok: true,
    userId: 0,
    province: '浙江省',
    city: '杭州市',
    area: '滨江区',
    imgUrl:'',
    company:[],
    index:1,
    array:['佰全物业','绿城物业'],
    zpic:'../../images/zpic.png',
    fpic: '../../images/fpic.png',
    Zbchange:false,
    Fbchange:false,
    propertyId:0
  },

  onLoad() {
    let that = this
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        that.setData({
          userId: res.data.userId
        })
      },
      fail(err) {
        log('shibai', err)
      }
    })
    wx.request({
      url: app.globalData.host + '/api/property/name/list',
      success(res){
        if(res.data.code==200){
            let arr=[]
            res.data.data.forEach((key,index)=>{
              arr.push(key.fullName)
            })
            that.setData({
              company:res.data.data,
              array:arr
            })
        }else{
          wx.showModal({
            title: '提示',
            content: res.data.message,
          })
        }
      }
    })
  },

  //添加快递员电话
  addphone(e) {
    let phone = e.detail.value
    if (!(/^1[34578]\d{9}$/.test(phone)) || phone.length > 11) {
      this.setData({
        ok: false
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

  //添加快递员名字
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

  //获取二维码
  getphone(){},
  //输入所在片区
  adddetail(e) {
    log('picker发送选择改变，携带值为', e)
    this.setData({
      detail: e.detail.value
    })
  },

  //输入快递公司
  addcompany(e){
    let index=e.detail.value
    
    this.setData({
      index,
      propertyId: this.data.company[index].propertyId
    })
  },

  //提交
  submit() {
    let that = this
    let provie = `${this.data.region[0]}${this.data.region[1]}${this.data.region[2]}`
    this.setData({
      address: `${provie}${this.data.detail}`
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
    } else {
      wx.showModal({
        title: '确认添加取件员信息',
        content: `${this.data.name}  ${this.data.phone}  ${this.data.address}`,
        success: function (res) {
          if (res.confirm) {
            this.setData({
              address: `${provie}${this.data.detail}`
            })
            wx.request({
              url: `${app.globalData.host}/api/property/staff/apply`,
              method: 'POST',
              data: {
                userId: that.data.userId,
                name: that.data.name,
                propertyId: that.data.propertyId,
                phone: that.data.phone,
                address: this.data.address,
                cardDown: 'https://www.songxinde.cn/pic/cardUp.png',
                cardUp:'https://www.songxinde.cn/pic/cardUp.png',
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success(res) {
                wx.showModal({
                  title: '提示',
                  cancelColor: '#ff6600',
                  content: `申请信息提交成功！请耐心等待工作人员审核，审核结果会以短信方式通知您。是否返回首页？`,
                  cancelText: '取消',
                  success(){
                    wx.redirectTo({
                      url: '../index/index'
                    })
                  },
                })
                log(res)
               
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
  
  uploadzIdcard() {
    let that = this
    wx.chooseImage({
      success: function (e) {
        var tempFilePaths = e.tempFilePaths
        wx.showLoading({
          title: '图片上传中..',
        })
        wx.uploadFile({
          url: `${host}/upload/picture`,
          filePath: tempFilePaths[0],
          name: 'file',
          success(res) {
            log('上传图片', res)
            let json = JSON.parse(res.data)
            that.setData({
              zpic: json.data,
              Zbchange: true
            })
            wx.hideLoading()
          },
          fail(err) {
            wx.hideLoading()
            wx.showModal({
              title: '提示',
              content: err.errMsg,
            })
          }
        })
      }
    })
  },
  uploadfIdcard() {
    let that = this
    wx.chooseImage({
      success: function (e) {
        var tempFilePaths = e.tempFilePaths
        wx.showLoading({
          title: '图片上传中..',
        })
        wx.uploadFile({
          url: `${host}/upload/picture`,
          filePath: tempFilePaths[0],
          name: 'file',
          success(res) {
            let json = JSON.parse(res.data)
            log(json.data)
            that.setData({
              fpic: json.data,
              Fbchange: true
            })
          },
          fail(err) {
            wx.hideLoading()
            wx.showModal({
              title: '提示',
              content: err.errMsg,
            })
          }
        })

      }
    })
  },
})