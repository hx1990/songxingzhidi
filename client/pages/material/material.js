const log=console.log.bind(console)
Page({
  data: {
     expressBags:12,
     printPapers:40,
     pushExpressBages:0,
     pushPapers:0
  },
  upPic(){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        wx.previewImage({
          // current: '', // 当前显示图片的http链接
          // urls: [] // 需要预览的图片http链接列表
          urls: tempFilePaths,
          success(res){
            console.log('查看图片',res)
          }
        })
      }
    })
  },
 
  onReady: function () {
  
  },

 
  onPullDownRefresh: function () {
  
  },

  //添加快递袋
  addPackage(e){
    this.setData({
      pushExpressBages: Number(e.detail.value)
    })
  },
  //确认添加快递袋
  bSurePackage(e){
     
  },

  //添加打印纸
  addPaper(e){
    this.setData({
      pushPapers: Number(e.detail.value)
    })
    log(this.data.pushPapers)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})