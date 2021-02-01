<template>
	<view class="container">
		<view class="list-cell b-b m-t" hover-class="cell-hover" :hover-stay-time="50" @click="select_img">
			<text class="cell-tit">头像</text>
			<image class="header_img" :src="user_info.xiangqinphoto" mode="aspectFill"></image>
			<!-- <text class="cell-more yticon icon-you"></text> -->
		</view>
		<view class="list-cell b-b m-t" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">昵称</text>
			<input class="uni-input" v-model="user_info.xiangqinname" placeholder="请输入昵称" maxlength="8" />
			<!-- <text class="cell-more yticon icon-you"></text> -->
		</view>
		<view class="list-cell b-b m-t" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">个性签名</text>
			<input class="uni-input" v-model="user_info.sign" placeholder="请输入签名" maxlength="15" />
		</view>
		<!-- <view class="list-cell b-b m-t" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">性别</text>
			<view class="uni-padding-wrap">
				<view>
					<radio-group @change="radioChange">
					   <label class="radio"><radio value="1" :checked="user_info.gender === 1"/>男</label>
					   <label class="radio"><radio value="0" :checked="user_info.gender === 0"/>女</label>
					</radio-group>
				</view>
			</view>
		</view> -->
		<!-- <view class="list-cell b-b m-t" hover-class="cell-hover" :hover-stay-time="50" @click="select_time">
			<text class="cell-tit">生日</text>
			<text class="cell-content">{{user_info.birthday ? user_info.birthday : '点击设置生日'}}</text>
		</view> -->
		<view class="list-cell b-b m-t" hover-class="cell-hover" :hover-stay-time="50" @click="zhaopian">
			<text class="cell-tit">设置照片墙</text>
		</view>
		<view class="list-cell b-b m-t" hover-class="cell-hover" :hover-stay-time="50" @click="shiming">
			<text class="cell-tit">实名认证</text>
		</view>
		<view class="list-cell b-b m-t" hover-class="cell-hover" :hover-stay-time="50" @click="changyongyu">
			<text class="cell-tit">设置常用语</text>
		</view>
		<view class="list-cell b-b m-t" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit" @click="ziliao">资料保证金</text>
			<text style="color: red;">{{auditStatus}}</text>
		</view>
		<view class="shibaiyy" v-if="shibai">
			<text>驳回原因：</text><br>
			<text>{{rejectText}}</text>
		
		</view>
		<view class="list-cell b-b m-t" hover-class="cell-hover" :hover-stay-time="50" @click="go_out">
			<text style="color: red;">退出登录</text>
		</view>
		<min-popup heightSize="500" :show="show" @close='close'>
		    <min-picker 
		    :endTime="endTime"
		    :startTime="startTimes"
		    @cancel="cancel"
		    @sure="sure"
		    >
		    </min-picker>
		</min-popup>
	</view>
</template>

