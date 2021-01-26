<template>
	<view class="views">
		<view class="content_view">
			<!-- <view class="select_status" @click="select_stau">
				审核状态
			</view> -->
			<!-- 单位基本信息 -->
			<view class="tab_title">
				单位基本信息
			</view>
			<view class="msg_basic" v-if="tip === ''" @click="load">
				<view class="">
					点击上传(企业logo)
				</view>
			</view>
			<view class="_logo" v-if="tip !== ''" @click="load">
				<text>单位logo</text>
				<image :src="lujin" mode="aspectFill"></image>
			</view>
			<view class="msg_basic">
				<input type="text" v-model="danweiname" placeholder="单位名称(必填)" />
			</view>
			<view class="msg_basic">
				<input type="text" v-model="tonxundizhi" placeholder="通讯地址(必填)" />
			</view>
			<view class="msg_basic">
				<input type="text" v-model="qiyeguanwang" placeholder="企业官网(选填)" />
			</view>

			<view class="tab_title">
				单位联系人
			</view>
			<view class="msg_basic">
				<input type="text" v-model="faren" placeholder="企业法人(必填)" />
			</view>
			<view class="msg_basic">
				<input type="text" v-model="lianxifangshi" placeholder="法人联系方式(必填)" />
			</view>
			<view class="msg_basic">
				<input type="text" v-model="email" placeholder="企业邮箱(选填)" />
			</view>
			<view class="msg_basic">
				<input type="text" v-model="duijielianxiren" placeholder="对接联络员(必填)" />
			</view>
			<view class="msg_basic">
				<input type="text" v-model="zhiwu" placeholder="职务(必填)" />
			</view>
			<view class="msg_basic">
				<input type="text" v-model="duijielianxifangshi" placeholder="对接联络员联系方式(必填)" />
			</view>
			<view class="tab_title">
				项目
			</view>
			<view class="msg_basic">
				<input type="text" v-model="xiangmu" placeholder="已展开项目" />
			</view>
			<view class="msg_basic">
				<input type="text" v-model="jinsannianshouru" placeholder="近三年收入" />
			</view>
			<view class="msg_basic">
				<input type="text" v-model="qiyejianjie" placeholder="企业简介" />
			</view>
			<view class="msg_basic">
				<input type="text" v-model="xuqiufuwufangxiang" placeholder="需求服务方向" />
			</view>
			<view class="msg_basic">
				<input type="text" v-model="rongyu" placeholder="获得重大荣誉" />
			</view>
			<view class="msg_basic">
				<input type="text" v-model="yaoqingma" placeholder="请填写邀请码(若没有可忽略)" />
			</view>
			<view class="msg_basic">
				<input type="text" v-model="beizhu" placeholder="备注" />
			</view>
		</view>

		<view class="subbutton">
			<button class="" @click="submit_msg">提交</button>
		</view>
	</view>
</template>

