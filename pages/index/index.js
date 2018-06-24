//index.js
//获取应用实例
const util = require('../../utils/util.js');
const app = getApp();

Page({
  data: {

  },
  reCalcPasswd: function() {
    var newPassWordVal = '';
    if (this.data.passWord && this.data.userKey) {
      newPassWordVal = util.calcPassword(this.data.passWord, this.data.userKey, 'passwordBlender', true, 16);
    }
    this.setData({
      newPassWord: newPassWordVal
    })
  },
  passWordChange: function(event) {
    this.setData({
      passWord: event.detail.value
    })
    this.reCalcPasswd();
  },
  userKeyChange: function(event) {
    this.setData({
      userKey: event.detail.value
    })
    this.reCalcPasswd();
  },
  copyPwd:function(event){
    var newPassWord = this.data.newPassWord;
    if (!newPassWord){
      wx.showToast({
        title: '请先生成密码',
        icon: 'none',
        duration: 1500
      })
      return;
    }
    wx.setClipboardData({
      data: newPassWord,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 1500
        })
      }
    });  
  }
})