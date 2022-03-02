<template>
	<div class="training-block" v-if="applyList.length > 0">
		<div class="training-item van-hairline--bottom" v-for="(item, index) in applyList" :key="index" @click="toLiveDetail(item.liveId)">
			<img class="cover-img" :src="item.coverImg" />
			<div class="info">
				<div class="title van-ellipsis">
					<van-tag type="primary">直播</van-tag>{{ item.title }}
				</div>
				<div class="desc van-multi-ellipsis--l3">
					申请时间:{{ item.applyTime }}
				</div>
				<div class="desc van-multi-ellipsis--l3" v-if="item.empName">
					申请人:{{ item.empName }}
				</div>
				<div class="price-box">
					<div class="price">{{item.livePrice==0?'免费':'¥'+item.livePrice}}</div>
					<template v-if="isMaster">
						<template v-if="item.state==0">
							<van-button plain size="mini" type="primary" color="#19B2FF" v-if="isAuth('corp:live:masterapprove')" @click.stop="onMasterApprove(item.applyId,item.liveId)">同意</van-button>
							<van-button plain size="mini" type="danger" v-if="isAuth('corp:live:masterreject')" @click.stop="onReject(item.applyId)">拒绝</van-button>
						</template>
						<van-tag v-if="item.state==1" plain round type="success">已审批</van-tag>
						<van-tag v-if="item.state==2" plain round type="danger">已拒绝</van-tag>
					</template>
					<template v-else-if="isTeacher">
						<van-tag v-if="item.state==0" plain round >待审批</van-tag>
						<van-tag v-if="item.state==1" plain round type="success">审批通过</van-tag>
						<van-tag v-if="item.state==2" plain round type="danger">审批拒绝</van-tag>
					</template>

				</div>
			</div>
		</div>
	</div>
	<div class="vant-empty-box" v-else>
		<van-icon name="todo-list-o" size="2rem" />
		<div>暂无数据</div>
	</div>
</template>

<script>
	import {

		isAuth
	} from '@/utils/index'
	export default {
		data() {
			return {
				isMaster: isAuth("corp:live:masterapply"),
				isTeacher: isAuth("corp:live:teacherapply"),
				applyList: [],
			}
		},
		mounted() {
			this.getLiveApply();
		},
		methods: {
			getLiveApply() {
				let url = "";
				if (this.isMaster) {
					url = "/corp/live/masterapply"
				} else if (this.isTeacher) {
					url = "/corp/live/teacherapply"
				} else {
					this.$toast("暂无权限访问培训列表")
					return
				}
				this.$http({
					url,
					method: "get",
				}).then((
					data
				) => {
					this.applyList = data
				})
			},
			onMasterApprove(applyId, liveId) {
				this.$router.push({
					name: "collegeConfirm",
					query: {
						liveId,
						applyId
					}
				})

			},
			onReject(applyId) {
				this.$dialog.confirm({
					title: "提示",
					message: "确定拒绝操作?",
				}).then(() => {
					this.$http({
						url: `/corp/live/masterreject/${applyId}`,
						method: "get"
					}).then((
						data
					) => {
						this.$toast("操作成功");
						setTimeout(() => {
							this.getLiveApply();
						}, 2000)

					})
				})
			},

			toLiveDetail(liveId) {
				this.$router.push({
					name: "collageCourseDetail",
					query: {
						liveId
					}
				})
			},


		},
	}
</script>

<style lang="less">
	.training-block {

		.training-item {
			background: #fff;
			display: flex;
			align-items: center;
			padding: 5px 10px;

			.cover-img {
				width: 130px;
				height: 90px;
				border-radius: 5px;
			}

			.info {
				padding: 10px;
				width: 240px;

				.price-box {
					display: flex;
					justify-content: space-between;
					margin-top: 4px;

					.van-tag--plain {
						padding: 0 10px;

					}
					.van-button{
						padding: 0 10px;
					}

					.price {
						color: #F0584D;
						font-size: 16px;
						font-weight: bold;
					}


					.go-btn {
						font-size: 12px;
						color: #19B2FF;
						font-weight: bold;

						&.disable {
							color: #999;
						}

						&.red {
							color: #f40;
						}

						&.green {
							color: #67c23a;
						}

					}
				}
			}

			.title {
				font-size: 14px;
				color: #222;
				font-weight: 500;
			}

			.desc {
				font-size: 12px;
				color: #999;
				padding-top: 2px;
			}
		}
	}
</style>
