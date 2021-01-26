<template>
	<view class="qyservice">
		<view class="qyservice_head">
			<text>首页展示</text>
			<text @click="admin">管理</text>
		</view>
		<view class="content">
			<view class="nav-item1" v-for="(a,syIndex) in shoueyList" :key="syIndex">
				<view class="jiajian" v-show="loading"
				@click="pop_list(syIndex)">
					<image src="../../static/aqiuser/jian.png" mode="">
						
					</image>
				</view>
				<image :src="a.srcs" @click="nav_click(a.path)"></image>
				<text @click="nav_click(a.path)">{{a.title}}</text>
			</view>
		</view>
		<view class="content">
			<view v-for="(item, index) in msgList" :key="index" class="nav-item">
				<view class="jiajian" v-show="loading"
				@click="add_list(index)">
					<image src="../../static/aqiuser/jia.png" mode="">
						
					</image>
				</view>
				<image :src="item.srcs" @click="nav_click(item.path)"></image>
				<text @click="nav_click(item.path)">{{item.title}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				loading: false,
				swipee_list: [],
				news_list: [],
				advertising: '',
				msgList: [
					//第一行
					{
						title: '时政学习',
						srcs: '../../static/qyservice/18.jpg',
						path: '../treatment/treatment'
					},
					{
						title: '本地服务',
						srcs: '../../static/qyservice/2.png',
						path: '../../pages/index/bendi'
					},
					{
						title: '科研成果',
						srcs: '../../static/qyservice/11.png',
						path: '../../pages/index/keyanchenguo'
					},
					{
						title: '法务支持',
						srcs: '../../static/qyservice/25.png',
						path: '../treatment/fawuzhichi'
					},
					{
						title: '企业认证',
						srcs: '../../static/qyservice/21.png',
						path: '../../pages/news/qiyerenzheng'
					},
					// {
					// 	title: '资料填报入口',
					// 	srcs: '../../static/qyservice/3.png'
					// },
					// {
					// 	title: '招商引资',
					// 	srcs: '../../static/qyservice/8.png'
					// },
					// {
					// 	title:'消息通知',
					// 	src:'../../static/qyservice/9.png'
					// },
					// {
					// 	title: '人才储备',
					// 	srcs: '../../static/qyservice/10.png'
					// },
					// {
					// 	title: '诚信系统',
					// 	srcs: '../../static/qyservice/12.png'
					// },
					//第三行
					// {
					// 	title: '职工之家',
					// 	srcs: '../../static/qyservice/13.png'
					// },
					// {
					// 	title: '金融中心',
					// 	srcs: '../../static/qyservice/15.png'
					// },
					// {
					// 	title: '劳动仲裁',
					// 	srcs: '../../static/qyservice/26.png'
					// }
					
				],
				shoueyList: [
					{
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
				]
			}
		},
		methods: {
			//管理
			admin () {
				this.loading = !this.loading
			},
			//点击跳转
			nav_click(e) {
				if (e) {
					uni.navigateTo({
						url: e
					})
				} else {
					this.$api.msg('内测期间，暂未开启')
				}
			},
			//添加
			add_list (evt) {
				if (this.shoueyList.length === 4) {
					this.$api.msg('首页最多只能展示四个')
				} else {
					this.shoueyList.push(this.msgList[evt])
					this.msgList.splice(evt,1)
				}
			},
			//删除
			pop_list (event) {
				console.log(event)
				console.log(this.shoueyList[event])
				this.msgList.push(this.shoueyList[event])
				this.shoueyList.splice(event,1)
			}
		},
		onBackPress() {
			uni.setStorage({
				key: 'sy_zs',
				data: this.shoueyList
			})
			uni.setStorage({
				key: 'shengyu',
				data: this.msgList
			})
		},
		onLoad(option) {
			let list = uni.getStorageSync('sy_zs')
			let sheng = uni.getStorageSync('shengyu')
			if (list) {
				this.shoueyList = list
			}
			if (sheng) {
				this.msgList = sheng
			}
		}
	}
</script>

<style lang="scss">
	.qyservice{
		width: 100%;
		height: 100%;
	}
	.qyservice_head{
		width: 90%;
		height: 80upx;
		margin: auto;
		box-sizing: border-box;
		color: #696969;
		box-sizing: border-box;
		padding-left: 20upx;
		padding-right: 20upx;
		font-size: 32upx;
		line-height: 80upx;
		display: flex;
		justify-content: space-between;
	}
	.content {
		box-sizing: border-box;
		background: #fffff;
		height: 100%;
		display: flex;
		flex-wrap: wrap;
		width: 90%;
		margin: auto;
	}
	.nav-item1{
		width: 25%;
		height: 146rpx;
		font-size: 30rpx;
		color: #333;
		position: relative;
		border-bottom: 2px solid #F5F5F5;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		.jiajian{
			position: absolute;
			top: 10upx;
			width: 30upx;
			height: 30upx;
			font-size: 14upx;
			right: 20upx;
			font-weight: 600;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
	.nav-item1 image{
		width: 60rpx;
		height: 60rpx;
	}
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

	.nav-item {
		width: 25%;
		/* align-items: auto; */
		height: 146rpx;
		font-size: 30rpx;
		position: relative;
		color: #333;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		/* text-align: center; */
		
		font-size: 12px;
		.jiajian{
			position: absolute;
			top: 10upx;
			width: 30upx;
			height: 30upx;
			font-size: 14upx;
			right: 20upx;
			font-weight: 600;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}

	.nav-item image {
		width: 60rpx;
		height: 60rpx;
		/* left: 56rpx;
		margin-top: 46rpx; */
	}
</style>
