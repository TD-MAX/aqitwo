<template>
	<view class="content">
		
		<view class="message_list">
			<view class="message_content" v-for="(n, index) in user_list" :key="index">
				<view class="message_name">
					<view class="_left">
						<image :src="n.headUrl" mode="aspectFill"></image>
						<view class="content_name">
							<text class="_name">{{n.nickname}}</text>
							<text class="_content">查看了你</text>
						</view>
					</view>
					<view class="_time">
						{{n.datatime}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user_list: [],
			}
		},

		onLoad() {
			this.init()
		},

		methods: {
			init () {
				uni.showLoading({
				    title: '加载中'
				});
				
				this.$http
				.post('lessonxiangqin/api/getUserVisit', 
				{
					userId : uni.getStorageSync('userId'),
				}, {})
				.then(res => {
					uni.hideLoading()
					console.log(res.data.data)
					_.each(res.data.data, o => {
						this.user_list.push(o)
					})
				})
				.catch(err => {
				})
			}
		}
	}
</script>

<style lang="scss">
	.content{
		display: flex;
		flex-direction: column;
	}
	.message_list {
		display: flex;
		flex-direction: column;
		padding: 30rpx;
		.tit{
			font-size: 32rpx;
		}
		.message_content{
			display: flex;
			flex-direction: column;
			.message_name{
				display: flex;
				justify-content: space-between;
				padding: 14rpx 0;
				border-bottom: 1px solid #f4f4f4;
				._left{
					display: flex;
					image{
						width: 100rpx;
						height: 100rpx;
						border-radius: 50%;
					}
					.content_name{
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						padding: 6rpx;
						._name{
							color: #333;
							font-size: 32rpx;
						}
						._content{
							color: #999;
							font-size: 28rpx;
							max-width: 450rpx;
							overflow: hidden;
							text-overflow:ellipsis;
							white-space: nowrap;
						}
					}
				}
				._time{
					color: #999;
					font-size: 26rpx;
					padding-top: 6rpx;
				}
			}
		}
	}
</style>
