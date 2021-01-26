<template>
	<view class="confirmpayment">
		<view class="confirm_top">
			<view class="confirm_top_1">请缴纳资料保证金</view>
			<view class="confirm_top_2">￥299.00</view>
			<view class="confirm_top_3">保证资料99.9%真实</view>
		</view>

		<view class="confirm_img">
			<view class="confirm_img_one">
				<image src="../../../static/xiangqin/weixinlogo.png"></image>
			</view>
			<view class="confirm_img_two">
				<view class="confirm_img_two_1">
					<text>微信支付</text>
				</view>
				
				<view class="confirm_img_two_3"><radio checked="true"></radio></view>
			</view>
			<view class="confirm_img_three"></view>
		</view>
		
		<view class="confirm_text">
			<checkbox-group @change="xieyi">
			    <label>
			        <checkbox value="cb" color="#FFCC33" style="transform:scale(0.7)" />
			    </label>
			</checkbox-group>
			<view><u @click="aaa">支付前，请先阅读支付协议</u></view>
		</view>
		
		<view class="confirm_button">
			<button @click="requestPayment">立即支付</button>
		</view>
	</view>
</template>

<script>

	export default {
		
		data() {
			return {
				xuanzhong:'',
				imp:'/static/xiangqin/pay-agree.html'
			}
		},
		methods: {
			aaa(){
				uni.navigateTo({
					url:'./agreement'
				})
			},
			xieyi(e){
				console.log(e)
				this.xuanzhong = e.detail.value[0]
			},
			//微信支付
			requestPayment(){
				if(this.xuanzhong === 'cb'){
					let shebei = uni.getSystemInfoSync().platform
					console.log(shebei)
					switch (shebei) {
						case 'android':
							let userId =uni.getStorageSync('userId')
							userId = "\"" + userId + "\"";
							this.$http.post('lessonxiangqin/api/wechat/pay',{
								detail:"{'userId':"+ userId +",'orderType':1}"
								
							},{})
							.then(res=>{
								console.log(res)
								if (res.statusCode !== 500) {
									var orderInfo = {
										"appid": res.data.appId,
										"noncestr": res.data.nonceStr,
										"package": res.data.packageValue,
										"partnerid": res.data.partnerId,
										"prepayid": res.data.prepayId,
										"timestamp": res.data.timeStamp,
										"sign": res.data.sign
									}
									console.log(orderInfo)
									uni.requestPayment({
										provider: 'wxpay',
										// orderInfo: orderInfo,
										appid: res.data.appId,
										noncestr: res.data.noncestr,
										package: res.data.package,
										partnerid: res.data.partnerid,
										prepayid: res.data.prepayid,
										timestamp: res.data.timestamp,
										sign: res.data.sign,
										
										success: function(res) {
											console.log('success:' + JSON.stringify(res));
											uni.reLaunch({
												url:'payments'
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
							// uni.request({
							// 	url:'http://aqi.tdkj.online/love/api/wechat/pay',
							// 	method:'POST',
							// 	data:{
							// 		detail:"{'userId':"+ userId +",'orderType':1}",
							// 		totalFee: 1
							// 	},
							// 	success:(res)=> {
							// 		console.log(res)
							// 			if (res.statusCode !== 500) {
							// 				var orderInfo = {
							// 					"appid": res.data.appId,
							// 					"noncestr": res.data.nonceStr,
							// 					"package": res.data.packageValue,
							// 					"partnerid": res.data.partnerId,
							// 					"prepayid": res.data.prepayId,
							// 					"timestamp": res.data.timeStamp,
							// 					"sign": res.data.sign
							// 				}
							// 				console.log(orderInfo)
							// 				uni.requestPayment({
							// 					provider: 'wxpay',
							// 					// orderInfo: orderInfo,
							// 					appid: res.data.appId,
							// 					noncestr: res.data.noncestr,
							// 					package: res.data.package,
							// 					partnerid: res.data.partnerid,
							// 					prepayid: res.data.prepayid,
							// 					timestamp: res.data.timestamp,
							// 					sign: res.data.sign,
												
							// 					success: function(res) {
							// 						console.log('success:' + JSON.stringify(res));
							// 						uni.reLaunch({
							// 							url:'payments'
							// 						})
							// 					},
							// 					fail: function(err) {
							// 						console.log('fail:' + JSON.stringify(err));
							// 					}
							// 				});
							// 			} else {
							// 				this.$api.msg('遇到未知错误，请稍后再试')
							// 			}
							// 	},
							// 	fail:(err)=> {
							// 		console.log(err)
							// 	}
							// })
							break;
						case 'ios':
							this.$api.msg('暂未开放')
							break;
					}
				}else{
					uni.showToast({
						title:'请勾选支付协议',
						icon:'none'
					})
				}
				
			},
				
		},
		onLoad() {
			
		}
	}
</script>

<style>
	
	.confirmpayment{
		width: 100%;
		height: 100%;
	}
	.confirm_top{
		width: 90%;
		height: 150upx;
		margin-top: 30upx;
		background-color: white;
		/* border: 1px solid red; */
		margin-left: 5%;
		background-color: rgb(6,211,211);
		border-radius: 20upx;
		color: white;
	}
	.confirm_top_1{
		font-size: 37upx;
		height: 80upx;
		padding-top: 20upx;
		padding-left: 20upx;
	}
	.confirm_top_2{
		font-size: 40upx;
		margin-left: 70%;
		margin-top: -50upx;
	}
	.confirm_top_3{
		font-size: 30upx;
		margin-top: -20upx;
		padding-left: 20upx;
	}
	.confirm_img{
		margin-top: 50upx;
		width: 100%;
		height: 150upx;
		background-color: white;
		display: flex;
	}
	.confirm_img_one image{
		width: 100upx;
		height: 100upx;
		margin-left: 30upx;
		margin-top: 30upx;
	}
	.confirm_img_two{
		width: 350upx;
		height: 50upx;
		/* border: 1px solid red; */
		margin-top: 50upx;
		margin-left: 30upx;
	}
	.confirm_img_two image{
		width: 60upx;
		height: 30upx;
		margin-left: 40upx;
	}
	.confirm_img_two_2{
		font-size: 25upx;
		color: rgb(146,146,146);
		margin-top: 10upx;
	}
	.confirm_img_two_3{
		float: right;
		margin-right: -220upx;
		margin-top: -50upx;
	}
	.confirm_text{
		width: 84%;
		height: 150upx;
		margin-left: 8%;
		font-size: 27upx;
		margin-top: 30upx;
		color: grey;
		display: flex;
	}
	.confirm_button button{
		width: 90%;
		margin-top: 300upx;
		background-color: rgb(63,62,81);
		color: white;
	}
</style>
