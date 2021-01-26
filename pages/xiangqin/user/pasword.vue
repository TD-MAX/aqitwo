<template>
	<view class="password_body">
		<view class="password_head">
			<p>设置新的密码</p>
			<text>重置之前的密码，设置密码</text>
		</view>
		<view class="list-cell" v-if="isnew">
			<text>设置新密码</text>
			<input type="text" v-model="newpassword" placeholder="请输入新密码" />
		</view>
		<view class="list-cell" v-if="!isnew">
			<text>输入旧密码</text>
			<input type="text" v-model="oldpassword" placeholder="请输入旧密码" />
		</view>
		<view class="list-cell" v-if="!isnew">
			<text>设置新密码</text>
			<input type="text" v-model="newpassword" placeholder="请输入新密码" />
		</view>
		<view class="list-cell" v-if="!isnew">
			<text>确认新密码</text>
			<input type="text" v-model="newpassword1" placeholder="请输入新密码" />
			<view class="tip">{{tipmsg}}</view>
		</view>
		<!-- <view class="list-cells" v-else>
			<input type="text" v-model="oldpassword" placeholder="请输入旧密码" />
			<input type="password" v-model="newpassword" placeholder="请输入新密码" />
			<input type="password" v-model="newpassword1" placeholder="再次确认密码" />
		</view> -->
		<view class="button" @click="update(isone)">确认更改</view>
	</view>
</template>

<script>
	import md from '../../../static/md5.js'
	export default {
		data() {
			return {
				password: '', //密码
				oldpassword: '', //旧密码
				newpassword: '' ,//新密码
				newpassword1: '', //确认密码
				isnew: false,
				isone:0, //是否是第一次修改密码
				tipmsg: ''
			}
		},
		methods: {
			//查看用户是否有密码
			show () {
				this.$http.post('lessonxiangqin/api/lessongetuser',{
					userid: uni.getStorageSync('userId')
				},{})
				.then(res => {
					console.log(res)
					if (res.data.password !== null) {
						this.isnew = false
						this.password = res.data.password
						this.isone = 1
						uni.setNavigationBarTitle({
							title:'修改密码'
						})
					} else {
						this.isnew = true
						this.isone = 0
						uni.setNavigationBarTitle({
							title:'设置新密码'
						})
					}
				})
				.catch(err => {
					console.log(err)
				})
			},
			//修改密码
			update (e) {
				console.log(e)
				let pas = this.newpassword
				console.log(pas)
				switch (e) {
					case 0:
						this.$http.post('lessonaqi/api/lessonmimashezhi',{
							userid: uni.getStorageSync('userId'),
							phone: uni.getStorageSync('phone'),
							password: pas
						},{})
						.then(res => {
							console.log(res)
							if (res.data === 1) {
								this.$api.msg('设置成功')
								setTimeout(()=>{
									uni.navigateBack({
										delta:1,
										animationType: 'pop-out'
									})
								},1500)
							}
						})
						.catch(err => {
							console.log(err)
						})
						break
					case 1:
						let phone = uni.getStorageSync('phone')
						let id = uni.getStorageSync('userId')
						let mima = md.hex_md5(phone + this.oldpassword + id)
						console.log(mima)
						if (this.oldpassword === '' || this.newpassword === '' || this.newpassword1 === '') {
							this.tipmsg = '请输入完整'
							return
						}
						if (mima !== this.password) {
							this.tipmsg = '旧密码输入错误，请重新输入'
							return
						}
						if (this.newpassword !== this.newpassword1) {
							this.tipmsg = '俩次输入密码不一致'
							return
						}
						this.$http.post('lessonaqi/api/lessonmimashezhi',{
							userid: id,
							password: pas,
							phone: uni.getStorageSync('phone')
						},{})
						.then(res => {
							console.log(res)
							if (res.data === 1) {
								this.$api.msg('修改成功,请重新登录')
								uni.clearStorage()
								uni.closeSocket({
									code:1000,
									success(res) {
										console.log(res)
									},
									fail(err) {
										console.log(err)
									}
								})
								uni.onSocketClose(function(res){
									console.log('websockte已关闭')
								})
								setTimeout(()=>{
									uni.reLaunch({
										url: '../../index/index'
									})
								},1500)
							}
						})
						.catch(err => {
							console.log(err)
						})
						break
				}
			}
		},
		onLoad() {
			this.show() //查询个人信息
		}
	}
</script>

<style lang="scss">
	.password_body {
		width: 100%;
	}
	.password_head {
		width: 96%;
		height: 100upx;
		margin: 20upx auto;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		// border: 1px solid red;
		p{
			font-size: 40upx;
		}
		text {
			font-size: 30upx;
		}
	}
	.list-cell{
		width: 96%;
		height: 120upx;
		margin: 60upx auto;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		font-size: 30upx;
		background-color: #fff;
		border-bottom: 1px solid #C1C1C1;
		input {
			width: 100%;
			height: 80upx;
		}
		.tip {
			position: absolute;
			width: 600upx;
			height: 40upx;
			text-align: center;
			line-height: 40upx;
			left: 0;
			right: 0;
			bottom: -40upx;
			margin: auto;
			font-size: 28upx;
			color: red;
		}
	}
	.button {
		width: 400upx;
		height: 70upx;
		margin: 50upx auto;
		border: 2px solid #F5F5F5;
		border-radius: 50upx;
		background-color: #fff;
		color: black;
		font-size: 30upx;
		text-align: center;
		line-height: 70upx;
	}
</style>
