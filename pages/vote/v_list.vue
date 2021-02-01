<template>
	<view class="vlist_body">
		<view class="vlist_nav">
			<image src="../../static/vote/vlist.png" mode=""></image>
			<text>2021年1月起</text>
		</view>
		<scroll-view class="vlist_content" scroll-y="true">
			<view class="vlist_content_box" 
			v-for="(item,index) in lists" :key="index">
				<text class="index">{{item.id < 10 ? '0' : ''}}{{item.id}}</text>
				<text class="texts">{{item.activityName}}</text>
				<view class="to" @click="to_piao(item.id,item.activityName,item.visitNum)">进入投票</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lists:[]
			}
		},
		methods: {
			show () {
				this.$http.post('lessonaqi/api/getActivityManageList',{
					
				},{})
				.then(res => {
					this.lists = res.data.data.rows
				})
				.catch(err => {
					console.log(err)
				})
			},
			to_piao (e,n,s) {
				var data = {
					id: e,
					name: n,
					liu: s
				}
				uni.navigateTo({
					url: './vote?data=' + JSON.stringify(data)
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
		width: 100%;
		height: 100%;
		background-color: #007AFF;
	}
	.vlist_body {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.vlist_nav {
		width: 100%;
		height: 400upx;
		position: relative;
		z-index: 99;
		image {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
		}
		text {
			position: absolute;
			left: 80upx;
			bottom: 130upx;
			font-size: 36upx;
			font-weight: 600;
			color: white;
		}
	}
	.vlist_content {
		width: 90%;
		height: calc(100% - 420upx);
		margin: -15upx auto;
		padding: 30upx 0 30upx 0;
		box-sizing: border-box;
		border-radius: 10upx;
		background-color: white;
		z-index: 999;
		.vlist_content_box {
			width: 94%;
			height: 200upx;
			border-radius: 10upx;
			margin: 10upx auto;
			background-color: #F4F5FC;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.index {
				font-size: 40upx;
				font-weight: 600;
				color: blue;
			}
			.texts {
				font-size: 36upx;
				font-weight: 600;
			}
			.to {
				width: 160upx;
				height: 60upx;
				text-align: center;
				line-height: 60upx;
				font-size: 32upx;
				background: linear-gradient(#FEA413,#F96B19);
				border-radius: 20upx;
				color: white;
			}
		}
	}
</style>