<script>
	import moment from 'moment'
	import _ from 'lodash'
	export default {
		data() {
			// 输出内容
			return {
				danweiname: '', //单位名称
				tonxundizhi: '', //通讯地址
				qiyeguanwang: '', //企业官网
				email: '', //企业邮箱
				faren: '', //企业法人
				yaoqingma: '', //邀请码
				lianxifangshi: '', //企业法人联系方式
				duijielianxiren: '', //对接联络员
				zhiwu: '', //联络员职务
				duijielianxifangshi: '', //对接联络员联系方式
				xiangmu: '', //已展开项目
				jinsannianshouru: '', //近三年收入
				qiyejianjie: '', //企业简介
				xuqiufuwufangxiang: '', //需求服务方向
				rongyu: '', //企业获得的荣誉
				beizhu: '', //备注
				lujin: '', //企业logo
				tip: '',
				id: ''
			}
		},
		// 方法
		methods: {
			//图片上传至oss
			load() {
				let _this = this
				let tiem = moment().format('YYY-MM-DD')
				let ss = moment().format('x')
				let userId = uni.getStorageSync('userId')
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'],
					sourceType: ['album'], //从相册选择
					success: function(res) {
						console.log(res)
						if (res.errMsg === 'chooseImage:ok') {
							_.each(res.tempFiles, o => {
								let arr = []
								// #ifdef H5
								arr = o.name.split('.')
								console.log(arr)
								let img_type = arr[arr.length - 1]
								let img_key = 'aqi/' + tiem + '/' + userId + '_' + ss + '_' + '_pic.' + img_type
								// #endif
								// #ifdef APP-PLUS
								arr = o.path.split('.')
								console.log(arr)
								let img_type = arr[arr.length - 1]
								let img_key = 'aqi/' + tiem + '/' + userId + '_' + ss + '_' + '_pic.' + img_type
								// #endif
								console.log(img_key)
								uni.uploadFile({
									url: 'https://qilianxiangqin.oss-cn-beijing.aliyuncs.com',
									fileType: 'image',
									filePath: res.tempFilePaths[0],
									name: 'file',
									formData: {
										name: o.name,
										key: img_key, //文件名
										policy: 'eyJleHBpcmF0aW9uIjoiMjA5OS0wMS0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF1dfQ==',
										OSSAccessKeyId: 'LTAI4G7jyG53Ws3BPw4ueyTN',
										success_action_status: 200,
										signature: 'iHB/Gh4p0bcybvKhVVSIwU7u1zQ='

									},
									success: (uploadFileRes) => {
										_this.lujin = 'https://qilianxiangqin.oss-cn-beijing.aliyuncs.com/' + img_key
										console.log(_this.lujin)
										_this.tip = '上传成功'
									}
								})
							})
						}
					}
				})
			},
			//查看状态
			select_stau() {
				uni.navigateTo({
					url: './statu_shenhe',
					animationType: 'pop-in'
				})
			},
			//提交
			submit_msg() {
				let re = /^1[0-9]{10}$/
				if (re.test(this.lianxifangshi && this.duijielianxifangshi)) {
					this.$http.post('lessonaqi/api/lessonqiyecaiji', {
							userid: uni.getStorageSync('userId'),
							danweiname: this.danweiname,
							tonxundizhi: this.tonxundizhi,
							qiyeguanwang: this.qiyeguanwang,
							email: this.email,
							faren: this.faren,
							lianxifangshi: this.lianxifangshi,
							duijielianxiren: this.duijielianxiren,
							zhiwu: this.zhiwu,
							duijielianxifangshi: this.duijielianxifangshi,
							yaoqingma: this.yaoqingma,
							xiangmu: this.xiangmu,
							jinsannianshouru: this.jinsannianshouru,
							qiyejianjie: this.qiyejianjie,
							xuqiufuwufangxiang: this.xuqiufuwufangxiang,
							rongyu: this.rongyu,
							beizhu: this.beizhu,
							logo: this.lujin
						}, {})
						.then(res => {
							console.log(res.data)
							if (res.data == 1) {
								uni.showToast({
									title: '提交成功',
									duration: 1000
								})
								setTimeout(() => {
									uni.navigateTo({
										url: './statu_shenhe',
										animationType: 'pop-in'
									})
								}, 1000)
							} else if (res.data === 300) {
								this.$api.msg('邀请码输入错误')
							} else {
								console.log('kkkk')
							}
						})
						.catch(err => {
							console.log(err)
						})
				} else {
					uni.showToast({
						title: '手机号格式错误，请重新输入！',
						icon: 'none',
						duration: 1000
					})
				}
			},
			//查询是否已提交
			// select_ti () {
			// 	this.$http.post('aqi/api/qiyecaijilist',{
			// 		userid: uni.getStorageSync('userId')
			// 	},{})
			// 	.then(res => {
			// 		console.log(res)
			// 		if (res.data !== []) {
			// 			this.id = res.data[0].id
			// 			uni.setStorageSync('qiyeId',this.id)
			// 		}
			// 	})
			// 	.catch(err => {
			// 		console.log(err)
			// 	})
			// }
		},
		onLoad() {
			let id = uni.getStorageSync('qiyeId')
			if (id) {
				uni.redirectTo({
					url: './statu_shenhe'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
	}

	.views {
		width: 100%;
		height: 100%;
		margin: auto;
		position: relative;
		box-sizing: border-box;

		.content_view {
			width: 100%;
			height: calc(100% - 100upx);
			overflow: scroll;
			position: relative;
		}

		.tab_title {
			width: 90%;
			height: 60upx;
			margin: auto;
			font-size: 40upx;
			text-align: center;
			line-height: 60upx;
		}

		.msg_basic {
			width: 90%;
			min-height: 80upx;
			font-size: 32upx;
			margin: 20upx auto;
			border: 1px solid #F5F5F5;
			border-radius: 5upx;
			display: flex;
			justify-content: flex-end;

			input {
				width: 98%;
				height: 80upx;
			}

			view {
				width: 98%;
				height: 100%;
				line-height: 80upx;
			}

			image {
				width: 110upx;
				height: 110upx;
			}
		}

		._logo {
			width: 90%;
			height: 120upx;
			margin: 20upx auto;
			border: 1px solid #F5F5F5;
			line-height: 120upx;
			display: flex;
			justify-content: space-between;

			image {
				width: 120upx;
				height: 120upx;
				border-radius: 50%;
			}
		}
	}

	.subbutton {
		width: 100%;
		height: 80upx;
		background-color: white;
		font-size: 32upx;

		button {
			width: 60%;
			height: 70upx;
			margin: 15upx auto;
			text-align: center;
			line-height: 70upx;
			background-color: #3F3E51;
			color: white;
		}
	}

	.select_status {
		position: absolute;
		right: 30upx;
		color: red;
		font-size: 24upx;
		top: 20upx;
	}
</style>
