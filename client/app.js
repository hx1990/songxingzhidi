//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    globalData:{
      host:'https://sx.juyinhe.cn'
    },
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
    }
})