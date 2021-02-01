<template>
	<view class="content">
		<view class="header_tit">
			<view class="header_tit1">推荐</view>
			<view class="header_tit2" @click="guanzhudt">关注</view>
			<image src="../../../static/xiangqin/sousuo.png"></image>
		</view>
		<scroll-view class="_content" :scroll-y="true" @scrolltolower="get_more" v-if="recogmentList">
			<view class="_lists" v-for="(n, index) in recogmentList" :key="index">
				<view class="head_view">
					<image class="header_img" :src="n.xiangqinphoto" mode="aspectFill" @click="moving_details(n.id)"></image>
					<image mode="aspectFill" class="xingbie_nan" :class="{'xingbie_nv' : n.gender === '0'}" :src="n.gender === '1' ? nan : nv"></image>
				</view>
				
				<view class="_right">
					<view class="user_name">
						<view class="user_name1">
							<text>{{n.xiangqinname}}</text>
						</view>
						<view class="user_name2">
							<!-- <view class="guanzhu" @click="guangzhu(n.userid)">{{ n.isfans === 1 ? '已关注' : '+ 关注' }}</view> -->
							<view class="guanzhu1">...</view>
						</view>
						
					</view>
					<text class="time_content">{{n.timeout}}</text>
					<text class="text_content" @click="moving_details(n.id)">{{n.content}}</text>
					<!-- 图片 -->
					<image v-if="n.imageslist.length < 2 && n.imageslist.length !== 0" 
					class="big_images" :src="n.imageslist[0]" 
					mode="aspectFill"></image>
					<view class="img_content" v-if="n.imageslist.length > 1">
						<image class="images"
						v-for="(m, index1) in n.imageslist" :key="index1" 
						:src="m" v-if="m" 
						@click="previewImage(index,index1)"
						mode="aspectFill"></image>
					</view>
					<!-- 评论 -->
					<view class="comment_content">
						<!-- <view class="comment_list" v-for="(i, index2) in 3" :key="index2">
							<text class="comment_name">有理想的咸鱼:</text>
							<text>无聊</text>
						</view> -->
					</view>
					<view class="bottom_tab">
						<view>
							<image src="../../../static/xiangqin/zuji.png">
							<text class="bottom_tab_text">0</text>
						</view>
						<view>
							<image src="../../../static/xiangqin/dianzan.png" @click="like_moving(index)">
							<text class="bottom_tab_text">{{n.dianzan}}</text>
						</view>
						<view>
							<image src="../../../static/xiangqin/pinglun.png" @click="moving_details(n.id)">
							<text class="bottom_tab_text" >{{n.pinglun}}</text>
						</view>
						<view class="content_event">
							<view>
								<image src="../../../static/xiangqin/fenxiang.png" @click="to_share">
								<text>分享</text>
							</view>
							
							<!-- <i class="iconfont" :class="{'like' : n.pras }" @click="like_moving(index)">&#xe603;</i> -->
							<!-- <i class="iconfont" @click="moving_details(n.id)">&#xe638;</i> -->
							<!-- <i class="iconfont">&#xe65f;</i> -->
						</view>
					</view>
				</view>
			</view>
			<!-- <min-popup :show = "show"></min-popup> -->
			<uni-load-more :status="loadingType"></uni-load-more>
		</scroll-view>
		<view class="_add" @click="go_add">
			<i class="iconfont icon-shuxie"></i>
		</view>
		<Tab :tab_active="1"></Tab>
	</view>
</template>

