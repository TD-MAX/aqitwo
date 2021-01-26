<template>
	<view>
		<view class="sign_head">
			<view class="qiandao" @click="qiandao">
				<!-- <image src="../../static/0.gif" mode="aspectFill"></image> -->
				<view class="">
					{{qiandao_statue === 'more' ? '签到' : '已签' }}
					<!-- 签到 -->
				</view>
			</view>
			<view class="jifen">
				签到积分：{{jifen}}
			</view>
			<view class="amounts">
				<text>连续签到{{num}}天</text>
			</view>
		</view>
		<view class="sign_gz">
			<view class="gz_head">
				积分规则
			</view>
			<view class="gz_container">
				<p>1、每日签到得积分，好物兑不停，每次签到都可获得10点积分</p>
				<p>2、凭借积分可在啊企福利免费拿好物</p>
				<p>3、连续签到一定天数更有豪华大礼，敬请关注啊企福利</p>
				<p>4、vip用户更有超值好礼送不停，签到积分翻倍涨</p>
				<p>5、svip用户专属积分大礼包，功能特权</p>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num: '',
				jifen: '',
				qiandao_statue: 'more'
			}
		},
		methods: {
			//签到
			qiandao() {
				if (this.qiandao_statue === 'more') {
					this.$http.post('lessonaqi/api/lessonqiandao', {
							userid: uni.getStorageSync('userId')
						}, {})
						.then(res => {
							console.log(res)
							if (res.data === 1) {
								this.num++
								this.qiandao_statue = 'nomore'
								this.select_qiandao() //再次调用签到接口保持页面数据同步渲染
								uni.showToast({
									title: '签到成功',
									icon: 'success'
								})
							} else {
								this.$api.msg('遇到未知错误，请稍后再试')
								this.qiandao_statue = 'nomore'
							}
						})
						.catch(err => {
							console.log(err)
						})
				} else {
					this.$api.msg('您今天已签到过')
				}
				// this.$api.msg('签到于1月1日正式开启，敬请期待！')
			},
			//查询签到
			select_qiandao() {
				this.$http.post('lessonaqi/api/lessonqiandaochaxun', {
						userid: uni.getStorageSync('userId')
					}, {})
					.then(res => {
						console.log(res.data)
						this.jifen = res.data.jifen
						this.num = res.data.continue_days
						if (res.data.isqiandao == 1) {
							this.qiandao_statue = 'nomore'
						} else if (res.data.isqiandao == 0) {
							this.qiandao_statue = 'more'
						}
					})
					.catch(err => {
						console.log(err)
					})
			}
		},
		onShow() {
			this.select_qiandao()
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #EDF7FF;
	}
	.sign_head {
		color: #5F84C5;
		background-image: url(../../static/0.gif);
		background-size: 100% 100%;
		width: 100%;
		position: relative;
		padding-top: 25upx;
		height: 460upx;
		border-radius: 10upx;
		background-color: #3F3E51;
		.qiandao {
			background-color: #fff;
			background-size: 100% 100%;
			box-sizing: border-box;
			font-family: '楷体';
			width: 140upx;
			position: relative;
			height: 140upx;
			font-size: 50upx;
			border-radius: 50%;
			overflow: hidden;
			background-color: white;
			margin: 120upx auto;
			image {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}

			view {
				position: absolute;
				z-index: 99;
				width: 120upx;
				height: 60upx;
				top: 40upx;
				left: 10upx;
				box-sizing: border-box;
				// border: 1px solid red;
				text-align: center;
				line-height: 60upx;
			}
		}

		.jifen {
			width: 80%;
			height: 80upx;
			border-radius: 50upx;
			margin: 160upx auto;
			background-color: white;
			border: 1px solid #AFAFB1;
			color: black;
			text-align: center;
			line-height: 80upx;
		}

		.amounts {
			position: absolute;
			right: 15upx;
			top: 30upx;
			// color: white;
		}
	}
	.sign_gz {
		width: 100%;
		margin-top: 80upx;
		.gz_head{
			width: 96%;
			height: 80upx;
			margin: auto;
			line-height: 80upx;
			font-size: 32upx;
			font-weight: 600;
		}
		.gz_container {
			width: 96%;
			margin: auto;
			font-size: 28upx;
			padding-left: 20upx;
			p {
				margin: 5upx 0;
			}
		}
	}
</style>
