<template>
	<!-- <view> -->
	<view class="content">
		<view class="status_bar">
			<!-- 状态栏 -->
		</view>
		<view class="title">
			<view class="box1">
				<i class="iconfont" @click="fan">&#xe604;</i>
				<text>活动详情</text>
			</view>
		</view>
		<view class="body">
			<view class="name">
				<view class="logo nameson">
					<image :src="lists.enterpriseLogo" mode="aspectFill" style="width: 100%;height: 100%;"></image>
				</view>
				<view class="company_name nameson">
					<view class="num">
						<text class="numtext">编号:{{lists.code}}</text>
					</view>
					<view class="mingcheng"><B>{{lists.enterpriseName}}</B></view>
					<view class="zhichi" @click="zhichi">
						<view>支持TA</view>
					</view>
				</view>
			</view>

			<view class="poll">

				<view class="mingci nameson">
					<view>第{{mingci}}名</view>
				</view>
				<view class="pollson nameson">
					<view>当前企业支持次数</view>
					<view class="piaoshu">
						<!-- <view class="polltu">
							<view class="polltu_lan"></view>
							<view class="polltu_fen"></view>
						</view> -->
						<view class="pollnum">{{lists.hit}}票</view>
					</view>
				</view>

			</view>

			<view class="info">
				<view class="infotitle">
					<view class="infotitleleft">
						<view class="infologo"></view>
						<view style="margin-left: 5%;">企业简介</view>
					</view>
					<view class="infotitleright">
						<view class="update"><i>企业信息有误<text style="color: #2A7BE9;">/修改信息</text></i></view>
						<view class="updatelogo"></view>
					</view>
				</view>

				<view class="infotext">
					<p>简介：{{lists.enterpriseInfo ? lists.enterpriseInfo : '该公司很懒，什么都没有留下'}}</p>
					<!-- <p>地址：山西省长治市太行北路188号(科技企业加速器6号楼2层208室)</p> -->
					<!-- <p>电话：{{lists.enterprisePhone}}</p>
					<p>官网：-</p>
					<p>邮箱：-</p> -->
				</view>
			</view>
		</view>
		<view class='baoming'>
			<view class="guizes" @click="to_gui">活动规则</view>
			<view @click="to_can">立即参赛</view>
		</view>

	</view>

	<!-- </view> -->





</template>

