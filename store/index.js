import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
var userInfos = uni.getStorage({
	key: 'userInfo'
})
const store = new Vuex.Store({
	state: {
		hasLogin: false, //是否登录
		zhanshi: false, //爱恋消息提示
		version: '1.0.0.2.1', //版本号
		seIndex: 0, //收货地址
		userInfo: {
		},
	},
	mutations: {
		//登录
		login(state, provider) {
			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorage({ //缓存用户登陆状态
				key: 'userInfo',
				data: provider
			})
			console.log(state.userInfo);
		},
		//退出
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.clearStorageSync()
		},
		//处理未读消息
		recept(state){
			uni.onSocketMessage(function(res){
				// console.log(res.data)
				if (res.data) {
					let message = 'pages/xiangqin/message/index'
					let pages = getCurrentPages()
					let page = pages[pages.length - 1].route
					console.log(page)
					if (page === message) {
						state.zhanshi = false
					} else {
						state.zhanshi = true
					}
				}
			})
		}
	},
	actions: {
		
	}
})

export default store
