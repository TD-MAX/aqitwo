<template>
	<view class="video_body">
		<swiper :autoplay="false" :duration="500" vertical="true" class="swiper_boxs" :current="tabIndex" @change="changes">
			<swiper-item v-for="(n,index) in 8" :key="index">
				<view class="video_connier">
					<view class="video_box">
						<!-- <image src="../../static/photo.png"
						v-show="!isShow"
						@click="bofan"
						mode=""></image> -->
						<!-- <video id="myVideo" :src="src" v-show="isShow"
							class="view_video" autoplay="tabIndex === tabIndex"
							@error="videoErrorCallback"></video> -->
						<chunlei-video :src="src" :height="'667px'"></chunlei-video>
					</view>
					<view class="video_box_see">
						<view class="box_test" @click="like">
							<i class="iconfont" v-show="!ishow">&#xe605;</i>
							<i class="iconfont like" v-show="ishow">&#xe60e;</i>
							<text>喜欢</text>
						</view>
						<view class="box_test" @click="pinglun">
							<i class="iconfont">&#xe664;</i>
							<text>评论</text>
						</view>
						<view class="box_test" @click="fenxiang">
							<i class="iconfont">&#xe6ab;</i>
							<text>分享</text>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<popup v-model="shows" position="bottom" ref="lvvpopref">
			<view class="popupBg">
				<view class="comment_list">
					<scroll-view class="comment_list1" scroll-y="ture">
						<view class="comment_content" v-for="x in 16" :key="x">
							<image src="../../static/img/face.jpg" mode="aspectFill"></image>
							<view class="head">
								<text>小君</text>
								<text style="font-size: 28upx;">嘻嘻嘻</text>
							</view>
						</view>
					</scroll-view>
					<view class="comment_list2">
						<input v-model="text_value" placeholder="说些什么吧!" />
						<i class="iconfont like" v-show="text_value !== ''" @click="send">&#xe6e5;</i>
					</view>
				</view>
			</view>
		</popup>
	</view>
</template>

<script>
	import popup from '../../components/lvv-popup/lvv-popup.vue'
	import chunleiVideo from '../../components/chunlei-video/chunlei-video'
	export default {
		components: {
			popup,
			chunleiVideo
		},
		data() {
			return {
				isShow: false,
				text_value: '',
				tabIndex: 0,
				ishow: false,
				shows: false,
				src: 'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4',
			}
		},
		onReady: function(res) {
			this.videoContext = uni.createVideoContext('myVideo')
			// this.videoContext.requestFullScreen();
		},
		methods: {
			// 喜欢
			like() {
				this.ishow = !this.ishow
			},
			//评论
			pinglun() {
				this.shows = true
			},
			//分享
			fenxiang() {
				this.$api.msg('暂不支持')
			},
			//发评论
			send() {
				this.text_value = ''
			},
			//播放
			bofan () {
				this.isShow = true
			},
			// sendDanmu: function() {
			// 	this.videoContext.sendDanmu({
			// 		text: this.danmuValue,
			// 		color: this.getRandomColor()
			// 	});
			// 	this.danmuValue = '';
			// },
			//切换
			changes(e) {
				this.tabIndex = e.detail.current
				console.log(this.tabIndex)
				this.ishow = false
				this.isShow = false
			},
			//播放错误触发
			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
			// getRandomColor: function() {
			// 	const rgb = []
			// 	for (let i = 0; i < 3; ++i) {
			// 		let color = Math.floor(Math.random() * 256).toString(16)
			// 		color = color.length == 1 ? '0' + color : color
			// 		rgb.push(color)
			// 	}
			// 	return '#' + rgb.join('')
			// }
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
		background-color: #000000;
	}

	.video_body {
		width: 100%;
		height: 100%;
	}

	.swiper_boxs {
		width: 100%;
		height: 100%;

		swiper-item {
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			position: relative;
			// border: 1px solid red;
		}
	}

	.video_connier {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		// border: 1px solid red;
		box-sizing: border-box;
	}

	.video_box {
		flex: 1;
		// position: relative;
		box-sizing: border-box;
		video {
			width: 100%;
		}
		image {
			width: 100%;
			height: 360upx;
		}
	}

	.video_box_see {
		width: 60%;
		height: 120upx;
		position: absolute;
		border-radius: 0 50upx 0 0;
		bottom: 0;
		left: 0;
		display: flex;
		background-color: #fff;

		.box_test {
			flex: 1;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
	}

	.like {
		color: red;
	}

	//模态框内容
	.popupBg {
		width: 100%;
		height: 50%;
		position: absolute;
		left: 0;
		bottom: 0;
		padding-top: 20upx;
		background-color: #fff;
		border-radius: 20upx 20upx 0 0;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}

	.comment_list {
		width: 100%;
		height: 100%;
		padding: 0 15upx;
		box-sizing: border-box;
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

	.comment_list1 {
		width: 100%;
		height: calc(100% - 80upx);
		display: flex;
		flex-direction: column;

		.comment_content {
			display: flex;
			position: relative;
			padding: 10rpx;
			border-bottom: 1px solid #F5F5F5;
			margin-bottom: 10upx;

			.head {
				display: flex;
				flex-direction: column;
				// border: 1px solid red;
				box-sizing: border-box;
				// overflow: scroll;
				overflow-x: hidden;
				width: 75%;

				text {
					font-size: 32upx;
					// margin-top: 10upx;
					margin-left: 10upx;
				}
			}

			image {
				width: 80upx;
				height: 80upx;
				border-radius: 50%;
			}
		}
	}

	.comment_list2 {
		width: 100%;
		height: 80upx;
		border-top: 1px solid #F5F5F5;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>
