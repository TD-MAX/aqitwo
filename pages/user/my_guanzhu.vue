<template>
	<scroll-view scroll-y="true" class="my_guanzhu" @scrolltolower="chudi">
		<view class="_guanzhu" v-if="typeList.length === 0">
			<u-empty :mode="'data'">
				<!-- <u-button v-if="slot" slot="bottom" size="medium">
					slot按钮
				</u-button> -->
			</u-empty>
		</view>
		<view class="news" v-for="(item,index) in typeList" :key="index" v-else>
			<view class="business">
				<view class="_left" @click="to_qiyemsg(item.qiyeid)">
					<image :src="item.qiyelogo" mode="aspectFill"></image>
				</view>
				<view class="_right" @click="to_qiyemsg(item.qiyeid)">
					<view class="tit">{{item.qiyename}}</view>
				</view>
				<view class="_last" @click="guanzhu(index)">
					{{item.isguanzhu == 1 ? '已关注' : '+关注'}}
				</view>
				<view class="_rightlogo">
					<image src="../../static/guanwang.gif" mode="aspectFill" v-if="item.isguanfang === 1"></image>
				</view>
			</view>
			<!-- <view class="news_content" @click="qiyezixun(index)" v-if="item.zixunid">
				<image :src="item.zixunfengmian" mode="aspectFill"></image>
				<view class="_right">
					<view class="tit">【咨询】{{item.zixuntitle}}</view>
					<view class="_bottom">
						<view class="num">
							<text>浏览量</text>
							<text>{{item.zixunrenshu}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="news_bottom" v-if="item.zhaopinid" @click="zhaopinzixun(index)">
				<view class="_lefts">
					<view class="tit">【招聘】{{item.zhaopintitle}}</view>
				</view>
				<image :src="item.zhaopinfengmian" mode="aspectFill"></image>
			</view> -->
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				pageNum: 1,
				typeList: [],
				loading: 'more' //是否继续向下请求
			}
		},
		methods: {
			//我的关注列表
			show() {
				if (this.loading === 'more') {
					this.$http.post('lessonaqi/api/lessonwodeguanzhu', {
							pageNum: this.pageNum,
							pageSize: 5,
							userid: uni.getStorageSync('userId')
						}, {})
						.then(res => {
							if (res.data.rows) {
								this.typeList = this.typeList.concat(res.data.rows)
							}
							console.log(this.typeList)
							let more_page = Math.ceil(res.data.total/5)
							if (more_page === this.pageNum) {
								this.loading = 'nomore'
							}
							this.pageNum += 1
						})
						.catch(err => {
							console.log(err)
						})
				} else {
					this.$api.msg('没有更多数据了')
				}

			},
			//关注
			guanzhu(ent) {
				this.$http.post('lessonaqi/api/lessonqiyeguanzhu', {
						userid: uni.getStorageSync('userId'),
						qiyeid: this.typeList[ent].qiyeid
					}, {})
					.then(res => {
						if (this.typeList[ent].isguanzhu == 1) {
							this.typeList[ent].isguanzhu = 0
							this.$api.msg('取消关注')
						} else {
							this.typeList[ent].isguanzhu = 1
							this.$api.msg('关注成功')
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			//企业信息
			to_qiyemsg(evt) {
				uni.navigateTo({
					url: '../news/details?data=' + evt,
					animationType: 'pop-in'
				})
			},
			//企业资讯
			qiyezixun(e) {
				uni.navigateTo({
					url: '../news/qiyeZx?data=' + this.typeList[e].zixunid,
					animationType: 'pop-in'
				})
			},
			//招聘资讯
			zhaopinzixun(n) {
				uni.navigateTo({
					url: '../news/qiyeZx?data=' + this.typeList[n].zhaopinid
				})
			},
			//滚动到底部刷新
			chudi() {
				this.show()
			}
		},
		onLoad() {
			this.show()
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
		// background-color: #3f3e51;
		background-color: #F5F5F5;
	}
	.my_guanzhu {
		width: 100%;
		height: 100%;
	}
	._guanzhu {
		width: 80%;
		height: 80upx;
		margin: 100upx auto;
		text-align: center;
		line-height: 80upx;
		color: #000;
		font-size: 36upx;
	}
	.business {
		position: relative;
		display: flex;
		border-bottom: 1px solid #F2F2F2;
	}

	.business {
		width: 100%;
		height: 120upx;
		display: flex;
		justify-content: space-between;

		._left {
			width: 100upx;
			height: 100upx;
			margin-top: 10upx;
		}

		._left image {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			// margin-left: 15px;
		}

		._right {
			position: absolute;
			left: 120upx;
			bottom: 60upx;
		}

		._last {
			width: 120upx;
			font-size: 28upx;
			margin-top: 40upx;
			height: 40upx;
			border-radius: 20upx;
			text-align: center;
			line-height: 40upx;
			border: 1px solid #FFCC7B;
			background-color: #FFE8C3;
			color: #FFA318;
		}

		.tit {
			align-items: center;
			font-size: 30rpx;
			display: flex;
		}

		._rightlogo {
			position: absolute;
			bottom: 0;
			left: 120upx;
		}

		._rightlogo image {
			width: 145rpx;
			height: 45rpx;
		}
	}

	.tit {
		align-items: center;
		font-size: 28rpx;
		display: flex;
		flex: 1;
		margin-right: 10rpx;
	}

	.news_bottom {
		display: flex;
		justify-content: space-between;
		padding-bottom: 20rpx;
		border-bottom: 1px solid #F2F2F2;

		._lefts {
			width: calc(100% - 160upx);
			max-height: 80upx;
			margin: 30upx auto;
			// border: 1px solid red;
			overflow: hidden;
		}
	}

	.news_bottom image {
		width: 140rpx;
		height: 100rpx;
		border-radius: 10rpx;
		display: block;
		float: right;
	}

	.news {
		// height: 600rpx;
		background-color: #fff;
		width: 94%;
		display: flex;
		flex-direction: column;
		padding: 0 20rpx;
		margin: 10upx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
	}

	.news_content {
		// flex: 1;
		display: flex;
		align-items: center;
		margin-bottom: 12rpx;
		margin-top: 20rpx;
		border-bottom: 1px solid #F2F2F2;
		padding-bottom: 10px;

		image {
			width: 240rpx;
			height: 150rpx;
			border-radius: 12rpx;
		}

		._right {
			width: calc(100% - 260upx);
			display: flex;
			padding-left: 20rpx;
			flex-direction: column;

			.tit {
				font-size: 28rpx;
				color: #333;
				box-sizing: border-box;
				// border: 1px solid red;
				max-height: 120upx;
				overflow: hidden;
				text-align: left;
				// text-overflow: ellipsis;
				// overflow: hidden;
				// display: -webkit-box;
				// -webkit-line-clamp: 2;
				// -webkit-box-orient: vertical;
			}

			._bottom {
				display: flex;
				align-items: center;
				// box-sizing: border-box;
				// border: 1px solid red;
				justify-content: space-between;
				padding-top: 20rpx;

				.like {
					display: flex;

					view {
						display: flex;
						align-items: center;
						color: #999;
						padding-right: 20rpx;

						i {
							font-size: 24rpx;
							padding-right: 10rpx;
						}

						text {
							font-size: 28rpx;
						}
					}
				}
			}

			.num {
				display: flex;
				align-items: center;

				text {
					font-size: 28rpx;
					color: #999;
				}
			}
		}
	}
</style>
