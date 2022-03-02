/*
 * @Description: 
 * @Version: 1.0
 * @Autor: yongqing
 * @Date: 2019-11-12 11:41:19
 * @LastEditors  : yongqing
 * @LastEditTime : 2019-12-26 10:26:52
 */
module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ["Android >= 4.0", "iOS >= 7"]
    },
    "postcss-pxtorem": {
      rootValue: 37.5,
      propList: ["*"],
      minPixelValue: 2
    }
  }
}
