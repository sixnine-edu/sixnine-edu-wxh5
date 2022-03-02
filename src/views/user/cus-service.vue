<template>
	<div class="cus-block">
		<div class="cus-item popover" v-for="(item,index) in customerSerList" :key="index">
			<div class="info-box">
				<img class="avatar" :src="item.headImg" />
				<div>
					<div class="name">{{item.nickName}}</div>
					<div class="phone">{{item.tellQqWx}}</div>
				</div>
			</div>
			<div class="qr">
				<img class="qr-img" :src="item.qrCode" />
			</div>
			<div class="desc">长按二维码识别扫一扫</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				customerSerList: []
			}
		},
		mounted() {
			this.getCustomerSerList();
		},
		methods: {
			getCustomerSerList() {
				this.$http({
					url: `/corp/master/customerSer/0`, //customerserType:0-客服 1-顾问
					method: "get"
				}).then((
					data
				) => {
					this.customerSerList = data;
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.popover {
		background: #FFF;
		min-width: 150px;

		z-index: 2000;
		color: #606266;
		line-height: 1.4;
		text-align: justify;
		font-size: 14px;
		box-shadow: 0 1px 6px 0 rgba(0,0,0,0.1);
		word-break: break-all;
	}

	.cus-block {
		.cus-item {
			padding: 12px 20px;
			.info-box {
				display: flex;
				align-items: center;
			justify-content: center;
				.avatar {
					width: 56px;
					height: 56px;
					border-radius: 100px;
					background: #fafafa;
				}

				>div {
					font-size: 15px;
					color: #222;
					padding-left: 10px;

					.name {}

					.phone {
						margin-top: 5px;
					}
				}
			}

			.qr {
				text-align: center;
				padding: 10px 0;

				.qr-img {
					width: 160px;
					height: 160px;
				}
			}

			.desc {
				font-size: 14px;
				color: #999;
				text-align: center
			}
		}
	}
</style>
