<template>
	<view class="views">
		<view class="content_view">
				<!-- 单位基本信息 -->
				<view class="tab_title">
					单位基本信息
				</view>
				<view class="_logo" @click="load">
					<text>我的logo</text>
					<image :src="logo" mode="aspectFill"></image>
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
					<input type="text" v-model="zhiwu" placeholder="职务(选填)" />
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
					<input type="text" v-model="beizhu" placeholder="备注" />
				</view>
		</view>
		
		<view class="subbutton" v-if="status === 0">
			<button class="" @click="updata_msg">修改认证信息</button>
			<button @click="jiaofei">缴纳认证费</button>
		</view>
		<view class="tip" v-if="status === 1">
			<text>(审核通过将不能修改公司信息，如需续费或有其他需求请前往企业认证或联系后台工作人员)</text>
		</view>
		<!-- <view class="select_status">
			{{status === 0 ? '正在审核':'审核通过'}}
		</view> -->
	</view>
</template>



<!-- <template>
	<view>
		<view class="">
			{{status === 0 ? '正在审核' : '审核通过'}}
		</view>
		<view class="" @click="updata_msg" v-if="status === 0">
			修改
		</view>
		<view class="" @click="jiaofei(id)" v-if="status === 1">
			去缴费
		</view>
	</view>
</template> -->

<script>
	import moment from 'moment'
	import _ from 'lodash'
	export default {
		data() {
			return {
				status: '',
				danweiname: '',
				duijielianxifangshi: '',
				duijielianxiren: '',
				email: '',
				faren: '',
				id: '',
				jinsannianshouru: '',
				lianxifangshi: '',
				logo: '',
				qiyeguanwang: '',
				qiyejianjie: '',
				rongyu: '',
				tonxundizhi: '',
				xiangmu: '',
				xuqiufuwufangxiang: '',
				zhiwu: '',
				beizhu: ''
			}
		},
		methods: {
			//信息查询
			show() {
				this.$http.post('lessonaqi/api/lessonqiyecaijilist', {
						userid: uni.getStorageSync('userId')
					}, {})
					.then(res => {
						console.log(res)
						this.list = res.data[0]
						this.status = this.list.start
						this.danweiname = this.list.danweiname
						this.duijielianxifangshi = this.list.duijielianxifangshi
						this.duijielianxiren = this.list.duijielianxiren
						this.email = this.list.email
						this.faren = this.list.faren
						this.id = this.list.id
						this.jinsannianshouru = this.list.jinsannianshouru
						this.lianxifangshi = this.list.lianxifangshi
						this.logo = this.list.logo
						this.qiyeguanwang = this.list.qiyeguanwang
						this.qiyejianjie = this.list.qiyejianjie
						this.rongyu = this.list.rongyu
						this.tonxundizhi = this.list.tonxundizhi
						this.xiangmu = this.list.xiangmu
						this.xuqiufuwufangxiang = this.list.xuqiufuwufangxiang
						this.zhiwu = this.list.zhiwu
						this.beizhu = this.list.beizhu
						uni.setStorageSync('qiyeId',this.id)
						if (this.status === 0) {
							uni.setNavigationBarTitle({
								title:'正在审核'
							})
						} else {
							uni.setNavigationBarTitle({
								title:'审核通过'
							})
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			//图片上传至oss
			load () {
				let _this = this
				let tiem = moment().format('YYY-MM-DD')
				let ss = moment().format('x')
				let userId = uni.getStorageSync('userId')
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'],
					sourceType:['album'], //从相册选择
					success: function (res) {
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
									url:'https://qilianxiangqin.oss-cn-beijing.aliyuncs.com',
									fileType:'image',
									filePath:o.path,
									name:'file',
									formData: {
										name: o.name,
										key: img_key, //文件名
										policy: 'eyJleHBpcmF0aW9uIjoiMjA5OS0wMS0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF1dfQ==',
										OSSAccessKeyId: 'LTAI4G7jyG53Ws3BPw4ueyTN',
										success_action_status: 200,
										signature: 'iHB/Gh4p0bcybvKhVVSIwU7u1zQ='
									},
									success: (uploadFileRes) => {
										_this.logo = 'https://qilianxiangqin.oss-cn-beijing.aliyuncs.com/' + img_key
									}
								})
							})
						}
					}
				})
			},
			//去缴费
			jiaofei() {
				uni.navigateTo({
					url: './jiaona_certification?data=' + this.id,
					animationType: 'pop-in'
				})
			},
			//修改信息
			updata_msg () {
				this.$http.post('lessonaqi/api/lessonupdateqiyecaiji',{
					userid: uni.getStorageSync('userId'),
					danweiname: this.danweiname,
					duijielianxifangshi: this.duijielianxifangshi,
					duijielianxiren: this.duijielianxiren,
					email: this.email,
					faren: this.faren,
					id: this.id,
					jinsannianshouru: this.jinsannianshouru,
					lianxifangshi: this.lianxifangshi,
					logo: this.logo,
					qiyeguanwang: this.qiyeguanwang,
					qiyejianjie: this.qiyejianjie,
					rongyu: this.rongyu,
					tonxundizhi: this.tonxundizhi,
					xiangmu: this.xiangmu,
					start: 0,
					xuqiufuwufangxiang: this.xuqiufuwufangxiang,
					zhiwu: this.zhiwu,
					beizhu: this.beizhu
				},{})
				.then(res=>{
					console.log(res)
					if (res.data === 1) {
						uni.showToast({
							title:'修改成功'
						})
					}
				})
				.catch(err=>{
					console.log(err)
				})
			}
		},
		onShow() {
			this.show()
		},
		onLoad() {

		}
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height: 100%;
	}
	.views{
		width: 100%;
		height: 100%;
		margin: auto;
		position: relative;
		box-sizing: border-box;
		.content_view{
			width: 100%;
			height: calc(100% - 100upx);
			overflow: scroll;
		}
		.tab_title{
			width: 90%;
			height: 60upx;
			margin: auto;
			font-size: 40upx;
			text-align: center;
			line-height: 60upx;
		}
		.msg_basic{
			width: 90%;
			min-height: 80upx;
			font-size: 32upx;
			margin: 20upx auto;
			border: 1px solid #F5F5F5;
			border-radius: 5upx;
			display: flex;
			justify-content: flex-end;
			input{
				width: 98%;
				height: 80upx;
			}
			view{
				width: 98%;
				height: 100%;
				line-height: 80upx;
			}
			image{
				width: 110upx;
				height: 110upx;
			}
		}
		._logo{
			width: 90%;
			height: 140upx;
			margin: 20upx auto;
			border: 1px solid #F5F5F5;
			line-height: 140upx;
			display: flex;
			justify-content: space-between;
			image{
				width: 120upx;
				height: 120upx;
				margin-top: 10upx;
				border-radius: 50%;
			}
		}
	}
	
	.subbutton{
		width: 100%;
		height: 80upx;
		display: flex;
		justify-content: space-around;
		background-color: white;
		font-size: 32upx;
		button{
			width: 40%;
			height: 70upx;
			margin: 15upx 0;
			text-align: center;
			line-height: 70upx;
			background-color: #3F3E51;
			color: white;
		}
	}
	.select_status{
		position: fixed;
		right: 30upx;
		color: red;
		font-size: 24upx;
		top: 20upx;
	}
	.tip{
		width: 90%;
		margin: auto;
		font-size: 28upx;
		color: red;
	}
</style>
