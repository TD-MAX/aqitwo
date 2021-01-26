<template>
	<view class="jifen_list">
		<view class="list" v-for="(item,index) in history_list" :key="index">
			<view class="left">
				<p>{{item.zhanghao}}</p>
				<p>{{item.type === 1 ? '支付宝' : '微信'}}</p>
			</view>
			<view class="right">
				<text>{{item.time}}</text>
				<p>{{item.jine}}元</p>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageNum: 1,
				history_list: []
			}
		},
		methods: {
			show () {
				this.$http.post('lessonaqi/api/lessontixianshenqingjilu',{
					userid: uni.getStorageSync('userId'),
					pageNum: this.pageNum,
					pageSize: 5
				},{})
				.then(res => {
					console.log(res)
					this.history_list = res.data
				})
				.catch(err => {
					console.log(err)
				})
			}
		},
		onLoad() {
			this.show()
		}
	}
</script>

<style>
	.jifen_list{
		width: 100%;
		height: 100%;
	}
	.list{
		width: 96%;
		height: 120upx;
		margin: auto;
		font-size: 32upx;
		box-sizing: border-box;
		/* border: 1px solid yellow; */
		background-color: #FFFFFF;
		border-bottom: 1px solid #F5F5F5;
		display: flex;
		justify-content: space-between;
	}
	.left{
		width: 180upx;
		height: 100%;
		/* border: 1px solid red; */
		text-align: left;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.right{
		width: 400upx;
		/* border: 1px solid red; */
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-end;
	}
	text{
		font-size: 28upx;
		color: #696969;
	}
</style>
