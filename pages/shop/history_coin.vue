<template>
	<view class="jifen_list">
		<view class="list" v-for="(item,index) in duihuanList" :key="index">
			<view class="left">
				{{item.yontu}}
			</view>
			<view class="right">
				<text>{{item.time}}</text>
				<p>{{item.jifen}}</p>
			</view>
		</view>
	</view>
</template>

<script>
	import _ from 'lodash'
	export default {
		data() {
			return {
				duihuanList:[],
				pageNum: 1,
				shopName: ""
			}
		},
		methods: {
			//商品兑换记录
			show () {
				this.$http.post('lessonaqi/api/lessonjifenlist',{
					userid: uni.getStorageSync('userId'),
					pageNum: this.pageNum,
					pageSize: 10
				},{})
				.then(res=>{
					console.log(res.data)
					_.each(res.data.rows, o=>{
						if (o.yontu === '商品兑换') {
							this.duihuanList.push({
								id: o.id,
								yontu: o.yontu,
								time: o.time,
								jifen: o.jifen
							})
							console.log(this.duihuanList)
						}
					})
					let more_page = Math.ceil(res.data.total/10)
					if (more_page === this.pageNum) {
						this.loading = 'nomore'
					}
					this.pageNum++
				})
				.catch(err=>{
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
		text-align: center;
		line-height: 120upx;
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
