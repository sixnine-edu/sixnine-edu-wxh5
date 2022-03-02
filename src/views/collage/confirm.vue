<template>
	<div class="page">
		<div class="course-block">
			<div class="course-item">
				<img :src="info.coverImg" class="course-img" />
				<div class="course-info">
					<div class="titlebox">
						<div class="van-multi-ellipsis--l2">
							<van-tag type="primary" v-if="info.liveType==0">直播</van-tag>
							<van-tag type="danger" v-else-if="info.liveType==1">录播</van-tag>
							<van-tag type="success" v-else-if="info.liveType==2">现场</van-tag>
							{{info.title}}
						</div>
						<div class="time" v-if="info.liveTime"> 开始时间：{{info.liveTime}}</div>
					</div>
					<div class="price-box">
						<div class="price">{{info.livePrice==0?'免费':'¥'+info.livePrice}}</div>
						<div class="num">已报名：{{info.signNum}}</div>
					</div>
				</div>
			</div>
		</div>
		<van-panel title="支付方式" style="margin-top: 10px;">
			<van-radio-group v-model="payType">
				<van-cell-group>
					<van-cell title="学校支付" clickable @click="payType = PayTypeConstant.SCHOOLPAY">
						<template #icon>
							<svg width="24px" height="34px" viewBox="0 0 46 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
								<g id="手机端（二期）" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
									<g id="收银台1" transform="translate(-25.000000, -450.000000)">

										<g id="内容">
											<g id="分组-2" transform="translate(0.000000, 408.000000)">
												<g id="qianbao_x" transform="translate(25.000000, 37.000000)">
													<g transform="translate(0.000000, 5.000000)">
														<rect id="矩形" fill="#19B2FF" x="0" y="0" width="42" height="36" rx="6"></rect>
														<path d="M33.1802823,11.5 C31.6996151,11.5 30.5,12.7027914 30.5,14.1887029 L30.5,21.8112971 C30.5,23.2972086 31.6996151,24.5 33.1802823,24.5 L42.8197177,24.5 C44.3003849,24.5 45.5,23.2972086 45.5,21.8112971 L45.5,14.1887029 C45.5,12.7027914 44.3003849,11.5 42.8197177,11.5 L33.1802823,11.5 Z"
														 id="路径" stroke="#19B2FF" fill="#FFFFFF"></path>
														<path d="M36,16 C37.1040508,16 38,16.8947368 38,18 C38,19.1052632 37.1040508,20 36,20 C34.8943606,20 34,19.1052632 34,18 C34,16.8947368 34.8943606,16 36,16 Z"
														 id="路径" fill="#19B2FF"></path>
														<path d="M17,16 L17,29" id="路径" stroke="#FFFFFF" stroke-width="3"></path>
														<path d="M9,22 L24,22" id="路径" stroke="#FFFFFF" stroke-width="3"></path>
														<path d="M9,17 L24,17" id="路径" stroke="#FFFFFF" stroke-width="3"></path>
														<polyline id="路径" stroke="#FFFFFF" stroke-width="3" points="11 7 16.5 16 22 7"></polyline>
													</g>
												</g>
											</g>
										</g>
									</g>
								</g>
							</svg>
						</template>
						<template #right-icon>
							<van-radio :name="PayTypeConstant.SCHOOLPAY" checked-color="#19B2FF" />
						</template>
					</van-cell>
					<van-cell title="微信支付" clickable @click="payType = PayTypeConstant.WECHATPAY_MP">
						<template #icon>
							<svg width="24px" height="34px" viewBox="0 0 40 37" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
								<g id="手机端（二期）" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
									<g id="收银台1" transform="translate(-25.000000, -570.000000)">
										<g id="内容" fill="#52A549">
											<g id="分组-2" transform="translate(0.000000, 528.000000)">
												<g id="微信支付-icon" transform="translate(25.000000, 42.000000)">
													<path d="M15.2491637,23.2985905 C12.855027,24.6359092 12.4999218,22.5478524 12.4999218,22.5478524 L9.49940601,15.5323544 C8.34487448,12.1986887 10.4986401,14.0292664 10.4986401,14.0292664 C10.4986401,14.0292664 12.3466174,15.430031 13.7491403,16.2835642 C15.1508816,17.1371367 16.7487182,16.5341641 16.7487182,16.5341641 L36.364656,7.46233227 C32.7456076,2.95031672 26.7672414,0 19.998984,0 C8.95324663,0 0,7.85142044 0,17.5372316 C0,23.1084098 2.96472004,28.0669452 7.58257261,31.2807553 L6.74981242,36.077295 C6.74981242,36.077295 6.34382718,37.4775879 7.75080501,36.8281118 C8.70955388,36.3852871 11.1536718,34.7983907 12.6086379,33.8326281 C14.8958952,34.6312456 17.387806,35.0746992 20.0000782,35.0746992 C31.0448776,35.0746992 40,27.2232394 40,17.537271 C40,14.7317715 39.2453966,12.0822925 37.9086817,9.73054573 C31.6589943,13.498152 17.1225029,22.2539332 15.2491637,23.2985905 Z"></path>
												</g>
											</g>
										</g>
									</g>
								</g>
							</svg>
						</template>
						<template #right-icon>
							<van-radio :name="PayTypeConstant.WECHATPAY_MP" checked-color="#19B2FF" />
						</template>
					</van-cell>
				</van-cell-group>
			</van-radio-group>
		</van-panel>
		<div class="btn-fixed">

			<div class="p-tip" v-if="payType === PayTypeConstant.SCHOOLPAY && isTeacherpay">向校方提起购买申请，经审核后由校方支付</div>

			<!--管理员-->
			<van-button type="primary" round color="#19B2FF" block @click="toPay('master')" v-if="isTeacherpay && isMasterpay">立即付款</van-button>

			<!--老师-->
			<van-button type="primary" round color="#19B2FF" block @click="toApply" v-else-if="payType === PayTypeConstant.SCHOOLPAY && isTeacherpay">立即申请</van-button>
			<van-button type="primary" round color="#19B2FF" block @click="toPay('teacher')" v-else-if="payType === PayTypeConstant.WECHATPAY_MP && isTeacherpay">立即付款</van-button>

			<!--校长-->
			<van-button type="primary" round color="#19B2FF" block @click="toPay('master')" v-else-if=" payType === PayTypeConstant.SCHOOLPAY && isMasterpay">立即付款</van-button>
			<van-button type="primary" round color="#19B2FF" block @click="toPay('master')" v-else-if=" payType === PayTypeConstant.WECHATPAY_MP && isMasterpay">立即付款</van-button>
		</div>
	</div>
