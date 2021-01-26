<template>
	<view class="shopDetails">
		<view class="shopDetails_msg">
			<view class="shopDetails_msg_img">
				<image :src="shopList.fengmian" mode="aspectFit"></image>
			</view>
			<view class="shopDetails_msg_content">
				<text class="text1">{{shopList.jiage}}</text><text class="text2">积分</text>
				<text class="text3">已兑换{{shopList.duihuannum}}次</text>
				<p>{{shopList.name}}</p>
			</view>
			<view class="shopDetails_msg_guize">
				<!-- <view class="" v-html="shopList.neirong">
					
				</view> -->
			</view>
		</view>
		<view class="shopDetails_button" @click="duihuan">
			<button>立即兑换</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num: '',
				id: '', //商品id
				shopList:{}
			}
		},
		methods: {
			//立即兑换
			duihuan () {
				if (this.num < this.shopList.lianxuqiandao) {
					this.$api.msg('连续签到天数不够')
					return
				}
				uni.navigateTo({
					url:'./dingdan?data=' + this.id,
					animationType:'pop-in'
				})
			},
			//展示
			show () {
				this.$http.post('lessonaqi/api/lessonshangpinxiangqing',{
					id: this.id
				},{})
				.then(res=>{
					console.log(res.data)
					this.shopList = res.data
				})
				.catch(err=>{
					console.log(err)
				})
			}
		},
		onLoad (option) {
			console.log(option)
			let can = JSON.parse(option.data)
			this.id = can.id
			this.num = can.num
			this.show()
		}
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height: 100%;
	}
	.shopDetails{
		width: 100%;
		height: 100%;
		.shopDetails_msg{
			width: 98%;
			height: calc(100% - 90upx);
			overflow: scroll;
			margin: auto;
			padding-top: 10upx;
			.shopDetails_msg_img {
				width: 100%;
				height: 392upx;
				background-color: #fff;
				border-radius: 20upx;
				image{
					width: 100%;
					height: 100%;
					border-radius: 20upx;
				}
			}
		}
		.shopDetails_msg_content{
			width: 98%;
			height: 164upx;
			margin: 10upx auto;
			position: relative;
			padding-top: 20upx;
			padding-left: 20upx;
			box-sizing: border-box;
			border: 1px solid #BBBBBB;
			border-radius: 10upx;
			.text1{
				font-size: 36upx;
				font-weight: 600;
				color: red;
			}
			.text2{
				font-size: 30upx;
				font-weight: 600;
				color: red;
			}
			.text3{
				position: absolute;
				font-size: 32upx;
				right: 20upx;
				top: 20upx;
			}
			p{
				font-size: 32upx;
				font-weight: 600;
				margin-top: 20upx;
			}
		}
		.shopDetails_msg_guize{
			width: 98%;
			padding-left: 20upx;
			margin: 10upx auto;
			border-radius: 10upx;
			box-sizing: border-box;
			border: 1px solid #BBBBBB;
			.guize_one{
				width: 100%;
				height: 80upx;
				display: flex;
				line-height: 80upx;
				font-size: 36upx;
				font-weight: 600;
				.dian{
					width: 20upx;
					height: 20upx;
					border-radius: 50%;
					background-color: black;
					margin-top: 30upx;
					// margin-left: 20upx;
					margin-right: 30upx;
				}
				view{
					width: 100%;
					// height: 2000upx;
					margin: auto;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
	//button按钮
	.shopDetails_button{
		width: 98%;
		height: 80upx;
		position: fixed;
		bottom: 10upx;
		left: 8upx;
		// border-radius: 50upx;
		// overflow: hidden;
		button{
			width: 100%;
			height: 80upx;
			font-size: 32upx;
			background-color: white;
			border: 1px solid #BFBFBF;
			text-align: center;
			line-height: 80upx;
			border-radius: 50upx;
			
		}
	}
</style>
