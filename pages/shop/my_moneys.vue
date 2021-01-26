<template>
	<view class="my_moneys">
		<view class="_head">
			<view class="" @click="jifen_history">
				<text>积分</text>
				<text>{{qianbao.jifen}}</text>
			</view>
			<view class="" @click="qibi_history">
				<text>企币</text>
				<text>{{qianbao.qibi}}</text>
			</view>
			<view class="" @click="money_tixian">
				<text>余额</text>
				<text>￥{{qianbao.tixian}}</text>
				<text style="font-size: 24upx;">可提现</text>
			</view>
		</view>
		<view class="_content">
			<view class="functs" 
			v-for="(item,index) in moneyList" :key="index"
			@click="dianji(item.path)">
				<image :src="item.src" mode="aspectFit"></image>
				<p>{{item.text}}</p>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				qianbao:{},
				moneyList:[
					{
						src: '../../static/aqiuser/money/80.png',
						text: '企币充值',
						path: './qibi_ref'
					},
					{
						src: '../../static/aqiuser/money/10.png',
						text: '活动',
						path: './acvitity'
					},
					{
						src: '../../static/aqiuser/money/90.png',
						text: '会员',
						path: '../../pages/user/my_member'
					},
					// {
					// 	src: '../../static/aqiuser/money/60.png',
					// 	text: '领劵商城',
					// 	path: './lingjuan'
					// },
					// {
					// 	src: '../../static/aqiuser/money/30.png',
					// 	text: '美团外卖',
					// 	path: '../user/sign'
					// },
					// {
					// 	src: '../../static/aqiuser/money/70.png',
					// 	text: '快递查询',
					// 	path: '../user/kuaidi'
					// },
					// {
					// 	src: '../../static/aqiuser/money/20.png',
					// 	text: '话费流量',
					// },
					// {
					// 	src: '../../static/aqiuser/money/40.png',
					// 	text: '啊企加油卡',
					// 	path: '../user/jiayou'
					// },
					// {
					// 	src: '../../static/aqiuser/money/50.png',
					// 	text: '生活缴费',
					// }
				]
			}
		},
		methods: {
			//首页展示
			show () {
				this.$http.post('lessonaqi/api/lessonqianbaozhanshi',{
					userid: uni.getStorageSync('userId')
				},{})
				.then(res=>{
					this.qianbao = res.data
				})
				.catch(err=>{
					console.log(err)
				})
			},
			//积分记录
			jifen_history () {
				uni.navigateTo({
					url: './jifei_history',
					animationType: 'pop-in'
				})
			},
			//企币记录
			qibi_history () {
				uni.navigateTo({
					url: './qibi_history',
					animationType: 'pop-in'
				})
			},
			//零钱提现
			money_tixian () {
				uni.navigateTo({
					url: './monry_tixian',
					animationType: 'pop-in'
				})
			},
			//下表功能
			dianji (e) {
				if (e) {
					uni.navigateTo({
						url: e,
						animationType: 'pop-in'
					})
				} else {
					this.$api.msg('内测阶段，暂未开启')
				}
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.show()
		}
	}
	
</script>

<style lang="scss" scoped>
	.my_moneys{
		width: 100%;
		height: 100%;
	}
	._head{
		width: 100%;
		height: 180upx;
		background-color: #3F3E51;
		font-size: 32upx;
		color: white;
		display: flex;
		view{
			flex: 1;
			padding-top: 28upx;
			box-sizing: border-box;
			// border: 1px solid white;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			text-align: center;
			
		}
	}
	._content{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.functs{
			width: 33%;
			height: 220upx;
			padding-top: 65upx;
			// border: 1px solid red;
			font-size: 28upx;
			font-weight: 600;
			text-align: center;
			box-sizing: border-box;
			image{
				width: 60upx;
				height: 60upx;
			}
		}
	}
</style>
