<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: yongqing
 * @Date: 2021-02-27 19:50:02
 * @LastEditors: yongqing
 * @LastEditTime: 2021-02-27 23:56:50
-->
<template>
	<div class="app-container">
		<div class="header-block">
			<img src="../../assets/images/avatar.png" class="avatar" />
			<div class="username">{{$store.state.empName}}</div>
		</div>
		<van-cell-group style="margin-top: 10px;">
			<van-cell icon="todo-list-o" is-link title="我的申请" to="/apply" />
			<van-cell icon="eye-o" is-link title="修改密码" to="/changepwd" />
			<van-cell icon="service-o" is-link title="在线客服" to="/cus-service" />
			<van-cell icon="clock-o" is-link title="注销登录" @click="onExit" />
		</van-cell-group>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				empName: "",
				userName: "",
			}
		},
		methods: {
			onExit() {
				window.localStorage.removeItem('Authorization_vp_corp');
				this.$router.replace({
					name: 'login'
				})
			}
		},
		// mounted() {
		// 	this.getUserInfo();
		// },
		// methods: {
		// 	getUserInfo() {
		// 		this.$http({
		// 			url: "/corp/user/info",
		// 			method: "get",
		// 		}).then((
		// 			data
		// 		) => {

		// 			this.empName = data.empName
		// 			this.userName = data.userName
		// 		})
		// 	},
		// },
	}
</script>

<style lang="less" scoped>
	.header-block {
		text-align: center;
		background: #fff;
		padding: 40px 0;

		.avatar {
			width: 85px;
			height: 60px;
		}

		.username {
			font-size: 16px;
			font-weight: bold;
			margin-top: 10px;
		}
	}
</style>
