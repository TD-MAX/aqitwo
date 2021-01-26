<template>
	<view class="jiayou">
		<view class="kapian">
			<image src="../../static/aqiuser/jiayouka.png" mode="aspectFill"></image>
		</view>
		<view class="zhifu" @click="chart_zhifu">
			<button>微信支付</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				jine: ''
			}
		},
		methods: {
			//微信支付
			chart_zhifu () {
				this.$api.msg('内测名额已满')
			},
			chart_zhifuok () {
				let jiewei = Number(this.jine) * 100
				this.$http.post('lessonpay/lessoncreateOrder',{
					body: "加油卡充值",
					detail: uni.getStorageSync('userId'),
					spbillCreateIp: '1.1.1.1',
					totalFee: jiewei
				},{})
				.then(res=>{
					console.log(res)
					if (res.data.code !== 500) {
						var orderInfo = {
							"appid": res.data.appId,
							"noncestr": res.data.nonceStr,
							"package": res.data.packageValue,
							"partnerid": res.data.partnerId,
							"prepayid": res.data.prepayId,
							"timestamp": res.data.timeStamp,
							"sign": res.data.sign
						}
						uni.requestPayment({
							provider: 'wxpay',
							orderInfo: orderInfo,
							success: function(res) {
								console.log('success:' + JSON.stringify(res));
								uni.showToast({
									title:'支付成功'
								})
							},
							fail: function(err) {
								console.log('fail:' + JSON.stringify(err));
							}
						});
					} else {
						this.$api.msg('遇到未知错误，请稍后再试')
					}
				})
				.catch(err=>{
					console.log(err)
				})
			}
		}
	}
</script>

<style>
	.jiayou {
		width: 100%;
		padding-top: 65upx;
	}
	.kapian {
		width: 630upx;
		height: 400upx;
		background-color: #C1C1C1;
		border-radius: 20upx;
		margin: auto;
		overflow: hidden;
	}
	.kapian image{
		width: 100%;
		height: 100%;
	}
	.zhifu{
		width: 400upx;
		height: 70upx;
		margin: 90upx auto;
	}
	.zhifu button{
		width: 100%;
		height: 100%;
		font-size: 32upx;
		background-color: #fff;
		border: 1px solid #64D459;
		text-align: center;
		line-height: 70upx;
		color: #64D459;
	}
</style>
