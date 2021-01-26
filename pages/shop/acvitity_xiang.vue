<template>
	<view class="content">
		<text class="news_tit">{{huoList.title}}</text>
		<view class="news_time">
			<text>人数上限{{huoList.canyurenshu}}</text>
			<text>已报名人数{{huoList.yibaomingrenshu}}</text>
		</view>
		<view class="news_times">
			<text>{{leixin}}</text>
			<text>{{zhuangtai}}</text>
		</view>
		<view class="news_content">
			<view class="" v-html="huoList.neirong">

			</view>
		</view>
		<view class="baomin">
			<button class="bao" @click="baoming">立即报名</button>
		</view>
		<popup v-model="show0" position="bottom" ref="lvvpopref">
			<view class="popupBg">
				<view class="_select">
					<text class="left">姓名</text>
					<input type="text" v-model="name" placeholder="请输入你的姓名" />
				</view>
				<view class="_select">
					<text class="left">性别</text>
					<radio-group name="sex" @change="radioChange">
						<label>
							<radio value="0" checked="checked" /><text class="nan">男</text>
							<radio value="1" /><text>女</text>
						</label>
					</radio-group>
				</view>
				<view class="_select">
					<text class="left">出生年月</text>
					<view class="vi" :class="{'vivi' : birthday !== ''}" @click="select_time">
						{{birthday === '' ? '请选择出生年月' : birthday}}
					</view>
				</view>
				<view class="_select">
					<text class="left">联系电话</text>
					<input type="text" v-model="phone" placeholder="请输入联系电话" />
				</view>
				<view class="_select">
					<text class="left">报名费</text>
					<text>{{huoList.jiage}}企币</text>
				</view>
				<view class="submit" @click="baomsure('success')">
					确认报名
				</view>
				<min-popup heightSize="500" :show="show1" @close="close">
					<min-picker :endTime="endTime" :startTime="startTime" @cancel="cancel" @sure="sure"></min-picker>
				</min-popup>
				<uni-popup ref="popupDialog" type="dialog" @change="change">
					<uni-popup-dialog :title="money" :beforeClose="true" @confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
				</uni-popup>
				<uni-popup ref="popupMessage" type="message" @change="change">
					<uni-popup-message :type="msgType" :message="message" :duration="1500"></uni-popup-message>
				</uni-popup>
			</view>
		</popup>
	</view>
</template>

<script>
	import popup from '../../components/lvv-popup/lvv-popup.vue'
	import MinPopup from '../components/min-picker/min-popup.vue'
	import MinPicker from '../components/min-picker/min-picker.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import moment from 'moment'
	export default {
		components: {
			popup,
			MinPicker,
			MinPopup,
			uniPopupDialog,
			uniPopupMessage
		},
		data() {
			return {
				id: '',
				huoList: {},
				zhuangtai: '',
				leixin: '',
				show0: false, //底部框展示
				show1: false, //时间选择框展示
				sex: '', //年龄
				name: '', //姓名
				phone: '', //电话
				startTime: [1980, 1, 1], //开始时间
				endTime: Number(moment().format('YYYY')) - 18, //结束时间
				birthday: '', //生日
				message: '请输入完整', //消息提示
				msgType: 'error',
				money: ''
			}
		},
		methods: {
			//报名
			baoming() {
				this.show0 = true
			},
			show() {
				this.$http.post('lessonaqi/api/lessongethuodonxiangqing', {
						activityid: this.id,
						userid: uni.getStorageSync('userId')
					}, {})
					.then(res => {
						console.log(res.data)
						this.huoList = res.data
						switch (res.data.start) {
							case 1:
								this.zhuangtai = '预报名'
								break
							case 2:
								this.zhuangtai = '筹备期'
								break
							case 3:
								this.zhuangtai = '确定活动时间'
								break
							case 4:
								this.zhuangtai = '活动进行中'
								break
							case 5:
								this.zhuangtai = '活动已结束'
								break
						}
						switch (res.data.zhubanfangtype) {
							case 1:
								this.leixin = '公益'
								break
							case 2:
								this.leixin = '企业'
								break
							case 3:
								this.leixin = '个人'
								break
							case 4:
								this.leixin = '官方'
								break
						}
						this.money = '确认支付' + res.data.jiage + '企币？'
					})
					.catch(err => {
						console.log(err)
					})
			},
			//底部弹起选择框
			toshow() {
				console.log(this.name)
				console.log(this.phone)

				_this.show0 = true
			},
			// 单选框
			radioChange: function(evt) {
				this.sex = evt.detail.value
				console.log(this.sex)
			},
			//选择时间框
			select_time() {
				this.show1 = true
			},
			cancel() {
				this.close()
			},
			sure(e) {
				this.birthday = e
			},
			close() {
				this.show1 = false
			},
			//确认支付
			baomsure(type) {
				if (this.name === '') {
					this.message = '请输入姓名'
					this.$refs.popupMessage.open()
					return
				}
				if (this.phone === '') {
					this.message = '手机号不能为空'
					this.$refs.popupMessage.open()
					return
				}
				if (this.birthday === '') {
					this.message = '请选择生日'
					this.$refs.popupMessage.open()
					return
				}
				this.$refs.popupDialog.open()
			},
			change(e) {
				//状态
			},
			dialogConfirm(done) {
				this.$http.post('lessonaqi/api/lessonhuodonbaoming', {
						userid: uni.getStorageSync('userId'),
						huodongid: this.id,
						name: this.name,
						sex: this.sex,
						chushengriqi: this.birthday,
						shoujihao: this.phone
					}, {})
					.then(res => {
						console.log(res.data)
						switch (res.data) {
							case 1:
								this.msgType = 'success'
								this.message = '报名成功'
								this.$refs.popupMessage.open()
								setTimeout(() => {
									this.show0 = false
								},1500)
								break;
							case 999:
								this.message = '报名人数已满'
								this.$refs.popupMessage.open()
								break;
							case 888:
								this.message = '请不要重复报名'
								this.$refs.popupMessage.open()
								break;
							case 777:
								this.message = '男用户已达上限'
								this.$refs.popupMessage.open()
								break;
							case 778:
								this.message = '女用户已达上限'
								this.$refs.popupMessage.open()
								break;
							case 111:
								this.message = '企币不足'
								this.$refs.popupMessage.open()
								break
							case 123:
								this.message = '暂时无法报名'
								this.$refs.popupMessage.open()
								break;
						}
						done()
					})
					.catch(err => {
						console.log(err)
						done()
					})
			},
			dialogClose(done) {
				done()
			}
		},
		onLoad(option) {
			this.id = option.data
			this.show()
		}
	}
