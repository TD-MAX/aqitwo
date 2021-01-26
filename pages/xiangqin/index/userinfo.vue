<template>
	<view class="content">
		<scroll-view class="_content" :scroll-y="true">
			<view class="_lists">
				<view class="head_view">
					<image class="header_img"
					:src="test_img" mode="aspectFill"
					@click="to_user(moving_details.userid)"
					></image>
					<image mode="aspectFill" class="xingbie_nan" :class="{'xingbie_nv' : moving_details.gender === '0'}" :src="moving_details.gender === '1' ? nan : nv"></image>
				</view>
				
				<view class="_right">
					<view class="user_name">
						<text>{{moving_details.xiangqinname}}</text>
						
						<view class="guanzhu" @click="guangzhu(moving_details.userid)">{{ guanzhu === 1 ? '已关注' : '+ 关注' }}</view>
					</view>
					<text class="time_content">{{moving_details.timeout}}</text>
					<text class="text_content">{{moving_details.content}}</text>
					<!-- 图片 -->
					<image v-if="(moving_details.imageslist).length < 2 && (moving_details.imageslist).length !== 0" class="big_images" :src="moving_details.imageslist[0]" mode="aspectFill"></image>
					<view class="img_content" v-if="(moving_details.imageslist).length > 1">
						<image class="images" 
						v-for="(m, index1) in moving_details.imageslist" v-if="m" :key="index1" 
						:src="m" mode="aspectFill" @click="previewImage(index1)"></image>
					</view>
					<view class="bottom_tab">
						<view class="content_event">
							<image src="../../../static/xiangqin/dianzan.png">
							<view class="content_event_view">{{dianzan}}人点赞</view>
							<!-- <i class="iconfont"
							:class="{'iconfont like' : moving_details.pras === 1}"
							>&#xe755;</i>
							<i class="iconfont">&#xe65f;</i> -->
						</view>
					</view>
					<view class="bottom_pinglun">
						<view class="xuxian">——————</view>
						<view>全部评论</view>
						<view class="xuxian">——————</view>
					</view>
				</view>
			</view>
			<view class="_lists other_lists" v-for="(n, index) in comment_list" :key="index">
				<view class="head_view">
					<image class="header_img" :src="n.xiangqinphoto" mode="aspectFill"></image>
					<image mode="aspectFill" class="xingbie_nan" :class="{'xingbie_nv' : n.gender === '0'}" :src="n.gender === '1' ? nan : nv"></image>
				</view>
				<view class="_right">
					<view class="user_name">
						<text>{{n.xiangqinname}}</text>
						<!-- <i @click="like(index)" class="iconfont">{{n.isdianzan ? '&#xe685;' : '&#xe60a;'}}</i> -->
					</view>
					<text class="text_content">{{n.content}}</text>
				</view>
			</view>
		</scroll-view>
		<view class="_input">
			<input class="uni-input" confirm-type="send" v-model="comment" placeholder="请发布你的观点哦~"/>
			<view class="_input_view" @click="go_comment">发布</view>
		</view>
	</view>
</template>

