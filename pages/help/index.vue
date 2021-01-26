<template>
	<view class="content">
		<!-- <view class="_header">
			<text>企业互助</text>
			<text class="_right">发布</text>
		</view> -->
		<view class="header">
			<i class="iconfont">&#xe6a6;</i>
			<input type="text" v-model="search" 
			placeholder="搜索内容" @input="search_msg" />
		</view>
		<view class="help_content" v-for="(item,index) in newList" :key="index">
			<view class="qiye_msg">
				<image :src="item.logo" mode="aspectFill" @click="xiangxi(item.id)">

				</image>
				<view class="_test" @click="xiangxi(item.id)">
					<p>{{item.qiyename}}</p>
					<text>{{item.time}}</text>
				</view>
				<!-- <view class="guanzhu" @click="guanzhu(index)">
					{{item.isguanzhu == 1 ? '已关注' : '关注'}}
				</view> -->
			</view>
			<view class="qiye_ten" @click="xiangxi(item.id)">
				<text>【互助】{{item.title}}</text>
			</view>
		</view>
		<!-- <view class="help_list">
			<text class="more">更多互助信息 ></text>
		</view> -->
		<uni-load-more :status="loading">
			
		</uni-load-more>
	</view>
</template>

<script>
	import _ from 'lodash'
	import uniLoadMore from '../components/uni-load-more/uni-load-more.vue'
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				newList: [],
				newLists: [],
				pageNum: 1,
				loading: 'more',
				search: ''
			}
		},
		onLoad() {
			this.show()
		},
		//滚动到底部
		onReachBottom() {
			if (this.loading === 'more') {
				uni.showLoading({
					title: '加载中'
				})
				this.show()
			} else {
				
			}
		},
		//下拉刷新
		onPullDownRefresh() {
			this.$http.post('lessonaqi/api/lessonqiyehuzhulist', {
					pageNum: 1,
					pageSize: 20,
					userid: uni.getStorageSync('userId')
				}, {})
				.then(res => {
					console.log(res.data)
					this.newList = res.data.rows
				})
				.catch(err => {
					console.log(err)
				})
			setTimeout(() => {
				uni.stopPullDownRefresh()
			},1000)
		},
		methods: {
			//企业互助列表查询
			show() {
				this.$http.post('lessonaqi/api/lessonqiyehuzhulist', {
						pageNum: this.pageNum,
						pageSize: 10,
						userid: uni.getStorageSync('userId')
					}, {})
					.then(res => {
						uni.hideLoading()
						console.log(res.data)
						this.newList = this.newList.concat(res.data.rows)
						this.newLists = this.newList.concat(res.data.rows)
						let more_page = Math.ceil(res.data.total / 10)
						if (more_page === this.pageNum) {
							this.loading = 'nomore'
						}
						this.pageNum += 1
					})
					.catch(err => {
						console.log(err)
					})
			},
			//模糊查询
			search_msg () {
				this.newList = this.newLists
				if (this.search === '') {
					// this.newList = this.newLists
				} else {
					let list = this.newList
					var lists = []
					for (var i=0; i < this.newList.length; i++) {
						if (list[i].qiyename.indexOf(this.search) !== -1 || list[i].title.indexOf(this.search) !== -1 || list[i].time.indexOf(this.search) !== -1) {
							lists.push(this.newList[i])
						}
					}
					console.log(lists)
					this.newList = lists
				}
			},
			//去往详细页
			xiangxi(e) {
				uni.navigateTo({
					url: './help_xiangxi?data=' + e
				})
			},
			//关注
			guanzhu(ent) {
				this.$http.post('lessonaqi/api/lessonqiyeguanzhu', {
						userid: uni.getStorageSync('userId'),
						qiyeid: this.newList[ent].qiyeid
					}, {})
					.then(res => {
						if (this.newList[ent].isguanzhu == 1) {
							this.newList[ent].isguanzhu = 0
							this.$api.msg('取消关注')
						} else {
							this.newList[ent].isguanzhu = 1
							this.$api.msg('关注成功')
						}

						console.log(res.data)
					})
					.catch(err => {
						console.log(err)
					})
			},
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background-color: #fff;
	}

	.content {
		display: flex;
		flex-direction: column;
		padding-bottom: 100upx;
	}

	// ._header{
	// 	width: 100%;
	// 	height: 100rpx;
	// 	background-color: #fff;
	// 	display: flex;
	// 	align-items: center;
	// 	justify-content: space-between;
	// 	box-sizing: border-box;
	// 	padding: 0 24rpx;
	// 	text{
	// 		color: #333;
	// 		font-size: 32rpx;
	// 		font-weight: 600;
	// 	}
	// 	._right{
	// 		color: #999;
	// 		font-size: 28rpx;
	// 		font-weight: 400;
	// 	}
	// }
	.header {
		width: 96%;
		height: 80upx;
		margin: 20upx auto;
		background-color: #F5F5F5;
		border-radius: 10upx;
		display: flex;
		justify-content: flex-end;
		line-height: 80upx;

		input {
			width: 60%;
			height: 100%;
			margin-left: 10upx;
		}
	}

	.help_content {
		width: 100%;
		max-height: 350upx;
		overflow: hidden;
		margin: 10upx auto;
		border-bottom: 1px solid #F5F5F5;

		.qiye_msg {
			width: 100%;
			height: 120upx;
			position: relative;
			display: flex;

			image {
				width: 80upx;
				height: 80upx;
				margin: 20upx 15upx;
				border-radius: 50%;
			}

			._test {
				width: calc(100% - 240upx);
				height: 80upx;
				margin-top: 20upx;
				margin-left: 20upx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				p {
					font-size: 32upx;
				}

				text {
					font-size: 28upx;
					color: #696969;
				}
			}

			// .guanzhu{
			// 	width: 120upx;
			// 	height: 50upx;
			// 	font-size: 28upx;
			// 	text-align: center;
			// 	margin-top: 30upx;
			// 	margin-right: 20upx;
			// 	line-height: 50upx;
			// 	border-radius: 50upx;
			// 	background-color: #FFE8C3;
			// 	color: #FFA318;
			// 	box-sizing: border-box;
			// 	border: 1px solid #FFCC7B;
			// }
		}

		.qiye_ten {
			width: 100%;
			margin-bottom: 10upx;
			box-sizing: border-box;
			font-size: 32upx;
			padding: 0 115rpx;
		}
	}

	// .help_list{
	// 	width: 100%;
	// 	display: flex;
	// 	flex-direction: column;
	// 	background-color: #fff;
	// 	padding: 10rpx 0;
	// 	.more{
	// 		text-align: right;
	// 		color: #666;
	// 		font-size: 28rpx;
	// 		padding-right: 24rpx;
	// 	}
	// }
</style>
