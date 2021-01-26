<template>
	<view class="content">
		<view class="main">
			<view class="details">
				<image :src="qiyeList.logo"></image>
				<view class="_right">
					{{qiyeList.qiyename}}
				</view>
				<image src="../../static/guanwang.gif" mode="aspectFill"
				class="details_img"></image>
				<view class="_last" @click="guanzhu">
					{{gz == true ? '已关注' : '关注'}}
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
		<view class="details_zz">
			<view class="detail_item" v-for="(item,index) in titList" 
			:key="index" :class="{'detail_items' : index === tabIndex}"
			@click="dianji(index)">
				{{item}}
			</view>
		</view>
		<view class="news_content" @click="_details(n.id)" v-for="(n, index) in news_list">
			<image :src="n.fengmian" mode=""></image>
			<view class="_right">
				<text class="tit">{{n.title}}</text>
				<view class="_bottom">
					<!-- <view class="like">
						<view class="">
							<i class="iconfont">&#xe755;</i>
							<text>{{n.shoucangnum}}</text>
						</view>
						<view class="">
							<i class="iconfont">&#xe60a;</i>
							<text>{{n.dianzannum}}</text>
						</view>
					</view> -->
					<view class="num">
						<text>浏览量</text>
						<text>{{n.yuedu}}</text>
					</view>
				</view>	
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				titList:['资讯','招聘'],
				tabIndex:0,
				news_list:[],
				qiyeList:{},
				gz:'',
				id:'',
			}
		},
		methods: {
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
			},
			//点击
			dianji (e) {
				this.tabIndex = e
				this.show()
			},
			//跳往详细信息
			_details (event) {
				uni.navigateTo({
					url:'./qiyeZx?data=' + event
				})
			},
			init () {
				this.$http.post('lessonaqi/api/lessonqiyexq',{
					userid: uni.getStorageSync('userId'),
					id:this.id
				},{})
				.then(res=>{
					console.log(res.data)
					this.qiyeList = res.data
					if (this.qiyeList.isguanzhu == 1) {
						this.gz = true
					} else {
						this.gz = false
					}
				})
				.catch(err=>{
					console.log(err)
				})
			},
			//企业咨询展示
			show () {
				this.$http.post('lessonaqi/api/lessonqiyezixunlb',{
					pageNum:1,
					pageSize:5,
					type: this.tabIndex,
					qiyeid:this.id
				},{})
				.then(res=>{
					console.log(res.data)
					this.news_list = res.data.rows
				})
				.catch(err=>{
					console.log(err)
				})
			}
		},
		onLoad(option) {
			console.log(option.data)
			this.id = option.data
			this.init()
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
			background-color: #FFE8C3;
			color: #FFA318;
			border: 1px solid #FFCC7B;
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
	// .tit{
	// 	align-items:center;
	// 	font-size:30rpx;
	// 	display: flex;
	// }
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
	.details_zz{
		width: 94%;
		margin: auto;
		height: 80upx;
		box-sizing: border-box;
		overflow: hidden;
		border: 1px solid #F5F5F5;
		border-radius: 20upx;
		display: flex;
		.detail_item{
			width: 50%;
			height: 100%;
			text-align: center;
			line-height: 80upx;
		}
		.detail_items{
			width: 50%;
			height: 100%;
			text-align: center;
			line-height: 80upx;
			background-color: #3F3E51;
			color: white;
		}
	}
	.news_content{
		height: 200rpx;
		width: 94%;
		box-sizing: border-box;
		padding: 25rpx 0;
		// border: 1px solid red;
		display: flex;
		align-items: center;
		background: #fff;
		box-sizing: border-box;
		border-bottom: 1px solid #F2F2F2;//分割线颜色
		
		image{
			width: 240rpx;
			height: 150rpx;
			border-radius: 10upx;
		}
		._right{
			height: 100%;
			flex: 1;
			display: flex;
			padding-left: 20rpx;
			flex-direction: column;
			justify-content: space-between;
			.tit{
				font-size: 30rpx;
				color: #333;
			}
			._bottom{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.like{
					display: flex;
					view{
						display: flex;
						align-items: center;
						color: #999;
						padding-right: 20rpx;
						i{
							font-size: 24rpx;
							padding-right: 10rpx;
						}
						text{
							font-size: 28rpx;
							
						}
					}
				}
			}
			.num{
				display: flex;
				align-items: center;
				text{
					padding-left: 10rpx;
					font-size: 28rpx;
					color: #999;
				}
			}
		}
	}
</style>
