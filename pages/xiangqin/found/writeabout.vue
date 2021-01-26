<template>
	<view class="content">
		<view class="upload_text">
			<textarea v-model="text_valeue" placeholder-style="color:#C9C9C9" maxlength="140" placeholder="此时此刻,想和大家分享…"/>
			<text>{{text_valeue.length}}/140</text>
		</view>
		<view class="pic_list">
			
			<view v-for="(n, index) in img_url">
				<view><image class="delete_photo" src="../../../static/xiangqin/shanchuimg.png"  @click="to_delete(index)"></image></view>
				<view>
					<image  :src="n" mode="aspectFill" :key="index"></image>
				</view>
			</view>
			<image @click="upload_img" v-if="img_url.length < 6" src="../../../static/photo.png" mode="widthFix"></image>
			<view class="add_photo">
			</view>
		</view>
	</view>
</template>

<script>
	import moment from 'moment'
	import _ from 'lodash'
	export default {
		data() {
			return {
				text_valeue: '',
				img_url: [],
				num:0
			}
		},
		onShow() {
			
		},
		onLoad(option){
		},
		onNavigationBarButtonTap: function(e) {
			if (this.text_valeue) {
				this.$http
				.post('lessonxiangqin/api/lessonadddynamic', {  
					userid: uni.getStorageSync('userId'),
					content: this.text_valeue,
					imagelist: this.img_url
				}, {})
				.then(res => {
					this.$api.msg('发布成功')
					setTimeout(() => {
						uni.navigateBack({
						    delta: 1,
						    animationType: 'pop-out',
						    animationDuration: 500
						});
					},1000)
					// uni.redirectTo({
					// 	url:'index'
					// })
				})
			} else {
				this.$api.msg('请添加文字描述')
			}
		},
		methods: {
			to_delete(e){
				this.img_url.splice(e,1)
			},
			submit_video () {
			},
			upload_img () {
				let _this = this
				let count = 6 - _this.img_url.length
				let tiem = moment().format('YYYY-MM-DD')
				let ss = moment().format('x')
				let userId = uni.getStorageSync('userId')
				let mobile = uni.getStorageSync('phone')
				uni.chooseImage({
				    count: 6, //默认9
				    sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
				    success: function (res) {
						console.log(res)  
						if (res.errMsg === "chooseImage:ok") {
							_.each(res.tempFiles, o => {
								_this.num += 1
								let arr = []
								console.log(o)
								// #ifdef H5
								arr = o.name.split('.')
								console.log(arr)
								let img_type = arr[arr.length - 1]
								let img_key = 'xiangqin/' + tiem + '/' + mobile + '/' + userId + '_' + ss + '_' + _this.num + '_pic.' + img_type
								// #endif
								// #ifdef APP-PLUS
								arr = o.path.split('.')
								console.log(arr)
								let img_type = arr[arr.length - 1]
								let img_key = 'xiangqin/' + tiem + '/' + mobile + '/' + userId + '_' + ss + '_' + _this.num + '_pic.' + img_type
								// #endif
								console.log(img_key)
								uni.uploadFile({
									url: 'https://qilianxiangqin.oss-cn-beijing.aliyuncs.com', 
									fileType: "image",
									filePath: o.path,
									name: 'file',
									formData: {
										key: img_key, // 文件名
										policy: 'eyJleHBpcmF0aW9uIjoiMjA5OS0wMS0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF1dfQ==',
										OSSAccessKeyId: 'LTAI4G7jyG53Ws3BPw4ueyTN',
										success_action_status: 200,
										signature: 'iHB/Gh4p0bcybvKhVVSIwU7u1zQ='
									},
									success: (uploadFileRes) => {
										let url_str = 'https://qilianxiangqin.oss-cn-beijing.aliyuncs.com/' + img_key
										_this.img_url.push(url_str)
										// console.log(url_str)
										console.log(_this.img_url)
									}
								});
							})
						}
				    }
				});
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
		padding-top: 10rpx;
	}
	.upload_text{
		width: 95%;
		margin: 20rpx auto 0;
		height: 340rpx;
		display: flex;
		justify-content: center;
		position: relative;
		textarea{
			width: 95%;
			color: #444;
			height: 100%;
		}
		text{
			font-size: 20rpx;
			position: absolute;
			right: 20rpx;
			bottom: 20rpx;
			color: #C9C9C9;
		}
	}
	.pic_list{
		width: 704rpx;
		margin: 10rpx auto;
		display: flex;
		flex-wrap: wrap;
		image{
			width: 228rpx;
			height: 228rpx;
			margin-right: 10rpx;
			margin-bottom: 10rpx;
		}
		image:nth-child(3n){
			margin-right: 0;
		}
		add_photo{
			
		}
		.delete_photo{
			position: absolute;
			
			width: 40upx;
			height: 40upx;
			// border: 1upx solid red;
			z-index: 999;
			margin-left: 200upx;
			margin-top: -10upx;
		}
	}
	
</style>
