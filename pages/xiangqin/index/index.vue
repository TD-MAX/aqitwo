<template>
	<view class="content">
		<view class="header_tit">
			<image src="../../../static/xiangqin/zuojiantou.png" mode="aspectFill" @click="fanhui"></image>
			<picker mode="selector" :range="sxList" @change="sxChange"class="header_tit0">
				<view class="header_tit1"><image src="../../../static/xiangqin/youshaixuan.png" mode="aspectFill"></image><view>筛选</view></view>
			</picker>
		</view>
		<view class="item">
			<view class="bottom_img">
				<view class="bottom_img1">
					<image src="../../../static/earth.png" mode="aspectFill"></image>
				</view>
				<!-- <view class="bottom_button"><button @click="quanbu">全部</button>
					<button @click="yixing">异性</button></view> -->

			</view>
			<view class="user_box">
				<view class="user_name" v-for="(n, index) in user_data" :key="index" :style="'left:' + arr[index] + 'rpx;'" @click="go_details(n.id)">
					<image :src="n.xiangqinphoto" mode="aspectFill"></image>
					<view class="_right">
						<text>{{n.xiangqinname}}</text>
						<view class="address">
							<i class="iconfont">&#xe601;</i>
							<text>{{n.juli}}km</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<Tab :tab_active="0"></Tab>
	</view>
</template>

<script>
	import _ from 'lodash' //js操作库
	import Tab from '../../components/tab.vue' //底部导航栏
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				user_data: [],
				arr: [],
				sxList:['全部','附近异性'],
				count: '',
				zhanshi: this.$store.state.zhanshi, //底部导航栏未读消息是否展示
				nickname: '',
				headUrl: '',
				gender: '',
			}
		},
		components: {
			Tab
		},
		onReachBottom() {
			// this.init()
			// if (this.pageNum <= this.more_page) {
			// 	uni.showLoading({
			// 	    title: '加载中'
			// 	});
			// }
		},
		onNavigationBarButtonTap() {
			uni.getLocation({
				success: res => {
					console.log(res)
				}
			})
		},
		onShow() {},
		onLoad() {
			console.log(uni.getStorageSync('userId'))
			if (uni.getStorageSync('news_user') == 1) {
				this.show()
				this.$http.post('lessonxiangqin/api/getUserInfo', {
						userId: uni.getStorageSync('userId')
					}, {})
					.then(res => {
						console.log(res)
						uni.setStorageSync('payDeposit', res.data.data.payDeposit)
						this.nickname = res.data.data.nickname
						this.headUrl = res.data.data.headUrl
						this.gender = res.data.data.gender
						if (this.gender == 1) {
							this.gender = '男'
						} else if (this.gender == 2) {
							this.gender = '女'
						}
					})
					.catch(err => {
						console.log(err)
					})
			} else {
				uni.redirectTo({
					url: '/pages/xiangqin/login/index2'
				})
			}
			uni.getLocation({
				type: 'gcj02',
				geocode: true,
				success: function(res) {
					console.log(res)
					console.log(this.areaCode)
					uni.setStorage({
						key: 'cityCode',
						data: {
							jindu: res.longitude,
							weidu: res.latitude,
							cityCode: res.address.cityCode,
							areaCode: res.address.cityCode
						}
					})
				},
				fail: function(err) {
					console.log(err);
				}
			});

		},

		//下拉刷新
		onPullDownRefresh() {
			this.show()
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		// computed:{
		// 	...mapState(['zhanshi'])
		// },
		methods: {
			...mapMutations(['recept']),
			fanhui(){
				uni.reLaunch({
					url:'../../index/index'
				})
			},
			sxChange(e){
				console.log(e)
				if(e.detail.value == 0){
					this.show()
				}else if(e.detail.value == 1){
					this.yixing()
				}
			},

			yixing() {
				let _this = this
				let id = uni.getStorageSync('userId') //id
				console.log(id)

				
				_this.$http
					.post('lessonxiangqin/api/nearby', {
						userId: id,
						nickname:this.nickname,
						cityCode:uni.getStorageSync('cityCode').cityCode,
						areaCode:uni.getStorageSync('cityCode').cityCode,
						longitude:uni.getStorageSync('cityCode').jindu,
						latitude:uni.getStorageSync('cityCode').weidu,
						headUrl:this.headUrl,
						gender:this.gender
					}, {})
					.then(response => {
						console.log(response)
						if(response.data.code != 200){
							uni.showToast({
								title:response.data.msg,
								icon:"none"
							})
						}else{
							_this.user_data = response.data.data
							console.log(_this.user_data.data)
							
							_.each(_this.user_data, o => {
								o.juli = Math.ceil(o.juli / 1000)
							})
						}
						
					})
					.catch(err => {})


			

		},
	//渲染首页
	show() {
			let _this = this
			let id = uni.getStorageSync('userId') //id
			let longitude = uni.getStorageSync('location').jindu //经度
			let latitude = uni.getStorageSync('location').weidu //纬度
			console.log(id)
			_this.arr = []
			for (let i = 0; i < 10; i++) {
				_this.arr.push(Math.random() * 580)
			}
			_this.$http.post('lessonxiangqin/api/lessonupdatezuobiao', {
					userid: id,
					zuobiao: longitude + ',' + latitude
				}, {})
				.then(res => {
					console.log(res)
					_this.$http
						.post('lessonxiangqin/api/lessonusershouye', {
							userid: id
						}, {})
						.then(response => {
							console.log(response)
							_this.user_data = response.data
							console.log(_this.user_data)
							_.each(_this.user_data, o => {
								o.juli = Math.ceil(o.juli / 1000)
							})
						})
						.catch(err => {})
				})
				.catch(error => {
					console.log(error)
				})
		},
		//换一批
		// dianji(){
		// 	console.log('正在刷新')
		// },
		//去往私聊页面
		go_details(n) {
			console.log(n)
			// console.log(this.user_data[0].id)
			uni.navigateTo({
				url: '/pages/xiangqin/user/userinfo?data=' + n
			})
		},
		// go_userinfo(n) {
		// 	uni.navigateTo({
		// 		url: `/pages/xiangqin/user/userinfo?id=${n}`
		// 	})
		// },
		init() {
			this.$http
				.post('lessonxiangqin/api/lessonuserlist', {
					id: uni.getStorageSync('userId'),
					pageNum: this.pageNum,
					pageSize: 10
				}, {})
				.then(res => {
					console.log(res)
					_.each(res.data.rows, o => {
						this.user_data.push(o)
					})
					uni.hideLoading()
					this.more_page = Math.ceil(res.data.total / 5)
					if (this.pageNum === this.more_page) {
						this.loadingType = 'nomore'
					}
					this.pageNum++
				})
				.catch(err => {})
		},
	}
	}
