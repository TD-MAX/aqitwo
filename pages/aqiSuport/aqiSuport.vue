<template>
	<view class="suport">
		<!-- 状态栏 -->
		<!-- <view class="status_bar">
			
		</view> -->
		<!-- <view class="suport_nav"> -->
			<!-- <text><—</text> -->
			<!-- <text>啊企支持</text> -->
			<!-- <text>:</text> -->
		<!-- </view> -->
		<view class="suport_head">
			<image src="../../static/daikuan/01.png" mode=""></image>
			<view class="">企业专项金融支持</view>
		</view>
		<view class="suport_computed">
			<view class="suport_computed_top">
				<p>最高贷款金额(元)</p>
				<text>5000,000</text>
				<view class="" @click="toComputed">
					贷款计算机
				</view>
			</view>
			<view class="suport_computed_bottom">
				<text>无抵押、无担保信用贷款</text>
			</view>
		</view>
		<view class="suport_proposer" @click="toProposer">
			申请贷款
		</view>
		<view class="suport_liao">
			<image src="../../static/daikuan/02.png" mode=""></image>
			<text>深入了解我们</text>
		</view>
		<view class="suport_jie" 
		v-for="(item,index) in knowList" :key="index">
			<view class="suport_jie_nav">
				{{item.title}}
			</view>
			<view class="suport_jie_content">
				<image :src="item.img" mode=""></image>
				<view class="view">
					{{item.content}}
				</view>
			</view>
		</view>
		<view class="suport_jie">
			<view class="suport_jie_nav">
				产品期限
			</view>
			<view class="suport_jie_content">
				<image src="../../static/daikuan/07.png" mode=""></image>
				<view class="views">
					1+1(2年24期)
				</view>
			</view>
		</view>
		<view class="suport_jie">
			<view class="suport_jie_nav">
				还款方式
			</view>
			<view class="suport_jie_content">
				<image src="../../static/daikuan/08.png" mode=""></image>
				<view class="views">
					等额本金，支持随借随还
				</view>
			</view>
		</view>
		<button class="daikuan" @click="toProposer">申请贷款</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				knowList:[
					{
						title:'客户群体',
						img:'../../static/daikuan/03.png',
						content:'只针对于企业用户，且税务登记为“一般纳税人”'
					},
					{
						title:'倾斜行业',
						img:'../../static/daikuan/04.png',
						content:'建筑、钢材、工程、电力、医疗、环保、市政、消防、水泥、材料、机械等泛基建类'
					},
					{
						title:'产品利息',
						img:'../../static/daikuan/05.png',
						content:'约3.6%-9%年（根据企业资质，由系统大数据分析根据风险等级评定）'
					},
					{
						title:'企业金融支持',
						img:'../../static/daikuan/06.png',
						content:'企业金融支持基于企业涉税、大客户供应链评级等大数据分析信息等综合评分；用于经营周转的可循环信用贷款，最快30分钟放贷。'
					}
				]
			}
		},
		methods: {
			//申请贷款
			toProposer(){
				uni.navigateTo({
					url:'proporse/proporse'
				})
			},
			//贷款计算器
			toComputed(){
				uni.navigateTo({
					url:'./proporse/jisuanqi',
					animationType:'pop-in'
				})
			}
		},
		onLoad() {
			
		}
	}
</script>

<style lang="scss">
	.suport{
		width: 100%;
		height: 100%;
		padding-bottom: 10upx;
	}
	// .status_bar {
	//       height: var(--status-bar-height);
	//       width: 100%;
	// }
	//导航栏
	.suport_nav{
		width: 100%;
		height: 96upx;
		font-size: 36upx;
		color: #fff;
		line-height: 96upx;
		text-align: center;
		font-family: Roboto;
		background-color: rgba(63,62,81,100);
	}
	//头部标题
	.suport_head{
		width: 95%;
		height: 96upx;
		margin: auto;
		display: flex;
		font-size: 30upx;
		line-height: 96upx;
		color: #878787;
		// box-sizing: border-box;
		// border: 1px solid red;
		image{
			width: 46upx;
			height: 46upx;
			margin:25upx 10upx 25upx 0;
		}
	}
	//计算器
	.suport_computed{
		width: 95%;
		height: 300upx;
		margin: auto;
		border-radius: 10rpx;
		background-color: rgba(63,62,81,100);
		color: #fff;
		.suport_computed_top{
			width: 95%;
			height: 220upx;
			position: relative;
			margin: auto;
			display: flex;
			flex-direction: column;
			border-bottom: 1px dashed white;
			p{
				position: absolute;
				font-size: 32upx;
				top: 40upx;
			}
			text{
				position: absolute;
				font-size: 72upx;
				top: 100upx;
			}
			view{
				position: absolute;
				top: 120upx;
				right: 10upx;
				width: 200upx;
				height: 60upx;
				color: #000;
				text-align: center;
				font-size: 32upx;
				line-height: 60upx;
				border-radius: 50upx;
				background-color: #fff;
			}
		}
		.suport_computed_bottom{
			width: 95%;
			height: 80upx;
			margin: auto;
			line-height: 80upx;
		}
	}
	//申请贷款
	.suport_proposer{
		width: 300upx;
		height: 84upx;
		margin: 50upx auto;
		border-radius: 50upx;
		// background-color: #3F3E51;
		// color: white;
		font-size: 28upx;
		border: 1px solid rgba(187,187,187,100);
		text-align: center;
		line-height: 84upx;
	}
	.suport_liao{
		width: 90%;
		height: 90upx;
		margin: 30upx auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		image{
			width: 48upx;
			height: 48upx;
		}
		text{
			font-size: 28upx;
		}
	}
	.suport_jie{
		width: 90%;
		// border: 1px solid red;
		// min-height: 280upx;
		height: 100%;
		// display: flex;
		// flex-direction: column;
		// justify-content: space-between;
		margin: 60upx auto;
		.suport_jie_nav{
			width: 230upx;
			height: 80upx;
			box-sizing: border-box;
			margin:0 auto;
			text-align: center;
			font-size: 28upx;
			line-height: 80upx;
			border-top: 1px solid #BBBBBB;
			border-bottom: 1px solid #BBBBBB;
		}
		.suport_jie_content{
			width: 100%;
			display: flex;
			// border: 1px solid red;
			margin: 60upx 0 0 0;
			justify-content: space-between;
			image{
				width: 48upx;
				height: 48upx;
				margin-top: 20upx;
			}
			.view{
				width: calc(100% - 70upx);
				text-align: left;
				font-size: 32upx;
			}
			.views{
				width: 100%;
				margin-top: 20upx;
				text-align: center;
				color: red;
				font-size: 32upx;
			}
		}
	}
	.daikuan{
		width: 90%;
		height: 80upx;
		font-size: 32upx;
		margin: auto;
		color: white;
		background-color: #2C405A;
		text-align: center;
		line-height: 80upx;
	}
</style>
