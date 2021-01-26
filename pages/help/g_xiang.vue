<template>
	<view class="g_body">
		<view class="g_nav">
			<view class="g_msg">
				<view class="j_xx">
					<image :src="newlist.logo"
					mode="aspectFit"></image>
					<p>{{newlist.qiyename}}</p>
					<text>{{newlist.tonxundizhi}}</text>
					<text>企业官网：{{newlist.qiyeguanwang === "" ? '暂无' : newlist.qiyeguanwang}}</text>
					<text>企业邮箱：{{newlist.email === "" ? '暂无' : newlist.email}}</text>
				</view>
				<view class="label">
					<view class="">
						长治
					</view>
					<view class="">
						文化娱乐
					</view>
				</view>
			</view>
		</view>
		<view class="g_content">
			<h4>基本信息</h4>
			<p>公司简介</p>
			<view class="text">
				<text>{{newlist.qiyejianjie === "" ? '该公司暂无介绍' : newlist.qiyejianjie}}</text>
			</view>
			<h4>融资信息</h4>
			<p>融资信息</p>
			<view class="" v-html="newlist.neirong"></view>
		</view>
		<view class="g_weiter" @click="pull(newlist.shoujihao)">
			<!-- <view class="like">
				<i class="iconfont">&#xe600;</i>
				<text>收藏</text>
			</view>
			<view class="lianxi">
				<text>联系项目方</text>
			</view> -->
			<text>联系项目方</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				newlist: {}
			}
		},
		methods: {
			show () {
				this.$http.post('lessonaqi/api/lessonqiyehuzhuxiangqing',{
					userid: uni.getStorageSync('userId'),
					id: this.id
				},{})
				.then(res => {
					console.log(res)
					this.newlist = res.data
				})
				.catch(err => {
					console.log(err)
				})
			},
			pull (e) {
				uni.makePhoneCall({
					phoneNumber: e
				})
			},
			tome () {
				uni.navigateTo({
					url: './vidio'
				})
			}
		},
		onLoad(option) {
			this.id = option.id
			this.show()
		}
	}
</script>

<style lang="scss">
	.g_body {
		width: 100%;
		height: 100%;
	}
	.g_nav {
		width: 100%;
		height: 200upx;
		box-sizing: border-box;
		background-color: #3F3E51;
		.g_msg {
			width: 96%;
			height: 350upx;
			position: relative;
			margin: 0 auto;
			background-color: #fff;
			border-radius: 20upx;
			box-shadow: #C3C3C3 0 2upx 2upx 2upx;
			image {
				width: 110upx;
				height: 110upx;
				border-radius: 50%;
				position: absolute;
				right: 10upx;
				top: 0;
			}
			.j_xx {
				width: 96%;
				height: 260upx;
				// position: relative;
				margin: 0 auto;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				padding-top: 20upx;
				box-sizing: border-box;
				border-bottom: 1px solid #C3C3C3;
				p {
					font-size: 32upx;
					font-weight: 600;
				}
				text {
					font-size: 28upx;
					color: #696969;
				}
			}
			.label {
				width: 96%;
				height: calc(100% - 260upx);
				margin: auto;
				display: flex;
				box-sizing: border-box;
				padding-top: 10upx;
				font-size: 24upx;
				view {
					min-width: 80upx;
					height: 40upx;
					background-color: #C0DFFF;
					color: #2892FF;
					text-align: center;
					line-height: 40upx;
					margin: 10upx 10upx 0 0;
				}
			}
		}
	}
	.g_content {
		width: 96%;
		height: 100%;
		margin: 160upx auto;
		padding: 10upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		p {
			font-size: 28upx;
			font-weight: 600;
			margin:  10upx 0;
		}
		.text {
			width: 100%;
			margin: 0 0 20upx 0;
			font-size: 28upx;
			// border: 1px solid red;
			overflow: visible;
		}
		image {
			width: 99%;
			height: 300upx;
			margin: 5upx auto;
		}
	}
	.g_weiter {
		width: 100%;
		height: 80upx;
		position: fixed;
		bottom: 0;
		// display: flex;
		background-color: #007DFF;
		color: white;
		text-align: center;
		line-height: 80upx;
		.like {
			flex: 1;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #F5F5F5;
			i {
				margin-right: 20upx;
			}
		}
		.lianxi {
			flex: 1;
			height: 100%;
			text-align: center;
			line-height: 80upx;
			background-color: #007DFF;
			color: white;
		}
	}
</style>
