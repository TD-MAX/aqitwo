<template>
	<view class="inviter">
		<view class="in_view">
			<view class="my_ma">
				<text>我的邀请码</text>
			</view>
			<view class="yqm">
				<text>{{yaoqingma === "" ? '我的验证码' : yaoqingma}}</text>
				<button @click="generate">{{isinvier === 'no' ? '复制' : '点击生成验证码'}}</button>
			</view>
		</view>
		<view class="in_zhanji">
			<text>我的战绩</text>
		</view>
		<view class="in_num">
			<view class="nums">
				<p>{{ynum}}</p>
				<text>有效邀请(人)</text>
			</view>
			<view class="nums">
				<p>{{znum}}</p>
				<text>一共邀请(人)</text>
			</view>
		</view>
		<view class="in_jiangli">
			<p>奖励规则</p>
			<text>1、邀请新人注册爱恋账号(企事业单位单身青年)，累计到达一定人数获得现金奖励。</text>
			<text>2、0-10人每位奖励10元，10-50人每人奖励30元，50-100人每人奖励50元，100人及以上每人奖励100元</text>
			<text>3、邀请企业参与认证，认证成功后可获得500元奖励</text>
		</view>
		<view class="yaoqing">
			<text>邀请好友赚奖励</text>
		</view>
	</view>
</template>

<script>
	import _ from 'lodash'
	export default {
		data() {
			return {
				yaoqingma: '', //邀请码
				znum: 0, //总计
				ynum: 0, //有效
				ymoney: 0, //邀请佣金
				tabindex: 0,
				isinvier: 'yes', //是否可以生成验证码
				pageNum: 1, //页码
				shua: 'more', //是否继续向下刷新
				qiyelist: [{
						text: '已邀请',
					},
					{
						text: '有效邀请'
					}
				],
				yaoqinglist: [] //邀请列表
			}
		},
		methods: {
			//生成邀请码
			generate() {
				console.log(this.isinvier)
				switch (this.isinvier) {
					case 'yes':
						this.$http.post('lessonaqi/api/lessonyaoqingmashengcheng', {
								userid: uni.getStorageSync('userId')
							}, {})
							.then(res => {
								console.log(res)
								this.yaoqingma = res.data
								uni.setStorageSync('yaoqingma', res.data)
								this.isinvier = 'no'
								this.$api.msg('生成成功')
							})
							.catch(err => {
								console.log(err)
							})
						break;
					case 'no':
						uni.setClipboardData({
							data: this.yaoqingma
						})
						break;
				}
			},
			//已邀请，有效邀请
			qie(n) {
				this.tabindex = n
				this.yaoqinglist = []
				this.show(n)
			},
			//佣金提现
			to_tixian() {
				uni.navigateTo({
					url: '../shop/monry_tixian'
				})
			},
			show(e) {
				this.$http.post('lessonaqi/api/lessonyonghuyaoqingqiyeguanlian', {
						userid: uni.getStorageSync('userId'),
						type: e,
						pageNum: this.pageNum,
						pageSize: 10
					}, {})
					.then(res => {
						console.log(res)
						if (res.data.rows.length !== 0) {
							_.each(res.data.rows, o => {
								this.yaoqinglist.push(o)
							})
						}
						if (e === 0) {
							this.znum = this.yaoqinglist.length
						} else {
							this.ynum = this.yaoqinglist.length
						}
						let page = Math.ceil(res.data.total / 10)
						if (this.pageNum === page) {
							this.shua = 'nomore'
						}
						this.pageNum++
					})
					.catch(err => {
						console.log(err)
					})
			}
		},
		onLoad() {
			let ma = uni.getStorageSync('yaoqingma')
			if (ma) {
				this.yaoqingma = ma
				this.isinvier = 'no'
			} else {
				this.yaoqingma = ''
				this.isinvier = 'yes'
			}
			this.show(0)
		}
	}
</script>

<style lang="scss">
	.inviter {
		width: 100%;
		box-sizing: border-box;
		border-top: 1px solid #F7F7F7;
		padding-bottom: 110upx;
	}

	.in_view {
		width: 88%;
		height: 300upx;
		margin: 20upx auto;
		position: relative;
		padding-top: 25upx;
		box-sizing: border-box;
		background-image: url(../../static/tuiguang/tucenthree.png);
		background-size: 100% 100%;
		color: white;

		.my_ma {
			width: 200upx;
			height: 60upx;
			text-align: center;
			line-height: 60upx;
			border-radius: 0 50upx 50upx 0;
			font-size: 28upx;
			letter-spacing: 3upx;
			background-color: #4064AF;
		}

		.yqm {
			width: 100%;
			height: 200upx;
			position: absolute;
			bottom: 0;
			padding: 25upx 0;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
			font-size: 36upx;
			font-weight: 500;
			// border: 1px solid red;
			button {
				// width: 180upx;
				height: 60upx;
				border-radius: 50upx;
				color: #558BFA;
				font-size: 32upx;
				line-height: 60upx;
			}
		}
	}
	.in_zhanji {
		width: 70%;
		height: 40upx;
		margin: 80upx auto;
		background-image: url(../../static/tuiguang/zhanji.png);
		background-size: 100% 100%;
		text-align: center;
		line-height: 40upx;
		font-size: 45upx;
		font-weight: 600;
		letter-spacing: 5upx;
	}
	.in_num {
		width: 88%;
		height: 200upx;
		margin: auto;
		display: flex;
		justify-content: space-between;
		.nums {
			width: 48%;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
			border-radius: 10upx;
			background-color: #ECF2FF;
			font-size: 32upx;
			font-weight: 600;
			p {
				font-size: 60upx;
				color: #007AFF;
			}
		}
	}
	.in_jiangli {
		width: 88%;
		margin: 60upx auto 0 auto;
		display: flex;
		flex-direction: column;
		color: #696969;
		font-size: 32upx;
		line-height: 50upx;
		p {
			margin: 20upx 0;
			color: black;
			font-size: 40upx;
			font-weight: 600;
		}
		text {
			display: block;
			margin: 5upx 0;
		}
	}
	.yaoqing {
		width: 100%;
		height: 100upx;
		position: fixed;
		bottom: 0;
		text-align: center;
		line-height: 100upx;
		background-color: #4c54cd;
		color: white;
		font-size: 36upx;
	}
</style>
