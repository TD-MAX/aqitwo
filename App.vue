<!-- <template>
	<div id="App">
		<router-view v-if="isRouterAlive"></router-view>
	</div>
</template> -->

<script>
	export default {
		provide() { //注册方法
			return {
				reload: this.reload
			}
		},
		data() {
			return {
				isRouterAlive: true,
				timeout: 30000, // 30s
			}
		},
		methods: {
			reload() {
				this.isRouterAlive = false;
				this.$nextTick(function() {
					this.isRouterAlive = true;
				})
			},
			//判断是否已经连接
			checkOpenSocket() {
				uni.sendSocketMessage({
					data: 'ping',
					success: res => {
						return;
					},
					fail: err => {
						console.log('正在打开')
						this.openSocket()
					}
				})
			},
			//连接webSocket
			openSocket() {
				let id = uni.getStorageSync('userId')
				if (id) {
					console.log('sssssss')
					uni.connectSocket({
						url: 'ws://8.131.243.148:18080/websocket/' + id
					});
					uni.onSocketOpen(function(res) {
						console.log('WebSocket连接已打开！');
					});
					this.onSockMessage(); //打开成功后监听服务器消息
				} else {
					console.log('未有用户登录')
				}
			},
			// 打开成功后监听服务器消息
			onSockMessage() {
				//消息
				let _this = this
				_this.timeout = 30000
				_this.timeoutObj = null;
				uni.onSocketMessage(function(res) {
					console.log(res)
					_this.getSocketMsg(res.data)
				})
			},
			//监听到有新服务器消息
			getSocketMsg(reData) {
				console.log('收到服务器消息', reData)
				this.$store.state.zhanshi = true
				this.reset()
			},
			//关闭webSocket
			closeSocket() {
				uni.closeSocket({
					code: 1000,
					success(res) {
						console.log(res)
					},
					fail(err) {
						console.log(err)
					}
				})
				uni.onSocketClose(function(res) {
					console.log('websocket已关闭')
				})
			},
			//检测心跳reset
			reset() {
				clearInterval(this.timeout);
				this.start(); //启动心跳
			},
			//启动心跳start
			start() {
				let _this = this
				_this.timeoutObj = setInterval(function() {
					uni.sendSocketMessage({
						data: 'ping',
						success: res => {
							console.log('连接中...')
						},
						fail: err => {
							console.log('连接失败，正在进行重连...');
							_this.openSocket()
						}
					})
				}, this.timeout);
			}
		},
		onLaunch: function() {
			uni.onTabBarMidButtonTap(function() {
				// console.log('点击了')
				uni.navigateTo({
					url: '/pages/newsVideo/newsVideo'
				})
			})
		},
		onShow: function() {
			console.log('App Show')
			this.checkOpenSocket() //判断是否已连接
		},
		onHide: function() {
			console.log('App Hide')
			this.closeSocket() //关闭webSocket连接
		}

	}
</script>

<style lang="scss">
	@import url("https://at.alicdn.com/t/font_2077552_sf3gjr0qyxs.css");
	@import "uview-ui/index.scss";
	.titleNview-placing {
		height: var(--status-bar-height);
		padding-top: 44px;
		box-sizing: content-box;
	}

	@font-face {
	  font-family: 'iconfont';  /* project id 2203740 */
	  src: url('https://at.alicdn.com/t/font_2203740_51na61jlx76.eot');
	  src: url('https://at.alicdn.com/t/font_2203740_51na61jlx76.eot?#iefix') format('embedded-opentype'),
	  url('https://at.alicdn.com/t/font_2203740_51na61jlx76.woff2') format('woff2'),
	  url('https://at.alicdn.com/t/font_2203740_51na61jlx76.woff') format('woff'),
	  url('https://at.alicdn.com/t/font_2203740_51na61jlx76.ttf') format('truetype'),
	  url('https://at.alicdn.com/t/font_2203740_51na61jlx76.svg#iconfont') format('svg');
	}

	uni-slider .uni-slider-handle-wrapper {
		position: relative;
		height: 10upx !important;
		border-radius: 50upx;
		background-color: #e9e9e9;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
	}

	/* .iconfont {
		font-family: "iconfont" !important;
		font-size: 20px;
		font-style: normal;
		color: #5C5C5C;
		-webkit-font-smoothing: antialiased;
		-webkit-text-stroke-width: 0.2px;
		-moz-osx-font-smoothing: grayscale;
	} */

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
</style>
