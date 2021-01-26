<template>
	<view class="dingdan">
		<view class="dingdan_head">
			<view class="msg">
				<view class="" style="color: red;" v-if="dizhi === ''" @click="updata_location">
					添加收货地址
				</view>
				<view class="" v-if="dizhi !== ''">
					<text class="name">{{dizhi.name}}</text>
					<text class="phone">{{dizhi.phone}}</text>
					<text class="location">{{dizhi.sheng}}{{dizhi.shi}}{{dizhi.qu}}{{dizhi.xiangxi}}</text>
				</view>
				<text class="up_location" @click="updata_location">更换收货地址</text>
			</view>
			<view class="msg_bottom">
				<text>商品将送至您的收货地址</text>
			</view>
		</view>
		<view class="dingdan_detail">
			<view class="detail_top">
				<image :src="shopList.fengmian" mode="aspectFill"></image>
				<view class="">
					<text>{{shopList.name}}</text>
					<text>x1</text>
				</view>
			</view>
			<view class="detail_bottom">
				<text>商品金额</text>
				<text style="color: red;">{{shopList.jiage}}积分</text>
			</view>
		</view>
		<view class="sub_dingdan">
			<view class="heji">
				<p>合计：{{shopList.jiage}}积分</p>
				<text>剩余：{{yue}}积分</text>
			</view>
			<view class="submit_but" @click="sub_dd">
				<button>提交订单</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dizhi: uni.getStorageSync('dizhi'),
				id: '',
				yue: '',
				jia: '',
				shopList: {}
			}
		},
		methods: {
			//更换收货地址
			updata_location() {
				uni.navigateTo({
					url: './new_location/select_location',
					animationType: 'pop-in'
				})
			},
			//展示
			show() {
				this.$http.post('lessonaqi/api/lessonshangpinxiangqing', {
						id: this.id
					}, {})
					.then(res => {
						console.log(res.data)
						this.shopList = res.data
						this.jia = res.data.jiage
					})
					.catch(err => {
						console.log(err)
					})
			},
			//我的钱包
			money() {
				this.$http.post('lessonaqi/api/lessonqianbaozhanshi', {
						userid: uni.getStorageSync('userId')
					}, {})
					.then(res => {
						this.yue = res.data.jifen
					})
			},
			//获取ip
			ready() {
				var net = plus.android.importClass("java.net.NetworkInterface")
				var wl0 = net.getByName('wlan0')
				var macByte = wl0.getHardwareAddress()
				var str = ''
				//下面这段代码来自网络  
				for (var i = 0; i < macByte.length; i++) {
					var tmp = "";
					var num = macByte[i];
					if (num < 0) {
						tmp = (255 + num + 1).toString(16);
					} else {
						tmp = num.toString(16);
					}
					if (tmp.length == 1) {
						tmp = "0" + tmp;
					}
					str += tmp;
				}
				console.log(str)
			},
			//提交订单
			sub_dd() {
				if (this.dizhi === '') {
					this.$api.msg('请添加收货地址')
				} else {
					// var net = plus.android.importClass("java.net.NetworkInterface")
					// var wl0 = net.getByName('wlan0')
					// var macByte = wl0.getHardwareAddress()
					// var str = ''
					// //下面这段代码来自网络  
					// for (var i = 0; i < macByte.length; i++) {
					// 	var tmp = "";
					// 	var num = macByte[i];
					// 	if (num < 0) {
					// 		tmp = (255 + num + 1).toString(16);
					// 	} else {
					// 		tmp = num.toString(16);
					// 	}
					// 	if (tmp.length == 1) {
					// 		tmp = "0" + tmp;
					// 	}
					// 	str += tmp;
					// }
					if (this.shopList.jiage > this.yue) {
						this.$api.msg('您的余额不足！')
						return
					}
					this.$api.msg('兑换尚未开启')
					// let jiewei = Number(this.jia) * 100
					// console.log(jiewei)
					// this.$http.post('pay/createOrder', {
					// 	body: "企币充值",
					// 	detail: uni.getStorageSync('userId'),
					// 	spbillCreateIp: '1.1.1.1',
					// 	totalFee: jiewei
					// }, {})
					// .then(res=>{
					// 	console.log(res)
					// 	if (res.data.code !== 500) {
					// 		var orderInfo = {
					// 			"appid": res.data.appId,
					// 			"noncestr": res.data.nonceStr,
					// 			"package": res.data.packageValue,
					// 			"partnerid": res.data.partnerId,
					// 			"prepayid": res.data.prepayId,
					// 			"timestamp": res.data.timeStamp,
					// 			"sign": res.data.sign
					// 		}
					// 		uni.requestPayment({
					// 			provider: 'wxpay',
					// 			orderInfo: orderInfo,
					// 			success: function(res) {
					// 				console.log('success:' + JSON.stringify(res));
					// 				uni.showToast({
					// 					title:'支付成功'
					// 				})
					// 			},
					// 			fail: function(err) {
					// 				console.log('fail:' + JSON.stringify(err));
					// 			}
					// 		});
					// 	} else {
					// 		this.$api.msg('遇到未知错误，请稍后再试')
					// 	}
					// })
					// .catch(err=>{
					// 	console.log(err)
					// })
				}
			}
		},
		onShow() {
			this.dizhi = uni.getStorageSync('dizhi')
		},
		onLoad(option) {
			this.id = option.data
			this.show()
			this.money()
			this.ready() //获取mac地址
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
	}

	.dingdan {
		width: 100%;
		height: 100%;
		padding-top: 15upx;

		.dingdan_head {
			width: 98%;
			min-height: 200upx;
			margin: auto;
			box-sizing: border-box;
			border-radius: 10upx;
			border: 1px solid #C1C1C1;

			text {
				font-size: 28upx;
			}

			.msg {
				width: 96%;
				min-height: 150upx;
				margin: auto;
				position: relative;
				padding-top: 35upx;
				box-sizing: border-box;
				border-bottom: 1px solid #C1C1C1;

				view {
					width: 75%;
					min-height: 100upx;
					overflow-x: hidden;
					// border: 1px solid red;

				}

				.name {
					font-size: 32upx;
					margin-right: 30upx;
				}

				.location {
					display: block;
					margin-top: 15upx;
				}

				.up_location {
					position: absolute;
					right: 0;
					bottom: 20upx;
					color: red;
				}
			}

			.msg_bottom {
				width: 96%;
				height: 50upx;
				margin: auto;
			}
		}

		.dingdan_detail {
			width: 98%;
			height: 400upx;
			margin: 20upx auto;
			border: 1px solid #C1C1C1;
			border-radius: 10upx;

			.detail_top {
				width: 96%;
				height: 250upx;
				border-bottom: 1px solid #C1C1C1;
				margin: auto;
				display: flex;
				justify-content: space-between;

				image {
					width: 200upx;
					height: 160upx;
					margin: 45upx 0;
				}

				view {
					width: calc(100% - 215upx);
					height: 160upx;
					display: flex;
					margin: 45upx 0;
					flex-direction: column;
					justify-content: space-between;
				}
			}

			.detail_bottom {
				width: 96%;
				height: 150upx;
				line-height: 150upx;
				display: flex;
				justify-content: space-between;
				font-size: 32upx;
				margin: auto;
			}
		}

		.sub_dingdan {
			width: 100%;
			height: 150upx;
			background-color: #F8F8F8;
			position: fixed;
			bottom: 0;
			display: flex;

			.heji {
				width: 60%;
				height: 100upx;
				margin: 30upx 20upx;
				color: red;
				font-size: 32upx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;

				text {
					font-size: 28upx;
					color: #494949;
				}
			}

			.submit_but {
				width: 40%;
				height: 100%;

				button {
					width: 200upx;
					height: 60upx;
					margin: 40upx auto;
					background-color: red;
					color: white;
					font-size: 32upx;
					text-align: center;
					line-height: 60upx;
					border-radius: 50upx;
				}
			}
		}
	}
</style>
