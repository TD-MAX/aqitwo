<template>
	<view class="_zhifu">
		<view class="_zhifu-msg">
			<text>需要支付认证费用：</text><text>1588元</text>
		</view>
		<view class="_zhifu-anniu" @click="jiao_money">
			<button>点击支付</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				qid: '' //企业id
			}
		},
		methods: {
			jiao_money () {
				let shebei = uni.getSystemInfoSync().platform
				console.log(shebei)
				switch (shebei) {
					case 'android':
						this.$http.post('lessonpay/lessoncreateOrder',{
							body: '认证费充值',
							detail: uni.getStorageSync('userId'),
							spbillCreateIp: "1.1.1.1",
							goodsTag: this.qid
						},{})
						.then(res=>{
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
						break;
					case 'ios':
						this.$api.msg('暂未开放')
						break
				}
				
			}
		},
		onLoad(option) {
			this.qid = option.data
		}
	}
</script>

<style lang="scss">
	._zhifu{
		width: 100%;
	}
	._zhifu-msg{
		width: 100%;
		height: 300upx;
		text-align: center;
		line-height: 300upx;
	}
	._zhifu-anniu{
		width: 60%;
		height: 70upx;
		margin: auto;
		button{
			width: 100%;
			height: 100%;
			text-align: center;
			line-height: 70upx;
			font-size: 32upx;
			background-color: #fff;
			border: 1px solid #30ddac;
			color: #30ddac;
		}
	}
</style>
