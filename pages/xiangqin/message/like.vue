<template>
	<view class="content">
		<view class="message_list">
			<view class="message_content" v-for="n in 7" :key="n">
				<view class="message_name">
					<view class="_left">
						<image src="../../../static/img3.jpg" mode="aspectFill"></image>
						<view class="content_name">
							<text class="_name">我的名字是八个字</text>
							<text class="_content">我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容</text>
						</view>
					</view>
					<view class="_time">
						<image src="../../../static/img2.jpg" mode="aspectFill"></image>
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
			}
		},
		onLoad() {
			
		},
		methods: {

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
					width: 100rpx;
					height: 100rpx;
					image{
						width: 100%;
						height: 100%;
						border-radius: 8rpx;
					}
				}
			}
		}
	}
</style>
