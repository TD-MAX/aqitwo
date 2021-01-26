<template>
	<view class="member">
		<view class="member_head">
			<!-- <image src="../../static/promoter/shop.png" mode="scaleToFill"></image> -->
			<view class="user_kuan">
				<view class="headxian">
					<image :src="user_msg.photo" mode="aspectFill"></image>
					<view class="name_kuan">
						<p>{{user_msg.name}}</p>
						<!-- <text>当前成长值{{vip_msg.vipgrow === null ? '0' : vip_msg.vipgrow}}点</text> -->
					</view>
				</view>
				<view class="huiyuan_kuan">
					<view>{{endtime === '' ? '您还没有开通会员' : '会员vip会员至' + endtime}}</view>
					<view class="xufei" @click="xufei">
						{{endtime === '' ? '立即开通' : '立即续费'}}
					</view>
				</view>
			</view>
		</view>
		<view class="tequan">
			专享特权
		</view>
		<view class="tequan_msg">
			<view class="" 
			v-for="(item,index) in huiyuanList" :key="index">
				<image :src="item.src" mode=""></image>
				<text>{{item.text}}</text>
			</view>
		</view>
		<view class="liji" @click="xufei">
			{{endtime === '' ? '立即开通' : '立即续费'}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				huiyuanList: [{
						text: "尊贵标识",
						src: '../../static/vip/zhungui.png'
					},
					{
						text: "企业充值优惠",
						src: '../../static/vip/qibichongzhiyouhui.png'
					},
					{
						text: "每日福利",
						src: '../../static/vip/meirfuli.png'
					},
					{
						text: "签到福利",
						src: '../../static/vip/qiandaofuli.png'
					}
				],
				user_msg: {},
				vip_msg: {},
				endtime: ''
			}
		},
		methods: {
			//会员
			show() {
				this.$http.post('lessonaqi/api/lessongetvipinfo', {
						userid: uni.getStorageSync('userId')
					}, {})
					.then(res => {
						console.log(res)
						this.vip_msg = res.data[0]
						console.log(this.vip_msg)
						if (res.data[0].enddate !== null) {
							this.endtime = res.data[0].enddate.slice(0,10)
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			//获取用户信息
			init () {
				this.$http.post('lessonxiangqin/api/lessongetuser', {
						userid: uni.getStorageSync('userId')
					}, {})
					.then(res => {
						this.user_msg = res.data
					})
					.catch(err => {
				
					})
			},
			//续费
			xufei () {
				uni.navigateTo({
					url: '../huiyuan/index',
					animationType: 'pop-in'
				})
			}
		},
		onShow() {
			this.show() //会员信息查询
			this.init() //用户信息
		}
		
	}
</script>

<style lang="scss">
	.member {
		width: 100%;
	}

	.member_head {
		width: 100%;
		height: 120upx;
		position: relative;
		background-color: #F5F5F5;
		background-image: url(../../static/promoter/shop.png);
		background-size: 100% 100%;
	}

	.user_kuan {
		width: 86%;
		height: 320upx;
		position: absolute;
		box-sizing: border-box;
		left: 7%;
		background-image: url(../../static/vip/beijin.png);
		background-size: 100% 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.headxian {
			width: 100%;
			height: 120upx;
			box-sizing: border-box;
			padding: 40upx 30upx;
			display: flex;
			image {
				width: 100upx;
				height: 100upx;
				border-radius: 50%;
				margin-right: 20upx;
			}
			.name_kuan {
				width: 60%;
				height: 100upx;
				font-size: 32upx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				p {
					font-weight: 600;
				}
			}
		}
		.huiyuan_kuan {
			width: 90%;
			height: 100upx;
			color: #696969;
			font-size: 32upx;
			display: flex;
			justify-content: space-between;
			margin: 0 auto;
			.xufei {
				width: 140upx;
				height: 60upx;
				border-radius: 50upx;
				font-size: 28upx;
				text-align: center;
				line-height: 60upx;
				background-color: white;
			}
		}
	}
	.tequan {
		width: 86%;
		height: 60upx;
		font-size: 32upx;
		margin: 260upx auto 0 auto;
		font-weight: 600;
	}
	.tequan_msg {
		width: 84%;
		margin: auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		view {
			width: 30%;
			height: 140upx;
			display: flex;
			margin: 20upx 0;
			font-size: 28upx;
			font-weight: 600;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
			image {
				width: 100upx;
				height: 100upx;
				border-radius: 50%;
			}
		}
	}
	.liji {
		width: 80%;
		height: 80upx;
		font-size: 32upx;
		text-align: center;
		border: 1px solid #C1C1C1;
		border-radius: 50upx;
		color: #696969;
		line-height: 80upx;
		position: fixed;
		bottom: 30upx;
		right: 76upx;
	}
</style>
