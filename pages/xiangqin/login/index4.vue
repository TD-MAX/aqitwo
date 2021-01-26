<template>
	<view class="content">
		<view class="_header">
			<text class="one">
				<i class="iconfont">&#xe603;</i>
			</text>
			<view class="">
			</view>
			<text class="one">
				<i class="iconfont">&#xe603;</i>
			</text>
			<view class="">
			</view>
			<text class="tow">3</text>
		</view>
		<view class="_con">
			<text class="_top">上传你的真实头像</text>
			<text>优先获得同城推荐异性的机会</text>
		</view>
		<view class="user_header"  @click="select_img">
			<image :src="photo ? photo : '../../../static/touxiang.png'" mode="" v-model="photo"></image>
		</view>
		
		<view class="_next" @click="next">
			进入APP
		</view>
	</view>
</template>

<script>
	import _ from 'lodash'
	import MinPopup from '../../components/min-picker/min-popup.vue'
	import MinPicker from '../../components/min-picker/min-picker.vue'
	import moment from 'moment'
	export default {
		data() {
			return {
				photo: ''
			}
		},
		components: {
			MinPopup, MinPicker
		},
		onLoad() {
			
		},
		methods: {
			
			next () {
				if(this.photo == ''){
					uni.showToast({
						title:'请先上传你的真实头像',
						icon:'none'
					})
				}
				else{
					this.$http.post('lessonxiangqin/api/lessonupdateisnew',{
						userid: uni.getStorageSync('userId')
					},{})
					.then(res => {
						console.log(res.data)
						if (res.data === 1) {
							uni.setStorageSync('news_user',res.data)
							uni.redirectTo({
								url:'/pages/xiangqin/index/index'
							})
						}
					})
				}
				
			},
			select_img () {
				let _this = this
				let tiem = moment().format('YYYY-MM-DD')
				let ss = moment().format('x')
				let userId = uni.getStorageSync('userId')
				let mobile = '17635532823'
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
				    success: function (res) {
						console.log(res)
						if (res.errMsg === "chooseImage:ok") {
							_.each(res.tempFiles, o => {
								let arr = []
								// #ifdef H5
								arr = o.name.split('.')
								console.log(arr)
								let img_type = arr[arr.length - 1]
								let img_key = 'xiangqin/' + tiem + '/' + mobile + '/' + userId + '_' + ss + '_' + '_pic.' + img_type
								// #endif
								// #ifdef APP-PLUS
								arr = o.path.split('.')
								console.log(arr)
								let img_type = arr[arr.length - 1]
								let img_key = 'xiangqin/' + tiem + '/' + mobile + '/' + userId + '_' + ss + '_' + '_pic.' + img_type
								// #endif
								uni.uploadFile({
									url: 'https://qilianxiangqin.oss-cn-beijing.aliyuncs.com', 
									fileType: "image",
									filePath: o.path,
									name: 'file',
									formData: {
										name: o.name,
										key: img_key, // 文件名
										policy: 'eyJleHBpcmF0aW9uIjoiMjA5OS0wMS0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF1dfQ==',
										OSSAccessKeyId: 'LTAI4G7jyG53Ws3BPw4ueyTN',
										success_action_status: 200,
										signature: 'iHB/Gh4p0bcybvKhVVSIwU7u1zQ='
									},
									success: (uploadFileRes) => {
										_this.photo = 'https://qilianxiangqin.oss-cn-beijing.aliyuncs.com/' + img_key
										console.log(_this.photo)
										uni.setStorageSync('photo', _this.photo)
										_this.$http
										.post('lessonxiangqin/api/lessonyonhuxinxixiugai', 
										{
											id : uni.getStorageSync('userId'),
											xiangqinphoto: _this.photo ,
											logintype: 50
										}, {})
										.then(res => {
											console.log('头像上传成功')
											// uni.setStorageSync('news_user',1)
											console.log(res)
										})
										.catch(err => {
											
										})
										_this.$http
											.post(
												'lessonxiangqin/api/setUserInfo',
												{
													userId: uni.getStorageSync('userId'),
													headUrl: _this.photo,
													
												},
												{}
											)
											.then(res => {
												console.log('用户没问题');
												console.log(res);
												
											})
											.catch(err => {});
									}
								});
							})
						}
				    }
				});
			},
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
	}
	.content{
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;
		padding: 200rpx 0;
		._header{
			display: flex;
			align-items: center;
			width: 70%;
			view{
				width: 170rpx;
				height: 2rpx;
				background-color: #25D3D2;
			}
			text{
				width: 45rpx;
				height: 45rpx;
				background-color: #E0E0E0;
				color: #000;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 50%;
				font-size: 28rpx;
			}
			.one{
				background-color: #25D3D2;
				color: #fff;
				i{
					font-size: 20rpx;
				}
			}
			.tow{
				font-size: 32rpx;
				width: 54rpx;
				height: 54rpx;
				background-color: #25D3D2;
			}
		}
		._con{
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding-top: 90rpx;
			text{
				font-size: 26rpx;
				color: #000;
			}
			._top{
				font-size: 40rpx;
				font-weight: 600;
			}
		}
		.user_header{
			display: flex;
			flex-direction: column;
			width: 100%;
			align-items: center;
			image{
				width: 360rpx;
			}
		}
		._next{
			width: 562rpx;
			height: 110rpx;
			background-color: #25D3D2;
			color: #fff;
			font-size: 42rpx;
			line-height: 110rpx;
			text-align: center;
			border-radius: 110rpx;
			margin-top: 160rpx;
		}
	}
</style>
