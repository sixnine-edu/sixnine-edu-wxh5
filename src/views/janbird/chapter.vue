<template>
	<van-collapse v-model="activeNames">
		<van-collapse-item :title="item.title" :name="item.courseChapterId" v-for="(item, index) in chaptersList" :key="index"
		 @click.native="collapseChange(item.courseChapterId)">
			<van-cell size="small" v-for="(n, cindex) in ebookObj[item.courseChapterId]" :title="n.title" :key="cindex"
			 @click.stop="toDetail(n.courseChapterId)" is-link />
		</van-collapse-item>
	</van-collapse>

</template>

<script>
	export default {
		data() {
			return {
				chaptersList: [],
				activeNames: [],
				ebookObj:{}
			}
		},
		mounted() {
			this.getChapters();
		},
		methods: {
			collapseChange(courseChapterId) {
				this.getChapters(courseChapterId)
			},
			async getChapters(parentId = 0) {
				let {
					courseId
				} = this.$route.query;
				let data = await this.$http({
					url: "/corp/teacher/chapters",
					method: "get",
					params: {
						courseId,
						parentId,

					}
				})

				if (parentId == 0) {
					this.chaptersList = data
				} else {
					this.$set(this.ebookObj, parentId, data)
				}
			},
			toDetail(courseChapterId) {
				this.$router.push({
					name: "courseDetail",
					query: {
						courseChapterId
					}
				})
			}
		},

	}
</script>

<style lang="less">
	.van-cell--small{
		color: #666;
	}
</style>
