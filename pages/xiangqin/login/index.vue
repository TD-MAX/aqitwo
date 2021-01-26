<template>
	<view class="content">
		<image src="../../../static/logo.png" mode=""></image>
		<view class="input_box">
			<input type="number" v-model="phone" placeholder="请输入手机号" placeholder-style="font-size: 32rpx;"/>
			<input type="number" v-model="password" placeholder="请输入验证码" placeholder-style="font-size: 32rpx;"/>
			<text @click="get_password">获取验证码{{logining ? '(' + time_out + ')' : ''}}</text>
		</view>
		<view class="login_btn" @click="login">
			一键登陆
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue'
	export default {
		data() {
			return {
				phone: '',
				password: '',
				logining: false,
				time_out: 60
			}
		},
		components:{
			uniLoadMore
		},
		onReachBottom(){
		},
		onLoad() {
		},
		methods: {
			login () {
				console.log('aaa')
				if (this.phone && this.password) {
					this.$http
					.post('lessonxiangqin/api/lessonuserzhuce', 
					{
					    phone: this.phone,
						code: this.password,
						tokens: ''
					}, {})
					.then(res => {
						console.log(res.data)
						if (res.data.isyzm == 200) {
							uni.setStorageSync('token', res.data.token)
							uni.setStorageSync('userId', res.data.id)
							uni.setStorageSync('phone', res.data.phone)
							if (res.data.isnew == 0) {
								console.log('bbb')
								uni.reLaunch({
									url: 'index2'
								})
							} else {
								console.log('ccc')
								uni.reLaunch({
								    url: '../index/index'
								});
							}
						}else{
							uni.showToast({
								title:'验证码错误',
								icon:'none'
							})
						}
					})
					.catch(err => {
					})
				} else {
					this.$api.msg('请输入手机号或验证码')
				}
				
			},
			timeOut () {
				let int = setInterval(() => {
					if (this.time_out) {
						this.time_out--
						console.log(this.time_out)
					} else {
						this.logining = false
						clearInterval(int)
					}
				}, 1000)
			},
			get_password () {
				if (this.phone && !this.logining) {
					this.$http
					.post('lessonxiangqin/api/lessonyzm', 
					{
					    "phone": this.phone
					}, {})
					.then(res => {
						if (res.data === 200) {
							this.$api.msg('发送成功')
							this.logining = true
							this.timeOut()
						}
					})
					.catch(err => {
					})
				} else {
					this.$api.msg('请输入手机号')
				}
			}
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
	}
	.content {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		box-sizing: border-box;
		padding: 260rpx 40rpx 0;
		background-image: url('https://qilianxiangqin.oss-cn-beijing.aliyuncs.com/xiangqin/login_back.png');
		background-size: cover;
		image{
			width: 180rpx;
			height: 180rpx;
			border-radius: 50%;
		}
		.input_box{
			position: relative;
			width: 100%;
			input{
				background-color: #fff;
				border: none;
				width: 100%;
				height: 80rpx;
				border-radius: 80rpx;
				margin-top: 70rpx;
				line-height: 80rpx;
				text-indent: 30rpx;
				font-size: 40rpx;
				color: #333;
			}
			text{
				width: 220rpx;
				height: 70rpx;
				background-color: #3F536E;
				border-radius: 70rpx;
				position: absolute;
				right: 5rpx;
				bottom: 5rpx;
				color: #fff;
				text-align: center;
				line-height: 70rpx;
				font-size: 28rpx;
			}
		}
		.login_btn{
			width: 90%;
			height: 80rpx;
			position: absolute;
			bottom: 20rpx;
			left: 5%;
			background-color: #2C405A;
			border-radius: 80rpx;
			color: #fff;
			text-align: center;
			line-height: 80rpx;
			font-size: 32rpx;
		}
	}
</style>