<script>
	export default {
		data() {
			return {
				id: '',
				mingci: '',
				lists: {}
			}
		},
		onLoad(option) {
			console.log(option)
			let options = JSON.parse(option.data)
			this.id = options.id
			this.mingci = options.mingci
			this.show()
		},
		methods: {
			fan () {
				uni.navigateBack({
					delta: 1
				})
			},
			to_gui () {
				uni.navigateTo({
					url: './vote_guize'
				})
			},
			to_can () {
				uni.navigateTo({
					url: './cansai'
				})
			},
			zhichi () {
				this.$http.post('lessonaqi/api/vote',{
					activityId: this.id,
					userId: uni.getStorageSync('userId')
				},{})
				.then(res=> {
					console.log(res)
					if (res.data.msg !== '您今日已投票') {
						// uni.showToast({
						// 	title:'投票成功'
						// })
						var msg = {
							id: this.id,
							mingci: this.mingci
						}
						uni.navigateTo({
							url: './vote_sucess?data=' + JSON.stringify(msg),
							animationType: 'slide-in-bottom'
						})
					} else {
						this.$api.msg(res.data.msg)
					}
				})
			},
			show () {
				this.$http.post('lessonaqi/api/activityDetail',{
					activityId: this.id
				},{})
				.then(res=>{
					console.log(res)
					if (res.data.msg === '获取成功') {
						this.lists = res.data.data
					}
				})
				.catch(err => {
					console.log()
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
		background-color: #F1F1F1;
	}

	.content {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
	}
	.title {
		display: flex;
		flex-flow: row;
		height: 400upx;
		width: 100%;
		margin: 0 auto;
		background-image: url(../../static/paihangban/cansai1.png);
		background-size: 100% 100%;
	}
	.box1 {
		width: 100%;
		height: 80upx;
		display: flex;
		align-items: center;
		padding: 0 20upx;
		color: white;
		font-size: 32upx;
		font-weight: 600;
		box-sizing: border-box;
		i {
			margin-right: 20upx;
		}
	}

	.titletext {
		font-size: 105upx;
		color: #FFFFFF;
	}

	.img {
		float: right;
		margin-right: 0upx;
		margin-top: 2%;
	}

	.body {
		width: 94%;
		border-radius: 10upx;
		margin: -150upx auto;
		padding-bottom: 82upx;
	}

	.name {
		display: flex;
		flex-flow: row;
		background-color: #FFFFFF;
		width: 100%;
		margin: 0 auto;
		border-radius: 25upx 25upx 0 0;
	}

	.logo {
		width: 200upx;
		height: 200upx;
	}

	.nameson {
		margin: 6% 0% 6% 3%;
	}

	.company_name {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.numtext {
		background-color: #1773FE;
		color: #FFFFFF;
	}

	.zhichi {
		width: 160upx;
		height: 60upx;
		background-color: #1673FF;
		color: #FFFFFF;
		background-image: url(../../static/7.png);
		background-size: 100% 100%;
		text-align: center;
		line-height: 60upx;
	}

	.poll {
		display: flex;
		flex-flow: row;
		background-color: #FFFFFF;
		width: 100%;
		margin: 0 auto;
		border-top: 1px solid #2437C1;
		border-bottom: 1px solid #2437C1;
	}

	.mingci {
		width: 150upx;
		height: 150upx;
		color: #FFFFFF;
		background-image: url(../../static/pai.png);
		background-size: 100% 100%;
		text-align: center;
	}

	.mingci view {
		font-size: 20upx;
		line-height: 128upx;
	}

	.pollson {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		width: 80%;
	}

	.piaoshu {
		display: flex;
		flex-direction: row;
	}

	.polltu {
		width: 210upx;
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.polltu_lan {
		background-color: #2A7BE9;
		height: 100%;
		width: 70%;
	}

	.polltu_fen {
		background-color: #FFDFE1;
		height: 100%;
		width: 30%;
	}

	.pollnum {
		font-size: 30upx;
		float: left;
		color: red;
		// margin-left: 10%;
	}

	.info {
		display: flex;
		background-color: #FFFFFF;
		width: 100%;
		margin: 0 auto;
		flex-direction: column;
	}

	.infologo {
		width: 40upx;
		height: 40upx;
		background-image: url(../../static/jianjie.png);
		background-size: 100%;
	}

	.infotitle {
		display: flex;
		width: 90%;
		margin: 0 auto;
		margin-top: 3%;
	}

	.infotitleleft {
		display: flex;
		width: 50%;
		font-size: 35upx;
	}

	.infotitleright {
		width: 320upx;
		display: flex;
		justify-content: space-around;
		// align-items: center;
		line-height: 52upx;
		font-size: 24upx;
		// border: 1px solid red;
	}

	.updatelogo {
		width: 40upx;
		height: 40upx;
		background-image: url(../../static/update.png);
		background-size: 100%;
		font-size: 35upx;
	}

	.infotext {
		width: 90%;
		margin: 0 auto;
		margin-top: 4%;
	}

	.infotext p {
		font-size: 28upx;
		text-indent: 56upx;
		line-height: 50upx;
	}
	.baoming {
		width: 100%;
		height: 80upx;
		position: fixed;
		bottom: 0;
		display: flex;
		background-color: #FFFFFF;
		view {
			flex: 1;
			height: 80upx;
			text-align: center;
			line-height: 80upx;
		}
		.guizes {
			background-color: #007AFF;
			color: white;
		}
	}
</style>
