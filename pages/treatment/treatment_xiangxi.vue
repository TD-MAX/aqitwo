<template>
	<view>
		<!-- 计时器插件 -->
		<view class="jishiqi">
			<zwp-ring-timing ref="ring1" mode="timing" :duration="times" :activeColor="'#FFA34F'" :radius="40" :barWidth="5"
			 @timingEnd="onTimingEnd" />
		</view>
		<view class="jishiqi_nr">
			<text v-if="times !== 0">{{times}}</text>
			<text v-if="times === 0" @click="wanchen">完成</text>
		</view>
		<!-- 内容 -->
		<text class="news_tit">{{news.infoTitle}}</text>
		<view class="news_content">
			<view class="" v-html="news.infoContent">

			</view>
		</view>
		<uni-popup ref="popupDialog" type="dialog" @change="change">
			<uni-popup-dialog title="确定要退出吗" content="您还未完成学习" :before-close="true" @confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import zwpRingTiming from '@/components/zwp-ring-timing/zwp-ring-timing.vue' //计时器
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		components: {
			zwpRingTiming,
			uniPopupDialog
		},
		data() {
			return {
				id: '',
				chartValue: '',
				news: {},
				times: 0 
			}
		},
		methods: {
			show() {
				this.$http.post('lessonaqi/api/lessongetinfocontent', {
						userid: uni.getStorageSync('userId'),
						infoid: this.id
					}, {})
					.then(res => {
						console.log(res)
						this.news = res.data[0]
						if (res.data[0].type === '2') {
							this.times = 0
						} else {
							this.times = Number(res.data[0].infoLowertime) * 60
						}
						
						console.log(this.times)
						let action = 'start'
						this.dingshiqi()
						this.$refs.ring1[action]()
					})
					.catch(err => {
						console.log(err)
					})
			},
			wanchen() {
				uni.navigateBack({
					delta:1
				})
		},
		//定时器
		dingshiqi() {
			let int = setInterval(() => {
				if (this.times) {
					this.times--
				} else {
					clearInterval(int)
				}
			}, 1000)
		},
		//计时器
		onTimingEnd() {
			//完成时政学习
			this.$http.post('lessonaqi/api/lessongetinfostudy', {
					userid: uni.getStorageSync('userId'),
					infoid: this.id,
					type: '2',
					studytime: '1',
					infotimes: '1'
				}, {})
				.then(res => {
					console.log(res)
					uni.showToast({
						title: '已完成学习'
					})
				})
		},
		dialogConfirm(done) {
			// this.$refs.popupMessage.open()
			console.log('点击确认');
			uni.redirectTo({
				url: './treatment'
			})
			// 需要执行 done 才能关闭对话框
			done()
		},
		dialogClose(done) {
			console.log('点击取消')
			// this.$refs.popopMessage.open()
			done()
		},
		change(e) {
			//记录点击状态
		},
	},
	onLoad(option) {
			this.id = option.data
			this.show()
		},
		onBackPress() {
			if (this.times !== 0) {
				this.$refs.popupDialog.open()
				console.log(this.times)
				return true
			}
		}
	}
</script>

<style lang="scss">
	.jishiqi {
		// box-sizing: border-box;
		position: fixed;
		right: 10upx;
		bottom: 120upx;
		opacity: 0.4;
		text-align: center;
		// border: 1px solid black;
		line-height: 80upx;
		color: red;
		box-sizing: border-box;
		padding: 4upx 2upx;
		font-size: 26upx;
		width: 90upx;
		height: 90upx;
	}

	.jishiqi_nr {
		position: fixed;
		// border: 1px solid red;
		width: 69upx;
		height: 70upx;
		box-sizing: border-box;
		font-size: 28upx;
		color: #FFA34F;
		// background-color: #FFE8C3;
		border-radius: 50%;
		text-align: center;
		line-height: 70upx;
		right: 24upx;
		bottom: 130upx;
	}

	page {
		background: #fff;
		height: 100%;
	}

	.content {
		min-height: 100%;
		display: flex;
		flex-direction: column;
	}

	.news_tit {
		display: block;
		padding: 20rpx;
		// margin-top: 10upx;
		font-size: 38rpx;
		color: #333;
		font-weight: 700;
		line-height: 60rpx;
	}

	.news_time {
		display: flex;
		justify-content: space-between;
		padding: 20rpx;

		text {
			color: #999;
			font-size: 24rpx;
		}
	}

	.news_content {
		display: flex;
		flex-direction: column;
		padding-left: 20upx;

		// padding: 20rpx 20rpx 120rpx;
		.comment_list {
			display: flex;
			flex-direction: column;

			._header {
				display: flex;
				height: 40rpx;
				align-items: center;

				view {
					width: 8rpx;
					height: 100%;
					background-color: #007AFF;
					border-radius: 6rpx;
				}

				text {
					font-size: 32rpx;
					padding-left: 10rpx;
				}
			}
		}

		.comment_content {
			display: flex;
			justify-content: space-between;
			padding: 10rpx;

			i {
				font-size: 28rpx;
				color: #666;
			}

			.like {
				color: red;

			}
		}
	}

	.nav-items {
		width: 24rpx;
		height: 24rpx;
	}

	.comment {
		width: 100%;
		height: 80rpx;
		display: flex;
		background: #fff;
		align-items: center;
		padding: 10rpx 20rpx;
		position: fixed;
		left: 0;
		bottom: 0;

		input {
			width: 50%;
			border: none;
			background-color: #f4f4f4;
			height: 60rpx;
			text-indent: 10rpx;
			border-radius: 10rpx;
		}

		.operating {
			flex: 1;
			display: flex;
			padding-left: 20rpx;
			align-items: center;
			justify-content: space-around;

			i {
				font-size: 40rpx;
				color: #666;
			}

			.like {
				color: red;
			}
		}

	}
</style>
