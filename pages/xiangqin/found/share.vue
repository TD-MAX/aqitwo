<template>
	<view class="content">
		<image src="../../../static/xiangqin/sharebgimg.png" mode="scaleToFill"></image>
		<!-- <image src="../../static/aqlogo.png" mode=""></image> -->
		<view class="input_box">
			<view class="input_box_top">
					<image class="input_box_img1" src="../../../static/xiangqin/sharezuo.png" mode="scaleToFill"></image>
					100万+用户的交友平台
					<image class="input_box_img2" src="../../../static/xiangqin/shareyou.png" mode="scaleToFill"></image>
			</view>
			<view >
				<image class="input_box_img3" src="../../../static/xiangqin/shoujihao.png" mode="aspectFit"></image>
				<input type="number" v-model="phone" placeholder="手机号" placeholder-style="font-size: 30rpx;" />
			</view>
			<!-- <view>
				<image class="input_box_img4" src="../../../static/xiangqin/mima.png" mode="aspectFit"></image>
				<input type="number" v-model="phone" placeholder="设置密码" placeholder-style="font-size: 30rpx;" />
			</view> -->
			<view class="input_box5">
				<image class="input_box_img4" src="../../../static/xiangqin/yanzhengma.png" mode="aspectFit"></image>
				<input class="input_box_input5" type="number" v-model="code" placeholder="验证码" placeholder-style="font-size: 30rpx;" />
				<view class="input_box5_text" @click="get_password">获取验证码</view>
			</view>
			<view class="login_btn" @click="login">
				立即注册
			</view>
			<view>
				<text class="login_text1">已有帐号?</text>
				<text class="login_text2"><u>立即下载</u></text>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				code: '',
				imageUrl: '../../../static/xiangqin/sharebgimg.png',
			}
		},

		onReachBottom() {},
		onLoad() {

		},
		methods: {
			//发送验证码
			get_password () {
				let that = this
				if (that.phone && !that.logining) {
					console.log('aaa')
					that.$http.post('lessonaqi/api/lessonyzm', 
					{
					    "phone": that.phone
					}, {})
					.then(res => {
						console.log(res)
						if (res.data === 200) {
							that.$api.msg('发送成功')
						}
					})
					.catch(err => {
					})
				}
			},
			//立即注册
			login() {
				this.$http
					.post('lessonaqi/api/lessonuserzhuce', {
						phone: this.phone,
						code: this.code,
						tokens: ''
					}, {})
					.then(res => {
						console.log(res)
						that.$api.msg('注册成功')
					})
					.catch(err => {})
			}
		},
		


	}
</script>

<style lang="scss">
	page {
		height: 100%;
		width: 100%;
	}

	.content {
		height: 100%;
		width: 100%;
		// display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		box-sizing: border-box;
		// padding: 150rpx 40rpx 0;
		display: flex;

		image {
			position: fixed;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			z-index: -1;
		}
		.input_box5{
			display: flex;
		}
		.input_box {
			// position: relative;
			width: 70%;
			height: 450rpx;
			background-color: white;
			margin-top: 350rpx;
			border-radius: 50rpx;
			.input_box_top{
				width: 100%;
				height: 60rpx;
				// border: 1px solid red;
				color: rgb(0,209,209);
				text-align: center;
				line-height: 60rpx;
				margin-top: 10rpx;
				.input_box_img1{
					z-index: 1;
					margin-top: 460rpx;
					margin-left: 160rpx;
					width: 40rpx;
					height: 40rpx;
				}
				.input_box_img2{
					z-index: 1;
					margin-top: 460rpx;
					margin-left: 560rpx;
					width: 40rpx;
					height: 40rpx;
				}
				
			}
			.input_box_img3{
				z-index: 1;
				margin-top: 540rpx;
				margin-left: 200rpx;
				width: 40rpx;
				height: 40rpx;
			}
			.input_box_img4{
				z-index: 1;
				margin-top: 630rpx;
				margin-left: 200rpx;
				width: 40rpx;
				height: 40rpx;
			}
			.input_box_img5{
				z-index: 1;
				margin-top: 720rpx;
				margin-left: 200rpx;
				width: 40rpx;
				height: 40rpx;
			}
			.input_box_input5{
				background-color: rgb(245,245,245);
				border: none;
				width: 45%;
				height: 70rpx;
				border-radius: 80rpx;
				margin-top: 20rpx;
				line-height: 70rpx;
				text-indent: 100rpx;
				font-size: 30rpx;
				margin-left: 10%;
			}
			.input_box5_text{
				background-color: rgb(88,233,233);
				border: none;
				width: 30%;
				height: 70rpx;
				border-radius: 80rpx;
				margin-top: 20rpx;
				line-height: 70rpx;
				font-size: 30rpx;
				margin-left: 5%;
			}
			input {
				background-color: rgb(245,245,245);
				border: none;
				width: 80%;
				height: 70rpx;
				border-radius: 80rpx;
				margin-top: 20rpx;
				line-height: 70rpx;
				text-indent: 100rpx;
				font-size: 30rpx;
				// color: grey;
				// border: 1px solid red;
				margin-left: 10%;
			}


		}

		.qiehuan {
			margin: 10upx 0 0 0;
			color: white;
			font-size: 28upx;
		}

		.login_btn {
			width: 80%;
			height: 80rpx;
			background-color: rgb(88,233,233);
			border-radius: 80rpx;
			color: white;
			text-align: center;
			line-height: 80rpx;
			font-size: 35rpx;
			margin-top: 20rpx;
			margin-left: 10%;
		}
		.login_text1{
			margin-left: 30%;
			font-size: 25rpx;
			line-height: 70rpx;
			color: grey;
		}
		.login_text2{
			margin-left: 2%;
			font-size: 25rpx;
			line-height: 70rpx;
			color: rgb(88,233,233);
		}
	}
</style>
