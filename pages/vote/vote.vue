<template>
	<view class="vote_body">
		<view class="vote_nav">
			<u-swiper class="swipers" :list="imgList" 
			:height="420" :imgMode="'aspectFet'"></u-swiper>
			<view class="vote_nav_bottom">
				<view class="y_bm">
					<image src="../../static/paihangban/baoming.png" mode="aspectFit"></image>
					<text style="font-size: 24upx; color: grey;">已报名</text>
					<text class="nums">{{nums}}</text>
				</view>
				<view class="l_ll">
					<image src="../../static/paihangban/liulan.png" mode="widthFix"></image>
					<text style="font-size: 24upx; color: grey; margin-left: 20upx;">浏览量</text>
					<text class="nums">{{lius}}</text>
				</view>
			</view>
		</view>
		<view class="vote_search">
			<!-- <u-search :type="'text'" v-model="text_value" 
			:placeholder="'搜索名称或者编号'" :shape="'square'" :show-action="showAction"></u-search> -->
			<image src="../../static/xiangqin/sousuo.png"></image>
			<input type="text" placeholder="搜索名称或者编号" 
			style="font-size: 28upx;" v-model="text_value"
			@input="searchs">
		</view>
		<view class="vote_three">
			<view class="vote_three_box tu1">
				<view class="three_box_top">
					<image class="images"
					src="../../static/paihangban/first.png" mode="aspectFit"></image>
					<view class="top_views bj1">
						<text>{{one.enterpriseName}}</text>
					</view>
				</view>
				<view class="three_box_bottom">
					<image class="images"
					:src="one.enterpriseLogo" mode="aspectFit"></image>
					<view class="bianhao">
						<p>编号: {{one.code}}号</p>
						<p>支持: <text style="color: red; font-size: 30upx;"> {{one.hit}}</text>次</p>
					</view>
					<view class="zhichi">
						<view class="zhichi_button" @click="sustain(one.id,1)">
							<view>支持他</view>
						</view>
						<!-- <view class="zhichi_button" >
							<view style="color: red;">已支持</view>
						</view> -->
					</view>
					
				</view>
			</view>
			<view class="vote_three_box tu2">
				<view class="three_box_top">
					<image class="images"
					src="../../static/paihangban/twree.png" mode="aspectFit"></image>
					<view class="top_views bj2">
						<text>{{two.enterpriseName}}</text>
					</view>
				</view>
				<view class="three_box_bottom">
					<image class="images"
					:src="two.enterpriseLogo" mode="aspectFit"></image>
					<view class="bianhao">
						<p>编号:{{two.code}}号</p>
						<p>支持: <text style="color: red; font-size: 30upx;">{{two.hit}}</text>次</p>
					</view>
					<view class="zhichi">
						<view class="zhichi_button" @click="sustain(two.id,2)">
							<view>支持他</view>
						</view>
					</view>
				</view>
			</view>
			<view class="vote_three_box tu3">
				<view class="three_box_top">
					<image class="images"
					src="../../static/paihangban/three.png" mode="aspectFit"></image>
					<view class="top_views bj3">
						<text>{{three.enterpriseName}}</text>
					</view>
				</view>
				<view class="three_box_bottom">
					<image class="images"
					:src="three.enterpriseLogo" mode="aspectFit"></image>
					<view class="bianhao">
						<p>编号:{{three.code}}号</p>
						<p>支持: <text style="color: red; font-size: 30upx;">{{three.hit}}</text>次</p>
					</view>
					<view class="zhichi">
						<view class="zhichi_button" @click="sustain(three.id,3)">
							<view>支持他</view>
						</view>
					</view>
				</view>
			</view>
			<view class="vote_three_box">
				<view class="three_box_top">
					<image src="../../static/paihangban/last.png" mode="aspectFit"></image>
					<text class="five">第4名</text>
					<view class="top_views">
						<text>{{four.enterpriseName}}</text>
					</view>
				</view>
				<view class="three_box_bottom">
					<image class="images"
					:src="four.enterpriseLogo" mode="aspectFit"></image>
					<view class="bianhao">
						<p>编号:{{four.code}}号</p>
						<p>支持: <text style="color: red; font-size: 30upx;">{{four.hit}}</text>次</p>
					</view>
					<view class="zhichi">
						<view class="zhichi_button" @click="sustain(four.id,4)">
							<view>支持他</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="">
			<u-divider 
			color="red" border-color="red" half-width="100%">加油！马上就到前四啦！！！</u-divider>
		</view>
		<view class="vote_three" v-for="(item,index) in lists" :key="index">
			<view class="vote_three_box">
				<view class="three_box_top">
					<image src="../../static/paihangban/last.png" mode="aspectFit"></image>
					<text class="five">第{{index + 5}}名</text>
					<view class="top_views">
						<text>{{item.enterpriseName}}</text>
					</view>
				</view>
				<view class="three_box_bottom">
					<image class="images"
					:src="item.enterpriseLogo" mode="aspectFit"></image>
					<view class="bianhao">
						<p>编号:{{item.code}}号</p>
						<p>支持: <text style="color: red; font-size: 30upx;">{{item.hit}}</text>次</p>
					</view>
					<view class="zhichi">
						<view class="zhichi_button" @click="sustain(item.id, index+5)">
							<view>支持他</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom_lan">
			<!-- <view class="bottom_kefu">
				<text>客服</text>
			</view>
			<view class="bottom_fankui">
				<text>反馈</text>
			</view> -->
			<view class="bottom_huodong" @click="guize_active">
				<text>活动规则</text>
			</view>
			<view class="bottom_cansai" @click="cansai_active(name)">
				<text>立即参赛</text>
			</view>
		</view>
	</view>
