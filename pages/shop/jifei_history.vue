<template>
	<view class="jifen_list">
		<view class="list" v-for="(item,index) in jifenList" :key="index">
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
	export default {
		data() {
			return {
				jifenList:[],
				pageNum:1,
				loading: 'more'
			}
		},
		methods: {
			//积分明细查询
			show () {
				this.$http.post('lessonaqi/api/lessonjifenlist',{
					userid: uni.getStorageSync('userId'),
					pageNum: this.pageNum,
					pageSize: 10
				},{})
				.then(res=>{
					console.log(res.data)
					this.jifenList = this.jifenList.concat(res.data.rows)
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
		//下拉刷新
		onReachBottom() {
			if (this.loading === 'more') {
				this.show()
			} else {
				this.$api.msg('没有更多数据了')
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
