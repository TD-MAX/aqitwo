<template>
	<view class="content">
		<view class="pic_list">
			<view v-for="(n, index) in img_url">
				<view><image class="delete_photo" src="../../../static/xiangqin/shanchuimg.png"  @click="to_delete(index)"></image></view>
				<view>
					<image  :src="n" mode="aspectFill" :key="index"></image>
				</view>
			</view>
			<image @click="upload_img" v-if="img_url.length < 6" src="../../../static/photo.png" mode="widthFix"></image>
			<view class="add_photo"></view>
		</view>
		<view class="_next" @click="next">保存</view>
	</view>
</template>

<script>
import moment from 'moment';
import _ from 'lodash';
export default {
	data() {
		return {
			img_url: [],
			num: 0
		};
	},
	onShow() {},
	onLoad(option) {
		console.log(option)
		this.$http
		.post('lessonxiangqin/api/getUserInfo', 
		{
			userId: uni.getStorageSync('userId')
		}, {})
		.then(res => {
			console.log(res)
				let img = res.data.data.photoUrl.replace('[','').replace(' ','').replace(']','')
				this.img_url = img.split(',')
				console.log(this.img_url)
			
			
			
			// let imgs = img.replace(']','')
			// this.img_url = imgs.split(',')
			// console.log(this.img_url[1].replace(/^\s\s*/,'').replace(/\s\s*$/, ''))
		})
		.catch(err => {
			console.log(err)

		})
	},

	methods: {
		to_delete(e){
			this.img_url.splice(e,1)
		},
		next() {
			this.$http
				.post(
					'lessonxiangqin/api/setUserInfo',
					{
						userId: uni.getStorageSync('userId'),
						photoUrl: this.img_url
					},
					{}
				)
				.then(res => {
					console.log('用户没问题');
					console.log(res);
					uni.setStorageSync('img_url', this.img_url)
					uni.showToast({
						title:res.data.msg
					})
					setTimeout(res=>{
						uni.navigateBack({
							delta:1
						})
					},1500)
				})
				.catch(err => {});
		},
		upload_img() {
			let _this = this;
			let count = 6 - _this.img_url.length;
			let tiem = moment().format('YYYY-MM-DD');
			let ss = moment().format('x');
			let userId = uni.getStorageSync('userId');
			let mobile = uni.getStorageSync('phone');
			uni.chooseImage({
				count: 6, //默认9
				sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
				success: function(res) {
					console.log(res);
					if (res.errMsg === 'chooseImage:ok') {
						_.each(res.tempFiles, o => {
							_this.num += 1;
							let arr = [];
							console.log(o);
							// #ifdef H5
							arr = o.name.split('.');
							console.log(arr);
							let img_type = arr[arr.length - 1];
							let img_key = 'xiangqin/' + tiem + '/' + mobile + '/' + userId + '_' + ss + '_' + _this.num + '_pic.' + img_type;
							// #endif
							// #ifdef APP-PLUS
							arr = o.path.split('.');
							console.log(arr);
							let img_type = arr[arr.length - 1];
							let img_key = 'xiangqin/' + tiem + '/' + mobile + '/' + userId + '_' + ss + '_' + _this.num + '_pic.' + img_type;
							// #endif
							console.log(img_key);
							uni.uploadFile({
								url: 'https://qilianxiangqin.oss-cn-beijing.aliyuncs.com',
								fileType: 'image',
								filePath: o.path,
								name: 'file',
								formData: {
									key: img_key, // 文件名
									policy: 'eyJleHBpcmF0aW9uIjoiMjA5OS0wMS0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF1dfQ==',
									OSSAccessKeyId: 'LTAI4G7jyG53Ws3BPw4ueyTN',
									success_action_status: 200,
									signature: 'iHB/Gh4p0bcybvKhVVSIwU7u1zQ='
								},
								success: uploadFileRes => {
									let url_str = 'https://qilianxiangqin.oss-cn-beijing.aliyuncs.com/' + img_key;
									_this.img_url.push(url_str);
									// console.log(url_str)
									console.log(_this.img_url);
								}
							});
						});
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background: #fff;
	height: 100%;
}
.content {
	height: 100%;
	padding-top: 10rpx;
}
._next {
	width: 562rpx;
	height: 110rpx;
	background-color: #25d3d2;
	color: #fff;
	font-size: 42rpx;
	line-height: 110rpx;
	text-align: center;
	border-radius: 110rpx;
	margin-top: 160rpx;
	margin: 50upx auto;
}
.pic_list {
	width: 720rpx;
	margin: 5rpx auto;
	display: flex;
	flex-wrap: wrap;
	image {
		width: 228rpx;
		height: 228rpx;
		margin-right: 10rpx;
		margin-bottom: 10rpx;
	}
	image:nth-child(3n) {
		margin-right: 0;
	}
	// .delete_photo_1{
	// 	float: right;
	// }
	.delete_photo{
		position: absolute;
		
		width: 40upx;
		height: 40upx;
		// border: 1upx solid red;
		z-index: 999;
		margin-left: 200upx;
		margin-top: -10upx;
	}
	add_photo {
	}
}
</style>