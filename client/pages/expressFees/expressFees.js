import {citylist} from "../../utils/util"
const log=console.log.bind(console)
let allCity = []
let noeCity=[]
Page({
  data: {
    array:[],
    index:10,
    expressCompany:[
      '杭州余杭区中通快递','杭州西湖区韵达','杭州滨江顺丰','杭州上城圆通'
    ],
    companyIndex:0,
    loopLine: ['第一环线', '第二环线', '第三环线', '第四环线', '第五环线'],
    loopIndex:0,
    loopNoe:[],
    fristWeight:0,
    nextWeight:0,
    fliePrice:0,
    showList:[]
  },
  companyChange(e){
    this.setData({
      companyIndex: e.detail.value
    })
  },
  loopChange(e){
    this.setData({
      loopIndex:e.detail.value
    })
  },
 
  onLoad: function (options) {
      let arr=[]
      citylist.forEach((key,index)=>{
        arr.push(key.name)
        allCity.push(key.name)
      })
      this.setData({
        array:arr
      })
  },
  //选择城市
  selectCity(e){
    let index = e.target.dataset.index
    noeCity.push(this.data.array[index])
    let tempCity = this.data.array
    tempCity.splice(index, 1)
    this.setData({
      loopNoe:noeCity,
      array:tempCity
    })
  },
  //取消选择
  deleteCity(e){
    let index = e.target.dataset.index
    let tempCity = this.data.array
    tempCity.push(this.data.loopNoe[index])
    noeCity.splice(index, 1)
    this.setData({
      loopNoe: noeCity,
      array: tempCity
    })
  },
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },
  loopChange(e){
    this.setData({
      loopIndex: e.detail.value
    })
  },
  fristWeight(e){
    this.setData({
      fristWeight: Number(e.detail.value)
    })
  },
  nextWeight(e) {
    this.setData({
      nextWeight: Number(e.detail.value)
    })
   
  },
  filePrice(e) {
    this.setData({
      filePrice: Number(e.detail.value)
    })
  },
  submit(){
    let arr = []
    log(this.data.loopIndex)
    if (this.data.loopIndex==0){
      this.data.loopNoe.forEach((key,index)=>{
        let json={}
        json.loop='1环'
        json.city=key
        json.filePrice=this.data.filePrice
        json.fristWeight = this.data.fristWeight
        json.nextWeight=this.data.nextWeight
        json.action='修改'
        arr.push(json)
      })
    }
    this.setData({
      showList:arr
    })
    
  },
  onReady: function () {

  },

 
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})