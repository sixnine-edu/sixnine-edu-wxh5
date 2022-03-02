/*
 * @Author: yongqing
 * @Date:   2019-07-20 10:11:40
 * @Last Modified by:   yongqing
 * @Last Modified time: 2019-09-03 10:50:00
 */
import wx from "weixin-js-sdk"
import { getSignature } from "@/api/base"
const wsShare = {
  wxconfig: function(wxconfig, wxRegister) {
    wx.config({
      debug: false,
      appId: wxconfig.appid, //公众号APPID
      timestamp: wxconfig.timestamp,
      nonceStr: wxconfig.noncestr,
      signature: wxconfig.signature,
      jsApiList: [
        "onMenuShareTimeline",
        "onMenuShareAppMessage",
        "onMenuShareQQ",
        "onMenuShareWeibo",
        "getNetworkType",
        "updateAppMessageShareData",
        "getLocation",
        "openLocation",
        "chooseWXPay"
      ]
    })
    wx.ready(function() {
      if (wxRegister.title) {
        // 2. 分享接口 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
        wx.onMenuShareAppMessage({
          title: wxRegister.title,
          desc: wxRegister.desc,
          link: wxRegister.link,
          imgUrl: wxRegister.imgUrl,
          trigger: function(res) {
            console.log("用户点击发送给朋友", res)
          },
          success: function(res) {
            wxRegister.shareAfter.call("已分享", res)
          },
          cancel: function(res) {
            console.log("已取消", res)
          },
          fail: function(res) {
            console.log(JSON.stringify(res))
          },
          complete: function(res) {
            //alert("success...."+JSON.stringify(res));
            console.log(JSON.stringify(res))
          }
        })

        // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
        wx.onMenuShareTimeline({
          title: wxRegister.title,
          link: wxRegister.link,
          imgUrl: wxRegister.imgUrl,
          trigger: function(res) {
            console.log("用户点击分享到朋友圈", res)
          },
          success: function(res) {
            wxRegister.shareAfter.call("已分享", res)
          },
          cancel: function(res) {
            console.log("已取消", res)
          },
          fail: function(res) {
            console.log(JSON.stringify(res))
          }
        })

        // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
        /* wx.onMenuShareQQ({
          title: wxRegister.title,
          desc: wxRegister.desc,
          link: wxRegister.link,
          imgUrl: wxRegister.imgUrl,
          trigger: function(res) {
            console.log("用户点击分享到QQ", res)
          },
          complete: function(res) {
            console.log(JSON.stringify(res))
          },
          success: function(res) {
            console.log("已分享", res)
          },
          cancel: function(res) {
            console.log("已取消", res)
          },
          fail: function(res) {
            console.log(JSON.stringify(res))
          }
        }) */
      }

      wx.getLocation({
        success: function(res) {
          // var latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
          // var longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
          // var speed = res.speed // 速度，以米/每秒计
          // var accuracy = res.accuracy // 位置精度
          if (wxRegister.getLoc) {
            wxRegister.getLocationAfter.call(this, res)
          }
        },
        fail: function(error) {
          console.log(error)
        }
      })
      // 6 设备信息接口 6.1 获取当前网络状态
      wx.getNetworkType({
        success: function(res) {
          console.log(res.networkType)
        },
        fail: function(res) {
          alert("网络不给力!")
          console.log(JSON.stringify(res))
        }
      })
    })
    wx.error(function(res) {
      // alert("请求失败!");
    })
  },
  async register(wxRegister) {
    // let url = location.href.split("#")[0]
    // let url = location.href
    const url = window.entryUrl
    //console.log("url", url)
    let res = await getSignature({ url })
    if (res.success) {
      wsShare.wxconfig(res, wxRegister)
      // console.log("res", res)
      // this.wxconfig(res, wxRegister)
    }
  }
}
export default wsShare
