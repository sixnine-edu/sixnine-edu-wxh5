/*
 * @Description:
 * @Version: 1.0
 * @Autor: yongqing
 * @Date: 2019-11-12 11:41:19
 * @LastEditors: yongqing
 * @LastEditTime: 2021-02-27 23:27:36
 */
import VConsole from "vconsole"
import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "lib-flexible"
// import wxShare from "@/utils/wxShare"
import {
	Button,
	CellGroup,
	Cell,
	Panel,
	Popover,
	Popup,
	Collapse,
	CollapseItem,
	Icon,
	Tag,
	Tab,
	Tabs,
	Tabbar,
	TabbarItem,
	Radio,
	RadioGroup,
	Form,
	Field,
	Swipe,
	SwipeItem,
	Sticky,
	Dialog,
	Empty
} from 'vant';
import 'vant/lib/index.css';
import VCalendar from 'v-calendar';
import request from "@/utils/request"
import {
	isAuth
} from "@/utils/index"
Vue.config.productionTip = false
Vue.use(Button)
	.use(Button)
	.use(CellGroup)
	.use(Cell)
	.use(Panel)
	.use(Popover)
	.use(Popup)
	.use(Collapse)
	.use(CollapseItem)
	.use(Icon)
	.use(Tag)
	.use(Tab)
	.use(Tabs)
	.use(Tabbar)
	.use(TabbarItem)
	.use(Radio)
	.use(RadioGroup)
	.use(Form)
	.use(Field)
	.use(Swipe)
	.use(SwipeItem)
	.use(Sticky)
	.use(Dialog)
	.use(Empty)


Vue.use(VCalendar);
Vue.prototype.$http = request // ajax请求方法
Vue.prototype.isAuth = isAuth // 权限方法

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app")
