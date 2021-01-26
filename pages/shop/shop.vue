<template>
	<view class="shop">
		<view class="shop_nav">
			<text>积分账户</text>
			<p>{{jifen}}</p>
			<view class="" @click="history_dh">
				兑换记录
			</view>
		</view>
		<view class="shop_head">
			<view class="head_msg" v-for="(item,index) in navList" 
			:key="index"
			:class="{current : tabCurrentIndex === index}"
			@click="qie(index)">
				{{item.text}}
			</view>
		</view>
		<swiper :current="tabCurrentIndex"
		:indicator-dots="false" 
		:autoplay="false" 
		:duration="1000"
		@change="changeTab"
		class="swiper-box">
			<swiper-item 
			v-for="(tabItem,tabIndex) in navList" :key="tabIndex"
			class="swiper-box-item"
			>
				<scroll-view scroll-y="true" 
				class="item" 
				@scrolltolower="dibu(tabIndex)">
					<view class="item_msg" 
					v-for="(a,i) in new_list" :key="i"
					@click="to_shop(a.type,i)">
						<image :src="a.fengmian"></image>
						<view class="neirong">{{a.name}}</view>
						<text>{{a.jiage}}积分</text>
						<text class="yidui">连续{{a.lianxuqiandao}}</text>
						<view class="ljdh">立即兑换</view>
					</view>
				</scroll-view>
				<!-- <u-waterfall v-model="new_list" ref="uWaterfall">
					<template v-slot:left="{ leftList }">
						<view class="demo-warter" v-for="(item, index) in leftList" :key="index">
							<u-lazy-load threshold="-450" border-radius="10" :image="item.fengmian" :index="index" @click="to_shop(item.type,i)"></u-lazy-load>
							<view class="neirong">{{item.name}}</view>
							<text>{{item.jiage}}积分</text>
							<text class="yidui">连续{{item.lianxuqiandao}}</text>
							<view class="ljdh">立即兑换</view>
						</view>
					</template>
					<template v-slot:left="{ leftList }">
						<view class="demo-warter" v-for="(item, index) in leftList" :key="index">
							<u-lazy-load threshold="-450" border-radius="10" :image="item.fengmian" :index="index"></u-lazy-load>
							<view class="neirong">{{item.name}}</view>
							<text>{{item.jiage}}积分</text>
							<text class="yidui">连续{{item.lianxuqiandao}}</text>
							<view class="ljdh">立即兑换</view>
						</view>
					</template>
				</u-waterfall> -->
			</swiper-item>
		</swiper>
		<uni-popup ref="popupDialog" type="dialog" @change="change">
			<uni-popup-dialog
			content="确定要兑换该商品吗？"
			:before-close="true"
			@confirm="dialogConfirm" 
			@close="dialogClose"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import _ from 'lodash'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue' //弹出框
	export default {
		components: {
			uniPopupDialog
		},
		data() {
			return {
				tabCurrentIndex: 0,
				jifen: '', //积分账户
				num: '', //累计签到
				id:'', //商品id
				type: '', //商品类型
				new_list:[],
				news_list: [],
				navList: [{
					state: 0,
					text: '1-100',
					start: '1',
					end: '100',
					loadingType: 'more',
					loaded: false
				}, {
					state: 1,
					text: '101-300',
					start: '101',
					end: '300',
					loadingType: 'more',
					loaded: false
				},{
					state: 2,
					text: '301-3000',
					start: "301",
					end: '3000',
					loadingType: 'more',
					loaded: false
				},{
					state: 3,
					text: '3000以上',
					start: '3001',
					end: '999999999',
					loadingType: 'more',
					loaded: false
				}],
				pageNum:1,
				loading: 'more'
			}
		},
		methods: {
			//兑换记录
			history_dh () {
				uni.navigateTo({
					url: './history_coin'
				})
			},
			//积分余额
			// balance () {
			// 	this.$http.post('lessonaqi/api/lessonqianbaozhanshi',{
			// 		userid: uni.getStorageSync('userId')
			// 	},{})
			// 	.then(res=>{
			// 		console.log(res)
			// 		this.jifen = res.data.jifen
			// 	})
			// 	.catch(err=>{
			// 		console.log(err)
			// 	})
			// },
			//累计签到
			select_qiandao() {
				this.$http.post('lessonaqi/api/lessonqiandaochaxun', {
						userid: uni.getStorageSync('userId')
					}, {})
					.then(res => {
						console.log(res.data)
						this.jifen = res.data.jifen
						this.num = res.data.continue_days
					})
					.catch(err => {
						console.log(err)
					})
			},
			//swiper切换
			changeTab(e) {
				this.pageNum = 1
				this.new_list = []
				this.loading = 'more'
				this.tabCurrentIndex = e.target.current
				this.show(this.tabCurrentIndex)
			},
			//积分切换
			qie (evt) {
				this.new_list = []
				this.pageNum = 1
				this.loading = 'more'
				this.tabCurrentIndex = evt
				// this.show(evt)
			},
			//弹出框
			change (e) {
				
			},
			/**
			 * 对话框点击确认按钮
			 */
			dialogConfirm(done) {
				this.$http.post('lessonaqi/api/lessonjifenshangchengduihuan',{
					type: this.type,
					userid: uni.getStorageSync('userId'),
					id: this.id
				},{})
				.then(res=>{
					console.log(res.data)
					switch (res.data) {
						case 777 :
							this.$api.msg('积分不足!')
							break
						case 0 :
							this.$api.msg('该类型暂未开放兑换')
						case 500 :
							this.$api.msg('该类型不存在')
						case 555 :
							this.$api.msg('签到次数不够')
						case 1 :
							uni.showToast({
								title:'兑换成功'
							})
					}
					done()
				})
				.catch(err=>{
					console.log(err)
					done()
				})
			},
			dialogClose (done) {
				console.log('点击取消')
				// this.$refs.popopMessage.open()
				done()
			},
			//商品详情
			to_shop (event,c) {
				console.log(event)
				// if (this.num < this.new_list[c].lianxuqiandao) {
				// 	this.$api.msg('连续签到天数不够，无法进行此操作')
				// 	return
				// }
				switch (event) {
					case 1 :
						var can = {
							id:this.new_list[c].id,
							num: this.num
						}
						uni.navigateTo({
							url:'./shopDetails?data=' + JSON.stringify(can),
							animationType:'pop-in'
						})
						break;
					case 2 :
						this.type = event
						this.id = this.new_list[c].id
						this.$refs.popupDialog.open()
						break
				}
			},
			//获取商品列表
			show (n) {
				if (this.loading === 'more') {
					this.$http.post('lessonaqi/api/lessonjifenshangchenglist',{
						pageNum: this.pageNum,
						pageSize: 10,
						startjiage: this.navList[n].start,
						endjiage: this.navList[n].end
					},{})
					.then(res=>{
						// console.log(res)
						this.new_list = this.new_list.concat(res.data.rows)
						_.each(this.new_list, o => {
							if (o != null) {
								this.news_list.push(o)
							}
						})
						let page_more = Math.ceil(res.data.total/10)
						console.log(this.new_list)
						// console.log(page_more)
						if (page_more === this.pageNum ) {
							this.loading = 'nomore'
						}
						this.pageNum++
					})
					.catch(err=>{
						console.log(err)
					})
				} else {
					this.$api.msg('没有更多数据了')
				}
			},
			dibu (event) {
				this.show(event)
			}
		},
		onLoad() {
			this.show(0)
			this.select_qiandao()
		}
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height: 100%;
		background-color: #f5f5f5;
		// background-image: url(../../static/promoter/shop.png);
	}
	.demo-warter {
		border-radius: 8px;
		margin: 5px;
		background-color: #ffffff;
		padding: 8px;
		position: relative;
		.neirong{
			width: 98%;
			font-size: 32upx;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			margin: 10upx 0;
		}
		.yidui{
			display: block;
			position: absolute;
			font-size: 24upx;
			right: 5upx;
			bottom: 79upx;
			color: #c9cad4;
		}
		.ljdh{
			width: 120upx;
			height: 40upx;
			border-radius: 50upx;
			background-color: #FF6062;
			color: white;
			font-size: 24upx;
			text-align: center;
			line-height: 40upx;
		}
		p{
			font-size: 32upx;
			margin: 10upx 0;
			font-weight: 600;
			text-align: left;
		}
		text{
			color: red;
			display: block;
			font-size: 28upx;
			margin: 5upx 0;
			text-align: left;
		}
	}
	.shop{
		width: 100%;
		height: 100%;
	}
	.shop_nav {
		width: 100%;
		height: 320upx;
		color: white;
		font-size: 40upx;
		background-image: url(../../static/promoter/shop.png);
		background-size: 100% 100%;
		display: flex;
		// border: 1px solid white;
		flex-direction: column;
		align-items: center;
		p{
			font-size: 65upx;
			margin: 30upx 0;
		}
		view{
			width: 240upx;
			height: 50upx;
			border: 1px solid white;
			border-radius: 50upx;
			text-align: center;
			line-height: 50upx;
			font-size: 30upx;
		}
	}
	.shop_head{
		width: 90%;
		height: 100upx;
		margin: auto;
		display: flex;
		justify-content: space-between;
		.head_msg{
			width: 160upx;
			height: 60upx;
			margin-top: 20upx;
			font-size: 28upx;
			text-align: center;
			line-height: 60upx;
			box-sizing: border-box;
			border: 1px solid #C1C1C1;
			border-radius: 50upx;
		}
		.current{
			width: 160upx;
			height: 60upx;
			margin-top: 20upx;
			font-size: 28upx;
			text-align: center;
			line-height: 60upx;
			box-sizing: border-box;
			border: 1px solid #C1C1C1;
			background-color: #C1C1C1;
			color: white;
			border-radius: 50upx;
		}
	}
	//轮播图
	.swiper-box{
		width: 94%;
		margin: auto;
		// border: 1px solid red;
		box-sizing: border-box;
		height: calc(100% - 420upx); 
		.swiper-box-item{
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			// border: 1px solid blue;
		}
		.item{
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			display: flex;
			// border: 1px solid red;
			margin: auto;
			.item_msg{
				// padding: 20upx;
				box-sizing: border-box;
				width: 45%;
				height: 450upx;
				// border-radius: 10upx;
				float: left;
				position: relative;
				margin: 5upx 16upx;
				// border: 1px solid #D9D9D9;
				image{
					width: 100%;
					height: 260upx;
					border-radius: 20upx;
				}
				.neirong{
					width: 98%;
					font-size: 32upx;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					margin: 10upx 0;
				}
				.yidui{
					display: block;
					position: absolute;
					font-size: 24upx;
					right: 5upx;
					bottom: 79upx;
					color: #c9cad4;
				}
				.ljdh{
					width: 120upx;
					height: 40upx;
					border-radius: 50upx;
					background-color: #FF6062;
					color: white;
					font-size: 24upx;
					text-align: center;
					line-height: 40upx;
				}
				p{
					font-size: 32upx;
					margin: 10upx 0;
					font-weight: 600;
					text-align: left;
				}
				text{
					color: red;
					display: block;
					font-size: 28upx;
					margin: 5upx 0;
					text-align: left;
				}
			}
		}
	}
	
</style>
