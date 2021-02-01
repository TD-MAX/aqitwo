<template>
	<view class="content">
		<view class="input_box">
			<view>
				<view class="input_view">真实姓名</view>
				<input type="text" v-model="trueName" placeholder="请填写真实姓名" placeholder-style="font-size: 32rpx;"/>
			</view>
			<view>
				<view class="input_view">身份证号</view>
				<input type="number" v-model="idCard" placeholder="请填写身份证号" placeholder-style="font-size: 32rpx;"/>
			</view>
			<view>
				<view class="input_view">手机号</view>
				<input type="number" v-model="phone" placeholder="请填写手机号" placeholder-style="font-size: 32rpx;"/>
			</view>
			<view>
				<view class="input_view">验证码</view>
				<input type="number" v-model="code" placeholder="请填写验证码" placeholder-style="font-size: 32rpx;"/>
				<text @click="get_password">获取验证码{{logining ? '(' + time_out + ')' : ''}}</text>
			</view>
		</view>
		<view class="_next" @click="next">
			完成
		</view>
	</view>
</template>

	
<script>

	export default {
		data() {
			return {
				trueName:'',
				idCard:'',
				phone:'',
				code:'',
				logining: false,
				time_out:60
			}
		},


		onLoad() {
			this.$http
			.post('lessonxiangqin/api/getUserInfo', 
			{
				userId: uni.getStorageSync('userId')
			}, {})
			.then(res => {
				console.log(res)
				this.trueName = res.data.data.trueName
				this.idCard = res.data.data.idCard
			})
			.catch(err => {
			})
		},
		methods: {
			//获取验证码
			get_password () {
				let that = this
				if (that.phone && !that.logining) {
					console.log('aaa')
					that.$http.post('lessonaqi/api/lessonyzm', 
					{
					    "phone": that.phone
					}, {})
					.then(res => {
						if (res.data === 200) {
							that.$api.msg('发送成功')
							that.logining = true
							that.timeOut()
						}
					})
					.catch(err => {
					})
				}
			},
			timeOut () {
				let int = setInterval(() => {
					if (this.time_out) {
						this.time_out--
						// console.log(this.time_out)
					} else {
						this.logining = false
						clearInterval(int)
					}
				}, 1000)
			},
			next(){
				if(this.trueName == '' || this.idCard == '' || this.phone == '' || this.code == ''){
					uni.showToast({
						title:'请填写完整信息',
						icon:'none'
					})
				}else{
					this.$http.post('lessonxiangqin/api/realNameAuth',{
						userId:uni.getStorageSync('userId'),
						phone:this.phone,
						code:this.code,
						idCard:this.idCard,
						trueName:this.trueName
					},{})
					.then(res=>{
						console.log(res)
						uni.showToast({
							title:res.data.msg
						})
						setTimeout(res=>{
							uni.navigateBack({
								delta:1
							})
						},1500)
					})
					.catch(err=>{
						console.log(err)
					})
				}
				
			}
			
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
	}
	.content{
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;
		.input_box{
			position: relative;
			width: 100%;
			.input_view{
				font-size: 40rpx;
				margin-top: 20rpx;
				margin-left: 30rpx;
			}
			input{
				background-color: #fff;
				border: none;
				width: 90%;
				height: 90rpx;
				line-height: 90rpx;
				margin-left: 30rpx;
				font-size: 35rpx;
				color: #3f3e51;
				border-bottom: 1px solid grey;
			}
			text{
				width: 220rpx;
				height: 80rpx;
				background-color: #3f3e51;
				border-radius: 70rpx;
				position: absolute;
				right: 5rpx;
				bottom: 5rpx;
				color: #fff;
				text-align: center;
				line-height: 80rpx;
				font-size: 28rpx;
			}
		}
		._next{
			width: 562rpx;
			height: 110rpx;
			background-color: #25D3D2;
			color: #fff;
			font-size: 42rpx;
			line-height: 110rpx;
			text-align: center;
			border-radius: 110rpx;
			margin-top: 160rpx;
		}
		.message_list_screen_img{
			display: flex;
			border-bottom: 1px solid rgb(245,245,245);
			padding-top: 30upx;
			width: 90%;
			height: 200upx;
			.message_text{
				width: 30%;
			}
			.header_img{
				width: 100rpx;
				height: 100rpx !important;
				border-radius: 100rpx;
				margin-left: 55%;
			}
		}
		.message_list_screen{
			display: flex;
			border-bottom: 1px solid rgb(245,245,245);
			padding-top: 30upx;
			width: 90%;
			height: 100upx;
			.message_text{
				width: 30%;
			}
			.message_list_screen_1{
				width: 70%;
				height: 50upx;
				margin-left: 18%;
				text-align: right;
				font-size: 32upx;
				.aaa{
					color: grey;
				}
			}
			
			
			.header_imgs{
				width: 30upx;
				height: 30upx;
				margin-right: -24upx;
				margin-top: 8upx;
			}
		}
		
	}
	
	
</style>
