const app = getApp()
const log = console.log.bind(console)
Page({
  data: {
    printList:[]
  },
  onLoad(){
      let arr= []
      let that=this
      wx.getStorage({
        key: 'printInfo',
        success(res){
          let json = {}
           res.data.forEach((item, index) => {
             json.exprssCompany = item.expressCompany
             json.goodsType = item.goodsType
             json.remark=item.remark
              wx.request({
                url: `${app.globalData.host}/get/receiver/sender`,
                data: {
                  type:1,
                  userId: item.userId
                 },
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded',
                },
                success(res) {
                  let sendData=res.data.data
                  sendData.forEach((key,index)=>{
                    if (key.receiverSenderId == item.senderId){
                      let str = `${key.name}  ${key.phone}  ${key.province}${key.city}${key.area}${key.detailAddress}`
                        json.send=str
                    }
                  })
                }
              })
              wx.request({
                url: `${app.globalData.host}/get/receiver/sender`,
                data: {
                  type: 2,
                  userId: item.userId
                },
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded',
                },
                success(res) {
                  let sendData = res.data.data
                  sendData.forEach((key, index) => {
                    if (key.receiverSenderId == item.receiverId) {
                      let str = `${key.name}  ${key.phone}  ${key.province}${key.city}${key.area}${key.detailAddress}`
                      json.receive = str
                    }
                  })
                }
              })
              log(json)
              arr.push(json)
            })
            log(that)
          that.setData({
            printList:arr
          })
          log(arr)
          log(that.data.printList)
        },
      })
  }
  
})