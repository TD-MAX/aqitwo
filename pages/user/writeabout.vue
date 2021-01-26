<template>
	<view class="content">
		<view class="upload_text">
			<textarea v-model="text_valeue" placeholder-style="color:#C9C9C9" maxlength="200" placeholder="留下您的宝贵意见…"/>
			<text>{{text_valeue.length}}/200</text>
		</view>
		<view class="sub_btn" @click="submit">
			<text>提交</text>
		</view>
	</view>
</template>

<script>
	import moment from 'moment'
	import _ from 'lodash'
	export default {
		data() {
			return {
				text_valeue: '',
				img_url: []
			}
		},
		onShow() {
			
		},
		onLoad(option){
		},
		methods: {
			submit () {
				if (this.text_valeue === '') {
					uni.showToast({
						title:'内容不能为空',
						icon:'none'
					})
					return
				}
				this.$http.post('lessonaqi/api/lessonfeedback',{
					userid: uni.getStorageSync('userId'),
					remark: this.text_valeue
				},{})
				.then(res=>{
					console.log(res)
					setTimeout(() => {
						uni.navigateBack({
							delta:1,
							animationType: 'pop-out'
						})
					},500)
					
				})
				.catch(err => {
					console.log(err)
				})
			}
		}  
	}
</script>

<style lang="scss">
	page{
		background: #f4f4f4;
		height: 100%;
	}
	.content{
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.upload_text{
		width: 100%;
		height: 340rpx;
		display: flex;
		background: #fff;
		justify-content: center;
		position: relative;
		textarea{
			width: 95%;
			color: #444;
			height: 100%;
		}
		text{
			font-size: 20rpx;
			position: absolute;
			right: 20rpx;
			bottom: 20rpx;
			color: #C9C9C9;
		}
	}
	.sub_btn{
		width: 100%;
		height: 110rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #fff;
		text{
			width: 90%;
			height: 70rpx;
			background: #2C405A;
			border-radius: 10rpx;
			text-align: center;
			color: #fff;
			line-height: 70rpx;
			font-size: 32rpx;
		}
	}
</style>
