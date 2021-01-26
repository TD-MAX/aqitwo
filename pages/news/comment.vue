<template>
	<view class="content">
		<scroll-view
			class="news_content" 
			scroll-y
			@scrolltolower="loadData"
		>
		<view class="comment_list">
			<view class="_header">
				<view class=""></view>
				<text>全部评论{{sum}}</text>
			</view>
			<view class="comment_list1">
				<view class="comment_content" v-for="(n, index) in comment_list" :key="index">
					<image :src="n.photo" mode="aspectFill"></image>
					<view class="head">
						<text>{{n.name}}</text>
						<text style="font-size: 28upx;">{{n.neiron}}</text>
					</view>
					<view class="last">
						<i class="iconfont" @click="comment_dz(index)" :class="{'like' : n.isdianzan }">&#xe685;</i>
						<text>{{n.dianzang}}</text>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
		</scroll-view>
		<view class="comment">
			 <input type="text" confirm-type="send" placeholder="发表你的评论..." v-model="comment_input" @confirm="comment_success"/>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '../components/uni-load-more/uni-load-more.vue'
	import _ from 'lodash'
	export default {
		data() {
			return {
				id: '',
				pageNum: 1,
				comment_list: [],
				loadingType: 'more',
				more_page: 0,
				comment_input: '',
				sum:0,
			}
		},
		components:{
			uniLoadMore
		},
		onShow() {
			
		},
		onLoad(option){
			this.id = option.id
			this.init()
		},
		methods: {
			init () {
				this.$http
				.post('lessonaqi/api/lessonzixunlist', 
				{
				    zixunid: this.id,
					userid: uni.getStorageSync('userId'),
					pageSize: 20,
					pageNum: this.pageNum
				}, {})
				.then(res => {
					console.log(res.data.rows)
					_.each(res.data.rows, o => {
						this.comment_list.push(o)
					})
					this.sum = this.comment_list.length
					this.more_page = Math.ceil(res.data.total/20)
					if (this.pageNum === this.more_page) {
						this.loadingType = 'nomore'
					}
					this.pageNum++
				})
				.catch(err => {
				})
			},
			loadData () {
				if (this.loadingType === 'more') {
					this.init()
				}
			},
			comment_success () {
				this.$http
				.post('lessonaqi/api/lessonzixunpinglun', 
				{
					neiron: this.comment_input,
				    zixunid: this.id,
				    userid: uni.getStorageSync('userId')
				}, {})
				.then(res => {
					console.log(res.data)
					this.comment_list.push(res.data)
					this.sum = this.comment_list.length
					this.comment_input = []
					// this.init()
				})
				.catch(err => {
				})
			},
			comment_dz (n) {
				this.$http
				.post('lessonaqi/api/lessonzixunpinglundianzan', 
				{
				    zixunpinglunid: this.comment_list[n].id,
				    userid: uni.getStorageSync('userId')
				}, {})
				.then(res => {
					this.comment_list[n].isdianzan = !this.comment_list[n].isdianzan
					if (this.comment_list[n].isdianzan) {
						this.comment_list[n].dianzang++
					} else {
						this.comment_list[n].dianzang--
					}
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
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.news_content{
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 20rpx 20rpx 100rpx;
		box-sizing: border-box;
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
	}
	.comment_list1{
		display: flex;
		flex-direction: column;
		.comment_content{
			display: flex;
			position: relative;
			padding: 10rpx;
			border-bottom: 1px solid #F5F5F5;
			margin-bottom: 10upx;
			.head{
				display: flex;
				flex-direction: column;
				// border: 1px solid red;
				box-sizing: border-box;
				// overflow: scroll;
				overflow-x: hidden;
				width: 75%;
				text{
					font-size: 32upx;
					// margin-top: 10upx;
					margin-left: 10upx;
				}
			}
			.last{
				width: 70upx;
				height: 100upx;
				display: flex;
				justify-content: space-between;
				line-height: 80upx;
				// border: 1px solid red;
				position: absolute;
				right: 0;
			}
			image{
				width: 80upx;
				height: 80upx;
				border-radius: 50%;
			}
			i{
				font-size: 28rpx;
				color: #666;
			}
			.like{
				color: red;
			}
		}
	}
	.comment{
		width: 100%;
		height: 80rpx;
		display: flex;
		align-items: center;
		padding: 10rpx 20rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		box-sizing: border-box;
		background-color: #fff;
		input{
			width: 100%;
			border: none;
			background-color: #f4f4f4;
			height: 60rpx;
			text-indent: 10rpx;
			border-radius: 10rpx;
		}
	}
</style>
