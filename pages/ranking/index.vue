<template>
	<view class="pm">
		<view class="p_nav">
			<view class="" 
			:class="{'current' : index === tabIndex}"
			v-for="(item,index) in msgList" :key="index"
			@click="update_msg(index)">
				{{item.text}}
			</view>
		</view>
		<view class="start_three">
			<view class="start_three_left">
				<image :src="two.photo" mode="aspectFill"></image>
				<image src="../../static/paihangban/yin.png" mode="aspectFit"
				class="bang"></image>
				<text>{{two.name}}</text>
				<p>{{tabIndex === 0 ? two.lianxuqiandao : two.zongqiandao}}天</p>
			</view>
			<view class="start_three_center">
				<image :src="one.photo" mode="aspectFill"></image>
				<image src="../../static/paihangban/jin.png" mode="aspectFit"
				class="bang"></image>
				<text>{{one.name}}</text>
				<p>{{tabIndex === 0 ? one.lianxuqiandao : one.zongqiandao}}天</p>
			</view>
			<view class="start_three_right">
				<image :src="three.photo" mode="aspectFill"></image>
				<image src="../../static/paihangban/tong.png" mode="aspectFit"
				class="bang"></image>
				<text>{{three.name}}</text>
				<p>{{tabIndex === 0 ? three.lianxuqiandao : three.zongqiandao}}天</p>
			</view>
		</view>
		<view class="pm_content">
			<view class="content_msg" v-for="(n,index) in user_msg">
				<view class="content_user">
					<text>{{n.rownum}}</text>
					<image :src="n.photo" mode="aspectFill"></image>
					<p>{{n.name}}</p>
				</view>
				<p>{{tabIndex === 0 ? n.lianxuqiandao : n.zongqiandao}}天</p>
			</view>
		</view>
		<view class="pm_bottom">
			<view class="content_msg">
				<view class="content_user">
					<text>{{paiming}}</text>
					<image :src="user_info.photo" mode="aspectFill"></image>
					<p>{{user_info.name}}</p>
				</view>
				<p>{{tabIndex === 0 ? lianxuqiandao : zongqiandao}}天</p>
			</view>
		</view>
	</view>
</template>

<script>
	import _ from 'lodash'
	export default {
		data() {
			return {
				msgList:[
					{
						text: '连续签到排行'
					},
					{
						text: '累计签到排行'
					}
				],
				paiming: '',
				one: {},
				two: {},
				three: {},
				tabIndex: 0,
				userList: [],
				user_msg: [],
				user_ott: [],
				user_info: {},
				lianxuqiandao: '',
				zongqiandao: ''
			}
		},
		methods: {
			update_msg (e) {
				this.tabIndex = e
				switch (e) {
					case 1: 
						this.user_msg = []
						this.user_ott = []
						this.$http.post('lessonaqi/api/lessongetleijiqiandaopaihangbang',{},{})
						.then(res => {
							console.log(res.data)
							this.userList = res.data
							_.each(res.data, o => {
								if (o.rownum > 3) {
									this.user_msg.push(o)
								} else {
									this.user_ott.push(o)
								}
							})
							this.one = this.user_ott[0]
							this.two = this.user_ott[1]
							this.three = this.user_ott[2]
							this.my_paiming()
						})
						break
					case 0:
						this.user_msg = []
						this.user_ott = []
						this.show()
				}
			},
			//用户签到排名
			show () {
				this.$http.post('lessonaqi/api/lessongetyonghuhuoyuepaihangbang',{},{})
				.then(res =>{
					console.log(res)
					this.userList = res.data
					_.each(res.data, o => {
						if (o.rownum > 3) {
							this.user_msg.push(o)
						} else {
							this.user_ott.push(o)
						}
					})
					this.one = this.user_ott[0]
					this.two = this.user_ott[1]
					this.three = this.user_ott[2]
					this.my_paiming()
				})
				.catch(err =>{
					console.log(err)
				})
			},
			//我的信息
			init () {
				this.$http
					.post('lessonxiangqin/api/lessongetuser', {
						userid: uni.getStorageSync('userId')
					}, {})
					.then(res => {
						this.user_info = res.data
						console.log(this.user_info)
					})
					.catch(err => {
				
					})
			},
			//我的排名
			my_paiming () {
				_.each(this.userList, a =>{
					if (a.userid === this.user_info.id) {
						this.paiming =  a.rownum
						this.lianxuqiandao = a.lianxuqiandao
						this.zongqiandao = a.zongqiandao
					}
				})
			}
		},
		onLoad() {
			this.init() 
		},
		onShow() {
			this.show()
		}
	}
</script>

<style lang="scss">
	.pm{
		width: 100%;
		border-top: 1px solid #F8F8F8;
		padding-bottom: 95upx;
	}
	.p_nav{
		width: 100%;
		height: 100upx;
		display: flex;
		box-sizing: border-box;
		view{
			flex: 1;
			text-align: center;
			line-height: 100upx;
			position: relative;
			// border-bottom: 1px solid #E9D200;
			&.current{
				color: #000;
				&:after{
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 60rpx;
					height: 0;
					border-bottom: 6rpx solid #E9D200;
				}
			}
		}
	}
	.start_three{
		width: 100%;
		margin: 20upx auto;
		height: 350upx;
		background-color: #fff;
		box-sizing: border-box;
		padding: 0 20upx;
		display: flex;
		align-items: flex-end;
		justify-content: space-around;
		view{
			width: 30%;
			height: 80%;
			display: flex;
			box-sizing: border-box;
			box-shadow: 5rpx 5rpx 10rpx 5rpx #F5F5F5;
			position: relative;
			border: 1px solid white;
			flex-direction: column;
			border-radius: 10upx;
			align-items: center;
			justify-content: center;
			text{
				display: block;
				width: 180upx;
				height: 40upx;
				text-align: center;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				font-size: 28upx;
				margin: 0 0 10upx 0;
			}
			image{
				width: 80upx;
				height: 80upx;
				border-radius: 50%;
			}
			.bang{
				width: 70upx;
				height: 70upx;
				position: absolute;
				left: 50%;
				top: -45upx;
				transform: translateX(-50%);
			}
		}
		.start_three_center{
			padding-top: 35upx;
			height: 90%;
			border-top: 2px solid #FEB504;
		}
		.start_three_left{
			border-top: 2px solid #B5C8D9;
		}
		.start_three_right{
			border-top: 2px solid #D3AC6B;
		}
	}
	.pm_content{
		width: 100%;
		.content_msg{
			width: 90%;
			height: 120upx;
			margin: 30upx auto;
			display: flex;
			justify-content: space-between;
			font-size: 32upx;
			line-height: 120upx;
			text{
				font-size: 28upx;
				color: #696969;
			}
			.content_user{
				width: 80%;
				display: flex;
				image{
					width: 100upx;
					height: 100upx;
					border-radius: 50%;
					margin: 10upx 20upx 10upx 20upx;
				}
			}
		}
	}
	.pm_bottom{
		width: 100%;
		height: 120upx;
		position: fixed;
		bottom: 0;
		background-color: #FDFBF2;
		.content_msg{
			width: 90%;
			height: 120upx;
			margin: auto;
			display: flex;
			justify-content: space-between;
			font-size: 32upx;
			line-height: 120upx;
			text{
				font-size: 28upx;
				color: #696969;
			}
			.content_user{
				width: 80%;
				display: flex;
				image{
					width: 100upx;
					height: 100upx;
					border-radius: 50%;
					margin: 10upx 20upx 10upx 20upx;
				}
			}
		}
	}
</style>
