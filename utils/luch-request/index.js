import Request from './request'
// import _ from 'loadsh'

const http = new Request()

http.setConfig((config) => { /* 设置全局配置 */
	// #ifdef APP-PLUS
		// config.baseUrl = 'http://39.102.47.143:8080/'
		config.baseUrl = 'http://aqi.tdkj.online/'
		// config.baseUrl = 'http://192.168.1.100:8080/'
		
	// #endif
	// #ifdef MP
		// config.baseUrl = 'http://aqi.tdkj.online/'
		// config.baseUrl = 'http://192.168.1.100:8080/'
	// #endif
  return config
})

http.validateStatus = (response) => {
  return response.statusCode === 200
}

http.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
  // if (str.length > 1) {
	 // config.header = {
	 //   ...config.header,
	 // } 
  // } else {
	 //  config.header = {
	 //    ...config.header
	 //  } 
  // }
  uni.getSystemInfo({
  	success: function (res) {
		config.header = {
		  ...config.header,
			 'version': '1.0.0'
		}
  	}
  })
  config.header = {
    ...config.header,
  	 'tokens': uni.getStorageSync('token'),
	 'phone': uni.getStorageSync('phone')
  }
  /*
  if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
    cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
  }
  */
  return config
})

http.interceptor.response((response) => { /* 请求之后拦截器 */
  return response
}, (response) => { // 请求错误做点什么
  return response
})

export {
  http
}