</script>

<style lang="scss">
	page {
		background: #fff;
		height: 100%;
	}

	.content {
		min-height: 100%;
		display: flex;
		flex-direction: column;
		padding-bottom: 90upx;
	}

	.news_tit {
		padding: 20rpx;
		font-size: 38rpx;
		color: #333;
		font-weight: 700;
		line-height: 60rpx;
	}

	.news_time {
		display: flex;
		justify-content: space-between;
		padding: 20rpx;

		text {
			color: #999;
			font-size: 24rpx;
		}
	}

	.news_times {
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		padding: 20rpx;

		text {
			color: red;
			font-size: 28upx;
		}
	}

	.news_content {
		width: 100%;
		box-sizing: border-box;
		padding: 0upx 20upx;
		// .comment_list {
		// 	display: flex;
		// 	flex-direction: column;
		// 	._header {
		// 		display: flex;
		// 		height: 40rpx;
		// 		align-items: center;
		// 		view {
		// 			width: 8rpx;
		// 			height: 100%;
		// 			background-color: #007AFF;
		// 			border-radius: 6rpx;
		// 		}
		// 		text {
		// 			font-size: 32rpx;
		// 			padding-left: 10rpx;
		// 		}
		// 	}
		// }
		// .comment_content {
		// 	display: flex;
		// 	justify-content: space-between;
		// 	padding: 10rpx;
		// 	i {
		// 		font-size: 28rpx;
		// 		color: #666;
		// 	}
		// 	.like {
		// 		color: red;
		// 	}
		// }
	}

	.nav-items {
		width: 24rpx;
		height: 24rpx;
	}

	.comment {
		width: 100%;
		height: 80rpx;
		display: flex;
		background: #fff;
		align-items: center;
		padding: 10rpx 20rpx;
		position: fixed;
		left: 0;
		bottom: 0;

		input {
			width: 50%;
			border: none;
			background-color: #f4f4f4;
			height: 60rpx;
			text-indent: 10rpx;
			border-radius: 10rpx;
		}

		.operating {
			flex: 1;
			display: flex;
			padding-left: 20rpx;
			align-items: center;
			justify-content: space-around;

			i {
				font-size: 40rpx;
				color: #666;
			}

			.like {
				color: red;
			}
		}

	}

	.baomin {
		width: 100%;
		height: 90upx;
		position: fixed;
		background-color: #FFFFFF;
		bottom: 0;
	}

	.bao {
		width: 96%;
		height: 80upx;
		margin: 5upx auto;
		text-align: center;
		line-height: 80upx;
		font-size: 32upx;
		border-radius: 50upx;
		background-color: #FFF;
		box-sizing: border-box;
		border: 1px solid #C1C1C1;
	}

	//模态框内容
	.popupBg {
		width: 100%;
		height: 50%;
		position: absolute;
		left: 0;
		bottom: 0;
		padding-top: 20upx;
		background-color: #fff;
		border-radius: 20upx 20upx 0 0;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}

	._select {
		width: 90%;
		height: 80upx;
		line-height: 80upx;
		border-bottom: 1px solid #F5F5F5;
		margin: 0upx auto;
		display: flex;

		// justify-content: space-between;
		input {
			width: 70%;
			height: 100%;
		}

		.left {
			display: block;
			width: 160upx;
			font-size: 32upx;
			// border: 1px solid red;
			text-align: left;
		}

		.nan {
			margin-right: 40upx;
		}

		.vi {
			color: #808090;
		}

		.vivi {
			color: black;
		}
	}

	.submit {
		width: 100%;
		height: 80upx;
		position: absolute;
		bottom: 0;
		font-size: 32upx;
		text-align: center;
		line-height: 80upx;
		background-color: #3f3e51;
		color: white;
	}
</style>
