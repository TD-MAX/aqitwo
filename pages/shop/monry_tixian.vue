<template>
	<view class="monry_tixian">
		<view class="tixian_head">
			<image src="../../static/aqiuser/money/ali.png" mode="aspectFit">

			</image>
			<view class="weixin">
				支付宝
				<text>1-7个工作日内到账</text>
			</view>
			<view class="jiantou">
				<!-- <i class="iconfont">&#xe623;</i> -->
			</view>
		</view>
		<view class="tixian_content">
			<p>提现金额</p>
			<view class="">
				<input type="text" v-model="tixian_money" placeholder="提现金额" />
			</view>
			<view class="">
				<input type="text" v-model="zhenshi_name" placeholder="真实姓名" />
			</view>
			<button @click="tixian">提现</button>
		</view>
	</view>
</template>

<script>
	import moment from 'moment'
	export default {
		data() {
			return {
				tixian_money: '',
				zhenshi_name: ''
			}
		},
		methods: {
			//提现
			tixian() {
				let tiem = moment().format('D')
				console.log(tiem)
				if (tiem !== '9') {
					console.log('aaa')
					this.$api.msg('此功能仅在每月21号可进行提现')
				} else {
					if (this.tixian_money === '') {
						this.$api.msg('你还没有输入提现金额')
					} else {
						this.$http.post('lessonaqi/api/lessontixianshenqing',{
							userid: uni.getStorageSync('userId'),
							jine: this.tixian_money,
							type: '1',
							zhanghao: uni.getStorageSync('phone'),
							zhenshixingming: this.zhenshi_name
						},{})
						.then(res => {
							console.log(res)
							if (res.data === 1) {
								uni.showToast({
									title:'提现成功，等待到账',
									duration: 1500
								})
							} else if(res.data === 300) {
								this.$api.msg('余额不足')
							}
						})
						.catch(err => {
							console.log(err)
						})
					}
				}
			}
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: './new_location/tixian_history'
			})
		}
	}
</script>

<style lang="scss">
	page {
		padding-top: 20upx;
	}

	.monry_tixian {
		width: 96%;
		height: 540upx;
		margin: auto;
		border: 1px solid #C1C1C1;
		border-radius: 10upx;
	}

	.tixian_head {
		width: 100%;
		height: 120upx;
		display: flex;
		font-size: 32upx;
		border-bottom: 1px solid #C1C1C1;

		text {
			color: #696969;
			font-size: 28upx;
		}

		image {
			width: 100upx;
			height: 90upx;
			margin: 15upx 20upx;
		}

		.weixin {
			width: calc(100% - 200upx);
			height: 100%;
			display: flex;
			flex-direction: column;
			padding-top: 20upx;
		}

		.jiantou {
			height: 100%;
			line-height: 120upx;
			color: #696969;
		}
	}

	.tixian_content {
		width: 100%;
		font-size: 32upx;
		color: #696969;
		padding-left: 30upx;

		p {
			font-size: 36upx;
			margin: 20upx 0;
			color: #000;
		}

		view {
			width: 650upx;
			height: 85upx;
			box-sizing: border-box;
			border: 1px solid #C1C1C1;
			font-size: 28upx;
			border-radius: 5upx;
			display: flex;
			margin: 10upx 0;
			justify-content: flex-end;

			input {
				width: 98%;
				height: 100%;
			}
		}

		text {
			font-size: 28upx;
		}

		button {
			width: 550upx;
			height: 80upx;
			margin: 35upx 0;
			border-radius: 50upx;
			border: 1px solid #C1C1C1;
			color: #696969;
			background-color: #fff;
			box-sizing: border-box;
			font-size: 32upx;
			text-align: center;
			line-height: 80upx;
		}
	}
</style>
