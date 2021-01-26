<template>
	<view class="content">
		<image src="../../static/aqlogo.png" mode=""></image>
		<view class="input_box" v-show="ispasword">
			<input type="number" v-model="phone" placeholder="请输入手机号" placeholder-style="font-size: 32rpx;"/>
			<input type="number" v-model="password" placeholder="请输入验证码" placeholder-style="font-size: 32rpx;"/>
			<text @click="get_password">获取验证码{{logining ? '(' + time_out + ')' : ''}}</text>
		</view>
		<view class="input_box" v-show="!ispasword">
			<input type="number" v-model="phone" placeholder="请输入手机号" placeholder-style="font-size: 32rpx;"/>
			<input type="password" v-model="password1" placeholder="请输入密码" placeholder-style="font-size: 32rpx;"/>
			<!-- <text @click="get_password">获取验证码{{logining ? '(' + time_out + ')' : ''}}</text> -->
		</view>
		<view class="qiehuan" @click="qie">
			<text>{{ispasword ? '已有账号?密码登录' : '验证码登录'}}</text>
		</view>
		<view class="login_btn" @click="login">
			登陆
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '../components/uni-load-more/uni-load-more.vue'
	export default {
		data() {
			return {
				phone: '',
				password: '',
				password1: '',
				ispasword: true,
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
				console.log(this.ispasword)
				switch (this.ispasword) {
					case true:
						this.$http
						.post('lessonaqi/api/lessonuserzhuce', 
						{
						    phone: this.phone,
							code: this.password,
							tokens: ''
						}, {})
						.then(res => {
							console.log(res.data)
							if (res.data.isyzm === 200) {
								console.log(res.data.isnew)
								console.log(res.data.id)
								//页面进来时连接websocket服务器
								uni.connectSocket({
								  url: 'ws://39.102.47.143:8080/websocket/' + res.data.id
								});
								uni.onSocketOpen(function (res) {
								  console.log('WebSocket连接已打开！');
								});
								uni.setStorageSync('token', res.data.token)
								uni.setStorageSync('userId', res.data.id)
								uni.setStorageSync('phone', res.data.phone)
								uni.setStorageSync('news_user', res.data.isnew)
								uni.setStorageSync('qiyeId',res.data.qiyeid)
								uni.switchTab({
								    url: '/pages/index/index'
								});
							}
						})
						.catch(err => {
						})
						break;
					case false:
						this.$http.post('lessonaqi/api/lessonmimadenglu',{
							phone: this.phone,
							password: this.password1
						},{})
						.then(res => {
							console.log(res)
							if (res.data.passwordyz === 200) {
								console.log(res.data.isnew)
								console.log(res.data.id)
								//页面进来时连接websocket服务器
								uni.connectSocket({
								  url: 'ws://39.102.47.143:8080/websocket/' + res.data.id
								});
								uni.onSocketOpen(function (res) {
								  console.log('WebSocket连接已打开！');
								});
								uni.setStorageSync('token', res.data.token)
								uni.setStorageSync('userId', res.data.id)
								uni.setStorageSync('phone', res.data.phone)
								uni.setStorageSync('news_user', res.data.isnew)
								uni.setStorageSync('qiyeId',res.data.qiyeid)
								uni.switchTab({
								    url: '/pages/index/index'
								});
							}
						})
						.catch(err => {
							console.log(err)
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
			qie () {
				this.ispasword = !this.ispasword
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #3f3e51;
		height: 100%;
	}
	.content {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		box-sizing: border-box;
		padding: 150rpx 40rpx 0;
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
				height: 90rpx;
				border-radius: 80rpx;
				margin-top: 80rpx;
				line-height: 90rpx;
				text-indent: 30rpx;
				font-size: 35rpx;
				color: #3f3e51;
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
		.qiehuan {
			margin: 10upx 0 0 0;
			color: white;
			font-size: 28upx;
		}
		.login_btn{
			width: 90%;
			height: 90rpx;
			position: absolute;
			bottom: 50rpx;
			left: 5%;
			background-color: #ffffff;
			border-radius: 80rpx;
			color: #3f3e51;
			text-align: center;
			line-height: 90rpx;
			font-size: 35rpx;
		}
	}
</style>
