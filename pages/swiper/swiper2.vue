<template>
	<view class="love">
		<image src="../../static/photo.png" mode="aspectFill"
		class="img_huo"></image>
		<view class="love_content">
			<h4>相亲活动</h4>
			<view class="love_text">
				<view class="left_love">
					<view class="">
						<image src="../../static/aqiuser/money/huodong_time.png" mode="aspectFit"></image>
					</view>
					
					<text>活动时间</text>
				</view>
				<text>13:00-17:00开放</text>
			</view>
			<view class="love_text">
				<view class="left_love">
					<view class="">
						<image src="../../static/aqiuser/money/huodong_dizhe.png" mode="aspectFit"></image>
					</view>
					
					<text>活动地址</text>
				</view>
				<text>长治市潞州区众创空间</text>
			</view>
			<view class="">
				<text>活动介绍</text>
				<view class="">
					
				</view>
			</view>
		</view>
		<view class="canyu">
			<text>￥299.00</text>
			<view @click="toshow">立即支付</view>
		</view>
		<popup v-model="show" position="bottom" ref="lvvpopref">
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
					<view class="vi" 
					:class="{'vivi' : birthday !== ''}"
					@click="select_time">
						{{birthday === '' ? '请选择出生年月' : birthday}}
					</view>
				</view>
				<view class="_select">
					<text class="left">联系电话</text>
					<input type="text" v-model="phone" placeholder="请输入联系电话" />
				</view>
				<view class="_select">
					<text class="left">报名费</text>
					<text>1企币</text>
				</view>
				<view class="submit" @click="baomsure('success')">
					确认报名
				</view>
				<min-popup heightSize="500" :show="show1" @close="close">
					<min-picker
					:endTime="endTime"
					:startTime="startTime"
					@cancel="cancel"
					@sure="sure"
					></min-picker>
				</min-popup>
				<uni-popup ref="popupDialog" type="dialog" @change="change">
					<uni-popup-dialog
					title="确认支付？"
					:beforeClose="true"
					@confirm="dialogConfirm"
					@close="dialogClose"></uni-popup-dialog>
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
	import moment from 'moment'
	export default {
		components: {
			popup,
			MinPicker,
			MinPopup,
			uniPopupDialog
		},
		data() {
			return {
				show: false, //底部框展示
				show1: false, //时间选择框展示
				sex: '',   //年龄
				name: '', //姓名
				phone: '', //电话
				startTime: [1980,1,1], //开始时间
				endTime: Number(moment().format('YYYY')) - 18 ,//结束时间
				birthday: '', //生日
			}
		},
		methods: {
			//底部弹起选择框
			toshow() {
				this.show = true
			},
			// 单选框
			radioChange: function(evt){
				this.sex = evt.detail.value
				console.log(this.sex)
			},
			//选择时间框
			select_time () {
				this.show1 = true
			},
			cancel () {
				this.close()
			},
			sure (e) {
				this.birthday = e
			},
			close () {
				this.show1 = false
			},
			//确认支付
			baomsure (type) {
				this.$refs.popupDialog.open()
			},
			change (e) {
				//状态
			},
			dialogConfirm (done) {
				done ()
			},
			dialogClose (done) {
				done()
			}
		}
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height: 100%;
		background-color: #F5F5F5;
	}
	.love{
		width: 100%;
		height: 100%;
	}
	.img_huo{
		width: 96%;
		height: 350upx;
		display: block;
		margin: 0 auto;
	}
	.love_content {
		width: 96%;
		height: calc(100% - 470upx);
		margin: 0 auto;
		padding: 20upx;
		box-sizing: border-box;
		background-color: #fff;
		border-radius: 20upx 20upx 0 0;
		h4{
			text-align: center;
		}
		.love_text {
			width: 100%;
			height: 80upx;
			line-height: 80upx;
			display: flex;
			justify-content: space-between;
			.left_love{
				width: 40%;
				height: 100%;
				display: flex;
			}
			image{
				width: 50upx;
				height: 50upx;
				margin-top: 15upx;
				margin-right: 20upx;
			}
		}
	}
	.canyu {
		width: 92%;
		height: 110upx;
		margin: 0 auto;
		line-height: 110upx;
		// border: 1px solid red;
		display: flex;
		justify-content: space-between;
		text{
			display: block;
			color: red;
			font-size: 40upx;
		}
		view{
			width: 200upx;
			height: 60upx;
			display: block;
			margin-top: 25upx;
			border-radius: 50upx;
			text-align: center;
			line-height: 60upx;
			color: white;
			background-color: red;
			font-size: 28upx;
		}
	}
	// 模态框内容
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
		input{
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
		.nan{
			margin-right: 40upx;
		}
		.vi {
			color: #808090;
		}
		.vivi {
			color: black;
		}
	}
	.submit{
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
