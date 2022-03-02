<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: yongqing
 * @Date: 2021-02-27 19:50:02
 * @LastEditors: yongqing
 * @LastEditTime: 2021-02-27 23:56:50
-->
<template>
	<van-cell-group>
		<!-- 输入密码 -->
		<van-field v-model="dataForm.password" type="password" label="原密码" placeholder="请输入原密码" />
		<van-field v-model="dataForm.newPassword" type="password" label="新密码" placeholder="请输入新密码" />
		<van-field v-model="dataForm.confirmPassword" type="password" label="确认密码" placeholder="请输入确认密码" />
		<div class="btn-footer">
			<van-button type="primary" round color="#19B2FF" block @click="onSubmit">确定修改</van-button>
		</div>
	</van-cell-group>

</template>

<script>
	export default {
		data() {
			return {
				dataForm: {
					password: '',
					newPassword: '',
					confirmPassword: ''
				}

			}
		},
		mounted() {
			// this.getUserInfo();
		},
		methods: {
			// getUserInfo() {
			// 	this.$http({
			// 		url: "/corp/user/info",
			// 		method: "get",
			// 	}).then((
			// 		data
			// 	) => {

			// 		this.empName = data.empName
			// 		this.userName = data.userName
			// 	})
			// },
			onSubmit() {
				let {
					password,
					newPassword,
					confirmPassword
				} = this.dataForm;
				if (!password) {
					this.$toast("请输入原密码")
					return
				}
				if (!newPassword) {
					this.$toast("请输入新密码")
					return
				}

				if (confirmPassword !== newPassword) {
					this.$toast("两次密码输入不一致,请重新输入")
					return
				}


				this.$http({
					url: '/corp/user/password',
					method: 'post',
					data: {
						'password': this.dataForm.password,
						'newPassword': this.dataForm.newPassword
					}
				}).then((data) => {
					window.localStorage.removeItem('Authorization_vp_corp');
					this.$toast("修改成功，请重新登录");
					setTimeout(() => {
						this.$router.replace({
							name: 'login'
						})
					}, 2000)

				})
			}
		},
	}
</script>

<style lang="less" scoped>
	.header-block {
		text-align: center;
		background: #fff;
		padding: 40px 0;

		.avatar {
			width: 60px;
			height: 60px;
		}

		.username {
			font-size: 16px;
			font-weight: bold;
		}
	}
</style>
