<template>
	<view class="content">
		<view class='body'>
			<view class="bodyson1 son">
				<view class="bodyson1text">
					<view style="color:#FFFFFF;font-size: 50upx;">聚优名企</view>
					<view style="color:#FFFFFF;font-size: 30upx;">凝聚力量，凝聚经典</view>
				</view>
				<view class="bodyson1img">
					<image src="../../static/logo.png" mode="" style="width: 100upx;height: 100%;"></image>
				</view>
			</view>

			<view class="bodyson son">
				<view class="bodysontitle">
					<view class="titleson">活动声明</view>
				</view>
				<view class="bodysontext ">
					<view class="text">为保证活动的公平公正公开，主办方会对活动数据进行实时监控，已经发现有使用软件刷票行为，将会对企业采取相应措施，严重者取消推荐资格。
					</view>
				</view>
			</view>


			<view class="son bodyson3">
				<view class="bigtitle">活动荣誉</view>
				<view class="bodysontext">
					<view class="text">
						<view>1，入选<text>前十</text>即可获得由【聚优名企】<text>免费</text>颁发奖品</view>
						<view>2，实物奖品活动结束<text>自助申请</text>。 </view>
						<view>3，活动期间企业<text>免费宣传</text>。</view>
					</view>
				</view>
			</view>

			<view class="son bodyson3">
				<view class="bigtitle">活动介绍</view>
				<view class="bodysontext">
					<view class="text">
						<view>1，入选<text>前十</text>即可获得由【聚优名企】<text>免费</text>颁发奖品</view>
						<view>2，实物奖品活动结束<text>自助申请</text>。 </view>
						<view>3，活动期间企业<text>免费宣传</text>。</view>
					</view>
				</view>
			</view>

			<view class="son bodyson3">
				<view class="bigtitle">活动规则</view>
				<view class="bodysontext">
					<view class="text">
						<view>1，入选<text>前十</text>即可获得由【聚优名企】<text>免费</text>颁发奖品</view>
						<view>2，实物奖品活动结束<text>自助申请</text>。 </view>
						<view>3，活动期间企业<text>免费宣传</text>。</view>
					</view>
				</view>
			</view>

			<view class="son bodyson3">
				<view class="bigtitle">活动优势</view>
				<view class="bodysontext">
					<view class="text">
						<view>1，入选<text>前十</text>即可获得由【聚优名企】<text>免费</text>颁发奖品</view>
						<view>2，实物奖品活动结束<text>自助申请</text>。 </view>
						<view>3，活动期间企业<text>免费宣传</text>。</view>
					</view>
				</view>
			</view>

			<view class="bodyson son">
				<view class="bodysontitle">
					<view class="titleson">主办方介绍</view>
				</view>
				<view class="bodysontext ">
					<view class="text">为保证活动的公平公正公开，主办方会对活动数据进行实时监控，已经发现有使用软件刷票行为，将会对企业采取相应措施，严重者取消推荐资格。
					</view>
				</view>
			</view>


			<view class="son bodyson3">
				<view class="bigtitle">企业来源</view>
				<view class="bodysontext">
					<view class="text">
						<view>1，入选<text>前十</text>即可获得由【聚优名企】<text>免费</text>颁发奖品</view>
						<view>2，实物奖品活动结束<text>自助申请</text>。 </view>
						<view>3，活动期间企业<text>免费宣传</text>。</view>
					</view>
				</view>
			</view>
		</view>


		<view class='baoming'>
			<view class="bao" @click="to_zhichi">去支持</view>
			<view class="bao" @click="to_baomin">我要报名</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			// 去支持
			to_zhichi () {
				uni.navigateTo({
					url: './vote'
				})
			},
			//我要报名
			to_baomin () {
				uni.navigateTo({
					url: './cansai'
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-bottom: 80upx;
	}
	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}
	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.body {
		background-color: #1673FF;
		width: 100%;
		height: 100%;
	}

	.son {
		display: flex;
		width: 90%;
		margin: 0 auto;
		margin-top: 50upx;
		/* background-color: red; */
	}
	.bodyson {
		flex-wrap: wrap;
	}
	.bodysontitle {
		background-image: linear-gradient(to left, #FF51B7, #FFA031);
		transform: skew(-15deg, 0deg);
		margin: 0 0 -2% 5%;
	}
	.titleson {
		margin: 8upx 20upx;
		transform: skew(15deg, 0deg);
		font-size: 20upx;
		color: #FFFFFF;
	}
	.bodysontext {
		background-color: #2B5FD2;
		font-size: 28upx;
		color: #FFFFFF;
	}
	.text {
		width: 90%;
		/* height: 80%; */
		margin: 50upx auto;
		font-size: 28upx;
	}
	.text text {
		color: #FED100;
		font-size: 30upx;
	}
	.bigtitle {
		width: 40%;
		margin: 0 auto;
		text-align: center;
		margin-bottom: 2%;
		color: #FFFFFF;
	}
	.bodyson1 {
		justify-content: space-between;
	}

	.bodyson1img {
		float: right;
		margin-right: 0upx;
	}
	.baoming {
		width: 100%;
		height: 80upx;
		position: fixed;
		bottom: 0;
		display: flex;
		background-color: #FFFFFF;
	}
	.ke {
		float: left;
		margin: 0 10upx 0 10upx;
		background-color: #F6F6F6;
		width: 100upx;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
	}
	.bao {
		flex: 1;
		height: 80upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 36upx;
		/* font-weight: 600; */
	}
	.bodyson3 {
		flex-direction: column;
	}
</style>
