<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: yongqing
 * @Date: 2021-02-27 19:50:02
 * @LastEditors: yongqing
 * @LastEditTime: 2021-02-27 23:56:50
-->
<template>
	<div class="app-container janbird-page">
		<van-sticky>
			<van-tabs v-model="active" line-width="18px" color="#19B2FF" z-index="99">
				<van-tab title="我的课程"></van-tab>
				<van-tab title="我的培训"></van-tab>
			</van-tabs>
		</van-sticky>
		<div v-if="active==0" class="block-1">
			<van-sticky>
				<div class="bar-block">
					<div class="category-bar" @click="visiable=true">
						<span v-if="categoryId">{{thirdCategoryName}}</span>
						<span v-else>全部分类</span>
					</div>
				</div>
			</van-sticky>
			<van-popup position="top" v-model:show="visiable">
				<div class="category-block">
					<div class="category-first">
						<div class="category-item" @click="getSecondCategory(index)" :class="{ active: index == firstIndex }" v-for="(item,index) in firstCategoryList"
						 :key="index">
							{{ item.categoryName }}
						</div>
					</div>
					<div class="category-secord">
						<div class="category-item van-hairline--bottom" @click="getThirdCategory(index)" :class="{ active: index == secondIndex }"
						 v-for="(item,index) in secondCategoryList" :key="index">
							{{ item.categoryName }}
						</div>
					</div>
					<div class="category-last van-hairline--left">
						<div class="category-item van-hairline--bottom" @click="getSearchCourseList(index)" :class="{ active: index == thirdIndex }"
						 v-for="(item,index) in thirdCategoryList" :key="index">
							{{ item.categoryName }}
						</div>
					</div>
				</div>
			</van-popup>

			<div class="training-block" v-if="courseList.length > 0">
				<div class="training-item van-hairline--bottom" v-for="(item, index) in courseList" :key="index" @click="toDetail(item.courseId)">
					<img class="cover-img" :src="item.coverImg" />
					<div class="info">
						<div class="title van-multi-ellipsis--l2">{{ item.title }}</div>
						<div class="desc van-multi-ellipsis--l2">
							{{item.info}}
						</div>
						<div class="price-box">
							<span></span>
							<div class="go-btn">去备课</div>
						</div>
					</div>
				</div>
			</div>
			<div class="vant-empty-box" v-else>
				<van-icon name="todo-list-o" size="2rem" />
				<div>暂无数据</div>
			</div>
		</div>
		<div v-else class="block-2">
			<div class="training-block" v-if="trainList.length > 0">
				<div class="training-item van-hairline--bottom" v-for="(item, index) in trainList" :key="index" @click="toLiveDetail(item.liveId)">
					<img class="cover-img" :src="item.coverImg" />
					<div class="info">
						<div class="title van-ellipsis">
							<van-tag type="primary">直播</van-tag>{{ item.title }}
						</div>
						<div class="desc van-multi-ellipsis--l3">
							开播时间:{{ item.liveTime }}
						</div>
						<div class="teacher-name van-multi-ellipsis--l3" v-if="item.distributeEmpName">
							已分配:{{ item.distributeEmpName }}
						</div>
						<div class="price-box">
							<div class="price">{{item.livePrice==0?'免费':'¥'+item.livePrice}}</div>
							<template v-if="isMaster">
								<!-- 			"item.distributeFlag==2" -->
								<div class="go-btn" v-if="!item.distributeUserId" @click.stop="onFenPei(item)">分配课程</div>
								<div class="go-btn red" v-else @click.stop="onRemove(item)">取消分配</div>
							</template>
							<template v-else-if="isTeacher">
								<div class="go-btn" @click="toLiveDetail(item.liveId)">去学习</div>
							</template>

						</div>
					</div>
				</div>
			</div>
			<div class="vant-empty-box" v-else>
				<van-icon name="todo-list-o" size="2rem" />
				<div>暂无数据</div>
			</div>

			<van-popup v-model="visiableTeacher" :style="{ zIndex: '9999'}" overlay-class="overLayzIndex">
				<div class="teacher-block">
					<van-radio-group v-model="distributeUserId">
						<van-cell-group>
							<van-cell v-for="(item,index) in  teachersList" :key="index" :title="item.empName+' '+item.userName" clickable
							 @click="distributeUserId = item.corpUserId">
								<template #right-icon>
									<van-radio :name="item.corpUserId" />
								</template>
							</van-cell>
						</van-cell-group>
					</van-radio-group>
				</div>

				<div class="btn-fenpei">
					<van-button type="primary" round color="#19B2FF" block @click="addTeacher">确定分配</van-button>
				</div>
			</van-popup>
		</div>



	</div>
