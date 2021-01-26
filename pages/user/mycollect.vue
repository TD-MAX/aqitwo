<template>
	<view class="content">
		<!-- <view class="navbar">
			<view 
				v-for="(item, index) in navList" :key="index" 
				class="nav-item" 
				:class="{current: tabCurrentIndex === index}"
				@click="tabClick(index)"
			>
				{{item.text}}
			</view>
		</view> -->

		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<scroll-view 
					class="list-scroll-content" 
					scroll-y
					@scrolltolower="loadData"
				>
					<!-- 资讯列表 -->
					<view class="news_content" @click="_details(n.id)" v-for="(n, index) in news_list">
						<image :src="n.fengmian" mode=""></image>
						<view class="_right">
							<text class="tit">{{n.title}}</text>
							<view class="_bottom">
								<view class="like">
									<view class="">
										<i class="iconfont">&#xe755;</i>
										<text>{{n.shoucangnum}}</text>
									</view>
									<view class="">
										<i class="iconfont">&#xe60a;</i>
										<text>{{n.dianzannum}}</text>
									</view>
								</view>
								<view class="num">
									<text>浏览量</text>
									<text>{{n.yuedu}}</text>
								</view>
							</view>
						</view>
					</view>
					 
					<uni-load-more :status="tabItem.loadingType"></uni-load-more>
					
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template> 

<script>
	import uniLoadMore from '../components/uni-load-more/uni-load-more.vue'
	import _ from 'lodash'
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				hide:false, // 用于监听页面隐藏
				tabCurrentIndex: 0,
				navList: [{
						state: 0,
						text: '热点',
						loadingType: 'more',
						loaded: false
					},
					{
						state: 1,
						text: '企业之家',
						loadingType: 'more',
						loaded: false
					},
					{
						state: 2,
						text: '本地企业',
						loadingType: 'more',
						loaded: false
					},
					{
						state: 3,
						text: '科研成果',
						loadingType: 'more',
						loaded: false
					}
				],
				order_text: '',
				refund_text:'',
				pageNum: 1,
				news_list: [],
				more_page: 0
			};
		},
		onLoad(options){
			this.init(0)
		},
		// onShow() {
		// 	this.init(0)
		// },
		onHide() {
		},
		methods: {
			//swiper 切换
			changeTab(e){
				this.news_list = []
				this.tabCurrentIndex = e.target.current;
				this.navList[this.tabCurrentIndex].loadingType = 'more'
				this.pageNum = 1
				this.init(this.tabCurrentIndex)
			},
			//顶部tab点击
			tabClick(index){
				if (this.tabCurrentIndex !== index) {
					this.tabCurrentIndex = index;
				}
			},
			_details(n) {
				uni.navigateTo({
					url: `/pages/news/newsdetails?id=${n}`
				})
			},
			loadData () {
				if (this.navList[this.tabCurrentIndex].loadingType === 'more') {
					this.init(this.tabCurrentIndex)
				}
			},
			init (n) {
				uni.showLoading({
				    title: '加载中'
				});
				this.$http
				.post('lessonaqi/api/lessonzixunshoucanglist', 
				{
					"userid":uni.getStorageSync('userId'),
				    "pageNum": this.pageNum,
				    "pageSize": 10
				}, {})
				.then(res => {
					console.log(res.data)
					uni.hideLoading()
					// this.news_list = res.data.rows
					_.each(res.data.rows, o => {
						this.news_list.push(o)
					})
					this.more_page = Math.ceil(res.data.total/10)
					if (this.pageNum === this.more_page) {
						this.navList[this.tabCurrentIndex].loadingType = 'nomore'
					}
					this.pageNum++
				})
				.catch(err => {
				})
			}
		}
	}
</script>

<style lang="scss">
	page, .content{
		background: #f4f4f4;
		height: 100%;
	}
	
	.swiper-box{
		height: calc(100% - 80rpx);
	}
	.list-scroll-content{
		height: 100%;
	}
	.news_content{
		height: 180rpx;
		width: 100%;
		box-sizing: border-box;
		padding: 15rpx;
		display: flex;
		align-items: center;
		background: #fff;
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
				align-items: center;
				text{
					padding-left: 10rpx;
					font-size: 28rpx;
					color: #999;
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

	.uni-swiper-item{
		height: auto;
	}
	/* load-more */
	.uni-load-more {
		display: flex;
		flex-direction: row;
		height: 80rpx;
		align-items: center;
		justify-content: center
	}
	
	.uni-load-more__text {
		font-size: 28rpx;
		color: #999
	}
	
	.uni-load-more__img {
		height: 24px;
		width: 24px;
		margin-right: 10px
	}
	
	.uni-load-more__img>view {
		position: absolute
	}
	
	.uni-load-more__img>view view {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #999;
		position: absolute;
		opacity: .2;
		transform-origin: 50%;
		animation: load 1.56s ease infinite
	}
	
	.uni-load-more__img>view view:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px
	}
	
	.uni-load-more__img>view view:nth-child(2) {
		transform: rotate(180deg);
		top: 11px;
		right: 0
	}
	
	.uni-load-more__img>view view:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px
	}
	
	.uni-load-more__img>view view:nth-child(4) {
		top: 11px;
		left: 0
	}
	
	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px
	}
	
	.load2 {
		transform: rotate(30deg)
	}
	
	.load3 {
		transform: rotate(60deg)
	}
	
	.load1 view:nth-child(1) {
		animation-delay: 0s
	}
	
	.load2 view:nth-child(1) {
		animation-delay: .13s
	}
	
	.load3 view:nth-child(1) {
		animation-delay: .26s
	}
	
	.load1 view:nth-child(2) {
		animation-delay: .39s
	}
	
	.load2 view:nth-child(2) {
		animation-delay: .52s
	}
	
	.load3 view:nth-child(2) {
		animation-delay: .65s
	}
	
	.load1 view:nth-child(3) {
		animation-delay: .78s
	}
	
	.load2 view:nth-child(3) {
		animation-delay: .91s
	}
	
	.load3 view:nth-child(3) {
		animation-delay: 1.04s
	}
	
	.load1 view:nth-child(4) {
		animation-delay: 1.17s
	}
	
	.load2 view:nth-child(4) {
		animation-delay: 1.3s
	}
	
	.load3 view:nth-child(4) {
		animation-delay: 1.43s
	}
	
	@-webkit-keyframes load {
		0% {
			opacity: 1
		}
	
		100% {
			opacity: .2
		}
	}
	
</style>