</template>

<script>
	import _ from 'lodash'
	export default {
		data() {
			return {
				imgList: [
					{
						image: 'https://qilianxiangqin.oss-cn-beijing.aliyuncs.com/html5/tp.png',
						title: ''
					},
					{
						image: 'https://qilianxiangqin.oss-cn-beijing.aliyuncs.com/html5/tp2.png',
						title: ''
					}
				],
				lius: 0,
				nums: '',
				text_value: '',
				one: {},
				two: {},
				three: {},
				four: {},
				lists: [],
				showAction:false,
				id: '',
				href: '',
				name: ''
			}
		},
		methods: {
			//活动规则
			guize_active () {
				uni.navigateTo({
					url: './vote_guize',
					animationType: 'pop-in'
				})
			},
			//立即参赛
			cansai_active (e) {
				uni.navigateTo({
					url: './cansai?name=' + e,
					animationType: 'pop-in'
				})
			},
			//获取活动列表
			show () {
				this.$http.post('lessonaqi/api/activityManageDetail',{
					activityManageId: this.id
				},{})
				.then(res => {
					console.log(res)
					if (res.data.msg === '获取成功') {
						console.log(res.data.data.activityList[0])
						this.one = res.data.data.activityList[0]
						this.two = res.data.data.activityList[1]
						this.three = res.data.data.activityList[2]
						this.four = res.data.data.activityList[3]
						this.nums = res.data.data.activityList.length
						for (var i=0;i<res.data.data.activityList.length;i++) {
							if (i > 3) {
								this.lists.push(res.data.data.activityList[i])
								console.log(res.data.data.activityList[i])
							}
						}
					}
				})
				.catch(err => {
					console.log(err)
				})
			},
			//支持他
			sustain (value,index) {
				var can = {
					id: value,
					mingci: index
				}
				uni.navigateTo({
					url: './vote_xiang?data=' + JSON.stringify(can)
				})
			},
			//模糊查询
			searchs () {
				
			}
		},
		onNavigationBarButtonTap() {
			// plus.runtime.openURL('http://aqi.tdkj.online/lessonaqi/api/toupiao?activitymanageid=1')
			uni.share({
				provider: "weixin",
				scene: "WXSceneSession",
				type: 0,
				href: this.href,
				imageUrl: 'https://qilianxiangqin.oss-cn-beijing.aliyuncs.com/html5/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20210127183037.png',
				title:'山西省名优企业活力榜投票活动，邀您参加！',
				success(res) {
					console.log("success:" + JSON.stringify(res));
				},
				fail(err) {
					console.log("fail:" + JSON.stringify(err));
				}
			})
		},
		onLoad(option) {
			console.log(option)
			let data = JSON.parse(option.data)
			this.id = data.id
			this.name = data.name
			this.lius = data.liu
			this.href = 'http://aqi.tdkj.online/lessonaqi/api/toupiao?activitymanageid=' + this.id
			this.show() // 获取列表
		}
	}
</script>

