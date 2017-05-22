//index.js
//获取应用实例
var app = getApp();
var register = require('../../utils/refreshLoadRegister.js');
Page({
  data: {    
    currentSize:0,
    words: []
  },
  onLoad: function () {
    var _this = this;
    register.register(this);   
    //获取words  
    this.doLoadData(0,20);
  },
  doLoadData(currendSize,PAGE_SIZE){
      wx.showLoading({
        title: 'loading...',
      });
      var that = this;
      setTimeout(function(){
        var length = currendSize+PAGE_SIZE;
       // console.log('currendSize:', currendSize);
        for(var i= currendSize;i < length;i++){
           that.data.words.push('内容'+i);
        }
        var words = that.data.words;
        that.data.currentSize += PAGE_SIZE;
        that.setData({
          words:words
        });
        wx.hideLoading();
        register.loadFinish(that,true);
      },2000);
  },
  //模拟刷新数据
  refresh:function(){
    
    this.setData({
      words:[],
      currentSize:0
    });
    this.doLoadData(0, 20);
  },
  //模拟加载更多数据
  loadMore: function () {
    this.doLoadData(this.data.currentSize, 20);
  }

/** 
 * 旋转上拉加载图标 
 */
// function updateRefreshIcon() {
//   var deg = 0;
//   var _this = this;
//   console.log('旋转开始了.....')
//   var animation = wx.createAnimation({
//     duration: 1000
//   });

//   var timer = setInterval(function () {
//     if (!_this.data.refreshing)
//       clearInterval(timer);
//     animation.rotateZ(deg).step();//在Z轴旋转一个deg角度  
//     deg += 360;
//     _this.setData({
//       refreshAnimation: animation.export()
//     })
//   }, 1000);
// }
})