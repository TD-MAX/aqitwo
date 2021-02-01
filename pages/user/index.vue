<template>
	<view class="content">
		<view class="header_nav">
			<view class="header_img" @click="to_setting">
				<image :src="user_info.photo" mode="aspectFill"></image>
			</view>
			<view class="head_msg">
				<p>{{user_info.name}}</p>
				<image v-if="vipname === 'VIP'" src="../../static/vip/vip.png" mode="aspectFit">

				</image>
				<image v-if="vipname === 'SVIP'" src="../../static/vip/svip.gif" mode="aspectFit"></image>
				<view class="date_time" v-if="viptype !== '0'">
					<text>会员到期时间：{{viptime}}</text>
				</view>
			</view>
		</view>
		<!-- 排行榜，签到有礼，积分商城 -->
		<view class="nav">
			<view class="_lists" v-for="(a,index) in headList" :key="index" @click="zwkf(a.path)">
				<image :src="a.src" mode="aspectFit"></image>
				<text>{{a.text}}</text>
			</view>
		</view>
		<!-- 我的钱包，我的收藏，我的会员 -->
		<view class="_tab">
			<view class="_list" v-for="(b,bindex) in contList" :key="bindex" @click="cont_to(b.path)">
				<image :src="b.src"></image>
				<text>{{b.text}}</text>
			</view>
		</view>
		<uni-popup ref="popupDialog" type="dialog" @change="change">
			<uni-popup-dialog title="身份已过期，请重新登录" content="该账号在另一台设备上登录，如非本人操作，请重新登录后进行修改密码" :isshow=false :before-close="false"
			 @confirm="dialogConfirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import uniLoadMore from '../components/uni-load-more/uni-load-more.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import _ from 'lodash'
	export default {
		// inject:['reload'],
		data() {
			return {
				user_info: '',
				num: 0,
				vipname: '',
				viptime: '',
				viptype: '',
				jifen: '',
				hui: {},
				qiandao_statue: 'more',
				headList: [{
						text: '网络评选',
						src: '../../static/aqiuser/toupiao.png',
						path: '../vote/v_list'
					},
					{
						text: '签到有礼',
						src: '../../static/qyservice/24.png',
						path: '../swiper/swiper1'
					},
					{
						text: '啊企福利',
						src: '../../static/aqiuser/7c16a7e69ac70d39e569515147ebe76.png',
						path: '../shop/shop'
					}
				],
				contList: [
					{
						text: '排行榜',
						src: '../../static/qyservice/23.png',
						path: '../ranking/index'
					},
					{
						text: '我的钱包',
						src: '../../static/aqiuser/a38255b6f313208e7facc400ac15c7e.png',
						path: '../shop/my_moneys'
					},
					{
						text: '我的关注',
						src: '../../static/aqiuser/98aba18780e13f45af77587993498ad.png',
						path: './my_guanzhu'
					},
					{
						text: '我的收藏',
						src: '../../static/aqiuser/c6c3769eb4baa16c96a6cdf38f83cda.png',
						path: '../user/mycollect'
					},
					{
						text: '我的活动',
						src: '../../static/aqiuser/my_huodong.png',
						path: './my_huodong'
					},
					{
						text: '我的会员',
						src: '../../static/aqiuser/39be26ae0bb6f9f5af0d30e15194d44.png',
						path: '../user/my_member'
					},
					{
						text: '浏览记录',
						src: '../../static/aqiuser/liulangjilu.png',
						path: './see_history'
					},
					{
						text: '推广计划',
						src: '../../static/aqiuser/my_huodong.png',
						path: './inviter'
					},
					{
						text: '帮助与反馈',
						src: '../../static/aqiuser/2b83e64c2963a49611a42ac712bbb57.png',
						path: './writeabout'
					},
					{
						text: '关于',
						src: '../../static/aqiuser/a8d12f42f01d178fe15def571e715ad.png',
						path: './about'
					},
				]
			}
		},
		components: {
			uniLoadMore,
			uniPopupDialog
		},
		onShow() {
			this.get_vip() //查询会员信息
			this.$http
				.post('lessonxiangqin/api/lessongetuser', {
					// .post('love/api/setUserInfo', {
					userid: uni.getStorageSync('userId')
				}, {})
				.then(res => {
					this.user_info = res.data
					console.log(this.user_info)
					console.log(this.user_info.phone)
					if (this.user_info.phone == null) {
						this.$refs.popupDialog.open()
					}
					// console.log(res)
				})
				.catch(err => {

				})
		},
		onLoad() {

		},
		//设置
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: '../xiangqin/user/usermsg'
			})
		},
		onReachBottom() {},
		methods: {
			change(e) {},
			dialogConfirm(done) {
				uni.clearStorage()
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
					console.log('websockte已关闭')
				})
				uni.reLaunch({
					url: '/pages/index/index'
				})
				done()
			},
			//去设置
			to_setting() {
				uni.navigateTo({
					url: '../xiangqin/user/usermsg',
					animationType: 'pop-in'
				})
			},
			//我的钱包，收藏，会员，帮助与反馈，关于
			cont_to(b) {
				if (b) {
					uni.navigateTo({
						url: b,
						animationType: 'pop-in'
					})
				} else {
					this.$api.msg('内测阶段，暂未开放')
				}
			},
			//个人信息
			edituserinfo() {
				uni.navigateTo({
					url: '../xiangqin/user/usermsg',
				})
				// this.$api.msg('敬请期待')
			},
			//会员
			get_vip() {
				this.$http.post('lessonaqi/api/lessongetvipinfo', {
						userid: uni.getStorageSync('userId')
					}, {})
					.then(res => {
						console.log(res)
						let list = []
						console.log(res)
						this.hui = res.data
						_.each(res.data, o => {
							if (o.vipname !== '') {
								list.push(o)
							}
						})
						console.log(list)
						if (list.length !== 0) {
							if (list[list.length - 1].enddate != null) {
								this.viptime = list[list.length - 1].enddate.slice(0, 10)
							}
							this.vipname = list[list.length - 1].vipname
							this.viptype = list[list.length - 1].viptype
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			//我的关注，，任务中心，积分商城
			zwkf(evt) {
				if (evt) {
					uni.navigateTo({
						url: evt,
						animationType: 'pop-in'
					})
				} else {
					this.$api.msg('内测阶段，暂未开放')
				}

			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background: #f4f4f4;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-bottom: 100upx;
	}

	._list image {
		width: 40rpx;
		height: 40rpx;
	}

	.co {
		font-size: 65upx;
		color: #fff;
	}

	.titleNview-placing {
		height: var(--status-bar-height);
		padding-top: 44px;
		box-sizing: content-box;
	}

	.nav {
		background-color: #fff;
		width: 98%;
		height: 200rpx;
		display: flex;
		// flex-direction: column;
		padding: 20rpx;
		margin-top: 20rpx;
		border-radius: 10rpx;
		box-sizing: border-box;
		flex: 1;
		display: flex;
		align-items: center;
	}

	._lists {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	._lists text {
		padding-top: 20rpx;
		font-size: 28rpx;
	}

	.nav image {
		width: 50rpx;
		height: 50rpx;
	}

	.header_nav {
		width: 98%;
		height: 240rpx;
		background-color: #fff;
		padding-left: 20upx;
		display: flex;
		justify-content: space-between;
		border-radius: 10rpx;
		box-sizing: border-box;
		margin: auto;

		.header_img {
			width: 120rpx;
			height: 120rpx;
			margin-top: 60upx;

			image {
				width: 120rpx;
				height: 120rpx;
				border-radius: 20upx;
			}
		}

		.head_msg {
			width: calc(100% - 140upx);
			height: 120upx;
			position: relative;
			font-size: 32upx;
			display: flex;
			padding-top: 10upx;
			flex-direction: column;
			justify-content: space-around;
			box-sizing: border-box;
			margin-top: 60upx;

			// border: 1px solid red;
			image {
				width: 120upx;
				height: 80upx;
			}

			.date_time {
				position: absolute;
				right: 0;
				bottom: 15upx;
				font-size: 28upx;
				color: #696969;
			}
		}
	}

	._tab {
		display: flex;
		flex-direction: column;
		width: 98%;
		height: 1000rpx;
		background-color: #fff;
		border-radius: 10rpx;
		margin-top: 14rpx;
		border: 1px solid #F2F2F2;

		._list {
			flex: 1;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 20rpx;
			border-bottom: 1px solid #F2F2F2;

			text {
				color: #333;
				font-size: 30rpx;
				position: absolute;
				left: 100rpx;
			}

			i {
				color: #999;
			}
		}
	}
</style>
