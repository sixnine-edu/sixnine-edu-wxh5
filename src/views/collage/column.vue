<template>
	<div class="">
		<div class="top">
			<van-tabs v-model="active" line-width="18px" color="#19B2FF">
				<van-tab :title="item.title" v-for="(item,index) in columnTopList" :key="index">
					<div class="column-block">
						<div class="column-item" v-for="(citem,cindex) in item.liveList" :key="citem.liveId" @click="toLiveDetail(citem.liveId)">
							<img :src="citem.coverImg" class="column-img" />
							<div class="column-info">
								<div class="titlebox">
									<div class="van-multi-ellipsis--l2">
										{{ citem.title}}
									</div>

								</div>
								<van-icon name="arrow" color="#666" />
							</div>

						</div>
					</div>
				</van-tab>

			</van-tabs>
			<div class="content">
				<van-panel :title="item.title" v-for="(item,index) in columnList" :key="index">
					<div class="course-block" v-if="item.liveList">
						<div class="course-grid" v-for="citem in item.liveList" :key="citem.liveId" @click="toLiveDetail(citem.liveId)">
							<div class="course-item">
								<img :src="citem.coverImg" class="course-img" />
								<div class="course-info">
									<div class="titlebox">
										<div class="van-multi-ellipsis--l2">
											<van-tag type="primary" v-if="citem.liveType==0">直播</van-tag>
											<van-tag type="danger" v-else-if="citem.liveType==1">录播</van-tag>
											<van-tag type="success" v-else-if="citem.liveType==2">现场</van-tag>
											{{citem.title}}
										</div>
										<div class="time" v-if="citem.liveTime"> 开始时间：{{citem.liveTime}}</div>
									</div>
									<div class="price-box">
										<div class="price">{{citem.livePrice==0?'免费':'¥'+citem.livePrice}}</div>
										<div class="num">已报名：{{citem.signNum}}</div>
									</div>
								</div>
							</div>
						</div>

					</div>
					<div class="vant-empty-box" v-else>
						<van-icon name="todo-list-o" size="2rem" />
						<div>暂无课程数据</div>
					</div>
				</van-panel>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				active: 0,
				columnList: [],
				columnTopList: [],
				type: 1
			}
		},
		mounted() {
			this.type = this.$route.query.type
			this.getCollegeColumn();
			this.getCollegeTopColumn();
		},
		methods: {
			toLiveDetail(liveId) {
				this.$router.push({
					name: "collageCourseDetail",
					query: {
						liveId
					}
				})
			},
			getCollegeColumn() {
				this.$http({
					url: `/corp/college/collegecolumn/${this.type}/0`,
					method: "get"
				}).then((
					data
				) => {
					this.columnList = data;
				})
			},
			getCollegeTopColumn() {
				this.$http({
					url: `/corp/college/collegecolumn/${this.type}/1`,
					method: "get"
				}).then((
					data
				) => {
					this.columnTopList = data;
				})
			},
		},
	}
</script>

<style lang="less" scoped>
	.top {
		.van-cell-group {
			&:not(:first-child) {
				margin-top: 10px;
			}
		}

		.column-block {
			background: #fff;
			margin: 10px;
			border-radius: 10px;

			.column-item {
				display: flex;
				padding: 10px;

				.column-img {
					width: 90px;
					height: 60px;
					flex-shrink: 0;
				}

				.column-info {
					flex: 1;
					margin-left: 10px;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.titlebox {
						color: #333;
						font-size: 14px;
						width: 190px;
					}
				}
			}
		}
	}

	.content {
		padding: 0 14px;

		/deep/ .van-panel {
			border-radius: 8px;
			margin-top: 10px;
		}

		/deep/.van-panel__header {
			border-radius: 8px 8px 0 0;
		}

		/deep/ .van-panel__content {
			border-radius: 0 0 8px 8px;
		}

		.course-block {
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
	}
</style>
