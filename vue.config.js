module.exports = {
  devServer: {
    proxy: {
      '/': {
        // target: 'http://192.168.1.100:8080/', 
		// target: 'http://39.102.47.143:8080/',
		// target: 'http://192.168.1.6:18080',
		target: 'http://aqi.tdkj.online/',
        changeOrigin: true
      }
    }
  }
}