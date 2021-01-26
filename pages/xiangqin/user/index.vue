<template>
	<view class="i_body">
		<view class="i_nav">
			<image :src="src[0]" mode="aspectFill"></image>
		</view>
		<view class="i_dinner">
			<image :src="user_info.xiangqinphoto" mode="aspectFill"
			@click="open_imgs(user_info.xiangqinphoto)"></image>
			<text class="nicheng">{{user_info.xiangqinname}}</text>
			<!-- <view class="dx">
				<view class="dengji">
					LV5
				</view>
				<i class="iconfont">&#xe606;</i>
			</view> -->
			<view class="dute">
				{{user_info.sign}}
			</view>
		</view>
		<view class="i_gz">
			<view class="ge">
				<p>0</p>
				<text>我的人气</text>
			</view>
			<view class="ge" @click="go_fans(1)">
				<p>{{user_info.guanzhu}}</p>
				<text>我关注的人</text>
			</view>
			<view class="ge" @click="go_fans(0)">
				<p>{{user_info.fensi}}</p>
				<text>关注我的人</text>
			</view>
		</view>
		<view class="i_gzs">
			<view class="ges" v-for="(a,index1) in msg" :key="index1" :class="{'current' : index1 === tabIndex}" @click="dian(index1)">
				<!-- <p>{{item.num}}</p> -->
				<text>{{a.text}}</text>
			</view>
		</view>
		<view class="ziliao_body" v-show="tabIndex === 0">
			<view class="biaoqian">
				<view class="" v-for="(c,index2) in biaoqian" 
				:key="index2">
					{{c.text}}
				</view>
			</view>
		</view>
		<view class="_status" v-show="tabIndex === 1">
			<view class="status_body" v-for="(x,index2) in recogmentList"
			:key="index2">
				<view class="status_head">
					<image :src="user_info.xiangqinphoto" 
					mode="aspectFill"
					@click="_details(x.id)"></image>
					<text>{{user_info.xiangqinname}}</text>
					<!-- <view class="dengji">
						LV5
					</view>
					<i class="iconfont">&#xe606;</i> -->
					<p>{{x.timeout}}</p>
				</view>
				<view class="status_content">
					<text>{{x.content}}</text>
					<view class="" v-if="x.imageslist.length > 1">
						<image 
						v-for="(m,index3) in x.imageslist" :key="index3"
						:src="m" mode="aspectFill" v-if="m"
						@click="previewImage(index2,index3)"></image>
					</view>
				</view>
				<view class="bottom_tab">
					<view class="content_event">
						<i class="iconfont">&#xe603;{{x.dianzan}}</i>
						<i class="iconfont">&#xe638;{{x.pinglun}}</i>
						<i class="iconfont" @click="delete_msg(index2)">&#xe613;</i>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popupDialog" type="dialog" @change="change">
			<uni-popup-dialog title="" content="删除此条动态?" :before-close="true" @confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
		</uni-popup>
		<tab :tab_active="3"></tab>
	</view>
</template>

