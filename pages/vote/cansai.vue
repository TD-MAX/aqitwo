<template>
	<view>
		<view class="status_bar">
			<!-- 状态栏 -->
		</view>
		<view class="cansai_nav">
			<view class="nav_top">
				<i class="iconfont" style="font-weight: 600;"
				@click="fan">&#xe604;</i>
				<text>活动报名</text>
			</view>
		</view>
		<view class="cansai_content">
			<h3>企业名称</h3>
			<textarea v-model="qiyename" placeholder="" />
			<h3>手机号码</h3>
			<input type="text" v-model="qiyephone" />
			<h3>商标(LOGO)图片</h3>
			<view class="logo">
				<view class="logo_wei" @click="upload" v-show="photo == ''">
					<image src="../../static/paihangban/shangbiao.png" mode="aspectFill"></image>
					<text>请上传商标（LOGO）图片</text>
				</view>
				<view class="logo_ed" v-show="photo != ''">
					<image :src="photo" mode="aspectFit"></image>
				</view>
			</view>
			<h3>企业简介</h3>
			<textarea v-model="qiyejianjie" placeholder="" />
		</view>
		<view class="cansai_button" @click="baoming">
			<text>立即报名</text>
		</view>
	</view>
</template>

<script>
	import moment from 'moment'
	import _ from 'lodash'
	export default {
		data() {
			return {
				tuIsing: true,
				photo: '', //图片路劲
				qiyename: '', //企业名称
				qiyephone: '', //手机号码
				qiyejianjie: '', //企业简介
			}
		},
		methods: {
			//返回
			fan () {
				uni.navigateBack({
					delta: 1,
					animationType: 'pop-out'
				})
			},
			//上传文件
			upload () {
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
								console.log(img_key)
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
									}
								});
							})
						}
				    }
				});
			},
			baoming () {
				if (this.qiyename === '') {
					this.$api.msg('请填写企业名称')
					return
				}
				if (this.qiyephone === '') {
					this.$api.msg('请填写电话')
					return
				}
				if (this.qiyejianjie === '') {
					this.$api.msg('请填写企业简介')
					return
				}
				if (this.photo === '') {
					this.$api.msg('请上传图片')
					return
				}
				this.$http.post('lessonaqi/api/setActivity',{
					enterpriseName:this.qiyename,
					enterprisePhone: this.qiyephone,
					enterpriseLogo: this.photo,
					enterpriseInfo: this.qiyejianjie,
					activityName: "投票"
				},{})
				.then(res => {
					console.log(res)
					if (res.data.code === 0) {
						uni.showToast({
							title: '报名成功'
						})
					} else {
						this.$api.msg(res.data.msg)
					}
				})
				.catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss">
	.cansai_nav {
		width: 100%;
		height: 420upx;
		// border: 1px solid red;
		background-image: url(../../static/paihangban/cansai1.png);
		background-size: 100% 100%;
	}
	.nav_top {
		width: 100%;
		height: 80upx;
		display: flex;
		align-items: center;
		line-height: 80upx;
		font-size: 36upx;
		box-sizing: border-box;
		padding: 0 15upx;
		color: white;
		i {
			margin-right: 20upx;
		}
	}
	.cansai_content {
		width: 94%;
		height: 100%;
		margin: -160upx auto;
		background-color: #fff;
		padding: 20upx 20upx 120upx 20upx;
		box-sizing: border-box;
		border: 1px solid #F1F1F1;
		border-radius: 20upx;
		color: #696969;
		.logo {
			width: 96%;
			height: 210upx;
			margin: 20upx 0;
			border: 1px solid #E7F1FF;
			.logo_wei {
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				font-size: 32upx;
				color: #696969;
				// font-weight: 600;
				image {
					width: 80upx;
					height: 60upx;
				}
			}
			.logo_ed {
				width: 100%;
				height: 100%;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
		h3 {
			color: black;
			margin: 0 0 20upx;
		}
		textarea {
			width: 96%;
			height: 200upx;
			margin: 10upx 0;
			border-radius: 10upx;
			background-color: #E7F1FF;
		}
		input {
			width: 96%;
			height: 80upx;
			margin: 10upx 0;
			border-radius: 10upx;
			background-color: #E7F1FF;
		}
	}
	.cansai_button {
		width: 100%;
		height: 100upx;
		position: fixed;
		bottom: 0;
		font-size: 32upx;
		color: white;
		background-color: #2A7BE9;
		text-align: center;
		line-height: 100upx;
	}
</style>
