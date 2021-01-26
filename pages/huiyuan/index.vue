<template>
	<view class="huiyuan">
		<view class="huiyuan_user">
			<image :src="user_msg.photo" mode=""></image>
			<view class="huiyuan_msg">
				<text>{{user_msg.name}}</text>
				<p>{{is_huiyuan === '0' ? '您还不是会员' : '等级' + is_huiyuan}}</p>
			</view>
		</view>
		<view class="select_type">
			<view class="" 
			v-for="(item,index) in viptype" :key="index"
			:class="{'current' : tabIndex === index}"
			@click="qie(index)">
				{{item.text}}
			</view>
		</view>
		<view class="select_money" v-show="tabIndex === 0">
			<view class="" 
			v-for="(a,index1) in huiyuan_time" :key="index1"
			:class="{'select' : msgIndex === index1}"
			@click="jine(index1)">
				<text>{{a.text}}</text>
				<text>{{a.money}}企币</text>
			</view>
		</view>
		<view class="select_money" v-show="tabIndex === 1">
			<view class="" 
			v-for="(a,index1) in zhizhunvip" :key="index1"
			:class="{'select' : msgIndex === index1}"
			@click="jine(index1)">
				<text>{{a.text}}</text>
				<text>{{a.money}}企币</text>
			</view>
		</view>
		<view class="chong" @click="chongzhi">
			充值
		</view>
		<uni-popup ref="popupDialog" type="dialog" @change="change">
			<uni-popup-dialog
			title="企币余额不足" 
			content="是否前往充值？" 
			:before-close="true" 
			@confirm="dialogConfirm" 
			@close="dialogClose"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		components: {
			uniPopupDialog
		},
		data() {
			return {
				user_msg: {},
				is_huiyuan: '',
				times: '',  //要开通的时长
				jiage: '', //要支付的费用
				tabIndex: 0,
				msgIndex: 0,
				viptype: [    //普通会员 SVIP
					{
						text: 'vip'
					},
					{
						text: 'svip'
					}
				],
				huiyuan_time:[    //普通会员价格
					{
						text: '一个月',
						time: '1',
						money: 30
					},
					{
						text: '三个月',
						time: '3',
						money: 90
					},
					{
						text: '六个月',
						time: '6',
						money: 180
					},
					{
						text: '一年',
						time: '12',
						money: 360
					}
				],
				zhizhunvip: [     //SVIP价格
					{
						text: '一个月',
						time: '1',
						money: 60
					},
					{
						text: '三个月',
						time: '3',
						money: 180
					},
					{
						text: '六个月',
						time: '6',
						money: 360
					},
					{
						text: '一年',
						time: '12',
						money: 720
					}
				]
			}
		},
		methods: {
			//获取用户信息
			init () {
				this.$http.post('lessonxiangqin/api/lessongetuser', {
						userid: uni.getStorageSync('userId')
					}, {})
					.then(res => {
						this.user_msg = res.data
					})
					.catch(err => {
						console.log(err)
					})
			},
			//切换类型
			qie (e) {
				this.tabIndex = e
				if (e === 1) {
					this.times = this.zhizhunvip[0].time
					this.jiage = this.zhizhunvip[0].money
				}
			},
			//选择金额
			jine (evt) {
				this.msgIndex = evt,
				console.log(this.tabIndex)
				switch (this.tabIndex) {
					case 0:
						this.times = this.huiyuan_time[evt].time
						this.jiage = this.huiyuan_time[evt].money
						break;
					case 1:
						this.times = this.zhizhunvip[evt].time
						this.jiage = this.zhizhunvip[evt].money
						break;
				}
				console.log(this.times)
				console.log(this.jiage)
			},
			//充值
			chongzhi () {
				this.$http.post('lessonaqi/api/lessonsetuservip',{
					userid: uni.getStorageSync('userId'),
					vipid: String(this.tabIndex + 1),
					usetime: this.times,
					vipmoney: String(this.jiage)
				},{})
				.then(res=>{
					console.log(res)
					if (res.data === 300) {
						this.$refs.popupDialog.open()
					} else if (res.data === 1) {
						uni.showToast({
							title: '充值成功'
						})
					}
				})
				.catch(err =>{
					console.log(err)
				})
			},
			// 获取会员信息
			show () {
				this.$http.post('lessonaqi/api/lessongetvipinfo',{
					userid: uni.getStorageSync('userId')
				},{})
				.then(res => {
					console.log(res)
					this.is_huiyuan = res.data[0].viptype
				})
				.catch(err => {
					console.log(err)
				})
			},
			//弹出框
			change () {
				//对话框状态
			},
			/**
			 * 对话框点击确认按钮
			 */
			dialogConfirm(done) {
				uni.navigateTo({
					url: '../shop/qibi_ref',
					animationType: 'pop-in'
				})
				done()
			},
			dialogClose (done) {
				// this.$refs.popopMessage.open()
				done()
			}
		},
		onShow() {
			this.show() // 会员信息
		},
		onLoad() {
			this.times = this.huiyuan_time[0].time
			this.jiage = this.huiyuan_time[0].money
			this.init() //用户信息
		}
	}
</script>

<style lang="scss">
	.huiyuan {
		width: 100%;
	}
	.huiyuan_user{
		width: 100%;
		height: 120upx;
		border-bottom: 1px solid #F5F5F5;
		// margin: auto;
		display: flex;
		justify-content: space-around;
		border-radius: 20upx;
		// background-color: #F5F5F5;
		.huiyuan_msg{
			width: 80%;
			height: 100upx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			margin-top: 10upx;
			// border: 1px solid red;
			font-size: 32upx;
			p{
				font-size: 28upx;
				color: #696969;
			}
		}
		image{
			width: 100upx;
			height: 100upx;
			border-radius: 50%;
			margin: 10upx 20upx 0 0;
		}
	}
	.select_type{
		width: 96%;
		height: 80upx;
		margin: 20upx auto;
		display: flex;
		view{
			flex: 1;
			text-align: center;
			line-height: 80upx;
			font-size: 32upx;
		}
		.current{
			color: #3f3e51;
			border-bottom: 2px solid #3f3e51;
			font-size: 36upx;
		}
	}
	.select_money {
		width: 96%;
		height: 200upx;
		margin: 20upx auto;
		display: flex;
		justify-content: space-around;
		font-size: 32upx;
		view {
			width: 23%;
			height: 100%;
			display: flex;
			border: 1px solid #f5f5f5;
			background-color: #fff;
			border-radius: 10upx;
			color: black;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
		.select {
			border: 1px solid #3F3E51;
			background-color: #3F3E51;
			color: white;
		}
	}
	.chong {
		width: 400upx;
		height: 80upx;
		margin: 40upx auto;
		text-align: center;
		font-size: 32upx;
		line-height: 80upx;
		border-radius: 50upx;
		background-color: #3F3E51;
		color: white;
	}
</style>