<script>
	import test_img from '../../../static/img4.jpg'
	export default {
		data() {
			return {
				sayPicList: [test_img],
				guanzhu:0,
				test_img: test_img,
				is_like: 0,
				moving_id: '',
				moving_details: '',
				pageNum: 1,
				comment_list: [],
				comment:'',
				dianzan:'',
				nv:'../../../static/xiangqin/nv.png',
				nan:'../../../static/xiangqin/nan.png'
			}
		},
		onShow() {
			this.init()
		},
		onLoad(option){
			this.moving_id = option.id
			console.log(this.moving_id)
			this.init()
			setTimeout(()=>{
				this.getcomments()
			},500)
			
		},
		methods: {
			//预览单张图片
			open(e){
				let _this = this;
				let imgsArray = [];
				imgsArray[0] = e
				uni.previewImage({
					current:0,
					urls:imgsArray,
					success() {
						console.log('哈哈哈')
					},
					fail(err) {
						console.log(err)
					}
				})
			},
			//预览多张图片
			previewImage(e) {
				console.log(e)
			    let _this = this;
			    let imgsArray = [];
			    for (let i = 0; i < _this.moving_details.imageslist.length; i++) {
			     if (_this.moving_details.imageslist[i] != null) {
			      imgsArray.push(_this.moving_details.imageslist[i]);
			     }
			    }
			
			    // #ifdef MP
			    uni.previewImage({
			     current: e,
			     urls: imgsArray,
			     indicator: 'number',
			     loop: true
			    });
			    // #endif
			
			    // #ifndef MP
			    uni.previewImage({
			     current: e,
			     urls: imgsArray,
			     indicator: 'number',
			     loop: true
			    });
			    // #endif
			   },
			//点击头像去往个人主页
			to_user(evt){
				uni.navigateTo({
					url:'/pages/xiangqin/user/userinfo?data=' + evt
				})
			},
			//新增评论接口
			go_comment () {
				if(this.comment == ''){
					console.log('评论为空')
				}else{
					this.$http
					.post('lessonxiangqin/api/lessonaddcomments', 
					{
						userid: uni.getStorageSync('userId'),
						id: this.moving_id,
						content: this.comment
					}, {})
					.then(res => {
						console.log(res.data)
						this.getcomments()
						this.comment = ''
					})
					.catch(err => {
					})
				}
				
			},
			//动态详情接口
			init () {
				uni.showLoading({
				    title: '加载中'
				});
				this.$http
				.post('lessonxiangqin/api/lessongetdynamic', 
				{
					userid: uni.getStorageSync('userId'),
					id: this.moving_id
				}, {})
				.then(res => {
					console.log(res.data)
					this.moving_details = res.data
					this.test_img = res.data.xiangqinphoto
					this.guanzhu = res.data.isfans
					this.dianzan = res.data.dianzan
					uni.setNavigationBarTitle({
					    title: this.moving_details.name
					});
					uni.hideLoading()
				})
				.catch(err => {
				})
			},
			//新增动态评论
			getcomments () {
				let _this = this
				_this.$http
				.post('lessonxiangqin/api/lessongetcomments', 
				{
					userid: uni.getStorageSync('userId'),
					id: this.moving_id,
					pageNum: this.pageNum,
					pageSize: 5
				}, {})
				.then(res => {
					_this.comment_list = res.data.rows
					console.log(res.data)
				})
				.catch(err => {
				})
			},
			//收藏
			like (n) {
				this.$http
				.post('lessonxiangqin/api/lessoncommentspraise', 
				{
					userid: uni.getStorageSync('userId'),
					id: this.comment_list[n].id
				}, {})
				.then(res => {
					console.log(res.data)
					this.comment_list[n].isdianzan = !this.comment_list[n].isdianzan
				})
				.catch(err => {
				})
			},
			//关注
			guangzhu (event) {
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
			}
		}
	}
</script>

<style lang="scss">
page{
		background: #fff;
		height: 100%;
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
		display: flex;
		flex-direction: column;
		height: calc(100% - 80rpx);
		._lists{
			width: 100%;
			padding: 20rpx 24rpx;
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
					.guanzhu{
						width: 88rpx;
						height: 36rpx;
						box-sizing: border-box;
						background-color: #4EE0E0;
						border-radius: 50rpx;
						font-size: 22rpx;
						color: white;
						text-align: center;
						margin-top: 20rpx;
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
					width: 100%;
					height: 80rpx;
					// border: 1px solid red;
					align-items: center;
					margin-top: 20rpx;
					text{
						color: #B4B4B4;
						font-size: 22rpx;
						padding-right: 20rpx;
					}
					.content_event{
						display: flex;
						width: 250rpx;
						height: 50rpx;
						align-items: center;
						background-color: #4FE0E0;
						color: white;
						border-radius: 30rpx;
						font-size: 27rpx;
						// justify-content: space-between;
						// border: 1px solid green;
						margin-left: 20%;
						image{
							width: 30rpx;
							height: 30rpx;
							margin-left: 30rpx;
						}
						.content_event_view{
							margin-left: 40rpx;
						}
						
						
					}
					
				}
				.bottom_pinglun{
					width: 100%;
					height: 50rpx;
					display: flex;
					margin-left: 24rpx;
					font-size: 26rpx;
					margin-top: 20rpx;
					.xuxian{
						color: #E9E9E9;
					}
				}
			}
		}
	}
	.other_lists{
		border-top: 1px solid #E4E4E3;
		.user_name{
			display: flex;
			align-items: center;
			i{
				font-size: 32rpx;
			}
		}
	}
	._input{
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #fff;
		width: 100%;
		height: 80rpx;
		position: fixed;
		bottom: 0;
		input{
			width: 80%;
			height: 60rpx;
			border-radius: 60rpx;
			border: 1px solid #E9E9E9;
			text-indent: 20rpx;
		}
		._input_view{
			width: 10%;
			height: 40rpx;
			margin-top: -20rpx;
		}
	}
</style>