<style lang="scss">
	.vote_body {
		width: 100%;
		height: 100%;
		padding-bottom: 100upx;
	}
	.vote_nav {
		width: 100%;
		height: 420upx;
		// border: 1px solid red;
		position: relative;
		// background-image: url(../../static/paihangban/toupiao.png);
		background-size: 100% 100%;
		.vote_nav_bottom {
			width: 94%;
			height: 150upx;
			position: absolute;
			bottom: -70upx;
			left: 3%;
			margin: auto;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #fff;
			border-radius: 20upx;
			box-sizing: border-box;
			box-shadow: #F5F5F5 0 0 5upx 5upx;
			.nums {
				font-size: 45upx;
				font-weight: 400;
				color: #007AFF;
				margin-left: 20upx;
				line-height: 44upx;
			}
			.y_bm {
				width: 41%;
				height: 70upx;
				display: flex;
				align-items: flex-end;
				border-right: 1px solid #C1C1C1;
				image {
					width: 80upx;
					height: 40upx;
					margin-left: 30upx;
				}
				
			}
			.l_ll{
				width: 59%;
				height: 70upx;
				display: flex;
				// justify-content: center;
				align-items: flex-end;
				image {
					width: 80upx;
					height: 40upx;
					margin-left: 20upx;
				}
			}
		}
	}
	.vote_search {
		width: 94%;
		height: 80upx;
		margin: 100upx auto 20upx auto;
		display: flex;
		image{
			width: 42upx;
			height: 40upx;
			margin-left: 10upx;
			margin-top: 10upx;
		}
		
		input{
			width: 100%;
			height: 60upx;
			border-radius: 20upx;
			border: 1px solid rgb(212,212,212);
			margin-left: -50upx;
			padding-left: 60upx;
		}
	}
	.vote_three {
		width: 94%;
		height: 100%;
		margin: auto;
	}
	.vote_three_box {
		width: 100%;
		height: 240upx;
		// border: 1px solid red;
		margin: 40upx 0;
		color: white;
		background-image: url(../../static/paihangban/background4.png);
		background-size: 100% 100%;
		.three_box_top {
			width: 95%;
			height: 90upx;
			margin: 0 auto;
			box-sizing: border-box;
			display: flex;
			position: relative;
			align-items: center;
			.five {
				position: absolute;
				top: 36upx;
				left: 52upx;
				font-size: 36upx;
				font-weight: 600;
			}
			.top_views{
				// flex: 2;
				width: 400upx;
				height: 60upx;
				font-size: 34upx;
				text-align: center;
				line-height: 60upx;
				background-color: #88B5F3;
				border-radius: 10upx;
			}
			.bj1 {
				background-color: #F68D48;
			}
			.bj2 {
				background-color: #6F7AAB;
			}
			.bj3 {
				background-color: #337985;
			}
			image {
				// flex: 1;
				width: 200upx;
				height: 90upx;
			}
		}
		.three_box_bottom {
			width: 95%;
			height: 148upx;
			margin: auto;
			display: flex;
			.images {
				// flex: 1;
				width: 200upx;
				height: 140upx;
				background-color: #F1F1F1;
				border-radius: 20upx;
			}
			.bianhao {
				// flex: 1;
				width: 230upx;
				height: 148upx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				font-size: 24upx;
				padding-left: 36upx;
				// align-items: center;
				// border: 1px solid red;
			}
			.zhichi {
				// flex: 1;
				width: 170upx;
				height: 148upx;
				// display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 40upx;
				.zhichi_button {
					width: 170upx;
					height: 52upx;
					text-align: center;
					line-height: 40upx;
					border-radius: 5upx;
					background-color: rgb(255,240,213);
					color: #A76600;
					display: flex;
					margin-bottom: 20upx;
					view{
						width: 160upx;
						height: 46upx;
						line-height: 40upx;
						border-radius: 5upx;
						background-color: rgb(255,240,213);
						border: 4upx solid rgb(243,202,137);
						margin-top: 4upx;
						margin-left: 4upx;
					}
				}
			}
			.jindu {
				flex: 2;
				height: 148upx;
			}
		}
	}
	.tu3 {
		background-image: url(../../static/paihangban/background3.png);
		background-size: 150% 150%;
	}
	.tu2 {
		background-image: url(../../static/paihangban/background2.png);
		background-size: 150% 150%;
	}
	.tu1 {
		background-image: url(../../static/paihangban/background1.png);
		background-size: 150% 150%;
	}
	.bottom_lan {
		width: 100%;
		height: 100upx;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		// .bottom_kefu {
		// 	flex: 1;
		// 	height: 86%;
		// 	margin: 0 10upx;
		// 	display: flex;
		// 	align-items: center;
		// 	justify-content: center;
		// 	// border-radius: 10upx;
		// 	background-color: #F6F6F6;
		// }
		// .bottom_fankui {
		// 	flex:1;
		// 	height: 86%;
		// 	display: flex;
		// 	align-items: center;
		// 	justify-content: center;
		// 	// border-radius: 10upx;
		// 	background-color: #F6F6F6;
		// }
		.bottom_huodong {
			flex: 1;
			height: 100%;
			text-align: center;
			line-height: 100upx;
			background-color: #007AFF;
			color: white;
		}
		.bottom_cansai {
			flex: 1;
			height: 100%;
			text-align: center;
			line-height: 100upx;
			
		}
	}
</style>
