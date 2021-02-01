<template>
	<view class="content">
		<!-- 标题栏和状态栏占位符 -->
		<!-- <view class="titleNview-placing"></view> -->
		<!-- <view class="aq">阿企</view> -->
		<view class="page-section-spacing">
			<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="true" :interval="3000" :duration="500">
				<swiper-item v-for="(n, index) in swipee_list" :key="index" @click="gglj(n.lianjie)">
					<image :src="n.image" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>

		<!-- 企业服务 -->
		<view class="nav">
			<view class="nav_tit">
				<text>企业服务</text>
				<view class="more" @click="news_Jump_qyservice">
					<text>更多</text>
				</view>
			</view>
			<view class="nav_content">
				<!-- <view class="_list" @click="nav_click">
					<image src="../../static/qyservice/10.png" mode=""></image>
					<text>企联会员</text>
				</view> -->
				<view class="_list" v-for="(x,syIndex) in headList" :key="syIndex" @click="toSuport(x.path)">
					<image :src="x.srcs" mode=""></image>
					<text>{{x.title}}</text>
				</view>
			</view>
		</view>

		<!-- 广告位 -->
		<view class="advertising">
			<!-- <image src="../../static/aqiuser/qiandao.gif" mode="aspectFill"></image> -->
			<!-- <image src="../../static/paihangban/shoutou.jpg" mode="aspectFill"></image> -->
			<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="true" :interval="3000" :duration="500">
				<swiper-item v-for="(n, index) in imglist" :key="index" @click="qian_dao(n.path)">
					<image :src="n.src" mode="widthFix"></image>
				</swiper-item>
			</swiper>
		</view>

		<!--企业信息-->
		<view class="news" v-for="(item,index) in typeList" :key="index">
			<view class="business">
				<view class="_left" @click="to_qiyemsg(item.qiyeid)">
					<image :src="item.qiyelogo" mode="aspectFill"></image>
				</view>
				<view class="_right" @click="to_qiyemsg(item.qiyeid)">
					<view class="tit">{{item.qiyename}}</view>
				</view>
				<view class="_last" @click="guanzhu(index)">
					{{item.isguanzhu == 1 ? '已关注' : '关注'}}
				</view>
				<view class="_rightlogo">
					<image class="zhanlue" src="../../static/diandian4.gif" mode="aspectFit" v-if="item.partner === 'Y'"></image>
					<image class="guanfang" src="../../static/guanwang.gif" mode="aspectFill" v-if="item.isguanfang === 1"></image>
					<!-- <image class="zhanlue" src="../../static/zhanluehezuo.png" mode="aspectFill"></image> -->
				</view>
			</view>
			<view class="news_content" @click="qiyezixun(index)" v-if="item.zixunid">
				<image :src="item.zixunfengmian" mode="aspectFill"></image>
				<view class="_right">
					<view class="tit">【资讯】{{item.zixuntitle}}</view>
					<view class="_bottom">
						<view class="num">
							<text>浏览量</text>
							<text>{{item.zixunrenshu}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="news_bottom" v-if="item.zhaopinid" @click="zhaopinzixun(index)">
				<view class="_lefts">
					<view class="tit">【招聘】{{item.zhaopintitle}}</view>
				</view>
				<image :src="item.zhaopinfengmian" mode="aspectFill"></image>
			</view>
		</view>
		<!-- <van-button type="primary">test</van-button> -->
		<uni-popup ref="popupDialog" type="dialog" @change="change">
			<uni-popup-dialog title="检查到有新版本" content="请点击确定更新" :before-close="true" @confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import uniLoadMore from '../components/uni-load-more/uni-load-more.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import _ from 'lodash'
	export default {
		data() {
			return {
				version: this.$store.state.version,
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				swipee_list: [],
				news_list: [],
				advertising: '',
				gz: '',
				headList: [{
						title: '金融支持',
						srcs: '../../static/qyservice/17.png',
						path: '../aqiSuport/aqiSuport'
					},
					{
						title: '爱恋',
						srcs: '../../static/qyservice/28.png',
						path: '../xiangqin/index/index'
					},
					{
						title: '信息采集',
						srcs: '../../static/qyservice/3.png',
						path: '../news/pickup_information'
					},
					{
						title: '企业荣誉',
						srcs: '../../static/qyservice/1.png',
						path: '../../pages/news/qiyeronyu'
					}
				],
				imglist: [
					{
						src: '../../static/paihangban/shoutou.jpg',
						path: '../vote/vote?data={"id":1,"name":"山西省名优企业活力榜","liu":257}'
					},
					{
						src: '../../static/aqiuser/qiandao.gif',
						path: '../swiper/swiper1'
					}
				],
				pictures: '',
				typeList: [],
				hide: false, // 用于监听页面隐藏
				tabCurrentIndex: 0,
				order_text: '',
				refund_text: '',
				pageNum: 1,
				news_list: [],
				more_page: 0

			}
		},
		components: {
			uniLoadMore,
			uniPopupDialog
		},
		onReachBottom() {

		},
		//下拉刷新
		onPullDownRefresh() {
			this.show()
			// 每次进入页面都加载一次
			if (!uni.getStorageSync('token')) {
				uni.navigateTo({
					url: `/pages/login/index`
				})
			}

			this.lunbotu() //轮播图

			this.$http
				.post('lessonaqi/api/lessongetzixuntuijian', {

				}, {})
				.then(res => {
					// console.log(res.data)
					this.news_list = res.data
				})
				.catch(err => {

				})
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		onShow() {
			// 每次进入页面都加载一次
			if (!uni.getStorageSync('token')) {
				uni.reLaunch({
					url: `/pages/login/index`
				})
			}
			this.lunbotu() //轮播图
			this.head() //入口功能展示
			// this.guanggao() //广告
			this.$http
				.post('lessonaqi/api/lessongetzixuntuijian', {

				}, {})
				.then(res => {
					// console.log(res.data)
					this.news_list = res.data
				})
				.catch(err => {

				})
			this.show()
		},
		onLoad() {
			// 第一次进入页面加载一次
			//版本更新
			this.AndroidCheckUpdate()
			this.show()
			this.location()
		},
		methods: { // 方法集
			//轮播图
			lunbotu() {
				this.$http.post('lessonaqi/api/lessongetlunbotu', {}, {})
					.then(res => {
						console.log(res.data)
						this.swipee_list = res.data
					})
					.catch(err => {})
			},
			//轮播图跳转链接
			gglj(inv) {
				if (inv === '#') {
					console.log('暂时没有链接')
				} else {
					uni.navigateTo({
						// url: '../news/qiyeZx?data=' + inv
						url: '../news/newsdetails?id=' + inv
					})
				}
			},
			//签到
			qian_dao(value) {
				uni.navigateTo({
					url: value
				})
			},
			//首页功能入口展示
			head() {
				//首页功能入口展示
				let lists = uni.getStorageSync('sy_zs')
				if (lists) {
					this.headList = lists
					console.log(this.headList)
				}
			},
			//广告
			// guanggao () {
			// 	this.$http
			// 		.post('aqi/api/getguanggao', {

			// 		}, {})
			// 		.then(res => {
			// 			console.log(res.data)
			// 			this.advertising = res.data
			// 		})
			// 		.catch(err => {})
			// },
			//检查版本更新
			AndroidCheckUpdate() {
				let _this = this;
				this.$http.post('lessonaqi/api/lessonappbanben', {
						version: this.version
					}, {})
					.then(res => {
						console.log(res)
						if (res.data !== '') {
							this.$refs.popupDialog.open()
						} else {
							console.log('已是最新版本')
						}
					})
			},
			change(e) {
				//对话框状态
			},
			//关注
			guanzhu(ent) {
				this.$http.post('lessonaqi/api/lessonqiyeguanzhu', {
						userid: uni.getStorageSync('userId'),
						qiyeid: this.typeList[ent].qiyeid
					}, {})
					.then(res => {
						if (this.typeList[ent].isguanzhu == 1) {
							this.typeList[ent].isguanzhu = 0
							this.$api.msg('取消关注')
						} else {
							this.typeList[ent].isguanzhu = 1
							this.$api.msg('关注成功')
						}

						console.log(res.data)
					})
					.catch(err => {
						console.log(err)
					})
			},
			/**
			 * 对话框点击确认按钮
			 */
			dialogConfirm(done) {
				this.$http.post('lessonaqi/api/lessonappbanben', {
						version: this.version
					}, {})
					.then(res => {
						if (res.data !== '') {
							let url = res.data
							console.log(url)
							done ()
							this.$api.msg('正在下载')
							var tak = uni.downloadFile({
								url: url,
								success: (downloadResult) => {
									console.log(downloadResult)
									if (downloadResult.statusCode === 200) {
										this.$api.msg('下载成功，正在重启')
										setTimeout(() => {
											plus.runtime.install(downloadResult.tempFilePath, {
													force: true
												}, function() {
													plus.runtime.restart();
													console.log('安装成功', 'install success...')
												}),
												function(e) {
													console.log('安装失败', 'install fail...')
												}
										},1600)
									}
								}
							})
						} else {
							console.log('已是最新版本')
						}
					})
			},
			dialogClose(done) {
				// this.$refs.popopMessage.open()
				done()
			},
			//企业资讯
			qiyezixun(e) {
				uni.navigateTo({
					url: '../news/qiyeZx?data=' + this.typeList[e].zixunid,
					animationType: 'pop-in'
				})
			},
			//招聘资讯
			zhaopinzixun(n) {
				uni.navigateTo({
					url: '../news/qiyeZx?data=' + this.typeList[n].zhaopinid
				})
			},
			//首页展示内容
			toSuport(msg) {
				if (msg) {
					uni.navigateTo({
						url: msg,
						animationType: 'pop-in'
					})
				} else {
					this.$api.msg('此功能暂未开放')
				}

			},
			//企业信息
			to_qiyemsg(evt) {
				uni.navigateTo({
					url: '../news/details?data=' + evt,
					animationType: 'pop-in'
				})
			},
			//获取位置
			location() {
				let id = uni.getStorageSync('userId')
				let _this = this
				uni.getLocation({
					type: 'gcj02',
					success: function(res) {
						uni.setStorage({
							key: 'location',
							data: {
								jindu: res.longitude,
								weidu: res.latitude
							}
						})
						_this.$http.post('lessonxiangqin/api/lessonupdatezuobiao', {
								userid: id,
								zuobiao: res.longitude + ',' + res.latitude
							}, {})
							.then(response => {
								console.log('aaaa')
								console.log(response)
							})
							.catch(err => {
								console.log(err)
							})
					},
					fail: function(err) {
						console.log(err);
					}
				});
			},
			news_details(n) {
				uni.navigateTo({
					url: `/pages/news/newsdetails?id=${n}`
				})
			},
			nav_click() {
				this.$api.msg('敬请期待')
			},
			// 跳转到资讯主页
			news_Jump() {
				//  switchTabq:切换到
				uni.switchTab({
					url: `/pages/news/index`
				})
			},
			// 跳转到企业服务页
			news_Jump_qyservice() {
				uni.navigateTo({
					url: '../news/qyservice'
				})
			},
			// 跳转到相亲主页面
			// xiangqin() {
			// 	uni.navigateTo({
			// 		url: '../xiangqin/index/index'
			// 	})
			// },
			_details(n) {
				uni.navigateTo({
					url: `/pages/news/newsdetails?id=${n}`,
				})
			},
			show() {
				let _this = this
				_this.$http.post('lessonaqi/api/lessonshouyeqiyezixun', {
						userid: uni.getStorageSync('userId'),
						pageNum: this.pageNum,
						pageSize: 5
					}, {})
					.then(res => {
						// console.log(res)
						console.log(res.data.rows)
						this.typeList = res.data.rows
					})
					.catch(err => {
						console.log(err)
					})
			}
		}
	}
</script>

<style lang="scss">
	// 页面
	page {
		// 背景色
		background-color: #3f3e51;
	}


	// 资讯标题
	.zixun_title {
		color: #FFFFFF;
		text-align: center;

		&.current {
			color: #FFFFFF;
			font-size: 38rpx;

			&:after {
				// 	content: '';
				// 	position: absolute;
				// 	left: 50%;
				// 	bottom: 0;
				// 	transform: translateX(-50%);
				// 	width: 88rpx;
				// 	height: 0;
				// 	border-bottom: 4rpx solid #999;
			}
		}
	}

	.aq {
		margin-top: 20rpx;
		color: #FFFFFF;
		font-weight: bold;
	}

	.content {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		// border: 1px solid white;
		align-items: center;
		justify-content: center;

		.page-section-spacing {
			.swiper {
				width: 94%;
				height: 100%;
				margin: auto;
				overflow: hidden;
				border-radius: 20rpx;
			}

			width: 100%;
			height: 300rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.titleNview-placing {
			height: var(--status-bar-height);
			padding-top: 44px;
			box-sizing: content-box;
		}

		//企业信息
		.business {
			position: relative;
			display: flex;
			border-bottom: 1px solid #F2F2F2;
		}

		.business {
			width: 100%;
			height: 120upx;
			display: flex;
			justify-content: space-between;

			._left {
				width: 100upx;
				height: 100upx;
				margin-top: 10upx;
			}

			._left image {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				// margin-left: 15px;
			}

			._right {
				position: absolute;
				left: 120upx;
				bottom: 60upx;
			}

			._last {
				width: 120upx;
				font-size: 28upx;
				margin-top: 40upx;
				height: 40upx;
				border-radius: 20upx;
				text-align: center;
				line-height: 40upx;
				background-color: #FFE8C3;
				border: 1px solid #FFCC7B;
				color: #FFA318;
			}

			.tit {
				align-items: center;
				font-size: 30rpx;
				display: flex;
			}

			._rightlogo {
				position: absolute;
				bottom: 0;
				left: 120upx;
				box-sizing: border-box;
				// border: 1px solid red;
			}

			.guanfang {
				width: 145rpx;
				height: 45rpx;
			}
			.zhanlue {
				width: 150upx;
				height: 50upx;
				top: 3upx;
			}
		}

		.tit {
			align-items: center;
			font-size: 28rpx;
			display: flex;
			flex: 1;
			margin-right: 10rpx;
		}

		.news_bottom {
			display: flex;
			justify-content: space-between;
			padding-bottom: 20rpx;
			border-bottom: 1px solid #F2F2F2;

			._lefts {
				width: calc(100% - 160upx);
				max-height: 80upx;
				margin: 30upx auto;
				// border: 1px solid red;
				overflow: hidden;
			}
		}

		.news_bottom image {
			width: 140rpx;
			height: 100rpx;
			border-radius: 10rpx;
			display: block;
			float: right;
		}

		.nav {
			background-color: #fff;
			width: 94%;
			height: 230rpx;
			display: flex;
			flex-direction: column;
			padding: 0 20rpx;
			margin-top: 20rpx;
			border-radius: 20rpx;
			box-sizing: border-box;

			.nav_tit {
				height: 80rpx;
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;

				text {
					color: #333;
					font-size: 30rpx;
				}

				.more {
					display: flex;

					text {
						color: #000000;
						font-size: 26rpx;
					}
				}
			}

			.nav_content {
				flex: 1;
				display: flex;
				align-items: center;

				._list {
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: center;

					image {
						width: 50rpx;
						height: 50rpx;
					}

					text {
						padding-top: 20rpx;
						font-size: 24rpx;
						color: #666;
					}
				}
			}
		}

		.advertising {
			width: 94%;
			height: 208rpx;
			margin-top: 24rpx;
			// background-color: #fff;
			border-radius: 20rpx;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.news_title {
			height: 60rpx;
			background-color: #3f3e51;
			width: 94%;
			display: flex;
			flex-direction: column;
			padding: 0 20rpx;
			margin-top: 25rpx;
			border-radius: 20rpx;
			box-sizing: border-box;

			.news_tit {
				height: 40rpx;
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 10rpx;

				text {
					color: #FFFFFF;
					font-size: 30rpx;
				}
			}
		}

		.news {
			// height: 600rpx;
			background-color: #fff;
			width: 94%;
			display: flex;
			flex-direction: column;
			padding: 0 20rpx;
			margin-top: 24rpx;
			margin-bottom: 5rpx;
			border-radius: 20rpx;
			box-sizing: border-box;

			.news_tit {
				height: 80rpx;
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;

				text {
					color: #FFFFFF;
					font-size: 30rpx;
				}

				.more {
					display: flex;

					text {
						color: #999;
						font-size: 30rpx;
					}
				}
			}

			.news_content {
				// flex: 1;
				display: flex;
				align-items: center;
				margin-bottom: 12rpx;
				margin-top: 20rpx;
				border-bottom: 1px solid #F2F2F2;
				padding-bottom: 10px;

				image {
					width: 240rpx;
					height: 150rpx;
					border-radius: 12rpx;
				}

				._right {
					width: calc(100% - 260upx);
					display: flex;
					padding-left: 20rpx;
					flex-direction: column;

					.tit {
						font-size: 28rpx;
						color: #333;
						box-sizing: border-box;
						// border: 1px solid red;
						max-height: 120upx;
						overflow: hidden;
						text-align: left;
						// text-overflow: ellipsis;
						// overflow: hidden;
						// display: -webkit-box;
						// -webkit-line-clamp: 2;
						// -webkit-box-orient: vertical;
					}

					._bottom {
						display: flex;
						align-items: center;
						// box-sizing: border-box;
						// border: 1px solid red;
						justify-content: space-between;
						padding-top: 20rpx;

						.like {
							display: flex;

							view {
								display: flex;
								align-items: center;
								color: #999;
								padding-right: 20rpx;

								i {
									font-size: 24rpx;
									padding-right: 10rpx;
								}

								text {
									font-size: 28rpx;
								}
							}
						}
					}

					.num {
						display: flex;
						align-items: center;

						text {
							font-size: 28rpx;
							color: #999;
						}
					}
				}
			}
		}
	}
</style>
