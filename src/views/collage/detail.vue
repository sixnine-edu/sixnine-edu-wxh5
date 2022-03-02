<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: yongqing
 * @Date: 2021-02-27 19:50:02
 * @LastEditors: yongqing
 * @LastEditTime: 2021-02-27 23:49:46
-->
<template>
	<div class="app-container course-detail">
		<img class="cover-img" :src="info.coverImg" width="100%" />
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
			<div class="price-box" v-if="info.liveId">
				<div class="price">{{info.livePrice==0?'免费':'¥'+info.livePrice}}</div>
				<div class="num">已报名：{{info.signNum}}</div>
			</div>
		</div>
		<van-tabs color="#19B2FF" v-model="curIndex">
			<van-tab title="详情">
				<div class="rich-content" v-html="info.introduce">富文本</div>
			</van-tab>
			<van-tab title="目录">
				<van-collapse v-if="courseList.length>0" v-model="collapseActive">
					<van-collapse-item :name="item.chapterId" :title="item.title" v-for="(item,index) in courseList" :key="index">
						<div class="summary-block" :class="{disable:!info.belongId}" v-if="item.children">
							<div class="summary-item" v-for="(citem,cindex) in item.children" :key="cindex" @click="toPlay(citem)">
								<span>{{citem.title}}</span>
								<van-icon name="play-circle-o" />
							</div>
						</div>
					</van-collapse-item>
				</van-collapse>

				</van-collapse>
			</van-tab>
		</van-tabs>
		<div class="space-height"></div>
		<div class="btn-fixed">
			<template v-if="info.applyState==0">
				<van-button type="primary" round color="#19B2FF" block disabled>已申请</van-button>
			</template>
			<template v-else>
				<van-button type="primary" round block color="#19B2FF" v-if="!info.belongId" @click="toPay">立即报名</van-button>
				<van-button type="primary" round block v-else @click="curIndex=1">开始学习</van-button>
			</template>
		</div>
		<van-popup v-model="centerDialogVisible" style="width:100%">
			<vue-aliplayer-v2 v-if="centerDialogVisible" ref="VueAliplayerV2" :options="options" />
		</van-popup>
	</div>
</template>

<script>
	import {
		treeDataTranslate
	} from '@/utils/index'
	import VueAliplayerV2 from "@/components/AliplayerV2/index"
	export default {
		components: {
			VueAliplayerV2
		},
		data() {
			return {
				collapseActive: [],
				centerDialogVisible: false,
				currentTitle: "",
				info: {

				},
				curIndex: 0,
				courseList: [],
				liveId: '',
				options: {
					vid: '',
					playauth: "",
					cover: "",
					format: "m3u8", //切换为直播流的时候必填
					encryptType: 1,
					mediaType: "video",
					bulletScreenComponentArgs: [],
					skinLayout: [{
							name: "bigPlayButton",
							align: "blabs",
							x: 30,
							y: 80
						},
						{
							name: "H5Loading",
							align: "cc"
						},
						{
							name: "errorDisplay",
							align: "tlabs",
							x: 0,
							y: 0
						},
						{
							name: "infoDisplay"
						},
						{
							name: "tooltip",
							align: "blabs",
							x: 0,
							y: 56
						},
						{
							name: "thumbnail"
						},
						{
							name: "controlBar",
							align: "blabs",
							x: 0,
							y: 0,
							children: [{
									name: "progress",
									align: "blabs",
									x: 0,
									y: 44
								},
								{
									name: "playButton",
									align: "tl",
									x: 15,
									y: 12
								},
								{
									name: "timeDisplay",
									align: "tl",
									x: 10,
									y: 7
								},
								{
									name: "fullScreenButton",
									align: "tr",
									x: 10,
									y: 12
								},
								{
									name: "setting",
									align: "tr",
									x: 15,
									y: 12
								},
								{
									name: "volume",
									align: "tr",
									x: 5,
									y: 10
								}
							]
						}
					]
				}
			}
		},
		computed: {
			bulletScreenText() {
				let {
					empName,
					userName
				} = this.$store.state
				return `${empName} ${userName} 正在观看`
			}
		},
		mounted() {
			let liveId = this.$route.query.liveId;
			this.liveId = liveId;
			this.getCourseDetail(liveId);
		},
		methods: {
			toPlay(citem) {
				if (!this.info.belongId) {
					this.$toast("请先购买课程")
					return false;
				}
				if (citem.urlType === 0) {
					let obj = JSON.parse(citem.srcUrl)[0]
					this.currentTitle = citem.title;
					this.getVideoPlayAuth(obj.objectKey)
			
				} else {
					window.open(citem.srcUrl);
				}
			},
			getVideoPlayAuth(objectKey) {
				this.$http({
					url: `/corp/oss/vod/playAuth/${objectKey}`,
					method: "get",
					params: {
						videoId: objectKey
					}
				}).then((
					data
				) => {
					this.options.playauth = data.playAuth
					this.options.cover = data.videoMeta.coverURL
					this.options.vid = data.videoMeta.videoId
					this.options.bulletScreenComponentArgs = [this.bulletScreenText, {
						fontSize: "18px",
						color: "#efefef"
					}, "random"]

					this.centerDialogVisible = true

				})
			},
			toPay() {
				this.$router.push({
					name: "collegeConfirm",
					query: {
						liveId: this.liveId
					}
				})
			},
			getCourseDetail(liveId) {
				this.$http({
					url: `/corp/live/${liveId}`,
					method: "get",

				}).then((
					data
				) => {
					this.info = data;
					if (data.sortChapterList.length > 0) {

						this.courseList = treeDataTranslate(data.sortChapterList, 'chapterId', 'parentId');
						data.sortChapterList.forEach((item) => {
							this.collapseActive.push(item.chapterId)
						})

					}
				})
			},
		},
		watch: {

		}
	}
</script>

<style lang="less" scoped>
	.summary-block {

		&.disable {
			// background-color: #f7f7f7;

			.summary-item {
				&:hover {
					// background-color: #f7f7f7;
				}
			}
		}

		.summary-item {
			padding: 12px 10px;
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: space-between;

			>span {
				color: #666;
			}

			.play-circle-o {
				font-size: 18px;
				color: #999;
			}

			&:active {
				background-color: #CCEEFF;
			}

			// &:not(:last-child){
			// 	border-bottom: 1px solid #efefef;
			// }
		}
	}

	.course-detail {
		.course-info {
			background-color: #fff;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 8px 12px;
			text-align: left;

			.titlebox {
				color: #333;
				font-size: 14px;
				height: 50px;

				.time {
					font-size: 12px;
					color: #666;
					margin-top: 2px;
				}
			}

			.price-box {
				display: flex;
				justify-content: space-between;

				.price {
					color: #F0584D;
					font-size: 18px;
					font-weight: bold;
				}

				.num {
					font-size: 12px;
					color: #666;
				}
			}
		}

		.van-tabs {
			margin-top: 16px;

			.rich-content {
				padding: 10px;
				background-color: #fff;

				/deep/img {
					width: 100% !important;
				}
			}

		}

		/deep/ .van-collapse-item__title {
			color: #333;
			background-color: #FAFAFA;
		}

		/deep/ .van-collapse-item__content {
			.van-cell__title {
				color: #999;
			}
		}

		.space-height {
			height: 70px;
		}

		.btn-fixed {
			position: fixed;
			bottom: 0;
			padding: 10px 20px;
			width: 100%;
			background: #fff;
		}


	}
</style>
