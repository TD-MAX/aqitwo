<template>
	<view>
		<view class="jishi" @click="tiao">
			跳过{{timeout}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timeout: 3,
			}
		},
		methods: {
			jishi () {
				let int = setInterval(() => {
					if (this.timeout) {
						this.timeout--
					} else {
						uni.switchTab({
							url: '/pages/index/index'
						})
						clearInterval(int)
					}
				},1000)
			},
			tiao () {
				this.timeout = 0
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
		},
		onLoad() {
			this.jishi()
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		background-image: url(../../static/qidong/qi.png);
		background-size: 101% 101%;
	}
	.jishi {
		width: 180upx;
		height: 60upx;
		float: right;
		border-radius: 50upx;
		text-align: center;
		line-height: 60upx;
		font-size: 28upx;
		background-color: black;
		color: white;
	}
	.jishi ::after {
		clear: both;
	}
</style>
