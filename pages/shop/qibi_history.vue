<template>
	<view class="qibi_history">
		<view class="qibi_header">
			<text class="fuhao">￥</text>
			<text>企币总资产</text>
			<text class="money">{{qibi.qibi}}</text>
		</view>
		<view class="qibi_content">
			<view class="qibi_content_head">
				资产明细
			</view>
			<view class="qibi_xi" 
			v-for="(item,index) in qibilist" :key="index" v-if="qibilist.length !== 0">
				<view class="">
					<text>{{item.time}}</text>
					<p>{{item.yontu}}</p>
				</view>
				<view class="">
					<text>{{item.qibi}}</text>
				</view>
			</view>
			<view class="" 
			style="padding-left: 20upx;"
			v-if="qibilist.length === 0">
				<text>暂无记录</text>
			</view>
		</view>
		<view class="qibi_chongzhi" @click="chongzhi">
			充值
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageNum: 1,
				loading: 'more',
				qibilist: [],
				qibi: {}
			}
		},
		methods: {
			//企币记录
			show () {
				this.$http.post('lessonaqi/api/lessonqibilist',{
					userid: uni.getStorageSync('userId'),
					pageNum: this.pageNum,
					pageSize: 10
				},{})
				.then(res=>{
					console.log(res.data)
					if (res.data.rows) {
						this.qibilist = this.qibilist.concat(res.data.rows)
					}
					let more_page = Math.ceil(res.data.total/10)
					if (more_page === this.pageNum) {
						this.loading = 'nomore'
					}
					this.pageNum++
				})
				.catch(err=>{
					console.log(err)
				})
			},
			//充值
			chongzhi () {
				uni.navigateTo({
					url: './qibi_ref'
				})
			},
			//钱包展示
			init () {
				this.$http.post('lessonaqi/api/lessonqianbaozhanshi',{
					userid: uni.getStorageSync('userId')
				},{})
				.then(res=>{
					console.log(res.data)
					this.qibi = res.data
				})
				.catch(err=>{
					console.log(err)
				})
			}
		},
		//滚动到底部
		onReachBottom() {
			if (this.loading === 'more') {
				this.show()
			} else {
				this.$api.msg('没有更多数据了')
			}
		},
		onLoad() {
			this.show()
			this.init()
		}
	}
</script>

<style lang="scss">
	.qibi_history{
		width: 100%;
		height: 100%;
	}
	.qibi_header{
		width: 96%;
		height: 250upx;
		margin: 20upx auto;
		border-radius: 10upx;
		display: flex;
		font-size: 30upx;
		color: #696969;
		flex-direction: column;
		align-items: center;
		border: 1px solid #C1C1C1;
		.fuhao{
			font-size: 36upx;
			color: black;
			font-weight: 600;
			margin: 20upx 0 10upx 0;
		}
		.money{
			font-size: 40upx;
			color: black;
			margin: 10upx 0;
			font-weight: 600;
		}
	}
	.qibi_content{
		width: 96%;
		margin: 20upx auto;
		border: 1px solid #C1C1C1;
		border-radius: 10upx;
		text{
			font-size: 28upx;
			color: #696969;
		}
		.qibi_content_head {
			width: 94%;
			font-size: 36upx;
			color: #696969;
			margin: auto;
			padding: 10upx;
		}
		.qibi_xi{
			width: 94%;
			height: 90upx;
			display: flex;
			font-size: 28upx;
			color: #696969;
			padding-top: 15upx;
			margin: auto;
			justify-content: space-between;
			border-top: 1px solid #C1C1C1;
		}
	}
	.qibi_chongzhi {
		width: 60%;
		height: 80upx;
		margin: 20upx auto;
		border-radius: 20upx;
		font-size: 32upx;
		color: white;
		background-color: #333333;
		text-align: center;
		line-height: 80upx;
	}
</style>
