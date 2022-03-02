<template>
	<div class="search-bar">
		<img class="icon_logo_small" src="../assets/images/icon_logo_small.png" />
		<van-search v-model="serachvalue" placeholder="请输入搜索关键词" clearable shape="round" @search="onSearch" />
	</div>
</template>

<script>
	export default {
		data() {
			return {
				serachvalue: ""
			}
		},
		methods: {
			onSearch() {
				this.$emit("search", this.serachvalue)
			}
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.search-bar {
		display: flex;
		align-items: center;

		.icon_logo_small {
			width: 60px;

		}

		.van-search {
			flex: 1;
			background: none;

			.van-search__content {
				background-color: #E8E8E8;
			}
		}
	}
</style>
