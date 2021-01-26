<template>
	<view class="jiaoyi">
		<view class="fapiaokuan">
			<view class="kuan_head" v-if="user_list.length !== 0">
				<image src="../../static/qyservice/22.png" mode="aspectFit"></image>
				<text>企业认证</text>
				<view class="fapiao" @click="kfp">
					我的发票
				</view>
			</view>
			<view class="kuan_content" 
			v-for="(item,index) in user_list" :key="index">
				<view>企业认证生效时间：{{item.time}}</view>
				<view>是否开据发票：{{item.fapiaostart === 0 ? '未开' : '已开'}}</view>
				<view>支付方式：微信</view>
				<view>支付时间：{{item.time}}</view>
			</view>
			<view class="kuan_history" v-if="user_list.length === 0">
				<text>暂无交易记录~~~</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user_list: []
			}
		},
		methods: {
			//记录列表
			show () {
				this.$http.post('lessonaqi/api/lessonqiyerenzhengjiaofeijilu',{
					userid: uni.getStorageSync('userId'),
					pageNum: 1,
					pageSize: 5
				},{})
				.then(res => {
					console.log(res.data)
					this.user_list = res.data
				})
				.catch(err => {
					console.log(err)
				})
			},
			//开发票
			kfp () {
				uni.navigateTo({
					url: '../second/index',
					animationType: 'pop-in'
				})
			}
		},
		onLoad() {
			this.show()
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F5F5F5;
	}
	.jiaoyi {
		width: 100%;
	}
	.fapiaokuan {
		width: 90%;
		height: 300upx;
		margin: 20upx auto;
		border-radius: 20upx;
		box-sizing: border-box;
		// border: 1px solid #C1C1C1;
		.kuan_head {
			width: 100%;
			height: 90upx;
			position: relative;
			display: flex;
			font-size: 32upx;
			font-weight: 600;
			box-sizing: border-box;
			border-bottom: 1px solid #C1C1C1;
			line-height: 90upx;
			.fapiao {
				position: absolute;
				right: 20upx;
				// background-color: #3f3e51;
				color: red;
				font-size: 28upx;
				// font-weight: 500;
			}
		}
		.kuan_content {
			display: flex;
			flex-direction: column;
			padding: 10upx 20upx;
			font-size: 28upx;
			background-color: #fff;
			border-radius: 20upx;
			margin: 10upx auto;
			font-weight: 600;
			view{
				margin: 5upx 0;
			}
		}
		.kuan_history {
			width: 100%;
			height: 80upx;
			font-size: 32upx;
			text-align: center;
			line-height: 80upx;
		}
		image{
			width: 60upx;
			height: 70upx;
			margin: 10upx 20upx;
		}
	}
</style>
