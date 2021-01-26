<template>
	<view class="qibi_ref">
		<!-- <view class="ref_phone">
			<input type="text" value="" placeholder="请输入号码" />
			<text>账号绑定号码</text>
		</view> -->
		<view class="ref_money">
			<text>充企币</text>
			<view class="ref_select">
				<view class="" 
				v-for="(item,index) in moneyList" :key="index"
				:class="{'ref_se' : tabIndex === index}"
				@click="select_jine(index)">
					{{item}}元
				</view>
				<view class="">
					<input style="height: 100%;" type="text" placeholder="自定义金额" 
					v-model="jine" @input="changeInput" />
				</view>
			</view>
			<text>充值方式（目前只支持微信支付）</text></br>
			<text>自定义金额暂时不支持小数</text>
		</view>
		<view class="chongzhi">
			<!-- <button>充值</button> -->
			<u-button type="info" :ripple="true" @click="chong_zhi">充值</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				moneyList:['10','30','50','100','200','300','500'],
				tabIndex:0,
				jine: ''
			}
		},
		methods: {
			//输入框发生变化
			changeInput () {
				if (this.jine !== '') {
					this.tabIndex = 'more'
				} else {
					this.tabIndex = 0
				}
			},
			//判断是否为整数类型
			// zheng (obj) {
			// 	return ()
			// },
			//选择金额
			select_jine (e) {
				this.tabIndex = e
			},
			//充值
			chong_zhi () {
				this.$api.msg('暂未开放')
				return
				let shebei = uni.getSystemInfoSync().platform
				console.log(shebei)
				switch (shebei) {
					case 'android':
						console.log(Number.isInteger(Number(this.jine)))
						let money = ''
						if (this.jine === '') {
							money = Number(this.moneyList[this.tabIndex])
							console.log(money)
						} else {
							//判断自定义金额是否为整数类型
							if (Number.isInteger(Number(this.jine)) === true) {
								money = Number(this.jine)
							} else {
								this.$api.msg('请输入整数位金额')
								return
							}
							console.log(money)
						}
						let jiewei = money * 100
						this.$http.post('lessonpay/lessoncreateOrder', {
							body: "企币充值",
							detail: uni.getStorageSync('userId'),
							spbillCreateIp: '1.1.1.1',
							totalFee: jiewei
						}, {})
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
						break;
					case 'ios':
						this.$api.msg('暂未开放')
						break;
				}
			},
			//h5充值
			cz () {
				this.$http.post('pay/wxpayh5s',{
					
				},{})
				.then(res=>{
					console.log(res)
					// plus.runtime.openURL(res.data)
					uni.navigateTo({
						url: '../swiper/swiper0?data=' + res.data
					})
				})
				.catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss">
	.qibi_ref{
		width: 100%;
		height: 100%;
		padding-top: 25upx;
	}
	.ref_phone{
		width: 96%;
		height: 124upx;
		border-bottom: 1px solid #C1C1C1;
		margin: 30upx auto;
		input{
			width: 80%;
			height: 70upx;
			font-size: 50upx;
		}
		text{
			font-size: 28upx;
			color: #696969;
		}
	}
	.ref_money{
		width: 96%;
		height: 100%;
		margin: auto;
		.ref_select{
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
			view{
				width: 30%;
				height: 96upx;
				margin: 20upx 20upx 20upx 0;
				border-radius: 10upx;
				text-align: center;
				line-height: 96upx;
				box-sizing: border-box;
				color: #696969;
				border: 1px solid #C1C1C1;
			}
			.ref_se{
				background-color: #696969;
				color: #FFFFFF;
			}
		}
		text{
			font-size: 28upx;
			color: #696969;
		}
	}
	.chongzhi{
		width: 80%;
		margin: 20upx auto;
		// button{
		// 	width: 100%;
		// 	height: 90upx;
		// 	background-color: #696969;
		// 	color: #fff;
		// }
	}
</style>
