<template>
	<view class="content">
		<view class="main">
			<view class="details">
				<image :src="qiyeList.logo"></image>
				<view class="_right">
					{{qiyeList.qiyename}}
				</view>
				<image src="../../static/guanwang.gif" mode="aspectFill"
				class="details_img"
				v-if="qiyeList.isguanfang === 1"></image>
				<!-- <view class="_last" @click="guanzhu">
					{{gz == true ? '已关注' : '+关注'}}
				</view> -->
				<view class="lianxi" @click="hujiao(qiyeList.shoujihao)">
					<i class="iconfont">&#xe622;</i>
				</view>
			</view>
			<view class="details_content">
				<view class="location_tonxun">
					<view class="lo_view">
						<text>公司简介:</text>
					</view>
					<view class="lo_views">
						<text>{{qiyeList.qiyejianjie ? qiyeList.qiyejianjie : '该公司很懒，什么也没有留下'}}</text>
					</view>
				</view>
				<view class="location_tonxun">
					<view class="lo_view">
						<text>通讯地址：</text>
					</view>
					<view class="lo_views">
						<text>{{qiyeList.tonxundizhi ? qiyeList.tonxundizhi : '暂无'}}</text>
					</view>
				</view>
				<view class="location_tonxun">
					<view class="lo_view">
						<text>企业官网：</text>
					</view>
					<view class="lo_views">
						<text>{{qiyeList.qiyeguanwang ? qiyeList.qiyeguanwang : '暂无'}}</text>
					</view>
				</view>
				<view class="location_tonxun">
					<view class="lo_view">
						<text>企业邮箱：</text>
					</view>
					<view class="lo_views">
						<text>{{qiyeList.email ? qiyeList.email : '暂无'}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="bottom_title">
				{{qiyeList.title}}
				<text>{{qiyeList.time}}</text>
			</view>
			<view class="bottom_content" v-html="qiyeList.neirong">
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '', //企业id
				gz: false,
				qiyeList: {}
			}
		},
		methods: {
			//渲染列表
			show () {
				this.$http.post('lessonaqi/api/lessonqiyehuzhuxiangqing',{
					userid: uni.getStorageSync('userId'),
					id: this.id
				},{})
				.then(res=>{
					console.log(res.data)
					this.qiyeList = res.data
					if (res.data.isguanzhu === 1) {
						this.gz = true
					}
				})
			},
			// 呼叫
			hujiao (e) {
				uni.makePhoneCall({
					phoneNumber: e
				})
			},
			//关注
			guanzhu () {
				this.$http.post('lessonaqi/api/lessonqiyeguanzhu',{
					userid: uni.getStorageSync('userId'),
					qiyeid: this.id
				},{})
				.then(res=>{
					this.gz = !this.gz
					if (this.gz == true) {
						uni.showToast({
							title:'关注成功',
							icon:'success'
						})
					} else {
						uni.showToast({
							title:'取消关注',
							icon:'success'
						})
					}
					
				})
				.catch(err=>{
					console.log(err)
				})
			}
		},
		onLoad(option) {
			this.id = option.data
			this.show()
		}
	}
</script>

<style lang="scss">
	.content{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.main{
		width: 94%;
		height: 100%;
		border: 1px solid #F2F2F2;
		margin: 20rpx auto;
		border-radius: 20rpx;
	}
	.details{
		width: 100%;
		height: 120upx;
		display: flex;
		justify-content: space-between;
		// border: 1px solid red;
		// border-bottom: 1px solid #F5F5F5;
		position: relative;
		.details_img{
			width: 145rpx;
			height: 45rpx;
			position: absolute;
			bottom: -10upx;
			left: 120upx;
		}
		.lianxi{
			width: 60upx;
			height: 60upx;
			border-radius: 50%;
			background-color: #4CD964;
			text-align: center;
			line-height: 52upx;
			font-size: 40upx;
			color: white;
			position: absolute;
			right: 10upx;
			bottom: 30upx;
		}
		._right {
			position: absolute;
			left: 140upx;
			bottom: 60upx;
			font-size: 30rpx;
		}
		._last{
			width: 120upx;
			height: 40upx;
			font-size: 32upx;
			text-align: center;
			line-height: 40upx;
			background-color: red;
			color: white;
			border-radius: 20upx;
			margin-top: 40upx;
			margin-right: 10upx;
		}
	}
	.details image{
		width:100rpx;
		height: 100rpx;
		border-radius: 100upx;
		margin-top:10rpx;
		margin-bottom: 20rpx;
		margin-left: 20rpx;
	}
	 .tit{
	 	align-items:center;
		font-size:30rpx;
		display: flex;
	}
	.details_content{
		/* width:100%; */
		margin: 20rpx;
		word-break : normal;
		font-size:28rpx ;
		.location_tonxun{
			width: 99%;
			margin: 20upx auto;
			display: flex;
			justify-content: space-between;
			
			.lo_view{
				font-size: 28upx;
				width: 26%;
				// border: 1px solid red;
			}
			.lo_views{
				width: 74%;
				text-align: left;
				// border-bottom:1px solid #F3F3F3;
			}
		}
	}
	.bottom{
		width: 94%;
		margin: 20upx auto;
		.bottom_title{
			display: flex;
			position: relative;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
			padding-left: 20upx;
			box-sizing: border-box;
			font-size: 36upx;
			width: 100%;
			font-weight: 600;
			text-align: left;
			margin: 10upx auto;
			text{
				display: block;
				position: absolute;
				right: 10upx;
				bottom: -46upx;
				font-size: 28upx;
				color: #696969;
				font-weight: 500;
			}
		}
		.bottom_content{
			// border: 1px solid #C1C1C1;
			width: 98%;
			margin: 60upx auto;
			border-radius: 10upx;
			padding-left: 20upx;
		}
	}
	
</style>
