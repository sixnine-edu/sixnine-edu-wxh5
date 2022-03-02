/*
 * @Description:
 * @Version: 1.0
 * @Autor: yongqing
 * @Date: 2019-11-09 15:20:12
 * @LastEditors: yongqing
 * @LastEditTime: 2021-02-27 21:51:17
 */
import axios from "axios"
import store from "../store"
import {
	Toast
} from "vant"
import router from "@/router"

// 创建axios实例
const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	timeout: 50000, // 请求超时时间
})
let storage = window.localStorage
// request拦截器
service.interceptors.request.use(
	(config) => {
		if (storage.getItem("Authorization_vp_corp")) {
			config.headers["Authorization"] = storage.getItem("Authorization_vp_corp") // 请求头带上token
		}
		if (storage.getItem("openid")) {
			config.headers["openid"] = storage.getItem("openid") // 请求头带上token
		}
		Toast.loading({
			message: "加载中...",
			forbidClick: true,
			duration: 0,
		})

		return config
	},
	(error) => {
		// Do something with request error
		console.log(error) // for debug
		Toast.clear()

		Promise.reject(error)
	}
)

// response 拦截器
service.interceptors.response.use(
	(response) => {
		/**
		 * code为非20000是抛错 可结合自己业务进行修改
		 */
		Toast.clear()
		// if (!response.data.success) {
		//   Toast(response.data.msg)
		// }

		return response.data
	},
	(error) => {
		if (error.response) {
			Toast.clear()
			switch (error.response.status) {
				case 400:
					Toast(error.response.data)
					break
				case 401:
					// 返回 401 清除token信息并跳转到登录页面
					storage.removeItem("Authorization_vp_corp")
					router.push({
						path: "/login",
					})
					break
				case 403:
					Toast("暂无访问权限")
					break
				case 500:
					Toast("服务器出了点小差，请稍后再试")
					break
			}
		}
		return Promise.reject(error)
	}
)

export default service
