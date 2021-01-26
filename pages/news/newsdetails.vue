<template>
	<view class="content">
		<text class="news_tit">{{news.title}}</text>
		<view class="news_time">
			<view class="news_time_msg">
				<image src="../../static/f667fa917bd16d930b548adc6406bf6.png" mode="aspectFill"></image>
				<view class="msg_newstime">
					<text>啊企官方</text>
					<text>{{news.time}}</text>
				</view>
			</view>
			<text class="text">阅读{{news.yuedu}}</text>
		</view>
		<view class="news_content">
			<!-- <view class="" v-html="news.neirong">
				
			</view> -->
			<u-parse :html="news.neirong"></u-parse>
			<view class="comment_list">
				<view class="_header">
					<view class=""></view>
					<text>精彩评论</text>
				</view>
				<view class="comment_content" v-for="(n, index) in news.pinglunlist">
					<image :src="n.photo" mode="aspectFill" class="head_img"></image>
					<view class="content_name">
						<p>{{n.name}}</p>
						<text>{{n.neiron}}</text>
					</view>
					<view class="jcpl">
						<image class="nav-items" src="../../static/qyservice/huo.png" mode=""></image>
						<text>{{n.dianzang}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="comment">
			 <input @click="to_comment" type="text" confirm-type="send" placeholder="发表你的评论..." disabled/>
			 <view class="operating">
			 	<i class="iconfont" @click="comment_details()">&#xe638;</i>
			 	<i class="iconfont" @click="like()" :class="{'like' : news.isshoucang }">&#xe629;</i>
			 	<i class="iconfont" @click="dianzan()" :class="{'like' : news.isdianzan }">&#xe603;</i>
			 </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				news_comment: '',
				news: Array
			}
		},
		onShow() {
			
		},
		onLoad(option){
			this.id = option.id
			this.$http
			.post('lessonaqi/api/lessongetzixunbyid', 
			{
			    id: option.id,
				userid: uni.getStorageSync('userId')
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
		.news_time_msg{
			width: 70%;
			height: 120upx;
			display: flex;
			image{
				width: 80upx;
				height: 80upx;
				border-radius: 50%;
				margin-top: 20upx;
			}
			.msg_newstime {
				margin-top: 10upx;
				margin-left: 20upx;
				height: 100upx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
			}
		}
		.text{
			margin-top: 20upx;
		}
		text{
			color: #999;
			font-size: 28rpx;
		}
	}
	.news_content{
		display: flex;
		flex-direction: column;
		padding: 20rpx 20rpx 120rpx;
		img {
			width: 100%;
			height: 100%;
		}
		.head_img{
			width: 80upx;
			height: 80upx;
			border-radius: 50%;
		}
		.comment_list{
			display: flex;
			flex-direction: column;
			._header{
				display: flex;
				height: 40rpx;
				align-items: center;
				margin: 10upx 0;
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
			padding: 10rpx;
			.content_name{
				width: 80%;
				font-size: 32upx;
				margin-left: 20upx;
				display: flex;
				flex-direction: column;
			}
			text{
				font-size: 28upx;
				margin-top: 10upx;
			}
			i{
				font-size: 28rpx;
				color: #666;
			}
			.like{
				color: red;
				
			}
			.jcpl{
				// border: 1px solid red;
				display: flex;
				image{
					margin-top: 16upx;
				}
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
