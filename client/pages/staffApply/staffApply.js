const log=console.log.bind(console)
const app = getApp()
const host = app.globalData.host
Page({
  data: {
   array:[],
   index:0,
    dept:'',
    name:'',
    phone:''
  },

  
  onLoad(options) {
    
    const userId = app.globalData.userId
    log(userId)
    log(options.scene)
    let that=this
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        that.setData({
          userId: res.data.userId
        })
      }
    })
    this.setData({
      loginPhone: options.scene
    })
    wx.request({  
      url: `${host}/api/corp/list/dept`,
      data: {
        loginPhone: options.scene,
      },
      success(res) {
        if(res.data.code==200){
          that.setData({
            array: res.data.data
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
  onShow(){
    log(app.globalData)
  },
  addname(e){
    
    log(app.globalData.userId)
    this.setData({
      name: e.detail.value
    })
  },
  addphone(e) {
   
    this.setData({
      phone: e.detail.value
    })
  },
  submit(){
    wx.request({
      url: `${host}/api/corp/staff/apply`,
      data: {
        loginPhone: this.data.loginPhone,
        userId:this.data.userId,
        dept:this.data.dept,
        name:this.data.name,
        phone:this.data.phone
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
      },
      success(res) {
        if(res.data.code==200){
          log(res)
        }else{
          wx.showModal({
            title: '提示',
            content: res.data.message,
          })
        }
      }
    })
    
      
  },
  
  
})