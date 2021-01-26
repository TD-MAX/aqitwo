<template>
	<view class="select_location">
		
		<view class="select_location_content">
			<view class="select_msg" 
			v-for="(item,index) in locationList" :key="index"
			>
				<view class="select" 
				:class="{'selectxz' : seIndex === index}"
				@click="select_to(index)">
					<i class="iconfont" 
					v-show = "seIndex === index">&#xebe6;</i>
				</view>
				<view class="user_msg">
					<text>{{item.lianxiren}}</text>
					<text>{{item.shoujihao}}</text>
					<text class="location">{{item.sheng}}{{item.shi}}{{item.qu}}{{item.dizhi}}</text>
				</view>
				<view class="_bianji" @click="updata_to(item.dizhiid)">
					<image src="../../../static/aqiuser/598ab1686ac9479042fbd1417add869.png" mode=""></image>
				</view>
			</view>
		</view>
		
		<view class="news_location" @click="news_location">
			<button>+新建收货地址</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				seIndex: this.$store.state.seIndex,
				locationList:[] //地址列表
			}
		},
		methods: {
			//新建收货地址
			news_location () {
				uni.navigateTo({
					url:'./new_location',
					animationType: 'pop-in'
				})
			},
			//选择收货地址
			select_to (x) {
				this.seIndex = x
				this.$store.state.seIndex = x
			},
			//编辑收货地址
			updata_to (e) {
				uni.navigateTo({
					url: './new_location?data=' + e,
					animationType: 'pop-in'
				})
			},
			//收货地址列表
			show () {
				this.$http.post('lessonaqi/api/lessonuserdizhilist',{
					userid: uni.getStorageSync('userId'),
					pageNum: 1,
					pageSize: 5
				},{})
				.then(res=>{
					console.log(res)
					this.locationList = res.data.rows
				})
				.catch(err=>{
					console.log(err)
				})
			}
		},
		onBackPress() {
			uni.setStorage({
				key:'dizhi',
				data: {
					name: this.locationList[this.seIndex].lianxiren,
					phone: this.locationList[this.seIndex].shoujihao,
					sheng: this.locationList[this.seIndex].sheng,
					shi: this.locationList[this.seIndex].shi,
					qu: this.locationList[this.seIndex].qu,
					xiangxi: this.locationList[this.seIndex].dizhi
				}
			})
		},
		onLoad() {
			this.show()
		},
		onShow() {
			this.show()
		}
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height: 100%;
	}
	.select_location{
		width: 100%;
		height: 100%;
	}
	.select_location_content{
		width: 100%;
		height: calc(100% - 155upx);
		box-sizing: border-box;
		overflow: scroll;
		// border: 1px solid red;
		margin: auto;
		
		.select_msg{
			width: 96%;
			min-height: 120upx;
			margin: 20upx auto;
			border-radius: 10upx;
			border: 1px solid #C1C1C1;
			display: flex;
			justify-content: space-around;
			.select{
				width: 40upx;
				height: 40upx;
				margin-top: 40upx;
				border-radius: 50%;
				text-align: center;
				line-height: 40upx;
				font-size: 28upx;
				border: 1px solid #C1C1C1;
			}
			.selectxz{
				width: 40upx;
				height: 40upx;
				margin-top: 40upx;
				border-radius: 50%;
				text-align: center;
				line-height: 40upx;
				font-size: 28upx;
				color: white;
				background-color: red;
			}
			.user_msg{
				width: 75%;
				height: 100%;
				padding-top: 20upx;
				// padding-left: 20upx;
				text{
					font-size: 32upx;
					margin-right: 30upx;
				}
				.location{
					display: block;
					font-size: 28upx;
				}
			}
			._bianji{
				width: 80upx;
				height: 120upx;
				// border: 1px solid red;
				image{
					width: 40upx;
					height: 40upx;
					margin-top: 40upx;
				}
			}
		}
	}
	.news_location{
		width: 100%;
		height: 150upx;
		position: fixed;
		bottom: 0;
		background-color: #F5F5F5;
		button{
			width: 75%;
			height: 80upx;
			font-size: 28upx;
			text-align: center;
			border-radius: 50upx;
			line-height: 80upx;
			margin: 35upx auto;
			background-color: red;
			color: white;
		}
	}
</style>
