<template>
	<view class="container">
		<view class="news_content" @click="_details(n.zixunid)" v-for="(n, index) in news_list">
			<image :src="n.fengmian" mode=""></image>
			<view class="_right">
				<view class="_top">
					<image src="../../static/zhiding.png" mode="" class="zhiding" v-if="n.iszhiding===1"></image>
					<text class="tit">{{n.title}}</text>
				</view>
				<view class="_bottom">
					<view class="like">
						<view class="">
							<i class="iconfont">&#xe667;</i>
							<text>{{n.shoucangnum}}</text>
						</view>
						<view class="">
							<i class="iconfont">&#xe60a;</i>
							<text>{{n.dianzannum}}</text>
						</view>
					</view>
					<view class="num">
						<text>浏览量</text>
						<text>{{n.yuedu}}</text>
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
				news_list: [],
				loading: 'more',
				pageNum: 1
			}
		},
		methods: {
			init(n) {
				uni.showLoading({
					title: '加载中',
				});
				this.$http
					.post('lessonaqi/api/lessongetzixunliulanjilu', {
						userid: uni.getStorageSync('userId')
					}, {})
					.then(res => {
						console.log(res.data)
						uni.hideLoading()
						for (var i = 0; i < res.data.length; i++) {
							for (var j=i+1; j<res.data.length;j++) {
								console.log('v')
								if (res.data[i].zixunid === res.data[j].zixunid) {
									res.data.splice(j,1)
									j--
								}
							}
						}
						this.news_list = res.data
						// let arr = []
						// for (var i = 0; i < res.data.length; i++) {
						// 	if (!arr.includes(res.data[i].zixunid)) {
						// 		arr.push(res.data[i])
						// 	}
						// }
						// this.news_list = arr
						this.more_page = Math.ceil(res.data.total / 10)
						if (this.pageNum === this.more_page) {
							this.navList[this.tabCurrentIndex].loadingType = 'nomore'
						}
						this.pageNum++
					})
					.catch(err => {

					})
			},
			_details (e) {
				uni.navigateTo({
					url: '../news/newsdetails?id=' + e
				})
			}
		},
		onLoad() {
			this.init(0)
		}
	}
</script>

<style lang="scss">
	.container {
		width: 100%;
		height: 100%;
	}

	.news_content {
		height: 200rpx;
		width: 100%;
		box-sizing: border-box;
		padding: 25rpx;
		display: flex;
		align-items: center;
		background: #fff;
		box-sizing: border-box;
		border-bottom: 1px solid #F2F2F2; //分割线颜色

		._top {
			display: flex;
		}

		.zhiding {
			width: 80upx;
			height: 40upx;
			margin-right: 20upx;
			// position: absolute;
		}

		image {
			width: 240rpx;
			height: 150rpx;
			border-radius: 10upx;
		}

		._right {
			width: calc(100% - 250upx);
			height: 100%;
			flex: 1;
			display: flex;
			padding-left: 20rpx;
			flex-direction: column;
			justify-content: space-between;

			.tit {
				font-size: 30rpx;
				width: 100%;
				height: 80upx;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				// text-overflow: ellipsis;
				// white-space: nowrap;
				color: #333;
				// border: 1px solid red;
			}

			._bottom {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.like {
					display: flex;

					view {
						display: flex;
						align-items: center;
						color: #999;
						padding-right: 20rpx;

						i {
							font-size: 24rpx;
							padding-right: 10rpx;
						}

						text {
							font-size: 28rpx;

						}
					}
				}
			}

			.num {
				display: flex;
				align-items: center;

				text {
					padding-left: 10rpx;
					font-size: 28rpx;
					color: #999;
				}
			}
		}
	}
</style>
