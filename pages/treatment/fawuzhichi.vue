<template>
	<view class="fawu">
		<view class="fawu_header">
			律己师法 融智利人
		</view>
		<view class="fawu_nav">
			<view class="" v-for="(item,index) in headList" :key="index" @click="to(item.path)">
				<image :src="item.src" mode="aspectFit"></image>
				<text>{{item.text}}</text>
				<text>{{item.texts}}</text>
			</view>
		</view>
		<view class="falv_know">
			<view class="">
				案情解读
			</view>
			<!-- <view class="" @click="wei">
				<text>查看更多>></text>
			</view> -->
		</view>
		<scroll-view scroll-y="true" class="_connier">
			<view class="know_content" v-for="(item,index) in anlist" :key="index" @click="xiangxi(item.id)">
				<view class="know_left">
					<view class="know_title">
						<text>{{item.anqingjieshao}}</text>
					</view>
					<view class="know_chu" v-if="item.shoulilvshi">
						<view class="">
							<image src="../../static/photo.png" mode="aspectFit"></image>
							<p>{{item.shoulilvshi}}</p>
						</view>
						<!-- <text>11692人阅读</text> -->
					</view>
				</view>
				<view class="know_right">
					<image src="../../static/fawujia.jpg" mode="aspectFill">
						
					</image>
				</view>
			</view>
		</scroll-view>
		<!-- <view class="falv_know2">
			<view class="">
				视频说法
			</view>
			<view class="" @click="wei">
				<text>查看更多>></text>
			</view>
		</view>
		<view class="know_content" @click="wei">
			<view class="know_left">
				<view class="know_title">
					<text>尚未取得房产证的房屋怎么分</text>
				</view>
				<view class="know_chu">
					<view class="">
						<image src="../../static/photo.png" mode="aspectFit"></image>
						<p>焦宇飞律师</p>
					</view>
					<text>11692人阅读</text>
				</view>
			</view>
			<view class="know_right">
				<image src="../../static/fawufang.jpg" mode="aspectFit">
					
				</image>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				headList: [
					{
						text: '问答',
						texts: '免费问答',
						src: '../../static/qyservice/fawuwenda.png',
						path: './cate'
					},
					{
						text: '在线咨询',
						texts: '极速问答',
						src: '../../static/qyservice/fawuzixun.png'
					},
					{
						text: '找律师',
						texts: '精准查询',
						src: '../../static/qyservice/fawulvshi.png',
						path: './chazhaoLvshi'
					}
				],
				videoList: [], //宣传视频列表
				anlist: [] //案例列表
			}
		},
		methods: {
			//去往页面
			to (e) {
				if (e) {
					uni.navigateTo({
						url: e,
						animationType: 'pop-in'
					})
				} else {
					this.$api.msg('尚未完善，敬情期待')
				}
			},
			//案情列表
			anqin () {
				this.$http.post('lessonaqi/api/lessongetanli',{
					pageNum: 1,
					pageSize: 10
				},{})
				.then(res => {
					console.log(res)
					// for (var i=0; i<2; i++) {
					// 	this.anlist.push(res.data.rows[i])
					// }
					this.anlist = this.anlist.concat(res.data.rows)
				})
				.catch(err => {
					console.log(err)
				})
			},
			//案情详细
			xiangxi (value) {
				uni.navigateTo({
					url: './fawu_xiangxi?data=' + value
				})
			},
			//宣传视频列表
			// vidao () {
			// 	this.$http.post('lessonaqi/api/lessongetshipin',{
			// 		pageNum: 1,
			// 		pageSize: 10
			// 	},{})
			// 	.then(res => {
			// 		console.log(res)
			// 	})
			// 	.catch(err => {
			// 		console.log(err)
			// 	})
			// },
			//未完成
			wei () {
				this.$api.msg('尚未完善，敬情期待')
			}
		},
		onLoad() {
			this.anqin()
			// this.vidao()
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
		background-color: #F5F5F5;
	}
	.fawu {
		width: 100%;
		height: 100%;
	}
	.fawu_header {
		width: 100%;
		height: 180upx;
		background-image: url(../../static/qyservice/fawubeijin1.png);
		background-size: 100% 100%;
		text-align: center;
		color: white;
		font-size: 36upx;
		font-weight: 600;
	}
	.fawu_nav {
		width: 96%;
		height: 210upx;
		margin: -110upx auto;
		border-radius: 20upx;
		background-color: #fff;
		display: flex;
		justify-content: space-around;
		view {
			width: 28%;
			height: 100%;
			font-size: 28upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			image{
				width: 80upx;
				height: 80upx;
				border-radius: 50%;
				margin-bottom: 10upx;
			}
		}
	}
	.falv_know {
		width: 96%;
		height: 80upx;
		margin: 120upx auto 0 auto;
		line-height: 80upx;
		display: flex;
		justify-content: space-between;
		text {
			font-size: 28upx;
		}
	}
	._connier {
		width: 100%;
		height: calc(100% - 370upx);
		// border: 1px solid red;
		box-sizing: border-box;
	}
	.know_content {
		width: 96%;
		height: 220upx;
		margin: 20upx auto;
		border-radius: 20upx;
		box-sizing: border-box;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		padding: 20upx;
		.know_left {
			width: 62%;
			display: flex;
			// border: 1px solid red;
			font-size: 30upx;
			flex-direction: column;
			justify-content: space-between;
			.know_title {
				line-height: 45upx;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}
			.know_chu {
				width: 100%;
				height: 80upx;
				line-height: 80upx;
				display: flex;
				justify-content: space-between;
				// border: 1px solid red;
				view {
					width: 60%;
					// border: 1px solid black;
					height: 80upx;
					display: flex;
					line-height: 80upx;
				}
				image {
					margin: 10upx 10upx 10upx 0;
					width: 60upx;
					height: 60upx;
					border-radius: 50%;
				}
				text {
					font-size: 26upx;
				}
			}
		}
		.know_right {
			width: 35%;
			box-sizing: border-box;
			// border: 1px solid red;
			image {
				width: 240upx;
				height: 170upx;
				border-radius: 20upx;
			}
		}
	}
	.falv_know2 {
		width: 96%;
		height: 80upx;
		margin: 10upx auto;
		line-height: 80upx;
		display: flex;
		justify-content: space-between;
		text {
			font-size: 28upx;
		}
	}
</style>
