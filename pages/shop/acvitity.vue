<template>
	<view class="acvitity">
		<!-- 下拉框 -->
		<view class="acvitity_head">
			<view class="type">
				<xfl-select
				:list="lists"
				:clearable="false"
				@visible-change = 'visibleChange'
				@change="change"
				:showItemNum="5" 
				:listShow="false"
				:focusShowList = "true"
				:isCanInput="true" 
				:placeholder = "'placeholder'"
				:initValue="'全部'"
				:selectHideType="'independent'"
				>
				</xfl-select>
			</view>
			<view class="jieduan">
				<xfl-select
				:list="jieduan"
				:clearable="false"
				@change="changejie"
				:showItemNum="5" 
				:listShow="false"
				:focusShowList = "true"
				:isCanInput="true" 
				:placeholder = "'placeholder'"
				:initValue="'全部'"
				:selectHideType="'independent'"
				>
				</xfl-select>
			</view>
		</view>
		<scroll-view
			class="list-scroll-content" 
			scroll-y="true"
		>
			<!-- 资讯列表 -->
			<view class="news_content" 
			v-for="(item,index) in huodongList" :key="index"
			@click="huodong_xq(item.activityId)">
				<image :src="item.fengmian" mode="aspectFill"></image>
				<view class="_right">
					<view class="_top">
						<text class="tit">{{item.title}}</text>
					</view>
					<view class="_bottom">
						<view class="like">
							<text style="color: red;">{{item.type === 1 ? '免费' : item.jiage + '企币'}}</text>
						</view>
						<view class="num">
							<text>已报名{{item.yibaomingrenshu}}人</text>
						</view>
					</view>	
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import xflSelect from '@/components/xfl-select/xfl-select.vue'
	export default {
		components:{
			xflSelect
		},
		data() {
			return {
				lists: ['全部','个人','企业','公益','官方'],
				list: [
					{
						text: '全部',
						type: 0
					},
					{
						text:'个人',
						type: 3
					},
					{
						text:'企业',
						type: 2
					},
					{
						text:'公益',
						type: 1
					},
					{
						text:'官方',
						type: 4
					},
				],
				xzindex: 0,
				jieduanindex: 0,
				jieduan:['全部','预报名','筹备期','确定活动时间','活动进行中','活动结束'],
				jieduans:[0,1,2,3,4,5],
				type: '个人', //企业，公益，官方，个人
				jie: '预报名',
				pageNum: 1,
				loading: 'more',
				huodongList: []
			}
		},
		methods: {
			visibleChange(isShow){ // 列表框的显示隐藏事件
				// console.log('isShow:', isShow);
			},
			//类型
			change({newVal, oldVal, index, orignItem}){
				// console.log(newVal, oldVal, index, orignItem);
				console.log(index)
				this.type = newVal
				this.xzindex = index
				this.show(index,this.jieduanindex)
			},
			//阶段
			changejie({newVal, oldVal, index, orignItem}){
				console.log(index)
				this.jie = newVal
				this.jieduanindex = index
				this.show(this.xzindex,this.jieduanindex)
				console.log(this.jie)
			},
			//活动详情
			huodong_xq (idz) {
				uni.navigateTo({
					url:'./acvitity_xiang?data=' + idz
				})
			},
			//活动列表展示
			show (tve,tne) {
				console.log(this.list[tve].type)
				console.log(this.jieduans[tne])
				this.$http.post('lessonaqi/api/lessongethuodonlist',{
					pageNum:this.pageNum,
					pageSize: 10,
					userid: uni.getStorageSync('userId'),
					start: this.jieduans[tne],
					type: 0,
					zhubanfangtype: this.list[tve].type
				},{})
				.then(res=>{
					console.log(res.data)
					this.huodongList = res.data.rows
					let page_more = Math.ceil(res.data.total/10)
					if (this.pageNum === page_more) {
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
				this.$http.post('lessonaqi/api/lessongethuodonlist',{
					pageNum:this.pageNum,
					pageSize: 10,
					userid: uni.getStorageSync('userId'),
					start: 0,
					type: 0,
					zhubanfangtype: 0
				},{})
				.then(res=>{
					console.log(res.data)
					this.huodongList = res.data.rows
					let page_more = Math.ceil(res.data.total/10)
					if (this.pageNum === page_more) {
						this.loading = 'nomore'
					}
					this.pageNum++
				})
				.catch(err=>{
					console.log(err)
				})
		}
	}
</script>

<style lang="scss">
	.acvitity{
		width: 100%;
		height: 100%;
	}
	.acvitity_head{
		width: 96%;
		height: 100upx;
		margin: auto;
		display: flex;
		justify-content: space-around;
		view{
			width: 40%;
			height: 60upx;
			margin-top: 20upx;
			box-sizing: border-box;
			border-radius: 10upx;
			
		}
	}
	.list-scroll-content{
		height: 100%;
	}
	.news_content{
		height: 200rpx;
		width: 100%;
		box-sizing: border-box;
		padding: 25rpx;
		display: flex;
		align-items: center;
		background: #fff;
		box-sizing: border-box;
		border-bottom: 1px solid #F2F2F2; //分割线颜色
		._top{
			display: flex;
			max-height: 88upx;
			overflow: scroll;
		}
		.zhiding{
			width: 80upx;
			height: 40upx;
			margin-right: 20upx;
			// position: absolute;
		}
		image{
			width: 240rpx;
			height: 150rpx;
		}
		._right{
			height: 100%;
			flex: 1;
			display: flex;
			padding-left: 20rpx;
			flex-direction: column;
			justify-content: space-between;
			.tit{
				font-size: 30rpx;
				color: #333;
			}
			._bottom{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.like{
					display: flex;
					view{
						display: flex;
						align-items: center;
						color: #999;
						padding-right: 20rpx;
						i{
							font-size: 24rpx;
							padding-right: 10rpx;
						}
						text{
							font-size: 28rpx;
							
						}
					}
				}
			}
			.num{
				display: flex;
				border: 1px solid red;
				border-radius: 50upx;
				align-items: center;
				text{
					padding-left: 10rpx;
					font-size: 28rpx;
					color: red;
				}
			}
		}
	}
	.navbar{
		display: flex;
		height: 80rpx;
		padding: 0 10rpx;
		background: #fff;
		box-shadow: 0 1px 10rpx rgba(0,0,0,.06);
		position: relative;
		z-index: 10;
		.nav-item{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 30rpx;
			color: #333;
			position: relative;
			&.current{
				color: #999;
				&:after{
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 88rpx;
					height: 0;
					border-bottom: 4rpx solid #999;
				}
			}
		}
	}
</style>
