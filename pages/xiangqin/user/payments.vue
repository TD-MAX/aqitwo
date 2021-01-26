<template>
	<view class="content">
		<view class="pay">
			<!-- <text class="success-icon yticon icon-xuanzhong2"></text> -->
			<image src="../../../static/xiangqin/success.png" mode="" style="width: 200upx;height: 200upx;"></image>
			<text class="tit">支付成功</text>
			<text class='tishi'>您已支付成功，稍后客服将会联系您，请保持通讯畅通~</text>

			<!-- <view class="notice" v-if="yudingNotice!=''">
				<text>{{yudingNotice}}</text>
				<view class="">
					<text>{{yudingNotice2}}</text>
				</view>
			</view> -->
		</view>

		<view class="mid">
			<view class="play">
				
			</view>
			<view class="info">
				<view class="money">
					<text>￥299</text>
				</view>
				<!-- <view class="oder">
					<view class="oder-info">
						<text class="bh">订单编号</text>
						<text class="num">2021015855231</text>
					</view>
					<view class="oder-info">
						<text class="bh">下单时间</text>
						<text class="num">2021-01-14 10:22:23</text>
					</view>
					
				</view> -->
			</view>
			
		</view>
		<view class="btn-group">
			<text class="mix-btn" @click="fanhui">缴纳成功，点击返回</text>
		</view>
	</view>
</template>

<script>
// import {  dateFormat } from '@/common/functions.js';
export default {
	data() {
		return {
			id: '',
			delta: 1,
			detailUrl: '',
			yudingNotice:'',
			yudingNotice2:'',
			comefrom: 'cart'
		};
	},
	onLoad(options) {
		// if (options.comefrom) {
		// 	this.comefrom = options.comefrom;
		// }
		// console.log(options);
		// this.id = options.id;
		// this.detailUrl = '/pages/order/detail?id=' + this.id;
		// this.loadData();
		this.$http.post('lessonxiangqin/api/getUserInfo',{
			userId:uni.getStorageSync('userId')
		},{})
		.then(res=>{
			console.log(res.data.data.payDeposit)
			uni.setStorageSync('payDeposit', res.data.data.payDeposit)
		})
		.catch(err=>{
			console.log(err)
		})
	},
	methods: {
		fanhui(){
			uni.reLaunch({
				url:'./index'
			})
		}
			
		// async loadData() {
		// 	uni.getStorage({
		// 		key: 'orderDetail',
		// 		success: res => {
		// 			if (res.data.yuding && res.data.yuding.payType == "dingjin") {
		// 				//显示支付尾款时间
		// 				let notice=["请在"];
		// 				notice.push(dateFormat(res.data.yuding.finalPaymentBeginTime, 'MM月dd日hh:mm'));
		// 				notice.push("-")
		// 				notice.push(dateFormat(res.data.yuding.finalPaymentEndTime, 'MM月dd日hh:mm'));
		// 				notice.push("时间内支付尾款");
		// 				this.yudingNotice = notice.join("");
		// 				this.yudingNotice2 = "您可留意短信及app消息提醒";
		// 				if (this.comefrom == 'order') {
		// 					this.changeOrderTabs(1);
		// 				}
		// 			}else{
		// 				if (this.comefrom == 'order') {
		// 					this.changeOrderTabs(2);
		// 				}
		// 			} 
		// 			uni.removeStorage({
		// 				key: 'orderDetail'
		// 			});
		// 		}
		// 	});
		// },
		// async changeOrderTabs(index) {
		// 	//把订单列表的选项卡切换到待收货 2
		// 	this.$api.prePage().tabClick(index);
		// 	console.log('切换订单列表选项卡',index);
		// }
	}
};
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
	}
	.content {
		width: 100%;
		height: 100%;
		margin: 0 auto;
		// display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: rgb(247,247,247);
	}

	.success-icon {
		font-size: 160upx;
		color: #fa436a;
		margin-top: 100upx;
	}

	.tit {
		margin-top: 20upx;
		font-size: 40upx;
		color: #ffffff;
	}

	.notice {
		text-align: center;
		font-size: 24upx;
		margin-top: 40upx;
	}

	.btn-group {
		width: 100%;
		height: 80upx;
		text-align: center;
		padding-top: 100upx;
		background: rgb(247,247,247);
	}

	.mix-btn {
		width: 500upx;
		margin: 30upx auto;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 600upx;
		height: 80upx;
		font-size: 30upx;
		color: #fff;
		background-color: rgb(6, 211, 211);
		border-radius: 50upx;

		&.hollow {
			background: #fff;
			color: #303133;
			border: 1px solid #ccc;
		}
	}

	.tishi {
		margin-top: 30upx;
		font-size: 4upx;
		color: #FFFFFF;
	}

	.pay {
		background-color: rgb(6, 211, 211);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
		height: 45%;
		width: 100%;
	}
	.mid{
		width: 100%;
		height: 30%;
		// margin: 0 auto;
		// border: solid 1px red;
		box-sizing: border-box;
		margin-top: -60upx;
	}
	.play{
		width: 700upx;
		height: 40upx;
		margin: auto;
		display: flex;
		border-radius: 50upx;
		background-color: rgb(0,176,176);
	}
	.info{
		width: 650upx;
		height: 500upx;
		margin: auto;
		// background-color: rgb(255,255,255);
		display: flex;
		flex-direction: column;
		margin-top: -20upx;
	}
	.money{
		// border: solid 1px #2C405A;
		width: 100%;
		height: 200upx;
		color: rgb(0,176,176);
		text-align: center;
		line-height:130upx;
		font-size: 50upx;
		background-color: rgb(255,255,255);
		border-radius: 0upx 0upx 25upx 25upx;
		border-bottom: dashed 1px #C0C0C0;
		
	}
	.oder{
		// border: solid 1px red;
		width: 100%;
		height: 200upx;
		background-color: rgb(255,255,255);
		border-radius: 25upx 25upx 0upx 0upx;
		border-top: dashed 1px #C0C0C0;
	
	}
	.oder-info{
		width: 100%;
		height: 60upx;
		font-size: 20upx;
		line-height: 60upx;
	}
	.bh{
		float: left;
		margin-left: 20upx;
	}
	.num{
		float: right;
		margin-right: 20upx;
	}
</style>
