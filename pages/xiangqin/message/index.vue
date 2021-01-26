<template>
	<view class="content">
		<view class="dingbu">
			
		</view>
		<view class="message_list">
			<view class="header">
				
				<input type="text"  v-model="search"
				placeholder="搜索" @input="search_msg" />
				<i class="iconfont" @click="sousuo">&#xe6a6;</i>
			</view>
			<text class="tit">全部私信</text>
			<view class="message_content" 
			v-for="(n, index) in msg_list" :key="index" 
			@longpress = "deleteMsg()"
			@click="go_chat(index)">
				<view class="message_name">
					<view class="_left">
						<view class="head_view">
							<image class="header_img" :src="n.duifanphoto" mode="aspectFill"></image>
							<image mode="aspectFill" class="xingbie_nan" :class="{'xingbie_nv' : n.gender === '0'}" :src="n.gender === '1' ? nan : nv"></image>
						</view>
						
						<view class="content_name">
							<text class="_name">{{n.duifanname}}</text>
							<text class="_content">{{n.postmessages | dataFormat}}</text>
						</view>
					</view>
					<view class="_time">
						{{n.timeout}}
					</view>
				</view>
				<view class="_weidu" v-show="n.weidunum !== 0">
					{{n.weidunum}}
				</view>
			</view>
		</view>
		<Tab :tab_active="2" :count="1"></Tab>
	</view>
</template>

<script>
	import _ from 'lodash'
	import moment from 'moment'
	import Tab from '../../components/tab.vue'
	import { mapState,mapMutations } from 'vuex';
	export default {
		data() {
			return {
				msg_list: [],
				search:'',
				count: false,   //未读消息数
				nv:'../../../static/xiangqin/nv.png',
				nan:'../../../static/xiangqin/nan.png'
			}
		},
		components:{
			Tab
		},
		onShow() {
			console.log('123')
			// this.show() //消息展示
			this.recept() //数据判断
			uni.onSocketMessage(function(res){
				console.log(res.data)
				this.show()
			})
		},
		filters: {
			dataFormat (msg) {
				return msg.replace(/<[^>]+>/g, '')
			}
		},
		onLoad() {
			console.log('456')
			this.show()//页面进入时消息展示
		},
		// 点击上方加号事件
		// onNavigationBarButtonTap: function(e) {
		// 	uni.navigateTo({
		// 		url:'screen'
		// 	})
		// },
		methods: {
			...mapMutations(['recept']),
			//消息展示
			show(){
				let _this = this
				_this.$http.post('lessonxiangqin/api/lessonselectxiaoxi',{
					userid: uni.getStorageSync('userId')
				},{})
				.then(res=>{
					console.log(res.data)
					_this.msg_list = res.data
				})
				.catch(err=>{
					console.log(err)
				})
			},
			// 查询
			sousuo(){
				if (this.search == '') {
					console.log('111')
					this.show()
				}
				else if(this.search != ''){
					let list = this.msg_list
					var lists = []
					for (var i=0; i < this.msg_list.length; i++) {
						if (list[i].duifanname.indexOf(this.search) !== -1) {
							lists.push(this.msg_list[i])
						}
					}
					this.msg_list = lists
					console.log(this.msg_list)
				}
			},
			//模糊查询
			search_msg () {
				console.log(this.search)
				this.msg_list = this.msg_list
				console.log(this.msg_list)
				if (this.search == '') {
					console.log('111')
					this.show()
				}
				// else if(this.search != ''){
				// 	let list = this.msg_list
				// 	var lists = []
				// 	for (var i=0; i < this.msg_list.length; i++) {
				// 		if (list[i].duifanname.indexOf(this.search) !== -1) {
				// 			lists.push(this.msg_list[i])
				// 		}
				// 	}
				// 	this.msg_list = lists
				// 	console.log(this.msg_list)
				// }
			},
			// 去往消息详细页
			go_chat (n) {
				console.log(this.msg_list[n].duifanuserid)
				console.log(this.msg_list[n].duifanname)
				let _this = this
				uni.navigateTo({
					url: `/pages/xiangqin/HM-chat/HM-chat?id=${_this.msg_list[n].duifanuserid}&name=${_this.msg_list[n].duifanname}`
				})
			}
		},
	}
</script>

<style lang="scss">
	.content{
		display: flex;
		flex-direction: column;
		.top_tab{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 30rpx 40rpx 0;
			._tab{
				width: 150rpx;
				height: 80rpx;
				background-color: #333;
				border-radius: 80rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #fff;
				font-size: 20rpx;
				text{
					font-size: 22rpx;
					padding-left: 10rpx;
				}
			}
		}
	}
	.header {
		width: 96%;
		height: 80upx;
		margin: 20upx auto;
		background-color: #F5F5F5;
		border-radius: 10upx;
		display: flex;
		justify-content: flex-end;
		line-height: 80upx;
	
		input {
			width: 50%;
			height: 100%;
			margin-left: 10upx;
		}
		i {
			padding-right: 2%;
		}
	}
	.message_list {
		display: flex;
		flex-direction: column;
		padding: 30rpx;
		.tit{
			font-size: 32rpx;
		}
		.message_content{
			display: flex;
			position: relative;
			flex-direction: column;
			._weidu{
				position: absolute;
				width: 60upx;
				height: 40upx;
				background-color: red;
				border-radius: 25upx;
				color: white;
				overflow: hidden;
				text-align: center;
				line-height: 40upx;
				font-size: 25upx;
				top: 50upx;
				right: 20upx;
			}
			.message_name{
				display: flex;
				justify-content: space-between;
				padding: 14rpx 0;
				border-bottom: 1px solid #f4f4f4;
				._left{
					display: flex;
					// image{
					// 	width: 100rpx;
					// 	height: 100rpx;
					// 	border-radius: 50%;
					// }
					.head_view{
						width: 88upx;
						display: flex;
					}
					.header_img{
						width: 88rpx;
						height: 88rpx;
						border-radius: 50%;
					}
					.xingbie_nan{
						width: 30rpx;
						height: 30rpx;
						margin-left: -90upx;
						margin-top: -10upx;
					}
					.xingbie_nv{
						width: 30rpx;
						height: 36rpx;
						margin-left: -30upx;
						margin-top: -10upx;
					}
					.content_name{
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						padding: 6rpx;
						margin-left: 20upx;
						._name{
							color: #333;
							font-size: 32rpx;
						}
						._content{
							color: #999;
							font-size: 28rpx;
							max-width: 450rpx;
							overflow: hidden;
							text-overflow:ellipsis;
							white-space: nowrap;
						}
					}
				}
				._time{
					color: #999;
					font-size: 26rpx;
					padding-top: 6rpx;
				}
			}
		}
	}
</style>