<script>
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue' //弹出框
	import tab from '../../components/tab.vue'
	import _ from 'lodash'
	export default {
		components: {
			tab,
			uniPopupDialog
		},
		data() {
			return {
				msg: [{
						text: '个人资料'
					},
					{
						text: '动态'
					}
				],
				biaoqian: [
					{
						text: '北京户口'
					},
					{
						text: '研究生'
					},
					{
						text: '外企经理'
					},
					{
						text: '一房二车'
					}
				],
				src: '',
				tabIndex: 0,
				user_info: [],
				pageNum: 1,
				recogmentList:[],
				loadingType: 'more'
			}
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: './edituserinfo'
			})
		},
		methods: {
			dian(e) {
				this.tabIndex = e
			},
			changes(msg) {
				console.log(msg)
				this.tabIndex = msg.detail.current
			},
			//进入动态详情
			_details(evt) {
				uni.navigateTo({
					url: '/pages/xiangqin/index/userinfo?id=' + evt
				})
			},
			//预览图片
			open_imgs(e){
				let _this = this
				let imgList = []
				imgList[0] = e
				uni.previewImage({
					current:0,
					urls:imgList
				})
			},
			//预览多张图片
			previewImage(index, e) {
				console.log(index)
				console.log(e)
				let _this = this;
				let imgsArray = [];
				for (let i = 0; i < _this.recogmentList[index].imageslist.length; i++) {
					if (_this.recogmentList[index].imageslist[i] != null) {
						imgsArray.push(_this.recogmentList[index].imageslist[i]);
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
			//我的关注，粉丝
			go_fans (n) {
				switch (n) {
					case 0 :
						uni.navigateTo({
							url: '/pages/xiangqin/user/fans'
						})
						break;
					case 1:
						uni.navigateTo({
							url: '/pages/xiangqin/user/like'
						})
				}
			},
			change (event) {},
			dialogConfirm(done) { //确认事件
				this.$http.post('lessonxiangqin/api/lessondontaishanchu', {
					id: this.recogmentList[this.deleteIndex].id
				}, {})
				.then(res=>{
					this.recogmentList.splice(this.deleteIndex,1)
					done()
				})
				.catch(err=>{
					console.log(err)
				})
			},
			dialogClose (done) {
				console.log('点击取消')
				done()
			},
			//获取用户信息
			show () {
				this.$http.post('lessonxiangqin/api/lessongetuser',{
					userid: uni.getStorageSync('userId')
				},{})
				.then(res => {
					console.log(res)
					if (res.data != null) {
						this.user_info = res.data
					}
				})
				.catch(err => {
					console.log(err)
				})
			},
			//获取照片墙
			photos () {
				this.$http.post('lessonxiangqin/api/getUserInfo',{
					userId: uni.getStorageSync('userId')
				},{})
				.then(res => {
					console.log(res)
					if (res.data.code === 0) {
						let img = res.data.data.photoUrl.replace('[','').replace(' ','').replace(']','')
						this.src = img.split(",")
						console.log(this.src)
					}
				})
				.catch(err => {
					console.log(err)
				})
			},
			//获取动态接口
			init () {
				this.$http.post('lessonxiangqin/api/lessonselectdt',{
					userid: uni.getStorageSync('userId'),
					pageNum: this.pageNum,
					pageSize: 5
				},{})
				.then(res => {
					if (res.data.code === 0) {
						_.each(res.data.rows, o => {
							this.recogmentList.push(o)
						})
						let more_page = Math.ceil(res.data.total / 5)
						if (this.pageNum === more_page) {
							this.loadingType = 'nomore'
						}
						this.pageNum += 1
						console.log(this.recogmentList)
					}
				})
			},
			//删除动态
			delete_msg(n) {
				this.deleteIndex = n
				this.$refs.popupDialog.open()
			}
		},
		onShow() {
			this.show()
			this.photos()
			// this.init()
		},
		onLoad() {
			this.init()
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		background-color: #F7F7F7;
	}

	.i_body {
		width: 100%;
		height: 100%;
		padding-bottom: 100upx;
	}

	.i_nav {
		width: 100%;
		height: 260rpx;
		box-sizing: border-box;
		background-color: #fff;
		// border: 1px solid red;
		image {
			width: 100%;
			height: 100%;
		}
	}

	.i_dinner {
		width: 100%;
		min-height: 280upx;
		position: relative;
		margin: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		background-color: #fff;
		padding-top: 70upx;
		box-sizing: border-box;

		image {
			width: 140upx;
			height: 140upx;
			position: absolute;
			top: -70upx;
			border-radius: 50%;
		}

		.nicheng {
			font-size: 36upx;
			font-weight: 600;
		}

		.dx {
			width: 150upx;
			height: 40upx;
			display: flex;
			justify-content: space-between;
			line-height: 40upx;

			i {
				font-size: 36upx;
				color: #49DFDF;
			}
		}

		.dute {
			width: 80%;
			font-size: 28upx;
			text-align: center;
		}
	}

	.dengji {
		width: 100upx;
		height: 40upx;
		border-radius: 10upx;
		text-align: center;
		line-height: 40upx;
		background-color: #FFD200;
		font-size: 28upx;
		color: white;
	}

	.i_gz {
		width: 100%;
		height: 120upx;
		background-color: #fff;
		display: flex;

		.ge {
			flex: 1;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 32upx;
			font-weight: 600;

			text {
				font-size: 30upx;
				color: #696969;
				font-weight: 500;
			}
		}
	}

	.i_gzs {
		width: 100%;
		margin: 10upx 0 auto;
		background-color: #fff;
		display: flex;

		.ges {
			flex: 1;
			height: 80upx;
			display: flex;
			position: relative;
			align-items: center;
			justify-content: center;
			font-size: 32upx;

			&.current {
				color: #49DFDF;
				transition: .5s;

				&:after {
					content: '';
					transition: .5s;
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 66rpx;
					height: 0;
					border-bottom: 4rpx solid #49DFDF;
				}
			}
		}
	}
	._status {
		width: 100%;
		background-color: #fff;
		.status_body {
			width: 100%;
			box-sizing: border-box;
			border-bottom: 2px solid #E9E9E9;
			.status_head {
				width: 100%;
				height: 100upx;
				position: relative;
				padding: 10upx;
				// border: 1px solid red;
				box-sizing: border-box;
				display: flex;
	
				// align-items: center;
				image {
					width: 80upx;
					height: 80upx;
					margin-right: 10upx;
					border-radius: 50%;
				}
	
				text {
					margin-right: 10upx;
				}
	
				i {
					margin-left: 10upx;
					font-size: 36upx;
					color: #49DFDF;
				}
	
				p {
					position: absolute;
					left: 96upx;
					bottom: 10upx;
					font-size: 28upx;
					color: #696969;
				}
			}
	
			.status_content {
				width: 100%;
				padding: 0 15upx;
				box-sizing: border-box;
				image {
					width: 30%;
					height: 210upx;
					margin: 5upx;
				}
			}
			.bottom_tab {
				width: 100%;
				height: 100rpx;
				box-sizing: border-box;
				padding: 0 15upx;
				display: flex;
				align-items: center;
				// border-top: 1px solid #E4E4E3;
				text {
					color: #B4B4B4;
					font-size: 22rpx;
					padding-right: 20rpx;
				}
				.content_event {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding-right: 50rpx;
					text-align: right;
					i {
						font-size: 35rpx;
						color: #999;
					}
				}
			}
		}
	}
	.ziliao_body {
		width: 100%;
		.biaoqian {
			width: 86%;
			height: 150upx;
			margin: auto;
			display: flex;
			view {
				height: 60upx;
				border-radius: 50upx;
				background-color: #0086B3;
				color: white;
				text-align: center;
				line-height: 60upx;
				font-size: 28upx;
			}
		}
	}
</style>
