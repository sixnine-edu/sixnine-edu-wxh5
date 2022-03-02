/*
 * @Description:
 * @Version: 1.0
 * @Autor: yongqing
 * @Date: 2019-11-12 11:41:19
 * @LastEditors: yongqing
 * @LastEditTime: 2021-02-27 23:59:48
 */
import Vue from "vue"
import VueRouter from "vue-router"
 import Layout from "@/layout/index"

Vue.use(VueRouter)
const routes = [{
		path: "/",
		redirect: "/janbird",
		component: Layout,
		children: [{
				path: "/collage",
				name: "collage",
				meta: {
					title: "成长学院",
				},
				component: () => import("@/views/collage/index.vue"),
			},
			{
				path: "/janbird",
				name: "janbird",
				meta: {
					title: "系统课程",
				},
				component: () => import("@/views/janbird/index.vue"),
			},
			{
				path: "/user",
				name: "user",
				meta: {
					title: "个人",
				},
				component: () => import("@/views/user/index.vue"),
			},
		],
	},

	{
		path: "/allCourse",
		name: "allCourse",
		meta: {
			title: "全部",
		},
		component: () => import("@/views/collage/allCourse.vue"),
	},
	{
		path: "/column",
		name: "roleColumn",
		meta: {
			title: "校长栏/老师栏",
		},
		component: () => import("@/views/collage/column.vue"),
	},

	{
		path: "/confirm",
		name: "collegeConfirm",
		meta: {
			title: "收银台",
		},
		component: () => import("@/views/collage/confirm.vue"),
	},
	{
		path: "/pay-success",
		name: "paySucess",
		meta: {
			title: "支付结果",
		},
		component: () => import("@/views/collage/pay-success.vue"),
	},
	{
		path: "/collage-detail",
		name: "collageCourseDetail",
		meta: {
			title: "课程详情",
		},
		component: () => import("@/views/collage/detail.vue"),
	},
	{
		path: "/course-detail",
		name: "courseDetail",
		meta: {
			title: "课程详情",
		},
		component: () => import("@/views/janbird/course-detail.vue"),
	},
	{
		path: "/chapter",
		name: "chapter",
		meta: {
			title: "章节",
		},
		component: () => import("@/views/janbird/chapter.vue"),
	},
	{
		path: "/login",
		name: "login",
		meta: {
			title: "登录",
		},
		component: () => import("@/views/user/login.vue"),
	},
	{
		path: "/changepwd",
		name: "changePwd",
		meta: {
			title: "修改密码",
		},
		component: () => import("@/views/user/change-pwd.vue"),
	},
	{
		path: "/cus-service",
		name: "cusService",
		meta: {
			title: "客服",
		},
		component: () => import("@/views/user/cus-service.vue"),
	},
	{
		path: "/apply",
		name: "apply",
		meta: {
			title: "我的申请",
		},
		component: () => import("@/views/user/apply.vue"),
	},
]

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	scrollBehavior: () => ({
		y: 0,
	}),
	routes,
})
router.beforeEach((to, from, next) => {
	if (to.meta.title) {
		document.title = to.meta.title
	}
	if (to.query.test) {
		import("vconsole").then((res) => {
			new res.default()
		})
	}
	next();
	// if (to.name !== 'login') {
	// 	menuNav().then(({
	// 		data
	// 	}) => {
	// 		sessionStorage.setItem("authorities", JSON.stringify(data.authorities || "[]"))
	// 		next()
	// 	}).catch(e => {
	// 		console.log(`%c${e} 请求菜单列表和权限失败，跳转至登录页！！`, "color:blue")
	// 		next({
	// 			path: "/login",
	// 			replace: true
	// 		})
	// 		// next("/login")
	// 		// router.push({
	// 		// 	path: "/login"
	// 		// })
	// 	})
	// } else {
	// 	next();
	// }



})

router.afterEach((to, from) => {})

export default router
