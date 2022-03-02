<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: yongqing
 * @Date: 2021-02-27 19:50:02
 * @LastEditors: yongqing
 * @LastEditTime: 2021-02-27 23:55:36
-->
<template>
	<div class="all-course-page">
		<van-sticky>
			<van-tabs v-model="active" line-width="18px" color="#19B2FF">
				<van-tab title="默认"></van-tab>
				<van-tab title="最新"></van-tab>
				<van-tab title="销量"></van-tab>
				<div class="filter" @click="visablepop=true">筛选
					<van-icon name="filter-o" />
				</div>
			</van-tabs>
		</van-sticky>

		<van-popup v-model="visablepop" position="right">
			<div class="filter-block">
				<h3 class="van-hairline--bottom">筛选</h3>
				<div class="tag-block">
					<div v-for="(item, index) in categoryList" :key="index" class="tag-item">
						<span class="title"> {{ item.categoryName }}</span>
						<span class="inner" v-for="(citem,cindex) in item.children" :class="{active:citem.selected}" :key="cindex" @click="onSelected(index,cindex)">
							{{ citem.categoryName }}
						</span>
					</div>
				</div>
				<div class="btn-group van-hairline--top">
					<van-button type="primary" color="#19B2FF" block plain round @click="visablepop=false">取消</van-button>
					<van-button type="primary" color="#19B2FF" block round @click="onConfirm">确定</van-button>

				</div>
			</div>
		</van-popup>

		<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getDataList">
			<div class="course-block" v-if="courseList.length > 0">
				<div class="course-grid" v-for="(citem, index) in courseList" :key="index" @click="toLiveDetail(citem.liveId)">
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
								<div class="time" v-if="citem.liveTime">开始时间:{{citem.liveTime}}</div>
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
		</van-list>


	</div>
</template>

<script>
	import {
		treeDataTranslate
	} from '@/utils/index'
	export default {
		components: {

		},
		data() {
			return {
				courseList: [],
				categoryList: [],
				courseId: "",
				categoryIds: [],
				current: 1,
				size: 10,
				total: 0,
				activeNames: [],
				active: 0,
				visablepop: false,
				loading: false,
				finished: false,
			}
		},
		mounted() {
			this.getCategoryList()
		},
		methods: {
			getDataList() {
				if (this.categoryIds.length==0) {
					return;
				}
				this.getCourseList();
			},
			toLiveDetail(liveId) {
				this.$router.push({
					name: "collageCourseDetail",
					query: {
						liveId
					}
				})
			},
			async getCategoryList() {
				let data = await this.$http({
					url: "/corp/live/categorys",
					method: "get"
				})
				let translateCategoryList = treeDataTranslate(data, 'categoryId', 'parentId')
				translateCategoryList.forEach((item, index) => {
					if (item.children) {
						item.children.unshift({
							categoryName: "全部",
							categoryId: item.categoryId,
							selected: true
						})
					}
				})
				this.categoryList = translateCategoryList;
				this.categoryIds = this.findCategorySelect();
				this.getCourseList()
			},
			resetCategorySelect(arr) {
				if (arr) {
					arr.forEach((item) => {
						this.$set(item, 'selected', false)
					})
				}
			},
			findCategorySelect() {
				let categoryIds = []
				this.categoryList.forEach((item, index) => {
					if (item.children) {
						let res = item.children.find((citem) => {
							return citem.selected
						})
						if (res) {
							categoryIds.push(res.categoryId)
						}
					}
				})
				return categoryIds;
			},
			onSelected(index, cindex) {
				let children = this.categoryList[index].children;
				this.resetCategorySelect(children);
				children[cindex].selected = true;

			},
			onConfirm() {
				this.categoryIds = this.findCategorySelect();
				this.courseList=[];
				this.current=1;
				this.getCourseList();
				this.visablepop = false;
			},
			async getCourseList() {
				let data = await this.$http({
					url: "/corp/live/page",
					method: "get",
					params: {
						categoryIds: this.categoryIds.join(","),
						current: this.current,
						search: '',
						size: this.size
					}
				})
				this.total = data.total;
				this.courseList = this.courseList.concat(data.records);
				this.loading = false;
				if (data.current == data.pages) {
					this.finished = true;
				} else {
					this.finished = false;
					this.current++;
				}

			},

		},
	}
</script>

<style lang="less" scoped>
	.all-course-page {

		height: 100%;

		.van-tabs {
			width: calc(100% - 60px);
		}

		.filter {
			display: flex;
			align-items: center;
			background: #fff;
			height: 43px;
			line-height: 43px;
			position: absolute;
			top: 0;
			right: -60px;
			font-size: 12px;
			color: #333;
			padding: 0 12px;
			box-shadow: -5px 0px 5px rgba(153, 153, 153, 0.1);

			>span {
				font-size: 12px;
			}

			&:after {
				content: '';
				position: absolute;
				top: 50%;
				transform: translateY(-50%) scaleX(0.5);
				height: 20px;
				width: 1px;
				background: #CCCCCC;
				left: 0;
			}
		}

		.filter-block {
			height: 100vh;
			width: 85vw;
			padding: 10px;

			h3 {
				margin: 0;
				padding: 10px 0;
				font-size: 14px;
				color: #666;

			}

			.tag {

				&-block {
					padding-bottom: 40px;
					margin-top: -10px;
				}

				&-item {
					margin-top: 18px;
					font-size: 12px;

					.title {
						color: #999;

					}

					.inner {
						display: inline-block;
						color: #222;
						margin-left: 9px;
						cursor: pointer;
						padding: 2px 6px;
						margin-top: 5px;

						&.active {
							color: #fff;
							background-color: #19B2FF;
							border-radius: 100px;
						}
					}
				}
			}

			.btn-group {
				display: flex;
				justify-content: space-between;
				padding: 20px 0;

				>.van-button {
					width: 45%;
				}
			}
		}

		.course-block {
			display: flex;
			flex-wrap: wrap;
			padding: 0 8px;

			.course-grid {
				width: 50%;
				margin-top: 10px;
				text-align: center;
			}

			.course-item {
				background: #fff;
				border-radius: 5px;
				width: 170px;
				margin: 0 auto;

				.course-img {
					width: 170px;
					height: 120px;
					flex-shrink: 0;
				}


				.course-info {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					padding: 5px 5px 8px 5px;
					text-align: left;

					.titlebox {
						color: #333;
						font-size: 14px;
						height: 60px;

						.time {
							font-size: 12px;
							color: #666;
							margin-top: 2px;
							white-space: nowrap;
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

		/deep/ .van-collapse-item__title>.van-cell__title {
			color: #222;
			font-weight: 500;
		}
	}
</style>
