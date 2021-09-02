// pages/home/home.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    now: app.globalData.now,
    name: '',
    items: [],
    inputValue: '',
    src: "../../image/photo.png"
  },

  uploadPhoto() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album','camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        upload(that, tempFilePaths);
      }
    })
  },

  // buttonHandler (event) {
  //   if (!event.detail.userInfo) return;
  //   this.setData({
  //     name:event.detail.userInfo.nickName
  //   });
  // },

  // onLoad() {
  //   const that = this;
  //   wx.request({
  //     url: 'http://localhost:3000/items',
  //     success(res) {
  //       that.setData({items: res.data});
  //     }
  //   })
  //   console.log(items);
  // },
})

function upload(page, path) {
  wx.showToast({
    icon: 'loading',
    title: '正在上传',
  }),
  wx.uploadFile({
    filePath: path[0],
    name: 'image',
    url: "http://192.168.137.1:8080/index_/paper",
    header:{
      'content-type':'application/x-www-form-urlencoded'   //浏览器默认编码格式
    },
    method:'POST',
    formData:{
      openid:'minghh'   //附加信息有opid
    },
    success: function (res) {
      console.log(res);
      if (res.statusCode !=100) {
        wx.showModal({
          title: '结果',
          content: res.data,
          showCancel: true
        })
        return;
      }
      var data = res.data
      page.setData({
        src: path[0],
      })
    },
    fail: function (e) {
      console.log(e);
      wx.showModal({
        title: '提示',
        content: '上传失败',
        showCancel: false
      })
    },
    complete: function () {
      wx.hideToast();
    }
    
  },


  )

}