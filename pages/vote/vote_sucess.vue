<template>
	<view class="vote_body">
		<view class="vote_nav">
			<text>{{list.createTime}}</text>
		</view>
		<view class="nav_contents">
			<view class="nav_img">
				<image src="../../static/vote/success.png" 
				mode="aspectFit"></image>
			</view>
			<view class="nav_logo">
				<image :src="list.enterpriseLogo" 
				mode="aspectFit"></image>
			</view>
			<view class="nav_text">
				<text>{{list.code}}号</text>
				<text>{{list.enterpriseName}}</text>
			</view>
			<view class="nav_piao">
				<view class="nav_piao_box kuan">
					<text class="nums">{{mingci}}</text>
					<text class="texts">企业排名</text>
				</view>
				<view class="nav_piao_box">
					<text class="nums">{{list.hit}}</text>
					<text class="texts">支持次数</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				mingci: '',
				list: {}
			}
		},
		methods: {
			show () {
				this.$http.post('lessonaqi/api/activityDetail',{
					activityId: this.id
				},{})
				.then(res => {
					console.log(res.data.data)
					if (res.data.msg === '获取成功') {
						this.list = res.data.data
					}
				})
				.catch(err => {
					console.log(err)
				})
			}
		},
		onLoad(option) {
			let options = JSON.parse(option.data)
			this.id = options.id
			this.mingci = options.mingci
			this.show()
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
		background-color: #1673FF;
	}

	.vote_body {
		width: 100%;
		height: 100%;
		color: white;
	}

	.vote_nav {
		width: 100%;
		height: 320upx;
		background-image: url(../../static/vote/votebeijing.png);
		background-size: 100% 100%;
		// border: 1px solid red;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		box-sizing: border-box;
		padding-bottom: 60upx;
		font-size: 40upx;
		font-weight: 600;
	}

	.nav_contents {
		width: 90%;
		height: calc(100% - 420upx);
		position: relative;
		margin: 0 auto;
		border: 10px solid #ddd;
		color: black;
		border-image: -webkit-linear-gradient(#3E27A3,#3F27A5,#4958FF,#8A59FF,#4958FF) 20 20;
		border-image: -moz-linear-gradient(#3E27A3,#3F27A5,#4958FF,#8A59FF,#4958FF) 20 20;
		border-image: -o-linear-gradient(#3E27A3,#3F27A5,#4958FF,#8A59FF,#4958FF) 20 20;
		border-image: linear-gradient(#3E27A3,#3F27A5,#4958FF,#8A59FF,#4958FF) 20 20;
		background-color: white;
		.nav_img {
			width: 320upx;
			height: 120upx;
			position: absolute;
			top: -60upx;
			left: calc((100% - 320upx) / 2);
			image {
				width: 100%;
				height: 100%;
			}
		}
		.nav_logo {
			width: 80%;
			height: 180upx;
			margin: 60upx auto;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.nav_text {
			width: 100%;
			text-align: center;
			font-size: 36upx;
			font-weight: 600;
		}
		.nav_piao {
			width: 90%;
			height: 240upx;
			margin: 40upx auto;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-radius: 10upx;
			background-color: #E4E4E4;
			.nav_piao_box {
				flex: 1;
				height: 90%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				.nums {
					font-size: 60upx;
					font-weight: 600;
					color: #1673FF;
				}
				.texts {
					font-size: 36upx;
					color: #666666;
				}
			}
			.kuan{
				border-right: 2px dashed white;
			}
		}
	}
</style>
