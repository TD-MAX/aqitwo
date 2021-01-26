<template>
	<view class="content">
		<view class="_header">
			<text class="one">
				<i class="iconfont">&#xe603;</i>
			</text>
			<view class="">
			</view>
			<text class="tow">2</text>
			<view class="">
			</view>
			<text>3</text>
		</view>
		<view class="_con">
			<text class="_top">填写资料</text>
		</view>
		
		<view class="message_list_screen">
			<text>身高</text>
			<view class="message_list_screen_1">
				<picker mode="selector" :range="heightList" @change="heightChange">
					<!-- <input type="number" value="height" v-model="height" placeholder="未选择" /> -->
					<view :class="{'aaa' : height === '未选择'}">{{height}}</view>
				</picker>
			</view>
		</view>
		<view class="message_list_screen">
			<text>学历</text>
			<view class="message_list_screen_1">
				<picker mode="selector" :range="eduList" @change="eduChange">
					<view :class="{'aaa' : edu === '未选择'}">{{edu}}</view>
				</picker>
			</view>		
		</view>
		<view class="message_list_screen">
			<text>薪资</text>
			<view class="message_list_screen_1">
				<picker mode="multiSelector" :range="payList" @change="payChange">
					<view :class="{'aaa' : pay === '未选择'}">{{pay}}</view>
				</picker>
			</view>		
		</view>
		<view class="message_list_screen">
			<text>婚史</text>
			<view class="message_list_screen_1">
				<picker mode="selector" :range="marriageList" @change="marriageChange">
					<view :class="{'aaa' : marriage === '未选择'}">{{marriage}}</view>
				</picker>
			</view>		
		</view>
		<view class="_next" @click="next">
			下一步
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
				photo: '',
				heightList:[],
				eduList:['高中中专及以下','大专','本科','双学士','硕士','博士'],
				payList:[['0','2000','5000','10000','20000','50000'],['2000','5000','10000','20000','50000','100000']],
				marriageList:['未婚','离异','丧偶'],
				height:'未选择', //身高
				edu:'未选择', //学历
				pay:'未选择', //薪资
				marriage:'未选择', //婚史
				marriages:'',
				monthPayMin:'', //最低月薪
				monthPayMax:'', //最高月薪
			}
		},
		components: {
			MinPopup, MinPicker
		},
		onLoad() {
			for(let i=130; i<=220;i++){
				this.heightList = this.heightList.concat(i)
			}
		},
		methods: {
			
			heightChange(e){
				this.height = this.heightList[e.detail.value]
			},
			eduChange(e){
				this.edu = this.eduList[e.detail.value]
			},
			payChange(e){
				this.pay = this.payList[e.detail.value]
			},
			payChange(e){
				console.log(e)
				this.monthPayMin = this.payList[0][e.detail.value[0]]
				this.monthPayMax = this.payList[1][e.detail.value[1]]
				if(e.detail.value[0] > e.detail.value[1]){
					uni.showToast({
						title:'请选择正确薪资',
						icon:'none'
					})
				}else{
					this.pay = this.monthPayMin+"~"+this.monthPayMax
				}
			},
			marriageChange(e){
				this.marriage = this.marriageList[e.detail.value]
				this.marriages = e.detail.value+1
			},
			next(){
				if(this.height == '未选择' || this.edu == '未选择' || this.pay == '未选择' || this.marriage == '未选择'){
					uni.showToast({
						title:'请填写完整信息',
						icon:'none'
					})
				}else{
					this.$http
						.post(
							'lessonxiangqin/api/setUserInfo',
							{
								userId: uni.getStorageSync('userId'),
								height: this.height,
								education: this.edu,
								monthPayMin: this.monthPayMin,
								monthPayMax: this.monthPayMax,
								maritalStatus :this.marriages
							},
							{}
						)
						.then(res => {
							console.log('用户没问题');
							console.log(res);
							uni.redirectTo({
								url:'./index4'
							});
						})
						.catch(err => {});
				}
			}
			
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
		.message_list_screen{
			display: flex;
			border-bottom: 1px solid rgb(245,245,245);
			padding-top: 30upx;
			width: 90%;
			height: 80upx;
			.message_list_screen_1{
				width: 70%;
				height: 50upx;
				margin-left: 18%;
				text-align: right;
				font-size: 32upx;
				.aaa{
					color: grey;
				}
			}
		}
	}
	
</style>
