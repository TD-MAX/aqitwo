<template>
	<view class="content">
		<text class="news_tit">{{news.title}}</text>
		<view class="news_time">
			<text>{{news.time}}</text>
			<text>阅读{{news.yuedu}}</text>
		</view>
		<view class="news_content">
			<view class="" v-html="news.neirong">
				
			</view>
			<!-- <view class="comment_list">
				<view class="_header">
					<view class=""></view>
					<text>精彩评论</text>
				</view>
				<view class="comment_content" v-for="(n, index) in news.pinglunlist">
					<text>{{n.neiron}}</text>
					<i class="iconfont">
						<image class="nav-items" src="../../static/qyservice/huo.png" mode=""></image>
						<text>{{n.dianzang}}</text>
					</i>
				</view>
			</view> -->
		</view>
		<!-- <view class="comment">
			 <input @click="to_comment" type="text" confirm-type="send" placeholder="发表你的评论..." disabled/>
			 <view class="operating">
			 	<i class="iconfont" @click="comment_details()">&#xe638;</i>
			 	<i class="iconfont" @click="like()" :class="{'like' : news.isshoucang }">&#xe755;</i>
			 	<i class="iconfont" @click="dianzan()" :class="{'like' : news.isdianzan }">&#xe685;</i>
			 </view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				news_comment: '',
				news: {}
			}
		},
		onShow() {
			
		},
		onLoad(option){
			this.id = option.data
			this.$http
			.post('lessonaqi/api/lessonqiyerongyuxq', 
			{
			    id: this.id,
			}, {})
			.then(res => {
				console.log(res.data)
				this.news = res.data
			})
			.catch(err => {
			})
		},
		methods: {
			to_comment () {
				uni.navigateTo({
					url: `/pages/news/comment?id=${this.id}`
				})
			},
			comment_details () {
				uni.navigateTo({
					url: `/pages/news/comment?id=${this.id}`
				})
			},
			like () {
				
				this.$http
				.post('lessonaqi/api/lessonzixunshoucang', 
				{
				    zixunid: this.id,
				    userid: uni.getStorageSync('userId')
				}, {})
				.then(res => {
					console.log(this.news.isshoucang)
					this.news.isshoucang = !this.news.isshoucang
				})
				.catch(err => {
				})
				if(this.news.isshoucang == 0){
					this.$api.msg('收藏成功')
				}else{
					this.$api.msg('取消收藏')
				}
				
			},
			dianzan () {
				
				this.$http
				.post('lessonaqi/api/lessonzixundianzan', 
				{
				    zixunid: this.id,
				    userid: uni.getStorageSync('userId')
				}, {})
				.then(res => {
					this.news.isdianzan = !this.news.isdianzan
				})
				.catch(err => {
				})
				if(this.news.isdianzan == 0){
					this.$api.msg('点赞成功')
				}else{
					this.$api.msg('取消点赞')
				}
			},
			comment_dz (n) {
				this.$http
				.post('lessonaqi/api/lessonzixunpinglundianzan', 
				{
				    zixunpinglunid: this.news.pinglunlist[n].id,
				    userid: uni.getStorageSync('userId')
				}, {})
				.then(res => {
					this.news.pinglunlist[n].isdianzan = !this.news.pinglunlist[n].isdianzan
				})
				.catch(err => {
				})
			}
		}  
	}
	
	
</script>

<style lang="scss">
	page{
		background: #fff;
		height: 100%;
	}
	.content{
		min-height: 100%;
		display: flex;
		flex-direction: column;
	}
	.news_tit{
		padding: 20rpx;
		font-size: 38rpx;
		color: #333;
		font-weight: 700;
		line-height: 60rpx;
	}
	.news_time{
		display: flex;
		justify-content: space-between;
		padding: 20rpx;
		text{
			color: #999;
			font-size: 24rpx;
		}
	}
	.news_content{
		display: flex;
		flex-direction: column;
		// padding: 20rpx 20rpx 120rpx;
		.comment_list{
			display: flex;
			flex-direction: column;
			._header{
				display: flex;
				height: 40rpx;
				align-items: center;
				view{
					width: 8rpx;
					height: 100%;
					background-color: #007AFF;
					border-radius: 6rpx;
				}
				text{
					font-size: 32rpx;
					padding-left: 10rpx;
				}
			}
		}
		.comment_content{
			display: flex;
			justify-content: space-between;
			padding: 10rpx;
			i{
				font-size: 28rpx;
				color: #666;
			}
			.like{
				color: red;
				
			}
		}
	}
	.nav-items {
		width: 24rpx;
		height: 24rpx;
	}
	
	.comment{
		width: 100%;
		height: 80rpx;
		display: flex;
		background: #fff;
		align-items: center;
		padding: 10rpx 20rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		input{
			width: 50%;
			border: none;
			background-color: #f4f4f4;
			height: 60rpx;
			text-indent: 10rpx;
			border-radius: 10rpx;
		}
		.operating{
			flex: 1;
			display: flex;
			padding-left: 20rpx;
			align-items: center;
			justify-content: space-around;
			i{
				font-size: 40rpx;
				color: #666;
			}
			.like{
				color: red;
			}
		}
		
	}
	
</style>