</script>

<style lang="scss">
	page {
		background-color: #01021B;
		height: 100%;
	}

	.content {
		height: 100%;
		width: 100%;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-image: url('https://qilianxiangqin.oss-cn-beijing.aliyuncs.com/xiangqin/app/xingxingback.png');
		background-size: cover;
		// margin-top: 50rpx;
		.header_tit{
			display: flex;
			height: 100rpx;
			width: 100%;
			font-size: 30rpx;
			// line-height: 60rpx;
			box-sizing: border-box;
			color: white;
			margin-top: 50rpx;
			// padding: 0 24rpx;
			.header_tit0{
				margin-left: 60%;
			}
			.header_tit1{
				display: flex;
				margin-left: 100%;
				height: 40rpx;
				width: 120rpx;
				border: 1px solid #333340;
				border-radius: 20rpx;
				margin-top: 20rpx;
				image{
					height: 30rpx;
					width: 30rpx;
					margin-top: 5rpx;
					margin-left: 10%;
				}
				view{
					margin-left: 5rpx;
				}
			}
			image{
				height: 40rpx;
				width: 20rpx;
				margin-top: 20rpx;
				margin-left: 2%;
			}
		}
		// .shuaxin{
		// 	position: fixed;
		// 	top: 90upx;
		// 	right: 50upx;
		// 	width: 60upx;
		// 	color: #16C2C2;
		// 	height: 60upx;
		// 	border-radius: 50%;
		// 	text-align: center;
		// 	line-height: 60upx;
		// 	background-color: white;
		// }
		.item {
			width: 100%;
			height: 100%;
			position: relative;

			.bottom_img {
				width: 100%;
				height: 310rpx;
				position: absolute;
				bottom: 100rpx;

				// display: flex;
				.bottom_img1 {
					width: 100%;
					height: 100%;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.bottom_button {
					display: flex;
					width: 300rpx;
					height: 80rpx;
					margin-top: -100rpx;
					margin-left: 226rpx;

					button {
						width: 300rpx;
						height: 80rpx;
						// margin-left: 20rpx;
						background-color: #25D3D2;
					}
				}


			}

			.user_box {
				width: 100%;
				height: 83%;
				display: flex;
				flex-direction: column;

				.user_name {
					display: flex;
					height: 100rpx;
					// justify-content: center;
					// align-items: center;
					position: relative;
					left: 0;

					image {
						width: 71rpx;
						height: 71rpx;
						border-radius: 50%;
					}

					._right {
						display: flex;
						flex-direction: column;
						color: #fff;
						font-size: 30rpx;
						padding-left: 16rpx;

						.address {
							display: flex;

							.iconfont {
								color: #25D3D2;
							}

							text {
								font-size: 24rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
