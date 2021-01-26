import Vue from 'vue'
import App from './App'
import store from './store' //vuex
import { http } from './utils/luch-request/index.js' //网络请求封装
import moment from 'moment' //时间处理插件
import uView from 'uview-ui' //uview组件

const msg = (title, duration=1500, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}

Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$store = store;
Vue.prototype.$moment = moment;
Vue.prototype.$api = {msg};
Vue.use(uView)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