<script>
	import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue'
	import test_img from '../../../static/img4.jpg'
	// import MinPopup from '../../components/min-picker/min-popup.vue'
	import _ from 'lodash'
	import Tab from '../../components/tab.vue'
	import { mapState,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				recogmentList: [],
				count:'',
				test_img: test_img,
				loadingType: 'more',
				show:false,
				pageNum: 1,
				guanzhu:'',
				more_page: 0,
				nv:'../../../static/xiangqin/nv.png',
				nan:'../../../static/xiangqin/nan.png'
			}
		},
		components:{
			uniLoadMore,  // 上拉加载
			// MinPopup,  //弹出层
			Tab  //底部导航栏
		},
		onShow() {
			// uni.showLoading({
			//     title: '加载中'
			// });
			this.pageNum = 1
			this.loadingType = 'more'
			this.recogmentList = []
			this.init()
			this.recept()
			
		},
		onLoad(option){
		},
		computed:{
			...mapState(['zhanshi'])
		},
		methods: {
			...mapMutations(['recept']),
			//分享
			to_share(){
				console.log(uni.getStorageSync('yaoqingma'))
				let yaoqingma = uni.getStorageSync('yaoqingma')
				console.log('https://zhaopin.aqionline.cn/profile/web/share/share.html?shareCode='+yaoqingma)
				if(yaoqingma == undefined || yaoqingma == null){
					uni.showToast({
						title:'请先在啊企推广计划生成邀请码',
						icon:'none'
					})
				}else{
					uni.share({
						provider: "weixin",
						scene: "WXSceneSession",
						type: 0,
						href: 'https://zhaopin.aqionline.cn/profile/web/share/share.html?shareCode='+yaoqingma,
						title:'点击注册，现在注册可享神秘大礼！',
						success(res) {
							console.log("success:" + JSON.stringify(res));
						},
						fail(err) {
							console.log("fail:" + JSON.stringify(err));
						}
					})
				}
				
			},
			//关注用户
			guangzhu (event) {
				console.log(event)
				console
				
				this.$http
				.post('lessonxiangqin/api/lessonguanzhu', 
				{
					userid: uni.getStorageSync('userId'),
					beiuserid: event
				}, {})
				.then(res => {
					console.log(res.data)
					uni.showToast({
						title:res.data,
						icon:'success'
					})
					if(res.data === '关注成功') {
						this.guanzhu = 1
					} else {
						this.guanzhu = 0
					}
					
					
				})
				.catch(err => {
				})
			},
			//查看关注的人的动态
			guanzhudt(){
				console.log('还没写查看关注的人的动态')
			},
			//预览图片单张
			open(e){
				let _this = this;
				let imgsArray = [];
				imgsArray[0] = e
				uni.previewImage({
					current:0,
					urls:imgsArray,
					success() {
						// console.log('哈哈哈')
					},
					fail(err) {
						console.log(err)
					}
				})
			},
			//预览多张图片
			previewImage(index,e) {
				console.log(index,e)
				let _this = this
				let imgsArray = []
				for (let i = 0; i < _this.recogmentList[index].imageslist.length; i++) {
				 if (_this.recogmentList[index].imageslist[i] != null) {
				  imgsArray.push(_this.recogmentList[index].imageslist[i]);
				 }
				}
				
				
				uni.previewImage({
					current:e,
					urls:imgsArray
				})
			},
			//发现页面获取所有动态
			init () {
				uni.showLoading({
				    title: '加载中'
				});
				console.log(this.pageNum)
				console.log(uni.getStorageSync('userId'))
				this.$http
				.post('lessonxiangqin/api/lessonfaxiandt', 
				{
					userid: uni.getStorageSync('userId'),
					pageNum: this.pageNum,
					pageSize: 5
				}, {})
				.then(res => {
					console.log(res.data)
					_.each(res.data.rows, o => {
						this.recogmentList.push(o)
					})
					uni.hideLoading()
					this.more_page = Math.ceil(res.data.total/5)
					if (this.pageNum === this.more_page) {
						this.loadingType = 'nomore'
						return
					}
					this.pageNum++
				})
				.catch(err => {
					
				})
			},
			get_more () {
				if (this.loadingType === 'more') {
					uni.showLoading({
					    title: '加载中'
					});
					this.init()
				}
			},
			go_add () {
				uni.navigateTo({
					url: '/pages/xiangqin/found/writeabout'
				})
			},
			like_moving (n) {
				console.log(n)
				this.$http
				.post('lessonxiangqin/api/lessonpraise', 
				{
					praiseuserid: uni.getStorageSync('userId'),
					dynamicid: this.recogmentList[n].id
				}, {})
				.then(res => {
					console.log(res)
					this.recogmentList[n].pras = !this.recogmentList[n].pras
					if (this.recogmentList[n].pras) {
						this.recogmentList[n].dianzan++
					} else {
						this.recogmentList[n].dianzan--
					}
				})
				.catch(err => {
				})
			},
			moving_details (n) {
				uni.navigateTo({
					url: `/pages/xiangqin/index/userinfo?id=${n}`
				})
			}
		}  
	}
</script>

