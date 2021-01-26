<template>
	<view class="content">
		

		<view class="message_list_screen">
			<text class="message_text">居住状况</text>
			<view class="message_list_screen_1">
				<picker mode="selector" :range="liveStatusList" @change="liveStatusChange">
					<!-- <input type="text" value="liveStatus" v-model="liveStatus" placeholder="未选择" /> -->
					<view :class="{'aaa' : liveStatus === '未选择'}">{{liveStatus}}</view>
				</picker>
			</view>
		</view>
		<view class="message_list_screen">
			<text class="message_text">购车状况</text>
			<view class="message_list_screen_1">
				<picker mode="selector" :range="carStatusList" @change="carStatusChange">
					<!-- <input type="text" value="carStatus" v-model="carStatus" placeholder="未选择" /> -->
					<view :class="{'aaa' : carStatus === '未选择'}">{{carStatus}}</view>
				</picker>
			</view>
		</view>
		<view class="message_list_screen">
			<text class="message_text">购房状况</text>
			<view class="message_list_screen_1">
				<picker mode="selector" :range="houseStatusList" @change="houseStatusChange">
					<!-- <input type="text" value="houseStatus" v-model="houseStatus" placeholder="未选择" /> -->
					<view :class="{'aaa' : houseStatus === '未选择'}">{{houseStatus}}</view>
				</picker>
			</view>
		</view>
		<view class="message_list_screen">
			<text class="message_text">婚姻状况</text>
			<view class="message_list_screen_1">
				<picker mode="selector" :range="maritalStatusList" @change="maritalStatusChange">
					<!-- <input type="text" value="maritalStatus" v-model="maritalStatus" placeholder="未选择" /> -->
					<view :class="{'aaa' : maritalStatus === '未选择'}">{{maritalStatus}}</view>
				</picker>
			</view>
		</view>
		<view class="message_list_screen">
			<text class="message_text">情感状况</text>
			<view class="message_list_screen_1">
				<picker mode="selector" :range="emotionStatusList" @change="emotionStatusChange">
					<!-- <input type="text" value="emotionStatus" v-model="emotionStatus" placeholder="未选择" /> -->
					<view :class="{'aaa' : emotionStatus === '未选择'}">{{emotionStatus}}</view>
				</picker>
			</view>
		</view>
		<view class="message_list_screen">
			<text class="message_text">性格</text>
			<view class="message_list_screen_1">
				<picker mode="selector" :range="characterList" @change="characterChange">
					<!-- <input type="text" value="character" v-model="character" placeholder="未选择" /> -->
					<view :class="{'aaa' : character === '未选择'}">{{character}}</view>
				</picker>
			</view>
		</view>
		
		<view class="message_list_screen">
			<text class="message_text">爱好</text>
			<view class="message_list_screen_1">
					<input type="text" value="hobby" v-model="hobby" placeholder="请填写" />
			</view>
		</view>
		
		<view class="_next" @click="next">
			下一步
		</view>

	</view>
	<!-- <image class="header_imgs" src="../../../static/xiangqin/jiantou.png" >箭头</image> -->