</template>

<script>
	import {
		isAuth,
		getUrlParam
	} from '@/utils/index'
	import {
		PayType
	} from "@/utils/constant"
	export default {
		data() {
			return {
				timer: null,
				info: {},
				payType: '', //支付类型，默认学校支付
				PayTypeConstant: PayType, //支付类型常量
				isMasterpay: this.isAuth("corp:live:masterpay"),
				isTeacherpay: this.isAuth("corp:live:teacherpay"),
				isSchoolpay: this.isAuth("corp:live:schoolpay"),
				isWeixinpay: this.isAuth("corp:live:weixinpay"),
				applyId: this.$route.query.applyId, //校长审批带过来的
				wechat: {}
			}
		},
		mounted() {
			let openid = localStorage.getItem("openid");
			if (!openid) {
				this.getCode();
			} else {
				this.init()
			}

		},

		methods: {
			init() {
				let liveId = this.$route.query.liveId;
				this.liveId = liveId;
				if (this.isSchoolpay) {
					this.payType = PayType.SCHOOLPAY
				} else if (this.isTeacherpay) {
					this.payType = PayType.WECHATPAY_MP
				}
				this.getCourseDetail(liveId);
			},
			getCode() { // 静默授权，第一次有弹框
				const code = getUrlParam('code') // 截取路径中的code，如果没有就去微信授权，如果已经获取到了就直接传code给后台获取openId	
				//const local ="http://app.mayuwl.com";
				const local = window.location.href;
				if (code == null || code === '') {
					window.location.href =
						'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx130443637e64f233&redirect_uri=' + encodeURIComponent(
							local) + '&response_type=code&scope=snsapi_base&state=1#wechat_redirect'
				} else {
					this.getOpenId(code) //把code传给后台获取用户信息
				}
			},
			getOpenId(code) {
				this.$http({
					url: "/corp/liveorder/auth",
					method: "get",
					params: {
						code
					}
				}).then((
					data
				) => {
					localStorage.setItem("openid", data)
					this.init()
				})
			},
			toPay(type) {
				let url;
				if (type == 'teacher') {
					url = `/corp/liveorder/teacherpay/${this.info.liveId}/${this.payType}`
				} else if (type == 'master') {
					url = `/corp/liveorder/masterpay/${this.info.liveId}/${this.payType}`
				}
				this.$http({
					url: url,
					method: "get",
				}).then((
					data
				) => {
					if (data.type == 1) {
						this.checkPayResult()
					} else {
						if (this.payType == PayType.WECHATPAY_MP) {
							this.wechat = data;
							this.wechatPay();
						}
					}
				})
			},
			wechatPay() {
				let self = this;
				if (typeof WeixinJSBridge == "undefined") {
					if (document.addEventListener) {
						document.addEventListener('WeixinJSBridgeReady', self.onBridgeReady, false);
					} else if (document.attachEvent) {
						document.attachEvent('WeixinJSBridgeReady', self.onBridgeReady);
						document.attachEvent('onWeixinJSBridgeReady', self.onBridgeReady);
					}
				} else {
					self.onBridgeReady();
				}
			},

			onBridgeReady() {
				let self = this;
				let {
					appId,
					nonceStr,
					packageValue,
					paySign,
					signType,
					timeStamp
				} = this.wechat;
				WeixinJSBridge.invoke('getBrandWCPayRequest', {
					appId,
					nonceStr,
					package: packageValue,
					paySign,
					signType,
					timeStamp
				}, (res) => {
					//使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
					if (res.err_msg == "get_brand_wcpay_request:ok") {
						self.checkPayResult()
						//微信 自带 支付成功效果
					} else if (res.err_msg == "get_brand_wcpay_request:cancel") {
						alert("用户取消支付!");
					} else if (res.err_msg == "get_brand_wcpay_request：fail") {
						alert("支付失败!");
					}
				})
			},
			checkPayResult() {
				this.$http({
					url: `/corp/liveorder/isPay/${this.info.liveId}`,
					method: "get",
				}).then((
					data
				) => {
					if (data) {
						clearInterval(this.timer)
						//校长同意审批
						if (this.applyId) {
							this.$http({
								url: `/corp/live/masterapprove/${this.applyId}`,
								method: "get"
							}).then((
								data
							) => {
								this.$router.replace({
									name: "paySucess"
								})
							})
						} else {
							this.$router.push({
								name: "paySucess"
							})
						}
					}
				})
			},
			toApply() {
				if (this.info.applyId) {
					this.$toast("该课程已申请")
					return;
				}
				this.$http({
					url: `/corp/live/applynow/${this.info.liveId}`,
					method: "get",
				}).then((
					data
				) => {
					this.$toast("申请成功");
					this.$router.replace({
						name: "apply",
						replace: true
					})

				})
			},
			getCourseDetail(liveId) {
				this.$http({
					url: `/corp/live/${liveId}`,
					method: "get"
				}).then((
					data
				) => {
					this.info = data;

				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.van-cell{
		align-items: center;
	}
	.van-cell__title {
		padding: 5px;
	}

	.van-panel__header {
		.van-cell__title {
			padding: 0px;
			color: #999;
		}
	}

	.p-tip {
		font-size: 12px;
		color: #999;
		text-align: center;
		margin: 8px 0;
	}

	.course-block {
		background: #fff;
		padding: 10px 0;

		.course-item {
			display: flex;
			padding: 10px;

			.course-img {
				width: 113px;
				height: 80px;
				flex-shrink: 0;
			}

			.course-info {
				margin-left: 10px;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.titlebox {
					color: #333;
					font-size: 14px;

					.time {
						font-size: 12px;
						color: #666;
					}
				}



				.price-box {
					display: flex;
					justify-content: space-between;

					.price {
						color: #F0584D;
						font-size: 16px;
						font-weight: bold;
					}

					.num {
						font-size: 12px;
						color: #666;
					}
				}
			}
		}
	}

	.btn-fixed {
		position: fixed;
		bottom: 0;
		padding: 10px 20px;
		width: 100%;
		background: #fff;
	}
</style>
