<template>
	<view class="user_body">
		<view class="user_backimg">
			<image :src="user_data.xiangqinphoto" mode="aspectFill"></image>
		</view>
		<view class="user_head">
			<image :src="user_data.xiangqinphoto" mode="aspectFill"></image>
			<view class="name">
				<p>{{user_data.xiangqinname}}</p>
			</view>
			<view class="geqian">
				<view>个性签名：</view>
				<view class="geqian_test">
					{{user_data.sign ? user_data.sign : '这个人很懒，什么都没有留下'}}
				</view>
			</view>
		</view>
		<view class="perpsoon_ren">
			<text>Ta的认证：</text>
			<view class="perpsoon_tent">
				<view class="nero" >
					<image src="../../../static/xiangqin/icon/biesu.png" mode="aspectFill"></image>
					<text>{{houseStatus ? houseStatus : '房子'}}</text>
				</view>
				<view class="nero" >
					<image src="../../../static/xiangqin/icon/car.png" mode="aspectFill"></image>
					<text>{{carStatus ? carStatus : '汽车'}}</text>
				</view>
				<view class="nero" >
					<image src="../../../static/xiangqin/icon/eduit.png" mode="aspectFill"></image>
					<text>{{user_datas.education ? user_datas.education : '学历'}}</text>
				</view>
				<view class="nero" >
					<image src="../../../static/xiangqin/icon/people.png" mode="aspectFill"></image>
					<text>{{shiming ? shiming : '实名'}}</text>
				</view>
			</view>
		</view>
		<view class="album">
			<text>个人相册:</text>
			<view class="album_img">
				<view v-if="to_photo">暂无</view>
				<image v-for="(n, index) in img_url" :src="n" mode="aspectFill" :key="index" v-else></image>
				
			</view>
		</view>
		<view class="user_xinxi">
			<text>Ta的信息：</text>
			<view class="_xin">
				<view class="views" v-for="(n,index1) in msg_list" :key="index1">
					<image :src="n.src" mode="aspectFit"></image>
					<text>{{n.text}}</text>
				</view>
			</view>
			<view class="_xin">
				<view class="views">
					{{user_datas.vocation ? user_datas.vocation : '暂无'}}
				</view>
				<view class="views">
					{{user_datas.age ? user_datas.age : '暂无'}}
				</view>
				<view class="views">
					{{maritalStatus ? maritalStatus : '暂无'}}
				</view>
				<view class="views">
					{{money ? money : '暂无'}}
				</view>
				<view class="views">
					{{user_datas.height ? user_datas.height : '暂无'}}
				</view>
				<view class="views">
					{{user_datas.weight ? user_datas.weight : '暂无'}}
				</view>
				<view class="viewss">
					{{region ? region : '暂无'}}
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="">
				<image src="../../../static/xiangqin/icon/dongtai.png" mode=""></image>
				<text>动态</text>
			</view>
			<view class="" @click="guanzhu">
				<image src="../../../static/xiangqin/icon/guanzhu.png" mode=""></image>
				<text>{{is_gz === 0 ? '关注' : '已关注'}}</text>
			</view>
			<view class="liao" @click="go_chat">
				<image src="../../../static/xiangqin/icon/liaotian.png" mode=""></image>
				<text>聊天</text>
			</view>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue'
	import test_img from '../../../static/img4.jpg'
	import _ from 'lodash'
	export default {
		data() {
			return {
				to_photo:true,
				moving: [],
				user_data: {},
				recogmentList: [{
						sayPicList: [
							test_img
						]
					},
					{
						sayPicList: [
							test_img, test_img
						]
					},
					{
						sayPicList: [
							test_img, test_img, test_img, test_img, test_img
						]
					}
				],
				
				msg_list: [{
						text: '职业',
						src: '../../../static/xiangqin/icon/zhiye.png'
					},
					{
						text: '年龄',
						src: '../../../static/xiangqin/icon/age.png'
					},
					{
						text: '婚史',
						src: '../../../static/xiangqin/icon/qing.png'
					},
					{
						text: '收入',
						src: '../../../static/xiangqin/icon/money.png'
					},
					{
						text: '身高',
						src: '../../../static/xiangqin/icon/height.png'
					},
					{
						text: '体重',
						src: '../../../static/xiangqin/icon/zhong.png'
					},
					{
						text: '籍贯',
						src: '../../../static/xiangqin/icon/jiguan.png'
					}
				],
				test_img: test_img,
				pageNum: 1,
				is_gz: 0,
				user_id: '',
				loadingType: 'more',
				more_page: 0,
				liaotianrenshu: '',
				user_datas:{},
				houseStatus:'',
				carStatus:'',
				shiming:'',
				img_url: [],
				maritalStatus:'', 
				money:'', //薪资
				region:'' //籍贯
			}
		},
		components: {
			uniLoadMore
		},
		// onLoad(option){
		// 	if (this.loadingType === 'more') {
		// 		this.init()
		// 	}
		// },
		onLoad(option) {
			console.log(option)
			//点进来的用户ID
			this.user_id = option.data
			console.log(this.user_id)
			this.msg()
			// 获取用户动态
			this.init()
			//获取点击进来的用户信息
			this.show()
			//获取此用户是否被当前用户所关注
			this.gzuser()
			this.$http.post('lessonxiangqin/api/getUserChatNum', {
					userId: uni.getStorageSync('userId')
				}, {})
				.then(res => {
					console.log(res)
					this.liaotianrenshu = res.data.data
				})
				.catch(err => {
					console.log(err)
				})
		},
		methods: {
			//预览图片
			to_img(e) {
				let _this = this
				let imgsArray = []
				imgsArray[0] = e
				uni.previewImage({
					current: 0,
					urls: imgsArray
				})
			},
			//预览多张图片
			previewImage(index, e) {
				console.log(index)
				console.log(e)
				let _this = this;
				let imgsArray = [];
				for (let i = 0; i < _this.moving[index].imageslist.length; i++) {
					if (_this.moving[index].imageslist[i] != null) {
						imgsArray.push(_this.moving[index].imageslist[i]);
					}
				}

				// #ifdef MP
				uni.previewImage({
					current: e,
					urls: imgsArray,
					indicator: 'number',
					loop: true
				});
				// #endif

				// #ifndef MP
				uni.previewImage({
					current: e,
					urls: imgsArray,
					indicator: 'number',
					loop: true
				});
				// #endif
			},
			//获取用户动态
			init() {
				uni.showLoading({
					title: '加载中'
				});
				this.$http
					.post('lessonxiangqin/api/lessongetDongtai', {
						userid: this.user_id,
						currentuserid: uni.getStorageSync('userId'),
						pageNum: this.pageNum,
						pageSize: 5
					}, {})
					.then(res => {
						console.log('获取动态接口走通')
						_.each(res.data.rows, o => {
							this.moving.push(o)
						})
						this.more_page = Math.ceil(res.data.total / 5)
						if (this.pageNum === this.more_page) {
							this.loadingType = 'nomore'
						}
						uni.hideLoading()
						this.pageNum++
						console.log(res.data)
					})
					.catch(err => {})
			},
			//获取点击进来之后的用户信息
			show() {
				this.$http
					.post('lessonxiangqin/api/lessongetuser', {
						userid: this.user_id
					}, {})
					.then(res => {
						console.log('获取用户信息走通')
						console.log(res)
						this.user_data = res.data
						console.log(this.user_data)
						uni.setNavigationBarTitle({
							title: this.user_data.xiangqinname
						});
					})
					.catch(err => {})
			},
			msg () {
				this.$http.post('lessonxiangqin/api/getUserInfo',{
					userId: this.user_id
				},{})
				.then(res => {
					console.log(res)
					this.user_datas = res.data.data
					
					this.houseStatus = res.data.data.houseStatus
					if(this.houseStatus == null || this.houseStatus == undefined){
						this.houseStatus = '楼房'
					}else if(this.houseStatus == 1){
						this.houseStatus = '未购'
					}else if(this.houseStatus == 2){
						this.houseStatus = '贷款购买'
					}else if(this.houseStatus == 3){
						this.houseStatus = '已购'
					}
					this.carStatus = res.data.data.carStatus
					if(this.carStatus == null || this.carStatus == undefined){
						this.carStatus = '汽车'
					}else if(this.carStatus == 1){
						this.carStatus = '未购'
					}else if(this.carStatus == 2){
						this.carStatus = '贷款购买'
					}else if(this.carStatus == 3){
						this.carStatus = '已购'
					}
					if(res.data.data.idCard === null || res.data.data.idCard === undefined){
						this.shiming = '实名'
					}else if(res.data.data.idCard != ''){
						this.shiming = '已实名'
					}
					this.maritalStatus = res.data.data.maritalStatus
					if(this.maritalStatus == null || this.maritalStatus == undefined){
						this.maritalStatus = '暂无'
					}else if(this.maritalStatus == 1){
						this.maritalStatus = '未婚'
					}else if(this.maritalStatus == 2){
						this.maritalStatus = '离婚'
					}else if(this.maritalStatus == 3){
						this.maritalStatus = '丧偶'
					}
					if(res.data.data.monthPayMin == null){
						this.money = '暂无'
					}else{
						let monthPayMin = res.data.data.monthPayMin
						let monthPayMax = res.data.data.monthPayMax
						this.money = monthPayMin+'~'+monthPayMax
					}
					
					if(res.data.data.province == null){
						this.region = '暂无'
					}else if(res.data.data.city == null){
						this.region = `${res.data.data.province}`
					}else if(res.data.data.area == null){
						this.region = `${res.data.data.province} ${res.data.data.city}`
					}else{
						this.region = `${res.data.data.province} ${res.data.data.city} ${res.data.data.area}`
					}
					let img = res.data.data.photoUrl.replace('[','').replace(' ','').replace(']','')
					this.img_url = img.split(',')
					console.log(this.img_url)
					if(res.data.data.photoUrl != [] || res.data.data.photoUrl == null){
						this.to_photo = false
					}
					
				})
				.catch(err => {
					console.log(err)
				})
			},
			//获取点进来的用户是否被当前用户关注
			gzuser() {
				//获取当前用户id
				let id = uni.getStorageSync('userId')
				this.$http.post('lessonxiangqin/api/lessonisfensi', {
						userid: id,
						beiuserid: this.user_id
					}, {})
					.then(res => {
						console.log('粉丝信息走通')
						console.log(res.data)
						this.is_gz = res.data
					})
					.catch(err => {})
			},
			operate_moving(n, m) {
				if (n === 1) {
					this.$http
						.post('lessonxiangqin/api/lessoncommentspraise', {
							userid: uni.getStorageSync('userId'),
							id: this.moving[m].id,
						}, {})
						.then(res => {
							this.moving[m].pras = !this.moving[m].pras
						})
						.catch(err => {})
				} else if (n === 2) {
					uni.navigateTo({
						url: `/pages/xiangqin/index/userinfo?id=${this.moving[m].id}`
					})
				}
			},
			//关注
			guanzhu() {
				this.$http
					.post('lessonxiangqin/api/lessonguanzhu', {
						userid: uni.getStorageSync('userId'),
						beiuserid: this.user_id
					}, {})
					.then(res => {
						console.log(res)
						if (res.data === '取消关注') {
							this.is_gz = 0
						} else {
							this.is_gz = 1
						}
						// this.is_gz = !this.is_gz
					})
					.catch(err => {})
			},
			go_chat() {
				let payDeposit = uni.getStorageSync('payDeposit')
				console.log(this.liaotianrenshu)
				if (payDeposit != 2 && this.liaotianrenshu >= 3) {
					uni.showToast({
						title: '请前往个人中心，填写完整个人资料，并缴纳资料保证金，解锁聊天限制',
						icon: 'none',
						duration: 5000
					})
					setTimeout(res => {
						uni.navigateTo({
							url: './basics'
						})
					}, 5000)
				} else {
					uni.navigateTo({
						url: `/pages/xiangqin/HM-chat/HM-chat?id=${this.user_id}&name=${this.user_data.xiangqinname}`
					})
				}

			}
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		background-color: #F5F5F5;
	}

	.user_body {
		width: 100%;
		height: 100%;
		padding-bottom: 130upx;
	}

	.user_backimg {
		width: 100%;
		height: 388upx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.user_head {
		width: 100%;
		height: 220upx;
		position: relative;
		background-color: #fff;
		padding: 10upx 4%;
		box-sizing: border-box;

		.name {
			float: right;
			font-size: 36upx;
			font-weight: 600;
		}

		.geqian {
			width: 100%;
			min-height: 100upx;
			position: absolute;
			bottom: 0;
			display: flex;
			color: #C2C2C2;
			font-size: 32upx;

			.geqian_test {
				color: #696969;
			}
		}

		image {
			width: 120upx;
			height: 120upx;
			position: absolute;
			top: -60upx;
			left: 60upx;
			border-radius: 50%;
			border: 2px solid white;
		}
	}

	.perpsoon_ren {
		width: 100%;
		height: 160upx;
		margin: 15upx auto;
		background-color: #fff;
		color: #C2C2C2;
		padding: 10upx 4%;
		box-sizing: border-box;

		// display: flex;
		.perpsoon_tent {
			width: 100%;
			height: 110upx;
			display: flex;

			.nero {
				flex: 1;
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				color: black;
				font-size: 28upx;
				font-weight: 600;
			}

			// flex-direction: column;
			// align-items: center;
			// justify-content: center;
			image {
				width: 45upx;
				height: 45upx;
			}
		}
	}

	.album {
		width: 100%;
		height: 350upx;
		display: flex;
		background-color: #fff;
		color: #C2C2C2;
		padding: 10upx 4%;
		box-sizing: border-box;

		.album_img {
			width: calc(100% - 160upx);
			height: 100%;
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;

			image {
				width: 30%;
				height: 150upx;
				margin: 5upx;
			}
		}
	}

	.user_xinxi {
		width: 100%;
		height: 420upx;
		display: flex;
		margin: 10upx auto;
		padding: 10upx 4%;
		box-sizing: border-box;
		background-color: #fff;
		color: #C2C2C2;
		
		
		._xin {
			width: 30%;
			height: 100%;
			// margin: 0 0 0 30upx;
			// border: 1px solid red;
			display: flex;
			flex-direction: column;

			// justify-content: space-around;
			.views {
				width: 100%;
				flex: 1;
				display: flex;

				// justify-content: space-between;
				image {
					width: 40upx;
					height: 40upx;
					margin-right: 30upx;
				}
			}
			.viewss {
				width: 150%;
				flex: 1;
				display: flex;
			}
		}
	}
	.bottom {
		width: 100%;
		height: 120upx;
		position: fixed;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 15upx;
		box-sizing: border-box;
		background-color: #fff;
		border-top: 1px solid #F5F5F5;
		view {
			flex: 1;
			height: 60upx;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			line-height: 60upx;
			image {
				width: 40upx;
				height: 40upx;
			}
		}
		.liao {
			display: flex;
			align-items: center;
			justify-content: space-around;
			color: white;
			font-size: 28upx;
			border-radius: 50upx;
			background-color: #4EE0E0;
		}
	}
</style>
