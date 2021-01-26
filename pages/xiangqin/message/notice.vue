<template>
	<view class="content">
		<view class="message_list">
			<view class="message_content" v-for="(n, index) in message_list" :key="index">
				<view class="message_name">
					<view class="_left">
						<image :src="n.photo" mode="aspectFill"></image>
						<view class="content_name">
							<text class="_name">{{type[n.type]}}</text>
							<text class="_content">我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容</text>
						</view>
					</view>
					<view class="_time">
						10分钟前
					</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
	</view>
</template>

<script>
	import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue'
	import _ from 'lodash'
	export default {
		data() {
			return {
				loadingType: 'more',
				message_list: [],
				pageNum: 1,
				type: {
					pldz: '评论点赞',
					dtdz: '评论点赞',
					dtpl: '评论点赞',
					yhgz: '评论点赞'
				},
				more_page: 0
			}
		},
		components:{
			uniLoadMore
		},
		onLoad() {
			this.init()
		},
		onReachBottom(){
			if (this.pageNum <= this.more_page) {
				this.init()
			}
		},
		methods: {
			init () {
				uni.showLoading({
				    title: '加载中'
				});
				this.$http
				.post('lessonxiangqin/api/lessontongzhi', 
				{
					userid : uni.getStorageSync('userId'),
					pageNum: this.pageNum,
					pageSize: 15
				}, {})
				.then(res => {
					uni.hideLoading()
					console.log(res.data)
					_.each(res.data.rows, o => {
						this.message_list.push(o)
					})
					this.more_page = Math.ceil(res.data.total/15)
					if (this.pageNum === this.more_page) {
						this.loadingType = 'nomore'
					}
					this.pageNum++
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
