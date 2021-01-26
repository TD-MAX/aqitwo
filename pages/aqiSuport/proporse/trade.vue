<template>
	<view class="trade">
		<view class="trade_one">
			<p>贷款信息已提交完成</p>
			<text>系统正在处理</text>
			<view class="">
				<text>贷款经理: {{msgList.jinrongname}}</text>
				<text @click="paste(msgList.jinrongweixin)">微信号: {{msgList.jinrongweixin}}</text>
			</view>
			<text class="test" @click="paste(msgList.jinrongweixin)">(点击复制)</text>
			<image src="../../../static/daikuan/09.png" mode=""></image>
		</view>
		<view class="trade_two">
			<view class="two_head">
				<view class="">
					贷款内容
				</view>
			</view>
			<p>贷款企业：{{msgList.qiyename}}</p>
			<p>贷款人姓名：{{msgList.name}}</p>
			<p>贷款人联系方式：{{msgList.phone}}</p>
			<p>贷款金额：{{msgList.yixian}}元</p>
		</view>
		<view class="trade_three">
			<view class="three_head">
				<view class="">
					可贷额度(元)
				</view>
				<p>{{msgList.jine}}</p>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				msgList:{}
			}
		},
		methods: {
			//申请提交结果展示
			show(){
				let id = uni.getStorageSync('userId')
				this.$http.post('lessonaqi/api/lessondaikuanjieguo',{
					userid:id
				},{})
				.then(res=>{
					console.log(res.data)
					this.msgList = res.data
				})
				.catch(err=>{
					console.log(res.data)
				})
			},
			//点击复制粘贴
			paste(e){
				uni.setClipboardData({
					data:e
				})
			}
		},
		onLoad() {
			this.show()
		}
	}
</script>

<style lang="scss">
	.trade{
		width: 100%;
		height: 100%;
	}
	.trade_one{
		width: 93%;
		color: #3F3E51;
		position: relative;
		margin: auto;
		padding-left: 30upx;
		font-size: 30upx;
		height: 210upx;
		border-bottom:1px solid #BBBBBB;
		margin: 40upx auto;
		.test{
			position: absolute;
			right: 30%;
			color: red;
			font-size: 28upx;
			bottom: 5upx;
		}
		p{
			font-size: 32upx;
			margin: 20upx auto;
		}
		view{
			width: 90%;
			margin: 20upx 0;
			display: flex;
			justify-content: space-between;
		}
		image{
			width: 80upx;
			height: 80upx;
			position: absolute;
			top: 35upx;
			right: 30upx;
		}
	}
	.trade_two{
		width: 93%;
		height: 100%;
		// border: 1px solid red;
		margin: 80upx auto;
		padding-left: 30upx;
		.two_head{
			width: 300upx;
			height: 60upx;
			position: relative;
			border-top: 1px solid #BBBBBB;
			margin: auto;
			font-size: 32upx;
			text-align: center;
			view{
				width: 150upx;
				
				text-align: center;
				// border: 1px solid red;
				background-color: white;
				margin-top: -26upx;
				margin-left: 75upx;
			}
		}
		p{
			font-size: 32upx;
			display: block;
			margin: 20upx 0;
		}
	}
	.trade_three{
		width: 93%;
		height: 100%;
		margin: 80upx auto;
		// border: 1px solid red;
		padding-left: 30upx;
		.three_head{
			width: 300upx;
			height: 60upx;
			position: relative;
			border-top: 1px solid #BBBBBB;
			margin: auto;
			font-size: 32upx;
			text-align: center;
			view{
				width: 180upx;
				text-align: center;
				background-color: white;
				margin-top: -26upx;
				margin-left: 60upx;
			}
			p{
				font-size: 72upx;
				margin: 50upx auto;
			}
		}
	}
</style>
