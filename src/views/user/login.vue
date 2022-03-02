<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: yongqing
 * @Date: 2021-02-27 21:12:08
 * @LastEditors: yongqing
 * @LastEditTime: 2021-02-28 22:22:03
-->
<template>
	<div class="app-container">
		<img class="logo" src="@/assets/images/avatar.png" />
		<van-form @submit="onSubmit">
			<van-field v-model="dataForm.userName" label="帐号" clearable required placeholder="请输入账号" :rules="[{ required: true, message: '请填写账号' }]" />
			<van-field v-model="dataForm.password" label="密码" clearable required type="password" placeholder="请输入密码" :rules="[{ required: true, message: '请填写密码' }]" />

			<van-field v-model="dataForm.captcha" center clearable required label="验证码" maxlength="4" placeholder="请输入验证码"
			 :rules="[{ required: true, message: '请填写验证码' }]">
				<template #button>
					<img class="captchaPath" :src="captchaPath" @click="getCaptcha()" alt />
				</template>
			</van-field>

			<div class="btn-footer">
				<van-button type="primary" native-type="submit" round color="#19B2FF" block>登录</van-button>
			</div>
		</van-form>
	</div>
</template>

<script>
	import {
		corpLogin
	} from "@/api/base"
	export default {
		data() {
			return {
				dataForm: {
					userName: "",
					password: "",
					captcha: "",
				},
				captchaPath: "",
			}
		},
		mounted() {
			this.getCaptcha()
		},
		methods: {
			async onSubmit(values) {
				try {
					let data = await corpLogin({
						principal: this.dataForm.userName,
						credentials: this.dataForm.password,
						sessionUUID: this.dataForm.uuid,
						imageCode: this.dataForm.captcha,
					})
					window.localStorage.setItem(
						"Authorization_vp_corp",
						"bearer" + data.access_token
					)
					sessionStorage.setItem("authorities", JSON.stringify(data.authorities || "[]"))
					this.$router.replace({
						name: "janbird"
					})
				} catch (error) {
					this.getCaptcha()
				}
			},
			getUUID() {
				return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
					return (c === "x" ?
						(Math.random() * 16) | 0 :
						"r&0x3" | "0x8"
					).toString(16)
				})
			},
			// 获取验证码
			getCaptcha() {
				this.dataForm.uuid = this.getUUID()
				this.captchaPath = `${process.env.VUE_APP_BASE_API}/captcha.jpg?uuid=${this.dataForm.uuid}`
			},
		},
	}
</script>

<style lang="less" scoped>
	.app-container{
		height: 100vh;
		background: #fff;
	}
	.captchaPath {
		width: 110px;
	}

	.logo {
		display: block;
		margin: 0px auto;
		width: 150px;
		padding: 20px 0;
	}
</style>