<script>
	import MinPopup from '../../components/min-picker/min-popup.vue'
	import MinPicker from '../../components/min-picker/min-picker.vue'
	import moment from 'moment'
	import _ from 'lodash'
	export default {
		data() {
			return {
				user_info: '',
				startTimes:[1970,1,1],
				endTime:  Number(moment().format('YYYY')) - 18,
				show: false,
				auditStatus:'',
				shibai:false,
				rejectText:''//失败原因
			}
		},
		
		components: {
			MinPopup, MinPicker
		},
		onLoad() {
			this.$http
			.post('lessonxiangqin/api/lessongetuser', 
			{
				userid: uni.getStorageSync('userId')
			}, {})
			.then(res => {
				this.user_info = res.data
			})
			.catch(err => {
			})
			this.$http
			.post('lessonxiangqin/api/getUserInfo', 
			{
				userId: uni.getStorageSync('userId')
			}, {})
			.then(res => {
				console.log(res)
				if(res.data.data.auditStatus == 2){
					this.rejectText = res.data.data.rejectText
					this.auditStatus = '审核失败'
					this.shibai = true
				}
			})
			.catch(err => {
			})
			
		},
		onNavigationBarButtonTap: function(e) {
			this.$http
			.post('lessonxiangqin/api/lessonyonhuxinxixiugai', {
				id: uni.getStorageSync('userId'),
				xiangqinname: this.user_info.xiangqinname,
				sign: this.user_info.sign,
				xiangqinphoto: this.user_info.xiangqinphoto,
			}, {})
			.then(res => {
				this.$api.msg('发布成功')
				console.log('aaa')
				uni.navigateBack({
				    delta: 1,
				    animationType: 'pop-out',
				    animationDuration: 500
				});
			})
			this.$http
			.post('lessonxiangqin/api/setUserInfo', {
				userId: uni.getStorageSync('userId'),
				nickname: this.user_info.xiangqinname,
				sign: this.user_info.sign,
				headUrl: this.user_info.xiangqinphoto,
			}, {})
			.then(res => {
				// this.$api.msg('发布成功')
				console.log(res)
				
			})
		},
		methods: {
			//常用语
			changyongyu(){
				uni.navigateTo({
					url:'./commonmsg'
				})
			},
			//实名认证
			shiming(){
				uni.navigateTo({
					url:'./realname'
				})
			},
			//设置照片墙
			zhaopian(){
				uni.navigateTo({
					url:'./photowall'
				})
			},
			//资料保证金
			ziliao(){
				uni.navigateTo({
					url:'./basics'
				})
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
										_this.user_info.xiangqinphoto = 'https://qilianxiangqin.oss-cn-beijing.aliyuncs.com/' + img_key
									}
								});
							})
						}
				    }
				});
			},
			radioChange (e) {
				this.user_info.gender = Number(e.target.value)
			},
			select_time () {
				this.show = true
			},
			// 取消事件
			cancel(){
				this.close()
			},
			// 确认事件
			sure(e){
				this.user_info.birthday = e
			},
			// 关闭picker
			close(){
				this.show = false
			},
			//关闭webSocket服务器连接
			closeSocket(){
				uni.closeSocket({
					code:1000,
					success(res) {
						console.log(res)
					},
					fail(err) {
						console.log(err)
					}
				})
				uni.onSocketClose(function(res){
					console.log('websockte已关闭')
				})
			},
			//退出登录
			go_out(){
				this.closeSocket() //关闭webSocket连接
				uni.clearStorage() //清空本地缓存
				uni.showToast({
					title:'退出成功',
					icon:'success',
					duration:1000
				})
				setTimeout(()=>{
					uni.reLaunch({
						url:'../../index/index'
					})
				},1000)
			}
		},
	}
	
</script>

<style lang="scss">
	page{
		background: #f4f4f4;
	}
	.list-cell{
		display:flex;
		align-items: center;
		/* align-items:baseline; */
		padding: 20rpx 30rpx;
		line-height:60rpx;
		position:relative;
		background: #fff;
		justify-content: center;
		&.log-out-btn{
			margin-top: 40rpx;
			.cell-tit{
				color: #303133;
				text-align: center;
				margin-right: 0;
			}
		}
		&.cell-hover{
			background:#fafafa;
		}
		&.b-b:after{
			left: 30rpx;
		}
		&.m-t{
			margin-top: 16rpx; 
		}
		.header_img{
			width: 100rpx;
			height: 100rpx !important;
			border-radius: 100rpx;
		}
		.cell-more{
			/* align-self: baseline; */
			font-size:30rpx;
			color: #333;
			margin-left:10rpx;
		}
		.cell-tit{
			flex: 1;
			font-size: 30rpx;
			color: #333;
			margin-right:10rpx;
		}
		.cell-tip{
			font-size: 28rpx;
			color: #333;
		}
		.uni-input{
			text-align: right;
			width: 500rpx;
		}
		.cell-content{
			font-size: 32rpx;
			color: #333;
			font-weight: 600;
		}
		.uni-padding-wrap{
			font-size: 32rpx;
			display: flex;
			align-items: center;
		}
		radio{
			transform:scale(0.75)
		}
		
	}
	.shibaiyy{
		width: 94%;
		height: 100rpx;
		// border: 1px solid red;
		background-color: #fafafa;
		margin-left: 3%;
		margin-top: 20rpx;
		// color: red;
		// text-align: center;
	}
</style>
