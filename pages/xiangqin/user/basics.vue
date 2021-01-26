<template>
	<view class="content">
		<view class="message_list_screen_img">
			<text class="message_text">真实头像</text>
			<image class="header_img" :src="photo ? photo : '../../../static/xiangqin/touxiang.png'"  mode="aspectFill" v-model="photo" @click="to_photo"></image>	
		</view>
		<view class="message_list_screen">
			<text class="message_text">姓名</text>
			<view class="message_list_screen_1" v-if="hav">
					<input type="text" value="trueName" v-model="trueName" placeholder="请填写"/>
			</view>
			<view class="message_list_screen_1" v-if="haa">
					<input type="text" value="trueName" v-model="trueName" placeholder="请填写"disabled="true"/>
			</view>
		</view>
		<view class="message_list_screen">
			<text class="message_text">性别</text>
			<view class="message_list_screen_1" v-if="hav">
				<picker mode="selector" :range="genderList" @change="genderChange">
					<!-- <input type="text" value="gender" v-model="gender" placeholder="未选择" /> -->
					<view :class="{'aaa' : gender === '未选择'}">{{gender}}</view>
				</picker>
			</view>
			<view class="message_list_screen_1" v-if="haa">
					<!-- <input type="text" value="gender" v-model="gender" placeholder="未选择" disabled="true"/> -->
					<view :class="{'aaa' : gender === '未选择'}">{{gender}}</view>
			</view>
		</view>
		<view class="message_list_screen">
			<text class="message_text">生日</text>
			<view class="message_list_screen_1" v-if="hav">
				<!-- <text class="cell-content"  @click="select_time">{{birthday ? birthday : '点击设置生日'}}</text> -->
					<!-- <input type="text" value="birthday" v-model="birthday" placeholder="未选择"  @click="select_time"/> -->
					<view :class="{'aaa' : birthday === '未选择'}" @click="select_time">{{birthday}}</view>
			</view>
			<view class="message_list_screen_1" v-if="haa">
					<!-- <input type="text" value="birthday" v-model="birthday" placeholder="未选择" disabled="true"/> -->
					<view :class="{'aaa' : birthday === '未选择'}">{{birthday}}</view>
			</view>
			<!-- <i class="iconfont">&#xe602;</i> -->
		</view>
		<view class="message_list_screen">
			<text class="message_text">身高</text>
			<view class="message_list_screen_1">
				<picker mode="selector" :range="heightList" @change="heightChange">
					<!-- <input type="number" value="height" v-model="height" placeholder="未选择" /> -->
					<view :class="{'aaa' : height === '未选择'}">{{height}}</view>
				</picker>
			</view>
		</view>
		<view class="message_list_screen">
			<text class="message_text">体重</text>
			<view class="message_list_screen_1">
					<input type="number" value="weight" v-model="weight" placeholder="请填写(kg)" />
			</view>
		</view>
		<view class="message_list_screen">
			<text class="message_text">薪资</text>
			<view class="message_list_screen_1">
				<picker mode="multiSelector" :range="payList" @change="payChange">
					<!-- <input type="text" value="pay" v-model="pay" placeholder="未选择" /> -->
					<view :class="{'aaa' : pay === '未选择'}">{{pay}}</view>
				</picker>
			</view>		
		</view>
		<view class="message_list_screen">
			<text class="message_text">籍贯</text>
			<view class="message_list_screen_1">
					<view :class="{'aaa' : region === '未选择'}" @click="openPicker">{{region}}</view>
					<!-- <input type="text" value="city" v-model="city" placeholder="请填写" /> -->
			</view>
		</view>
		<view class="message_list_screen">
			<text class="message_text">学历</text>
			<view class="message_list_screen_1">
				<picker mode="selector" :range="educationList" @change="educationChange">
					<!-- <input type="text" value="education" v-model="education" placeholder="未选择" /> -->
					<view :class="{'aaa' : education === '未选择'}">{{education}}</view>
				</picker>
			</view>		
		</view>
		<view class="message_list_screen">
			<text class="message_text">工作单位</text>
			<view class="message_list_screen_1">
					<input type="text" value="company" v-model="company" placeholder="请填写" />
			</view>
		</view>
		<view class="message_list_screen">
			<text class="message_text">职业</text>
			<view class="message_list_screen_1">
					<input type="text" value="vocation" v-model="vocation" placeholder="请填写" />
			</view>
		</view>
		<!-- <view class="message_list_screen">
			<text class="message_text">婚史</text>
			<view class="message_list_screen_1">
				<picker mode="selector" :range="marriageList" @change="marriageChange">
					<input type="text" value="marriage" v-model="marriage" placeholder="未选择" />
				</picker>
			</view>		
		</view> -->
		<view class="_next" @click="next">
			下一步
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
		<lotus-address v-on:choseVal="choseValue" :lotusAddressData="lotusAddressData">
		</lotus-address>
	</view>
	<!-- <image class="header_imgs" src="../../../static/xiangqin/jiantou.png" >箭头</image> -->
