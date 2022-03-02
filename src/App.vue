<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: yongqing
 * @Date: 2019-11-12 11:41:19
 * @LastEditors: yongqing
 * @LastEditTime: 2021-02-27 23:03:49
 -->
<template>
	<div id="app">
		<router-view :key="key" />
	</div>
</template>
<script>
	import {
		getUrlParam
	} from '@/utils/index'
	export default {
		computed: {
			key() {
				return this.$route.name !== undefined ? this.$route.name : this.$route
			},
		},
		async mounted() {
			await this.getUserInfo()
			await this.getMenuNav();
		},
		methods: {
			async getUserInfo() {
				let data = await this.$http({
					url: "/corp/user/info",
					method: "get",
				})
				this.$store.commit("updateUserName", data.userName)
				this.$store.commit("updateEmpName", data.empName)

			},
			async getMenuNav() {
				let data = await this.$http({
					url: "/corp/menu/nav",
					method: "get",
				})
				sessionStorage.setItem("authorities", JSON.stringify(data.authorities || "[]"))
			},

		},
	}
</script>
<style lang="less">
	* {
		box-sizing: border-box;
	}

	html,
	body {
		background-color: #F6F6F6;
		height: 100%;
	}

	#app {
		font-family: "Avenir", Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #222;
		font-size: 16px;

		box-sizing: border-box;

	}

	.app-container {
		width: 100%;
		height: 100%;
	}

	.layout-container {
		width: 100%;
		height: calc(100% - 50px);
	}

	.vant-empty-box {
		text-align: center;
		color: rgb(182, 182, 182);
		padding-top: 40px;
	}

	.btn-footer {
		padding: 20px;
	}

	::-webkit-scrollbar {
		width: 0px;
	}

	::-webkit-scrollbar-track {
		display: none;
	}

	/deep/.van-tabs__line {
		bottom: 22px;
		border-radius: 20px;
	}
</style>
