<template>
	<view class="box">
		<view class="_tab" v-for="(n, index) in data" :key="index" @click="active_tab(index)">
			<view class="" v-if="zhangshi">
				<view class="count" v-show="index===2" :count="count">{{count}}</view>
			</view>
			<image :src="tab_active != index ? n.img : n.active_img" mode=""></image>
			<text :style="tab_active === index ? 'color : #25D3D2' : ''">{{n.tit}}</text>
		</view>
	</view>
</template>

<script>
	import home from '../../static/xiangqin/tab-home.png'
	import active_home from '../../static/xiangqin/tab-home-current.png'
	import found from '../../static/xiangqin/tab-cate.png'
	import active_found from '../../static/xiangqin/tab-cate-current.png'
	import message from '../../static/xiangqin/tab-cart.png'
	import active_message from '../../static/xiangqin/tab-cart-current.png'
	import user from '../../static/xiangqin/tab-my.png'
	import active_user from '../../static/xiangqin/tab-my-current.png'
	import { mapState,mapMutations } from 'vuex'
	export default {
		props:['tab_active','count'],
		data() {
			return {
				active: 0,
				zhangshi:'',
				data: [
					{
						tit: '首页',
						img: home,
						active_img: active_home,
						path: '/pages/xiangqin/index/index'
					},
					{
						tit: '发现',
						img: found,
						active_img: active_found,
						path: '/pages/xiangqin/found/index'
					},
					{
						tit: '消息',
						img: message,
						active_img: active_message,
						path: '/pages/xiangqin/message/index'
					},
					{
						tit: '我的',
						img: user,
						active_img: active_user,
						path: '/pages/xiangqin/user/index'
					}
				],
				
			}
		},
		onLoad() {
			
		},
		computed:{
			zhanshi(){
				return this.$store.state.zhanshi
			}
		},
		watch: {
			zhanshi(val){
				this.zhangshi = this.$store.state.zhanshi
			}
		},
		// created() {
		// 	this.zhangshi = this.$store.state.zhanshi
		// },
		mounted () {
			this.message()
		},
		// activated() {
		// 	this.message()
		// },
		methods: {
			//页面跳转
			active_tab (n) {
				console.log(n)
				if (n !== this.tab_active) {
					uni.redirectTo({
						url: `${this.data[n].path}`
					})
				}
			},
			//未读消息提示
			message(){
				this.zhangshi = this.$store.state.zhanshi
				let message = 'pages/xiangqin/message/index'
				let pages = getCurrentPages()
				let page = pages[pages.length - 1].route
					if(page === message) {
						this.$nextTick(function(e){
							this.$store.state.zhanshi = false
						})
					} else {
						console.log('嗨嗨嗨')
					}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.box{
		width: 100%;
		height: 100rpx;
		background-color: #fff;
		display: flex;
		position: fixed;
		bottom: 0;
		
	}
	._tab{
		flex: 1;
		display: flex;
		flex-direction: column;
		position: relative;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		padding-top: 10rpx;
		border-top: 1px solid #F8F8F8;
		.count{
			width: 20upx;
			height: 20upx;
			text-align: center;
			line-height: 20upx;
			border-radius: 50%;
			font-size: 20upx;
			overflow: hidden;
			background-color: red;
			color: white;
			position: absolute;
			top: 5upx;
			left: 55upx;
		}
		image{
			width: 48rpx;
			height: 48rpx;
		}
		text{
			color: #333;
			font-size: 20rpx;
		}
	}
</style>