</template>

	
<script>
	import lotusAddress from "../login/uni-search-bar/Winglau14-lotusAddress.vue";
	import _ from 'lodash'
	import MinPopup from '../../components/min-picker/min-popup.vue'
	import MinPicker from '../../components/min-picker/min-picker.vue'
	import moment from 'moment'
	export default {
		data() {
			return {
				startTimes:[1970,1,1],
				endTime:  Number(moment().format('YYYY')) - 18,
				photo: '',
				hav:true,
				haa:false,
				show: false,
				heightList:[],
				educationList:['高中中专及以下','大专','本科','双学士','硕士','博士'],
				payList:[['0','2000','5000','10000','20000','50000'],['2000','5000','10000','20000','50000','100000']],
				marriageList:['未婚','离异','丧偶','已婚'],
				genderList:['男','女'],
				height:'未选择', //身高
				education:'未选择', //学历
				pay:'未选择', //薪资
				marriage:'', //婚史
				trueName:'', //真实姓名
				gender:'未选择', //性别
				genders:'', //性别
				birthday: '未选择', //生日
				weight:'', //体重
				province:'', //省份
				city:'', //城市
				area:'', //地区
				company:'' ,//工作单位
				vocation:'', //职业
				monthPayMin:'', //最低月薪
				monthPayMax:'', //最高月薪
				lotusAddressData:{
				                visible:false,
				                provinceName:'',
				                cityName:'',
				                townName:'',
				            },
							region:'未选择'
			}
		},
		components: {
			MinPopup, MinPicker,
			"lotus-address":lotusAddress
		},

		onLoad() {
			let payDeposit = uni.getStorageSync('payDeposit')
			if(payDeposit != 2){
				console.log(payDeposit)
			}else{
				this.hav = false
				this.haa = true
			}
			for(let i=130; i<=220;i++){
				this.heightList = this.heightList.concat(i)
			}
			this.$http
			.post('lessonxiangqin/api/getUserInfo', 
			{
				userId: uni.getStorageSync('userId')
			}, {})
			.then(res => {
				console.log(res)
				
					this.photo = res.data.data.realHeadUrl
					this.trueName = res.data.data.trueName
					this.gender = this.genderList[res.data.data.gender-1] 
					this.genders = res.data.data.gender
					if(res.data.data.birthMonth == 1){
						res.data.data.birthMonth = '01'
					}else if(res.data.data.birthMonth == 2){
						res.data.data.birthMonth = '02'
					}
					else if(res.data.data.birthMonth == 3){
						res.data.data.birthMonth = '03'
					}
					else if(res.data.data.birthMonth == 4){
						res.data.data.birthMonth = '04'
					}
					else if(res.data.data.birthMonth == 5){
						res.data.data.birthMonth = '05'
					}
					else if(res.data.data.birthMonth == 6){
						res.data.data.birthMonth = '06'
					}
					else if(res.data.data.birthMonth == 7){
						res.data.data.birthMonth = '07'
					}
					else if(res.data.data.birthMonth == 8){
						res.data.data.birthMonth = '08'
					}
					else if(res.data.data.birthMonth == 9){
						res.data.data.birthMonth = '09'
					}
					if(res.data.data.birthYear == null){
						this.birthday = '未选择'
					}else{
						this.birthday = res.data.data.birthYear+'-'+res.data.data.birthMonth+'-'+res.data.data.birthDay
					}
					this.height = res.data.data.height
					this.weight = res.data.data.weight
					this.monthPayMin = res.data.data.monthPayMin
					this.monthPayMax = res.data.data.monthPayMax
					this.pay = res.data.data.monthPayMin+'~'+res.data.data.monthPayMax
					this.province = res.data.data.province
					this.city = res.data.data.city
					this.area = res.data.data.area
					this.education = res.data.data.education
					this.company = res.data.data.company
					this.vocation = res.data.data.vocation
					if(this.province == null){
						this.region = '未选择'
					}else if(this.city == null){
						this.region = `${res.data.data.province}`
					}else if(this.area == null){
						this.region = `${res.data.data.province} ${res.data.data.city}`
					}else{
						this.region = `${res.data.data.province} ${res.data.data.city} ${res.data.data.area}`
					}
					console.log(this.genders)
					if(this.genders == null){
						this.gender = '未选择'
					}
					if(this.height == null){
						this.height = '未选择'
					}
					
					if(this.monthPayMin == null){
						this.pay = '未选择'
					}
					if(this.education == null){
						this.education = '未选择'
					}
					console.log()
					
				
				
			})
			.catch(err => {
			})
		},
		methods: {
			openPicker() {
			            this.lotusAddressData.visible = true;
			            
			        },
					choseValue(res){
					            //res数据源包括已选省市区与省市区code
					            console.log(res);
					            this.lotusAddressData.visible = res.visible;//visible为显示与关闭组件标识true显示false隐藏
					            //res.isChose = 1省市区已选 res.isChose = 0;未选
					            if(res.isChose){
					                this.lotusAddressData.provinceName = res.province;//省
					                this.lotusAddressData.cityName = res.city;//市
					                this.lotusAddressData.townName = res.town;//区
									this.province = res.province
									this.city = res.city
									this.area = res.town
					                this.region = `${res.province} ${res.city} ${res.town}`; //region为已选的省市区的值
									console.log(this.region)
					            }
					        },
			//选择城市
			to_city(){
				uni.navigateTo({
					url:'../login/uni-search-bar/city-choose'
				})
			},
			//头像
			to_photo(){
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
										console.log(_this.photo)
										
									}
								});
							})
						}
				    }
				});
			},
			select_time () {
				console.log('123')
				this.show = true
			},
			// 取消事件
			cancel(){
				this.close()
			},
			// 确认事件
			sure(e){
				this.birthday = e
			},
			// 关闭picker
			close(){
				this.show = false
			},

			
			heightChange(e){
				this.height = this.heightList[e.detail.value]
			},
			educationChange(e){
				this.education = this.educationList[e.detail.value]
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
			genderChange(e){
				this.gender = this.genderList[e.detail.value]
				this.genders = e.detail.value+1
			},
			marriageChange(e){
				this.marriage = this.marriageList[e.detail.value]
			},
			next(){
				console.log(this.birthday)
				if(this.photo === '' || this.trueName === '' || this.gender === '未选择' || this.birthday === '未选择' || this.height === '未选择' || this.weight === '' || this.pay === '未选择' || this.region === '未选择' || this.education === '未选择' || this.company === '' || this.vocation === ''){
					uni.showToast({
						title:'请填写完整信息',
						icon:'none'
					})
				}else{
					
					let birthYear = this.birthday.slice(0,4)
					let birthMonth = this.birthday.slice(5,7)
					let birthDay = this.birthday.slice(8,10)
					console.log(this.trueName)
					let msgList = {
						photo : this.photo,
						trueName: this.trueName,
						gender: this.genders,
						birthYear: birthYear,
						birthMonth: birthMonth,
						birthDay: birthDay,
						height : this.height,
						weight: this.weight,
						monthPayMin: this.monthPayMin,
						monthPayMax: this.monthPayMax,
						province: this.province,
						city: this.city,
						area: this.area,
						education: this.education,
						company: this.company,
						vocation: this.vocation,
					}
					console.log(msgList)
					uni.navigateTo({
						url:'details?data='+JSON.stringify(msgList)
					})
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
		.message_list_screen_img{
			display: flex;
			border-bottom: 1px solid rgb(245,245,245);
			padding-top: 30upx;
			width: 90%;
			height: 200upx;
			.message_text{
				width: 30%;
			}
			.header_img{
				width: 100rpx;
				height: 100rpx !important;
				border-radius: 100rpx;
				margin-left: 55%;
			}
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
			
			
			.header_imgs{
				width: 30upx;
				height: 30upx;
				margin-right: -24upx;
				margin-top: 8upx;
			}
		}
		
	}
	
	
</style>
