<template>
	<view class="huodong">
		<view class="no" v-if="huodongList.length === 0">
			<text>您还没有参与任何活动！</text>
		</view>
		<scroll-view 
		v-if="huodongList.length !== 0"
		class="list-scroll-content" 
		scroll-y="true"
		@scrolltolower="chudi">
			<!-- 资讯列表 -->
			<view class="news_content" v-for="(item,index) in huodongList" :key="index" @click="huodong_xq(item.activityId)">
				<image :src="item.fengmian" mode="aspectFill"></image>
				<view class="_right">
					<view class="_top">
						<text class="tit">{{item.title}}</text>
					</view>
					<view class="_bottom">
						<view class="like">
							<text style="color: red;">{{item.type === 1 ? '免费' : item.jiage + '企币'}}</text>
						</view>
						<view class="num">
							<text>已报名{{item.yibaomingrenshu}}人</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageNum: 1,
				loading: 'more',
				huodongList: []
			}
		},
		methods: {
			// 已报名接口列表
			show() {
				this.$http.post('lessonaqi/api/lessonuserhuodonglist', {
						userid: uni.getStorageSync('userId'),
						pageSize: 5,
						pageNum: this.pageNum
					}, {})
					.then(res => {
						console.log(res)
						this.huodongList = this.huodongList.concat(res.data.rows)
						let more_page = Math.ceil(res.data.total/5)
						if (more_page === this.pageNum) {
							this.loading = 'nomore'
						}
						this.pageNum += 1
					})
					.catch(err => {
						console.log(err)
					})
			},
			huodong_xq(e) {
				uni.navigateTo({
					url: '../shop/acvitity_xiang?data=' + e
				})
			},
			chudi () {
				if (this.loading === 'more') {
					this.show()
				}
			}
		},
		onLoad() {
			this.show() //展示已参与活动列表
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
	}

	.huodong {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		/* border: 1px solid red; */
		display: flex;
		flex-direction: column;
	}

	.no {
		width: 80%;
		height: 80upx;
		margin: auto;
		text-align: center;
		align-self: center;
	}

	.list-scroll-content {
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
			max-height: 88upx;
			overflow: scroll;
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
		}

		._right {
			height: 100%;
			flex: 1;
			display: flex;
			padding-left: 20rpx;
			flex-direction: column;
			justify-content: space-between;

			.tit {
				font-size: 30rpx;
				color: #333;
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
				border: 1px solid red;
				border-radius: 50upx;
				align-items: center;

				text {
					padding-left: 10rpx;
					font-size: 28rpx;
					color: red;
				}
			}
		}
	}

	.navbar {
		display: flex;
		height: 80rpx;
		padding: 0 10rpx;
		background: #fff;
		box-shadow: 0 1px 10rpx rgba(0, 0, 0, .06);
		position: relative;
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 30rpx;
			color: #333;
			position: relative;

			&.current {
				color: #999;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 88rpx;
					height: 0;
					border-bottom: 4rpx solid #999;
				}
			}
		}
	}
</style>