<style lang="scss">
page{
		background: #fff;
		height: 100%;
	}
	.header_tit{
		display: flex;
		height: 100rpx;
		width: 100%;
		font-size: 40rpx;
		line-height: 100rpx;
		box-sizing: border-box;
		margin-top: 50rpx;
		// padding: 0 24rpx;
		.header_tit1{
			color: #4EE0E0;
			margin-left: 40%;
			border-bottom: 1px solid #4EE0E0;
		}
		.header_tit2{
			margin-left: 4%;
		}
		image{
			height: 40rpx;
			width: 40rpx;
			margin-top: 30rpx;
			margin-left: 25%;
		}
	}
	.content{
		height: 100%;
	}
	._header{
		height: 90rpx;
		width: 100%;
		display: flex;
		justify-content: center;
		border-bottom: 1px solid #E4E4E3;
		.nav{
			width: 168rpx;
			height: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #444;
			font-size: 32rpx;
			font-weight: 600;
			position: relative;
			._right{
				color: #A0A0A0;
				z-index: 999;
			}
			._border{
				width: 54rpx;
				height: 6rpx;
				background: #FA436A;
				position: absolute;
				left: 5rpx;
				bottom: 10rpx;
				border-radius: 6rpx;
			}
		}
		.right_img{
			width: 52rpx;
			height: 52rpx !important;
			position: fixed;
			right: 24rpx;
			top: 18rpx;
			z-index: 999;
		}
		.left_img{
			width: 52rpx;
			height: 52rpx !important;
			position: fixed;
			left: 24rpx;
			top: 18rpx;
			z-index: 999;
		}
	}
	._content{
		height: calc(100% - 100rpx);
		// height: 100%;
		display: flex;
		// box-sizing: border-box;
		// border: 1px solid red;
		flex-direction: column;
		._lists{
			width: 100%;
			border-top: 24rpx solid #F7F7F7;
			padding: 0rpx 24rpx;
			box-sizing: border-box;
			display: flex;
			.head_view{
				width: 88upx;
				display: flex;
			}
			.header_img{
				width: 88rpx;
				height: 88rpx;
				border-radius: 50%;
			}
			.xingbie_nan{
				width: 30rpx;
				height: 30rpx;
				margin-left: -90upx;
				margin-top: -10upx;
			}
			.xingbie_nv{
				width: 30rpx;
				height: 36rpx;
				margin-left: -30upx;
				margin-top: -10upx;
			}
			._right{
				flex: 1;
				box-sizing: border-box;
				padding-left: 16rpx;
				display: flex;
				flex-direction: column;
				.user_name{
					width: 100%;
					display: flex;
					justify-content: space-between;
					height: 50rpx;
					font-size: 36rpx;
					font-weight: 600;
					.user_name1{
						width: 75%;
						height: 50rpx;
					}
					.user_name2{
						width: 25%;
						display: flex;
						height: 50rpx;
						.guanzhu{
							width: 88rpx;
							height: 36rpx;
							box-sizing: border-box;
							// line-height: 50rpx;
							// border: 1px solid #FFB9C8;
							background-color: #4EE0E0;
							border-radius: 50rpx;
							font-size: 22rpx;
							color: white;
							text-align: center;
							margin-top: 20rpx;
							
						}
						.guanzhu1{
							margin-left: 65%;
							color: #AAAAAA;
						}
					}
					
				}
				.text_content{
					font-size: 30rpx;
					margin-top: 30rpx;
					margin-left: -100rpx;
				}
				.big_images{
					margin:  20rpx 0;
					width: 268rpx;
					height: 358rpx;
				}
				
				.img_content{
					display: flex;
					flex-wrap: wrap;
					width: 510rpx;
					margin-top: 10rpx;
					margin-left: -100rpx;
					.images{
						width: 160rpx;
						height: 160rpx !important;
						margin-right: 10rpx;
						margin-bottom: 10rpx;
					}
				}
				.time_content{
					height: 33rpx;
					text-align: left;
					color: #B4B4B4;
					font-size: 24rpx;
				}
				.comment_content{
					display: flex;
					flex-direction: column;
					width: 100%;
					padding-bottom: 20rpx;
					.comment_list{
						font-size: 24rpx;
						margin-top: 10rpx;
						color: #444444;
						.comment_name{
							font-weight: 600;
						}
					}
				}
				.bottom_tab{
					display: flex;
					height: 100rpx;
					align-items: center;
					margin-left: -100rpx;
					.bottom_tab_text{
						color: #B4B4B4;
						font-size: 26rpx;
						padding-right: 80rpx;
					}
					image{
						width: 30rpx;
						height: 30rpx;
						margin-right: 4rpx;
					}
					.content_event{
						flex: 1;
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding-left: 180rpx;
						text{
							color: #B4B4B4;
							font-size: 26rpx;
							
						}
						i{
							font-size: 40rpx;
							color: #333;
						}
						.like{
							color: red;
						}
					}
				}
			}
		}
	}
	._add{
		width: 100rpx;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #0079f3;
		border-radius: 50%;
		position: fixed;
		bottom: 130rpx;
		right: 30rpx;
		i{
			color: #fff;
			font-size: 60rpx;
		}
	}
</style>
