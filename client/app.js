//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    globalData:{
      host:'https://www.songxinde.cn/sx'

    },
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
      let that = this
      wx.login({  //调用用户登录信息
        success(res) {
          wx.request({  //将用户code发个后台
            url: `${that.globalData.host}/wx/login`,
            data: {
              code: res.code,
            },
            success(res) { //从后台拿到用户id
              that.globalData.userId = res.data.data.id
              console.log('调用全局变量', that.globalData.userId)
              let data = {
                userId: res.data.data.id,
                openId: res.data.data.openId
              }
              wx.setStorageSync('userInfo', data)
              console.log('', that.globalData.userId)
            }
          })
        }
      })
     console.log('appONlaunch')
    },
    onShow(){
      
      
      console.log('appONshow')
    }
})