</template>

<script>
	import {
		treeDataTranslate,
		isAuth,
		getUrlParam
	} from '@/utils/index'
	import * as API from "@/api/base"

	export default {
		data() {
			return {
				courseList: [],
				active: 0,
				visiable: false,
				visiableTeacher: false,
				firstCategoryList: [],
				secondCategoryList: [],
				thirdCategoryList: [],
				thirdCategoryName: '',
				firstIndex: 0,
				secondIndex: -1,
				thirdIndex: -1,
				categoryId: "",
				fetchCourseURL: "",
				isMaster: this.isAuth("corp:live:masterapply"),
				isTeacher: this.isAuth("corp:live:teacherapply"),
				trainList: [],
				curentselect: [],
				teachersList: [],
				orderId: "",
				distributeUserId: ""
			}
		},
		mounted() {
			//请求课程列表
			if (isAuth("corp:courses:master")) {
				this.fetchCourseURL = '/corp/teacher/mcourses'
			} else if (isAuth("corp:courses:teacher")) {
				this.fetchCourseURL = '/corp/teacher/tcourses'
			}

			let {
				curIndex = 0
			} = this.$route.query
			this.active = parseInt(curIndex)
			this.getCourseList();
			this.getCategoryList();
			this.getTrainList();
		},
		methods: {

			getTrainList() {
				this.$http({
					url: '/corp/live/mytrain',
					method: "get"
				}).then((
					data
				) => {
					this.trainList = data;
				})

			},
			getSecondCategory(index) {
				this.firstIndex = index;
				if (index == 0) {
					this.secondIndex = -1;
					this.thirdIndex = -1;
					this.secondCategoryList = [];
					this.thirdCategoryList = [];
					this.categoryId = '';
					this.visiable = false;
					this.getCourseList()
				} else {
					this.secondCategoryList = this.firstCategoryList[index].children;
					this.secondIndex = -1;
					this.thirdCategoryList = [];
				}

			},
			getThirdCategory(index) {
				this.thirdCategoryList = this.secondCategoryList[index].children;
				this.secondIndex = index;
				this.thirdIndex = -1;
			},
			getSearchCourseList(index) {
				this.thirdIndex = index;
				let {
					categoryId,
					categoryName
				} = this.thirdCategoryList[index];

				this.categoryId = categoryId;
				this.thirdCategoryName = categoryName;
				this.visiable = false;
				this.getCourseList();

			},
			async getCategoryList() {
				let data = await this.$http({
					url: "/corp/teacher/categorys",
					method: "get",

				})

				let translateCategoryList = treeDataTranslate(data, 'categoryId', 'parentId')
				translateCategoryList.unshift({
					categoryName: "全部",
					categoryId: -1,
					selected: true
				})
				this.firstCategoryList = translateCategoryList;

			},
			async getCourseList(url) {
				if (!this.fetchCourseURL) {
					this.$toast("暂无权限访问课程列表")
					return
				}
				let data = await this.$http({
					url: this.fetchCourseURL,
					method: "get",
					params: {
						categoryId: this.categoryId
					}
				})
				this.courseList = data

			},
			toDetail(courseId) {
				this.$router.push({
					name: "chapter",
					query: {
						courseId
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
			getTeacherList() {
				this.$http({
					url: `/corp/live/teacherlist`,
					method: "get",
					params: {
						liveId: this.liveId
					}
				}).then((
					data
				) => {
					this.teachersList = data;
				})
			},
			onFenPei(item) {
				this.orderId = item.orderId;
				this.visiableTeacher = true;

			},
			addTeacher() {
				if (!this.distributeUserId) {
					this.$toast("请选择分配老师");
					return
				}
				this.$http({
					url: `/corp/live/distribute/${this.orderId}/${this.distributeUserId}`,
					method: "get"
				}).then((
					data
				) => {
					this.$toast("分配成功");
					this.visiableTeacher = false;
					setTimeout(() => {
						this.getTrainList();
					}, 2000)
				})
			},
			onRemove(item) {
				this.$dialog.confirm({
					title: "温馨提示",
					message: "确定进行取消分配操作?",
				}).then(() => {
					this.$http({
							url: `/corp/live/undistribute/${item.orderId}/${ item.distributeUserId}`,
							method: "get"
						})
						.then((
							data
						) => {
							this.$toast("取消分配成功");
							this.visiableTeacher = false;
							setTimeout(() => {
								this.getTrainList();
							}, 2000)
						})
				}).catch(() => {
					this.visiableTeacher = false;
				});

			},

		},
		watch: {
			visiableTeacher(value) {
				if (value) {
					this.getTeacherList();
				} else {
					this.orderId = ""
					this.distributeUserId = ""
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	/deep/.overLayzIndex {
		z-index: 9999 !important;
	}

	/deep/.van-tabs {
		z-index: 9998 !important;
	}

	.block-1 {

		/deep/.van-overlay {
			top: 90px !important
		}

		/deep/ .van-popup--top {
			top: 90px !important
		}


	}

	.block-2 {}

	.btn-fenpei {
		padding: 20px 40px;

	}



	.teacher-block {
		padding: 10px 0;
		width: 90vw;
		max-height: 80vh;
		min-height: 12vh;
		overflow: auto;
		-webkit-overflow-scrolling: scroll;
	}

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

					.price {
						color: #F0584D;
						font-size: 16px;
						font-weight: bold;
					}


					.go-btn {
						font-size: 12px;
						color: #19B2FF;
						font-weight: bold;

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
			.teacher-name{
				font-size: 12px;
				color: #67c23a;
				padding-top: 2px;
			}
		}
	}



	.van-tabs {
		z-index: 97;
	}


	.mescroll {
		height: calc(100vh - 168px);
	}

	.bar-block {
		background: #ffffff;
		position: relative;
		z-index: 9999;
	}

	.category-bar {
		display: inline-block;
		padding: 13px 23px;
		position: relative;
		font-size: 14px;

		&::before {
			content: "";
			position: absolute;
			right: 0;
			width: 0;
			height: 0;
			border-style: solid;
			border-color: #cccccc transparent transparent transparent;
			border-width: 6px;
			top: 21px;
		}
	}

	.category-block {
		display: flex;
		height: 45vh;
		font-size: 14px;

		.category-item {
			position: relative;
			padding: 18px 0;
		}

		.category-first {
			position: relative;
			text-align: center;
			background: #f9f9f9;
			height: inherit;
			overflow: scroll;
			-webkit-overflow-scrolling: touch;
			flex: 1;

			.category-item {
				&.active {
					color: #19B2FF;
					border-left: 4px solid #19B2FF;
				}
			}
		}

		.category-secord {
			position: relative;
			text-align: center;
			background: #fff;
			height: inherit;
			overflow: scroll;
			-webkit-overflow-scrolling: touch;
			flex: 1;

			.category-item {
				&.active {
					color: #19B2FF;

				}
			}
		}


		.category-last {
			position: relative;
			flex: 1;
			height: inherit;
			overflow: scroll;
			-webkit-overflow-scrolling: touch;
			padding-left: 20px;

			.category-item {
				&.active {
					color: #19B2FF;

					&::before {
						content: "";
						position: absolute;
						right: 20px;
						top: 50%;
						transform: translateY(-50%);
						background: url("~@/assets/images/ok_icon.png") no-repeat;
						background-size: 100%;
						width: 13px;
						height: 9px;
					}
				}
			}
		}
	}
</style>
