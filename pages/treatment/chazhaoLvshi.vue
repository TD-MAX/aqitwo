<template>
	<view class="content">
		<view class="item" 
		v-for="(item,index) in perponList" :key="index"
		@click="to(item.id)">
			<view class="content_img">
				<image :src="item.zhaopian"></image>
			</view>
			<view class="content_right">
				<view class="name">
					<text>{{item.name}}</text>
				</view>
				<!-- <view class="address">
					<text>山西-长治</text>
				</view> -->
				<view class="skilled">
					<text>{{item.jingli}}</text>
				</view>
				<view class="more">
					<text>查看详情>></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				pageNum: 1,
				perponList: []
			}
		},
		onLoad() {
			this.show()
		},
		methods: {
			to (e) {
				uni.navigateTo({
					url: './lvshiMsg?id=' + e
				})
			},
			// wei () {
			// 	this.$api.msg('尚未开放，敬请期待')
			// },
			show () {
				this.$http.post('lessonaqi/api/lessongetlvshi',{
					pageNum: this.pageNum,
					pageSize: 10
				},{})
				.then(res => {
					console.log(res)
					this.perponList = this.perponList.concat(res.data.rows)
				})
				.catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f8f8f8;
	}
	.content{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.item{
		width: 96%;
		height: 240upx;
		background-color: #fff;
		border-radius: 15upx;
		box-sizing: border-box;
		margin: 20upx 0 auto;
		padding:14upx;
		display:flex;
	}
	.content_img image{
		width:150upx;
		height:150upx;
		margin-right: 20upx;
		border-radius: 20upx;
	}
	.content_right{
		width: calc(100% - 160upx);
		height: 90%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		padding-top: 15upx;
		padding-left: 10upx;
	}
	.content_right .name {
		font-size: 26upx;
		// padding-bottom: 10upx;
	}
	.content_right .address{
		font-size: 26upx;
		// padding-bottom: 10upx;
	}
	.content_right .skilled{
		font-size: 24upx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		// padding-bottom: 10upx;
	}
	.more text{
		font-size: 20upx;
		// display: flex;
		float: right;
		color: #3f3e51;
	}
</style>
