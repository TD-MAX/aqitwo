<template>
	<view class="_renzheng">
		<view class="_renzheng_head" v-show="qiye">
			<view class="_head_img">
				<image :src="qiye_info.qiyelogo" mode="aspectFill"></image>
			</view>
			<view class="_head_msg">
				<text>{{qiye_info.qiyename}}</text>
				<image src="../../static/guanwang.gif" mode=""></image>
			</view>
			<view class="_head_xufei">
				<text>企业认证时间:</text>
				<text>{{qiye_info.qiyerenzhengtime || '' | time}}</text>
				<view class="" @click="xufei">
					立即续费
				</view>
			</view>
		</view>
		<view class="_renzheng_heads" @click="to_ren" v-show="!qiye">
			<text>暂无企业信息，前往认证?</text>
		</view>
		<view class="qiye_zhuan">
			企业认证专项特权
		</view>
		<view class="qiye_tequan">
			<view class="tequan"
			v-for="(item,index) in renList" :key="index">
				<image :src="item.src" mode="aspectFill"></image>
				<view class="tequan_msg">
					<p>{{item.text}}</p>
					<p>{{item.xiangxi}}</p>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				renList:[
					{
						text: '广告特权',
						src: '../../static/aqiuser/guangaotequan.png',
						xiangxi: '首页展示广告'
					},
					{
						text: '尊贵标识',
						src: '../../static/aqiuser/zhunguibiaoshi.png',
						xiangxi: '专属标签认证'
					},
					{
						text: '专属客服',
						src: '../../static/aqiuser/zhuangshukefu.png',
						xiangxi: '7*5客户专享时间'
					},
					{
						text: '账号专享',
						src: '../../static/aqiuser/zhanghaozhuanxiang.png',
						xiangxi: '主ID账号一个'
					}
				],
				qiye: false,
				is_renzheng: false ,//企业认证依据
				qiye_info: {}
			}
		},
		onLoad() {
			this.init()
		},
		filters:{
			time (msg) {
				let a = msg.slice(0,10)
				return a
			}
		},
		methods: {
			//去认证
			to_ren () {
				uni.navigateTo({
					url: './pickup_information',
					animationType: 'pop-in'
				})
			},
			//续费
			xufei () {
				let id = uni.getStorageSync('qiyeId')
				if (id) {
					uni.navigateTo({
						url: 'jiaona_certification?data=' + id
					})
				} else {
					uni.navigateTo({
						url: './pickup_information'
					})
				}
			},
			//查询是否已认证企业
			init () {
				this.$http.post('lessonaqi/api/lessonqiyerenzhengzhanshi',{
					userid: uni.getStorageSync('userId')
				},{})
				.then(res => {
					console.log(res)
					if (res.data === '') {
						this.qiye = false
					} else {
						this.qiye = true
						this.qiye_info = res.data
					}
				})
				.catch(err => {
					console.log(err)
				})
			}
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url:'./jiaoyi_history'
			})
		}
	}
</script>

<style lang="scss">
	._renzheng {
		width: 100%;
		color: #2D2D2D;
	}
	._renzheng_heads{
		width: 100%;
		height: 300upx;
		border-bottom: 1px solid #C1C1C1;
		 color: red;
		text-align: center;
		line-height: 300upx;
	}
	._renzheng_head {
		width: 100%;
		height: 300upx;
		font-size: 28upx;
		font-weight: 600;
		box-sizing: border-box;
		border-bottom: 1px solid #C1C1C1; 
		._head_img {
			width: 120upx;
			height: 120upx;
			border-radius: 50%;
			overflow: hidden;
			margin: 40upx auto 0 auto;
			image{
				width: 100%;
				height: 100%;
			}
		}
		._head_msg {
			width: 90%;
			height: 80upx;
			box-sizing: border-box;
			padding-right: 120upx;
			margin: auto;
			line-height: 80upx;
			display: flex;
			justify-content: flex-end;
			image{
				margin-top: 17upx;
				margin-left: 20upx;
				width: 145upx;
				height: 46upx;
			}
		}
		._head_xufei{
			width: 90%;
			height: 80upx;
			box-sizing: border-box;
			// border: 1px solid black;
			margin: auto;
			padding-right: 90upx;
			line-height: 80upx;
			display: flex;
			justify-content: flex-end;
			view{
				width: 160upx;
				height: 40upx;
				margin: 20upx 0 20upx 30upx;
				text-align: center;
				line-height: 40upx;
				font-size: 28upx;
				box-sizing: border-box;
				border: 1px solid #C1C1C1;
				border-radius: 50upx;
			}
		}
	}
	.qiye_zhuan {
		width: 96%;
		height: 80upx;
		margin: auto;
		line-height: 80upx;
		font-size: 28upx;
		font-weight: 600;
		box-sizing: border-box;
	}
	.qiye_tequan{
		width: 98%;
		margin: auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		.tequan{
			width: 46%;
			height: 150upx;
			margin: 10upx 0;
			box-sizing: border-box;
			border: 1px solid #C1C1C1;
			border-radius: 20upx;
			display: flex;
			justify-content: space-between;
			image{
				width: 80upx;
				height: 90upx;
				margin-top: 30upx;
				margin-left: 10upx;
			}
			view{
				width: calc(100% - 110upx);
				height: 80upx;
				margin-top: 35upx;
				// border: 1px solid red;
				font-size: 28upx;
			}
		}
	}
</style>
