<template>
	<view class="content">
		<view class="header">
			<i class="iconfont">&#xe6a6;</i>
			<input type="text"  v-model="search"
			placeholder="昵称/关键词" />
		</view>
		<view class="message_list">
			<view class="message_list_screen">
				<text>性别</text>
				<view class="message_list_screen_1">
					<picker mode="selector" :range="sexList" @change="sexChange">
						<input type="text" value="sex" v-model="sex" placeholder="不限" />
					</picker>
					
				</view>		
			</view>
			<view class="message_list_screen">
				<text>年龄</text>
				<view class="message_list_screen_1">
					<picker mode="multiSelector" :range="ageList" @change="ageChange">
						<input type="text" value="sex" v-model="sex" placeholder="不限" />
					</picker>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				search:'', //搜索关键词
				sexList:['男','女'],
				ageList:[[],[]],
				sex:'',
				
			}
		},
		onLoad() {
			for(let i = 18 ; i<=99 ; i++){
				this.ageList = this.ageList[0].concat(i)
				
				console.log(this.ageList)
			}
		},
		methods: {
			//选择性别
			sexChange(e){
				this.sex = this.sexList[e.detail.value]
			}
		}
	}
</script>

<style lang="scss">
	.content{
		display: flex;
		flex-direction: column;
	}
	.message_list {
		display: flex;
		flex-direction: column;
		padding: 30rpx;
		.message_list_screen{
			display: flex;
			border-bottom: 1px solid rgb(245,245,245);
			padding-top: 30upx;
			width: 100%;
			height: 80upx;
			.message_list_screen_1{
				width: 70%;
				height: 50upx;
				margin-left: 19%;
				text-align: right;
				
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
		// justify-content: flex-end;
		line-height: 80upx;
	
		input {
			width: 50%;
			height: 100%;
			margin-left: 10upx;
		}
		i {
			padding-left: 2%;
		}
	}
</style>
