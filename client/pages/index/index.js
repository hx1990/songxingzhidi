//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
const app = getApp()
const log=console.log.bind(console)
Page({
    data: {
      banners: ['../../images/banner.jpg', '../../images/banner1.png', '../../images/banner2.png', '../../images/banner1.png'],
        userInfo: {},
        logged: false,
        takeSession: false,
        requestResult: '',
        uid:0,
        bsend:false
    },
    onLoad(){
      wx.getSystemInfo({
        success(res) {
          log('测试版本',res.version)
          let version = res.version.split('.')
          if (parseInt(version[0]) >= 6 && parseInt(version[1]) >= 6) {
          } else {
            wx.showModal({
              title: '提示',
              content: '当前微信版本过低，许多功能将无法正常使用，请升级到最新微信版本后重试。'
            })
          }
        }
      })
      
      // wx.redirectTo({
      //     url: '/pages/courier/courier',
      //    //url:'/pages/qrCode/qrCode',
      //   // url: '/pages/myCenter/myCenter',
      //   // url: '/pages/material/material',
      //   // url: '/pages/expressFees/expressFees',
      //   // url: '/pages/account/account',
      //   success: function(res) {},
      //   fail: function(res) {},
      //   complete: function(res) {},
      // })
      // wx.clearStorage()
      let that=this
      wx.getStorage({
        key: 'userInfo',
        success(res){
          that.setData({
            uid: res.data.userId
          })
        },
        fail(){
          wx.login({  //调用用户登录信息
            success(res) {
              wx.request({  //将用户code发个后台
                url: `${app.globalData.host}/wx/login`,
                data: {
                  code: res.code,
                },
                success(res) { //从后台拿到用户id
                  log('调用后台数据',res)
                  that.setData({
                    uid: res.data.data.id
                  })
                  wx.setStorage({
                    key: "userInfo",
                    data: {
                      userId: res.data.data.id,
                      openId: res.data.data.openId
                    }
                  })
                }
              })
            }
          })
        }
      })
      
    },
    saoma(){
      wx.scanCode({
        success: (res) => {
          log(res.result)
          
          // wx.redirectTo({
          //   url: `/pages/sendlist/sendlist?mod=zhengwu&data=${res.result}`,
          // })
        }
      })
    },
    // getPhoneNumber(e){
    //   log('用户信息',e)
    // },
    //打开机柜门
    opendoor(){
      log('开门')
      let that=this
      wx.showModal({
        title: '提示',
        content: '确认打开机柜门？',
        success: function (res) {
          if (res.confirm) {
            wx.showLoading({
              title: '打开中',
            })
            wx.request({
              url: `${app.globalData.host}/api/open/cabinet`,
              data: {
                userId: that.data.uid,
                cabinetNum:1000
              },
              success(res) {
                log('开门成功', res)
                wx.hideLoading()
              }
            })
            
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    getUserInfo(e){
      log(e.detail.encrypteData)
      log(e.detail.iv)
      wx.request({
      url: `${app.globalData.host}/get/order`,
        data: {
        userId: this.data.uid,
        },
      method: 'POST',
      header: {
      'content-type': 'application/x-www-form-urlencoded', // 默认值
      },
      success(res) {
        log('开门成功')
      },
      })
    },
    //选择打印快递单号
    printlist(){
      let that=this
      wx.request({
        url: `${app.globalData.host}/get/order`,
        data:{
          userId:that.data.uid,
        },
        method:'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
        },
        success(res){
          if (res.data.data.length==0){  //订单不存在
            wx.showModal({
                title: '提示',
                content: '未发现需要打印订单，是否跳转到添加快递订单页面？',
                success: function (res) {
                  if (res.confirm) {
                      wx.navigateTo({
                        url: '/pages/sendexpress/sendexpress',
                      })
                  }
                }
             })   
          }else{   //选择要打印订单
            log('userid',that.data.uid)
            wx.redirectTo({
              url: `/pages/print/print?uid=${that.data.uid}`,
            })
            // let data=res.data.data
            // wx.setStorage({
            //   key: 'printInfo',
            //   data: data,
            //   success(){
                
            //   }
            // })
          }
        }
      })
      // wx.getStorage({  //查看是否存在未打印订单
      //   key: 'print',
      //   success(res){
      //      if(!res.data.print){  //打印业务逻辑
      //        wx.showModal({
      //           title: '提示',
      //           content: '未发现需要打印订单，是否跳转到添加快递订单页面？',
      //           success: function (res) {
      //             if (res.confirm) {
      //                 wx.navigateTo({
      //                   url: '/pages/sendexpress/sendexpress',
      //                 })
      //             }
      //           }
      //        })   
      //      }else{ //打印订单
      //        wx.showModal({
      //          title: '提示',
      //          content: '确认打印订单？',
      //          success: function (res) {
      //            if (res.confirm) {
      //              wx.showLoading({
      //                title: '打印中...',
      //              })
      //              setTimeout(function () {
      //                wx.hideLoading()
      //              }, 5000)
      //            } else if (res.cancel) {
      //              console.log('用户点击取消')
      //            }
      //          }
      //        })
            
      //        wx.setStorage({
      //          key: 'print',
      //          data: {
      //            print:false
      //          },
      //        })
             
      //        that.setData({
      //          bsend:true
      //        })
      //      }
      //   },
      //   fail(err){
      //     wx.showModal({
      //       title: '提示',
      //       content: '未发现需要打印订单，是否跳转到添加快递订单页面？',
      //       success: function (res) {
      //         if (res.confirm) {
      //           wx.navigateTo({
      //             url: '/pages/sendexpress/sendexpress',
      //           })
      //         }
      //       }
      //     })   
      //   }
      // })
      // wx.showActionSheet({
      //   itemList: ['黄星从浙江发往北京王先生的文件', '黄星从浙江发往上海李先生的文件', '黄星从浙江发往湖北陈女士的文件'],
      //   itemColor:'#ff6600',
      //   success: function (res) {
      //     console.log(res.tapIndex)
      //   },
      //   fail: function (res) {
      //     console.log(res.errMsg)
      //   }
      // })
    },
    //获取快递袋
    getpackge(){
      let that=this
      wx.request({
        url: `${app.globalData.host}/get/order`,
        data: {
          userId: this.data.uid,
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
        },
        success(res) {
          let len = res.data.data.length
          if (len>0) {  //检查是否打印快递单
            wx.showModal({
              title: '提示',
              content: '确认领取快递袋？',
              success: function (res) {
                if (res.confirm) {
                  wx.showLoading({
                    title: '正在出袋中..',
                  })
                  wx.request({
                    url: `${app.globalData.host}/api/get/express/bag`,
                    data: {
                      userId: that.data.uid
                    },
                    success(res) {
                      log('出袋成功', res)
                      wx.hideLoading()
                    }
                  })
                } else if (res.cancel) {

                }
              }
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '打印快递单之后才能领取快递袋，请先打印快递单！',
            })
          }
        }
      })
      
      
    },
    register(){
      wx.showModal({
        title: '提示',
        content: '请选择申请类型',
        cancelText:'快递员',
        confirmText:'代理商',
        cancelColor: '#3CC51F',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            wx.redirectTo({
              url: '/pages/register/register',
            })
          }
        }
      })
    },
    
    onUnload(){
      log('销毁组建')
    }
})
