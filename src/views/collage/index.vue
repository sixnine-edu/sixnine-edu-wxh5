<template>
	<div class="home-page">
		<!-- 	<searchBar /> -->
		<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
			<van-swipe-item v-for="(item,index) in bannerList" :key="index"> <img :src="item.img" class="banner-img" @click="toJumpUrl(item.href)" /></van-swipe-item>
		</van-swipe>
		<div class="nav-bar">
			<img class="nav-img" src="../../assets/images/notebook@2x.png" @click="toMaster" />
			<img class="nav-img" src="../../assets/images/protractor@2x.png" @click="toTeacher" />
			<img class="nav-img" src="../../assets/images/pom_pom@2x.png" @click="toAll" />
		</div>
		<van-panel :title="item.title" v-for="(item,index) in columnList" :key="index">
			<div class="course-block">
				<div class="course-item" v-for="citem in item.liveList" :key="citem.liveId" @click="toLiveDetail(citem.liveId)">
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
		</van-panel>
		<van-panel title="培训日历">
			<div class="tab-content">
				<van-tabs v-model="liveRefer" line-width="18px" color="#19B2FF">
					<van-tab name="-1"><template #title>全部 </template></van-tab>
					<van-tab name="0"><template #title><span class="dot dot-headermaster"></span>校长 </template></van-tab>
					<van-tab name="1"><template #title><span class="dot dot-teacher"></span>老师 </template></van-tab>
				</van-tabs>
			</div>
			<v-calendar class="custom-calendar" title-position="left" @update:from-page="fromPage" :attributes="attributes"
			 disable-page-swipe is-expanded>
				<template #day-content="{ day, attributes }">
					<div class="day-content">
						<span class="day-label text-sm text-gray-900">{{ day.day }}</span>
						<van-popover v-model="popoverVis[day.day]" trigger="click" get-container="body" v-if="attributes&&attributes.length>0">
							<div class="attr-more">
								<div class="attr-item" v-for="attr in attributes" :key="attr.key" @click="toLiveDetail(attr.customData.liveId)">
									<span class="dot dot-headermaster"></span>{{ attr.customData.title }}
								</div>
							</div>
							<template #reference>
								<div class="event-block">
									<div v-for="attr in attributes" :key="attr.key" :class="attr.customData.class" @click="toLiveDetail(attr.customData.liveId)">
										<span>{{ attr.customData.title }}</span>
									</div>
								</div>
							</template>
						</van-popover>
					</div>
				</template>
			</v-calendar>

		</van-panel>
	</div>
</template>
<script>

	import moment from "moment"
	export default {
		components: {
			// searchBar
		},
		data() {
			return {
				serachvalue: "",
				popoverVis: {

				},
				attributes: [],
				liveRefer: "-1",
				dateStr: moment().format("YYYY-MM"),
				bannerList: [],
				popoverVis: {},
				attributes: [],
				columnList: []
			};
		},
		mounted() {

			this.getBanner();
			this.getCollegeColumn();
		},
		watch: {
			liveRefer(val) {
				this.liveRefer = val;
				this.getCollegeCalendar();
			}
		},
		methods: {
		
			getBanner() {
				this.$http({
					url: `/corp/college/collegebanner`,
					method: "get",
					params: {}
				}).then((data) => {
					this.bannerList = data
				})
			},
			getCollegeColumn() {
				this.$http({
					url: `/corp/college/collegecolumn/3/0`,
					method: "get",

				}).then((data) => {
					this.columnList = data;
				})
			},
			getCollegeCalendar() {
				this.$http({
					url: `/corp/college/collegecalendar`,
					method: "get",
					params: {
						dateStr: this.dateStr,
						liveRefer: this.liveRefer
					}
				}).then((data) => {
					let attributes = []
					data.forEach((item, index) => {
						item.lives.forEach((citem, cindex) => {
							attributes.push({
								dates: item.dates,
								key: `${index}${cindex}`,
								customData: {
									liveId: citem.liveId,
									title: citem.title,
									class: (citem.liveRefer === 0 ? 'bg-blue' : 'bg-red'),
								},
							})
						})
					})
					this.attributes = attributes;
				})
			},
			fromPage({
				month,
				year
			}) {
				this.dateStr = `${year}-${month.toString().padStart(2,0)}`;
				this.getCollegeCalendar();
			},
			toJumpUrl(url) {
				window.open(url)
			},
			toAll() {
				this.$router.push({
					name: "allCourse"
				})
			},
			toMaster() {
				this.$router.push({
					name: "roleColumn",
					query: {
						type: 1
					}
				})
			},
			toTeacher() {
				this.$router.push({
					name: "roleColumn",
					query: {
						type: 2
					}
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

			onClose() {

			},
			onSearch() {

			}
		},
	};
</script>

<style lang="less" scoped>
	.home-page {
		padding: 0 14px;
		height: 100%;

		.my-swipe {
			padding: 10px 0;

			.banner-img {
				width: 700px/2;
				height: 150px/2;
			}
		}

		.nav-bar {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 6px 0;

			.nav-img {
				width: 100px;
				height: 60px;
			}
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

		.tab-content {
			width: 180px;
			position: absolute;
			top: 45px;
			z-index: 9;

			.dot {
				display: inline-block;
				width: 8px;
				height: 8px;
				border-radius: 1px;
				margin-right: 6px;

				&-headermaster {
					background: #19B2FF;
				}

				&-teacher {
					background: #F08078;
				}
			}
		}


	}

	/deep/ .custom-calendar.vc-container {
		border: none;
		--day-border: 1px solid #efefef;
		--day-border-highlight: 1px solid #efefef;
		--day-width: 44px;
		--day-height: 65px;
		--weekday-bg: #f8fafc;
		--weekday-border: none;
		border-radius: 0;
		width: 100%;

		& .vc-header {
			background-color: #FFF;
			padding: 10px 70px 10px 10px;

			&.align-left {
				justify-content: flex-end;
			}

			.vc-title {
				font-size: 16px;
			}
		}

		& .vc-weeks {
			padding: 0;
		}

		& .vc-weekday {
			background-color: #FAFAFA;
			padding: 15px 0;
			color: #333333;
		}

		& .vc-day {
			text-align: left;
			height: var(--day-height);
			min-width: var(--day-width);
			background-color: white;

			&:not(.on-bottom) {
				border-bottom: var(--day-border);

				&.weekday-1 {
					border-bottom: var(--day-border-highlight);
				}
			}

			&:not(.on-right) {
				border-right: var(--day-border);
			}
		}

		.day-content {
			display: flex;
			flex-direction: column;
			height: inherit;
			position: relative;
			z-index: 9999;

			.day-label {
				font-size: 12px;
				color: #333;
				text-align: center;
			}

			.event-block {
				flex: 1;
				font-size: 12px;
				color: #fff;
				display: flex;
				flex-direction: column;

				>div {
					padding: 0px 2px;
					display: flex;
					align-items: center;

					>span {
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}

				.bg-blue {
					background: #19B2FF;

				}

				.bg-red {
					background: #F08078;
				}
			}
		}


	}

	.attr-more {
		padding: 10px;

		.attr-item {
			padding: 8px 0;

			.dot {
				display: inline-block;
				width: 6px;
				height: 6px;
				border-radius: 20px;
				margin-right: 6px;

				&-headermaster {
					background: #19B2FF;
				}

				&-teacher {
					background: #F08078;
				}
			}
		}
	}
</style>
