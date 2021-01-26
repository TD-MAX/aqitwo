<template>
	<view class="cl_body">
		<view class="cl_head">
			<view class="input">
				<i class="iconfont">&#xe6a6;</i>
				<input type="text" v-model="search" @input="search_msg" />
			</view>
			<view class="head_sx" @click="select_to">
				<i class="iconfont">&#xe6a3;</i>
				<text>筛选</text>
			</view>
		</view>
		<scroll-view scroll-y="true" 
		class="cl_content"
		@scrolltolower="xiala">
			<view class="c_view" 
			:class="{'c_views' : item.qiyeleixing === '招商'}"
			v-for="(item,index) in clist" :key="index"
			@click="toXiang(item.id)">
				<text class="text">{{item.qiyeleixing}}</text>
				<image class=""
				:src="item.logo" 
				mode="aspectFill"></image>
				<view class="c_test">
					<p>{{item.qiyename}}</p>
					<text>{{item.neirong | dataFormat}}</text>
					<!-- <text v-html="item.neirong"></text> -->
				</view>
				<view class="c_slider">
					<slider @change="changes" block-size="12"
					min="0" max="50000" step="1" value="30000"
					activeColor="#0026FF" />
					<view class="jin">
						<view class="">
							<text>5000</text>
							<text>目标金额</text>
						</view>
						<view class="">
							<text>5000</text>
							<text>已筹金额</text>
						</view>
						<view class="touzi">
							<text>投资</text>
						</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
		</scroll-view>
	</view>
</template>

<script>
	import uniLoadMore from '../components/uni-load-more/uni-load-more.vue'
	export default {
		components:{
			uniLoadMore
		},
		data() {
			return {
				pageNum: 1,
				loadingType: 'more',
				clist:[],
				clists: [],
				search: ''
			}
		},
		filters: {
			dataFormat (msg) {
				return msg.replace(/<[^>]+>/g, '')
			}
		},
		methods: {
			//筛选
			select_to () {
				uni.navigateTo({
					url: './select_h'
				})
			},
			//详细
			toXiang (e) {
				uni.navigateTo({
					url: './g_xiang?id=' + e
				})
			},
			//获取数据
			show () {
				this.$http.post('lessonaqi/api/lessonqiyehuzhulist',{
					userid: uni.getStorageSync('userId'),
					pageSize: 10,
					pageNum: this.pageNum
				},{})
				.then(res =>{
					console.log(res)
					this.clist = this.clist.concat(res.data.rows)
					this.clists = this.clist
					let more_page = Math.ceil(res.data.total / 10)
					if (this.pageNum === more_page) {
						this.loadingType = 'nomore'
					}
					this.pageNum++
				})
				.catch(err =>{
					console.log(err)
				})
			},
			//下拉加载
			xiala () {
				if (this.loadingType === 'nomore') {
					return
				}
				this.show()
			},
			//模糊查询
			search_msg () {
				this.clist = this.clists
				if (this.search === '') {
					return
				} else {
					let list = this.clist
					var lists = []
					for(var i=0; i < list.length; i++) {
						if (list[i].qiyename.indexOf(this.search) !== -1 || list[i].neirong.indexOf(this.search) !== -1 || list[i].time.indexOf(this.search) !== -1) {
							lists.push(list[i])
						}
					}
					this.clist = lists
				}
			},
			//进度条
			changes (e) {
				console.log(e)
			}
		},
		onLoad() {
			// this.show()
		},
		onShow() {
			this.show()
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
	}
	.cl_body {
		width: 100%;
		height: 100%;
	}
	.cl_head {
		width: 98%;
		height: 100upx;
		margin: 10upx auto;
		display: flex;
		justify-content: space-around;
		.input {
			width: calc(100% - 110upx);
			height: 82%;
			display: flex;
			line-height: 82upx;
			padding: 0 20upx;
			// border: 1px solid red;
			box-sizing: border-box;
			justify-content: space-between;
			box-shadow: #C4C4C4 0 5upx 10upx 1upx; 
			input {
				width: 90%;
				height: 100%;
			}
		}
		.head_sx {
			width: 100upx;
			height: 100upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
			// border: 1px solid red;
			font-size: 28upx;
			i {
				font-size: 48upx;
			}
		}
	}
	.cl_content {
		width: 100%;
		height: calc(100% - 100upx);
		box-sizing: border-box;
		// border: 1px solid red;
		.c_view {
			width: 96%;
			min-height: 350upx;
			position: relative;
			margin: 30upx auto;
			padding: 40upx 0 0 0;
			box-sizing: border-box;
			background-image: url(../../static/help/background_blue.png);
			background-size: 100% 100%;
			.text {
				position: absolute;
				top: 10upx;
				left: 5upx;
				font-size: 26upx;
				color: white;
				transform: rotate(320deg);
			}
			image {
				width: 120upx;
				height: 120upx;
				position: absolute;
				right: 20upx;
				top: -20upx;
				border-radius: 50%;
				border: 1px solid #56A8FD;
				background-color: #fff;
				box-shadow: #56A8FD 0 -3upx 5upx 3upx;
				z-index: 5;
			}
			.c_test {
				width: 96%;
				margin: auto;
				display: flex;
				flex-direction: column;
				align-items: center;
				color: white;
				box-sizing: border-box;
				// border: 1px solid red;
				p {
					font-size: 32upx;
					margin-bottom: 20upx;
				}
				text {
					width: 98%;
					margin: auto;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
					line-height: 40upx;
					font-size: 26upx;
					color: white;
				}
			}
			.c_slider {
				width: 100%;
				.jin {
					width: 100%;
					height: 100upx;
					display: flex;
					padding: 0 15upx;
					box-sizing: border-box;
					color: white;
					view {
						flex: 1;
						height: 100%;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
					}
					.touzi {
						height: 80upx;
						margin-top: 10upx;
						border-radius: 20upx;
						background-color: white;
						color: #1989FF;
						font-size: 36upx;
						// font-weight: 600;
					}
				}
			}
			
		}
		.c_views {
			background-image: url(../../static/help/background_red.png);
			background-size: 100% 100%;
			image {
				width: 120upx;
				height: 120upx;
				position: absolute;
				right: 20upx;
				top: -20upx;
				border-radius: 50%;
				border: 1px solid #FB6E34;
				background-color: #fff;
				box-shadow: #FB6E34 0 -3upx 5upx 3upx;
				z-index: 5;
			}
		}
	}
</style>