</template>

	
<script>
	import _ from 'lodash'
	import MinPopup from '../../components/min-picker/min-popup.vue'
	import MinPicker from '../../components/min-picker/min-picker.vue'
	import moment from 'moment'
	export default {
		data() {
			return {
				startTimes:[1970,1,1],
				endTime:  Number(moment().format('YYYY')) - 18,
				liveStatusList:['租房','与父母同居','个人居住'],
				carStatusList:['未购','贷款购买','已购'],
				houseStatusList:['未购','贷款购买','已购'],
				maritalStatusList:['未婚','离婚','丧偶'],
				emotionStatusList:['未恋爱','交往中','热恋中','失恋中'],
				characterList:['内向','外向'],
				carStatus:'未选择', // 购车状况
				liveStatus:'未选择', // 住房状况
				houseStatus:'未选择', // 购房状况
				maritalStatus:'未选择', // 婚姻状况
				emotionStatus:'未选择', // 情感状况
				character:'未选择', // 性格
				hobby:'', // 爱好
				
				carStatu:'', // 购车状况
				liveStatu:'', // 住房状况
				houseStatu:'', // 购房状况
				maritalStatu:'', // 婚姻状况
				emotionStatu:'', // 情感状况
				characters:'', // 性格
				msgList:{},
				payDeposit:'', //资料保证金是否缴纳 
			}
		},
		components: {
			MinPopup, MinPicker
		},

		onLoad(e) {
			console.log(e)
			if(e){
				this.msgList =JSON.parse(e.data)
				console.log(this.msgList)
			}
			this.$http
			.post('lessonxiangqin/api/getUserInfo', 
			{
				userId: uni.getStorageSync('userId')
			}, {})
			.then(res => {
				console.log(res)
				// if(res.data.data.liveStatus == null || res.data.data.liveStatus == undefined){
				// 	console.log('没有基本信息')
				// }else{
					this.hobby = res.data.data.hobby
					this.liveStatus = this.liveStatusList[res.data.data.liveStatus-1] 
					this.carStatus = this.carStatusList[res.data.data.carStatus-1]
					this.houseStatus = this.houseStatusList[res.data.data.houseStatus-1]
					this.maritalStatus = this.maritalStatusList[res.data.data.maritalStatus-1]
					this.emotionStatus = this.emotionStatusList[res.data.data.emotionStatus-1]
					this.character = this.characterList[res.data.data.character-1]
					if(this.liveStatus == null){
						this.liveStatus = '未选择'
					}
					if(this.carStatus == null){
						this.carStatus = '未选择'
					}
					if(this.houseStatus == null){
						this.houseStatus = '未选择'
					}
					if(this.maritalStatus == null){
						this.maritalStatus = '未选择'
					}
					if(this.emotionStatus == null){
						this.emotionStatus = '未选择'
					}
					if(this.character == null){
						this.character = '未选择'
					}
					
					this.liveStatu = res.data.data.liveStatus
					this.carStatu = res.data.data.carStatus
					this.houseStatu = res.data.data.houseStatus
					this.maritalStatu = res.data.data.maritalStatus
					this.emotionStatu = res.data.data.emotionStatus
					this.characters = res.data.data.character
					this.payDeposit = res.data.data.payDeposit
					
				// }
				
			})
			.catch(err => {
			})
		},
		methods: {
			liveStatusChange(e){
				this.liveStatus = this.liveStatusList[e.detail.value]
				this.liveStatu = e.detail.value+1
			},
			carStatusChange(e){
				console.log(e)
				this.carStatus = this.carStatusList[e.detail.value]
				this.carStatu = e.detail.value+1
			},
			houseStatusChange(e){
				this.houseStatus = this.houseStatusList[e.detail.value]
				this.houseStatu = e.detail.value+1
			},
			maritalStatusChange(e){
				this.maritalStatus = this.maritalStatusList[e.detail.value]
				this.maritalStatu = e.detail.value+1
			},
			emotionStatusChange(e){
				this.emotionStatus = this.emotionStatusList[e.detail.value]
				this.emotionStatu = e.detail.value+1
			},
			characterChange(e){
				this.character = this.characterList[e.detail.value]
				this.characters = e.detail.value+1
			},
			//保存信息
			next(){
				if(this.liveStatus == '未选择' || this.carStatus == '未选择' || this.houseStatus == '未选择' || this.maritalStatus == '未选择' || this.emotionStatus == '未选择' || this.character == '未选择' || this.hobby == '' || this.liveStatu == null || this.carStatu == null || this.houseStatu == null || this.maritalStatu == null || this.emotionStatu == null || this.characters == null){
					uni.showToast({
						title:'请填写完整信息',
						icon:'none'
					})
				}else{
					
					let userId = uni.getStorageSync('userId')
					this.$http.post('lessonxiangqin/api/setUserInfo',{
						userId:uni.getStorageSync('userId'),
						liveStatus:this.liveStatu,
						carStatus:this.carStatu,
						houseStatus:this.houseStatu,
						maritalStatus:this.maritalStatu,
						emotionStatus:this.emotionStatu,
						character:this.characters,
						hobby:this.hobby,
						birthDay:this.msgList.birthDay,
						birthMonth:this.msgList.birthMonth,
						birthYear:this.msgList.birthYear,
						province:this.msgList.province,
						city:this.msgList.city,
						area:this.msgList.area,
						company:this.msgList.company,
						education:this.msgList.education,
						gender:this.msgList.gender,
						height:this.msgList.height,
						monthPayMax:this.msgList.monthPayMax,
						monthPayMin:this.msgList.monthPayMin,
						realHeadUrl:this.msgList.photo,
						trueName:this.msgList.trueName,
						vocation:this.msgList.vocation,
						weight:this.msgList.weight,
					},{})
					.then(res=>{
						console.log(res)
						if(res.data.msg === '保存成功'){
							uni.showToast({
								title:res.data.msg
							})
							if(this.payDeposit !== 2){
								setTimeout(res=>{
									uni.navigateTo({
										url:'deposit'
									})
								},1500)
							}else{
								setTimeout(res=>{
									uni.reLaunch({
										url:'./edituserinfo'
									})
								},1500)
							}
						}
					})
					.catch(err=>{
						console.log(err)
					})
					// uni.navigateTo({
					// 	url:'deposit'
					// })
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
			height: 100upx;
			.message_text{
				width: 30%;
			}
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
			.header_img{
				width: 100rpx;
				height: 100rpx !important;
				border-radius: 100rpx;
				margin-left: 55%;
			}
			.header_imgs{
				width: 30upx;
				height: 30upx;
				margin-right: -24upx;
				margin-top: 8upx;
			}
		}
	}
	
</style>
