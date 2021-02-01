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
			
			<view class="son bodyson3">
				<view class="bigtitle">主办方</view>
				<view class="bodysontext">
					<view class="text">
						<view>主办方：啊企————全国企业支持服务平台</view>
						<view>官方邮箱：sxqiye@163.com</view>
						<view>客服电话：0355-2023850</view>
					</view>
				</view>
			</view>

			<view class="bodyson son">
				<view class="bodysontitle">
					<view class="titleson">活动声明</view>
				</view>
				<view class="bodysontext ">
					<view class="text">本次投票将进行公平、公正、公开的评选流程，维护每位参赛者的权益，防止恶意刷票等有违公正的行为，一经发现，取消参赛资格。为规范网络与微信投票行为，预防恶意投票现象的产生，保障所有参选者在公平公正的环境下接受社会投票。依据网络投票公平公正的原则，每日每个IP限投一票。
					</view>
				</view>
			</view>

			<view class="son bodyson3">
				<view class="bigtitle">活动规则</view>
				<view class="bodysontext">
					<view class="text">
						<view>1、投票时间:2021年2月1日至2021年5月1日</view>
						<view>2、投票方法:选中候选人,直接投票。</view>
						<view>3、投票次数限制:每天每用户限投1票。</view>
						<view>4、禁止刷票,发现后取消报名者参赛资格。</view>
						<view style="color: red;">本次投票活动均通过H5链接进行投票</view>
					</view>
				</view>
			</view>

			<view class="son bodyson3">
				<view class="bigtitle">活动荣誉</view>
				<view class="bodysontext">
					<view class="text">
						<view>1、入选前十名即可获得由“ 名优企业”免费颁发的各项奖品。</view>
						<view>2、实物奖品将在活动结束后7个工作日内通过邮寄方式送达。</view>
						<view>3、 活动结束后各大网络媒体平台免费推广。</view>
					</view>
				</view>
			</view>


		<view class='baoming'>
			<view class="bao" @click="to_zhichi">去支持</view>
			<view class="bao" @click="to_baomin">我要报名</view>
		</view>
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
