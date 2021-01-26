<template>
	<view class="content">
		<scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadData">
			<view class="news_content" @click="_details(n.infoId)" v-for="(n, index) in newLists">
				<image :src="n.infoPicture" mode="aspectFill"></image>
				<view class="_right">
					<text class="tit">{{n.infoTitle}}</text>
					<view class="_bottom">
						<view class="like">
							<text>已学习人数：{{n.infoNums}}</text>
						</view>
						<view class="num">
							<text>{{n.type === '2' ? '已学完' : '去学习'}}</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import _ from 'lodash'
	export default {
		data() {
			return {
				pageNum: 1,
				loading: 'more',
				newList: [],
				newLists:[]
			}
		},
		methods: {
			//展示时政学习列表
			show() {
				if (this.loading === 'more') {
					this.$http.post('lessonaqi/api/lessonsetinfotitle', {
							pageNum: this.pageNum,
							pageSize: 10,
							userid: uni.getStorageSync('userId')
						}, {})
						.then(res => {
							console.log(res.data)
							this.newList = this.newList.concat(res.data.rows)
							let list = []
							let arr = []
							_.each(this.newList, o=>{
								if (o.type === '2') {
									arr.push(o)
								} else {
									list.push(o)
								}
							})
							this.newLists = list.concat(arr)
							let more_page = Math.ceil(res.data.total / 10)
							if (more_page === this.pageNum) {
								this.loading = 'nomore'
							}
							this.pageNum++
						})
						.catch(err => {
							console.log(err)
						})
				} else {
					this.$api.msg('没有更多数据了')
				}
			},
			//详情
			_details (e) {
				uni.navigateTo({
					url: './treatment_xiangxi?data=' + e,
					animationType: 'pop-in'
				})
			}
		},
		onLoad() {
			this.show()
		}
	}
</script>

<style lang="scss">
	page,
	.content {
		background: #f4f4f4;
		height: 100%;
	}

	.swiper-box {
		height: calc(100% - 80rpx);
	}

	.list-scroll-content {
		height: 100%;
	}

	.news_content {
		height: 180rpx;
		width: 100%;
		box-sizing: border-box;
		padding: 15rpx;
		display: flex;
		align-items: center;
		background: #fff;

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
					// border: 1px solid red;
					font-size: 28upx;
					border-radius: 10upx;
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

	.uni-swiper-item {
		height: auto;
	}

	/* load-more */
	.uni-load-more {
		display: flex;
		flex-direction: row;
		height: 80rpx;
		align-items: center;
		justify-content: center
	}

	.uni-load-more__text {
		font-size: 28rpx;
		color: #999
	}

	.uni-load-more__img {
		height: 24px;
		width: 24px;
		margin-right: 10px
	}

	.uni-load-more__img>view {
		position: absolute
	}

	.uni-load-more__img>view view {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #999;
		position: absolute;
		opacity: .2;
		transform-origin: 50%;
		animation: load 1.56s ease infinite
	}

	.uni-load-more__img>view view:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px
	}

	.uni-load-more__img>view view:nth-child(2) {
		transform: rotate(180deg);
		top: 11px;
		right: 0
	}

	.uni-load-more__img>view view:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px
	}

	.uni-load-more__img>view view:nth-child(4) {
		top: 11px;
		left: 0
	}

	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px
	}

	.load2 {
		transform: rotate(30deg)
	}

	.load3 {
		transform: rotate(60deg)
	}

	.load1 view:nth-child(1) {
		animation-delay: 0s
	}

	.load2 view:nth-child(1) {
		animation-delay: .13s
	}

	.load3 view:nth-child(1) {
		animation-delay: .26s
	}

	.load1 view:nth-child(2) {
		animation-delay: .39s
	}

	.load2 view:nth-child(2) {
		animation-delay: .52s
	}

	.load3 view:nth-child(2) {
		animation-delay: .65s
	}

	.load1 view:nth-child(3) {
		animation-delay: .78s
	}

	.load2 view:nth-child(3) {
		animation-delay: .91s
	}

	.load3 view:nth-child(3) {
		animation-delay: 1.04s
	}

	.load1 view:nth-child(4) {
		animation-delay: 1.17s
	}

	.load2 view:nth-child(4) {
		animation-delay: 1.3s
	}

	.load3 view:nth-child(4) {
		animation-delay: 1.43s
	}

	@-webkit-keyframes load {
		0% {
			opacity: 1
		}

		100% {
			opacity: .2
		}
	}
</style>
