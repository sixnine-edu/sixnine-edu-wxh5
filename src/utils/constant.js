const PayType = {
	SCHOOLPAY:0,//学校支付
	WECHATPAY:1, // 小程序支付
	ALIPAY: 2,// 支付宝支付
	WECHATPAY_SWEEP_CODE:3,//微信扫码支付
	WECHATPAY_H5: 4, //微信H5支付
	WECHATPAY_MP: 5, //微信公众号支付
	SCOREPAY: 6,	// 纯积分支付
}

const AppType = {
	MINI:1, // 小程序
	MP: 2,// 微信公众号
	PC:3,//pc
	H5: 4, //h5
	ANDROID: 5, //安卓
	IOS: 6, //苹果
}

module.exports = {
	PayType,
	AppType
};
