// components/top-bar/top-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:String,
    url:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    goHome() { 
      console.log(this.data.url)
      wx.redirectTo({
        url: this.data.url,
      })
    }
  }
})
