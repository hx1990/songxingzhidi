const app = getApp()
const log = console.log.bind(console)
Page({
  data: {
    printList:[],
    didPrint:[],
    inow: 2,
    printNumber:[],
    userId:0
  },
  onLoad(e){
    let that=this
    wx.request({
      url: `${app.globalData.host}/get/order`,
      data: {
        userId: e.uid,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
      },
      success(res) {
        log('aaaa',res.data.data)
        let printList=[]
        let didPrint=[]
        res.data.data.forEach(key=>{
          if(key.print){
            didPrint.push(key)
          }else{
            printList.push(key)
          }
        })
        log(printList.aaa)
        that.setData({
          printList: printList,
          didPrint,
          userId: e.uid
        })
      }
    })
  },
  printOne(){
     if(this.data.inow==2){
       let that=this
       this.data.printList.forEach((key,index)=>{
         this.data.printNumber.forEach((item)=>{
           
           if(index==item){
             wx.showLoading({
               title: '打印中...',
             })
             wx.request({ 
               url: `${app.globalData.host}/api/print/order`,
               data: {
                 orderId:key.orderId,
                 
                 userId: that.data.userId
               },
               success(res) { 
                 log('打印成功', res)
                 wx.hideLoading()
               }
             })
           }
         })
       })
     }
  },
  printAll(){
    if(this.data.inow==2){
      this.data.printList.forEach((key) => {
            wx.showLoading({
              title: '打印中...',
            })
            wx.request({
              url: `${app.globalData.host}/api/print/order`,
              data: {
                orderId: key.orderId,
                userId: that.data.userId
              },
              success(res) {
                log('打印成功', res)
                wx.hideLoading()
              }
            })
          
      })
    }
  },
  radioChange(e){
    let numberList=[]
      e.detail.value.forEach((key)=>{
       
        numberList.push(Number(key))
      })
    this.setData({
      printNumber: numberList
    })
  },
  change(e) {
    this.setData({
      inow: Number(e.target.dataset.value)
    })
  },
})