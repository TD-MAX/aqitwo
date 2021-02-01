<template>
	<view class="content">
		<view class="i_gzs">
			<view class="ges" v-for="(a,index1) in msg" :key="index1" :class="{'current' : index1 === tabIndex}" @click="dian(index1)">
				<!-- <p>{{item.num}}</p> -->
				<text>{{a.text}}</text>
			</view>
		</view>
		
		
		<view class="upload_text">
			<textarea v-model="text_valeue" placeholder-style="color:#C9C9C9" maxlength="50" placeholder="添加打招呼用语/常用短语"/>
			<text>{{text_valeue.length}}/50</text>
		</view>
		<view class="_next" @click="add">
			添加
		</view>
		
		<view v-show="tabIndex === 0" >
			<view v-for="(x,index0) in text_list1" :key="index0" class="text_list">
				{{x.msg}}
				<view class="shanchucommon"><image src="../../../static/xiangqin/shanchucommon.jpeg" @click="deletes(x.id)"></image></view>
			</view>
		</view>
		<view v-show="tabIndex === 1">
			<view v-for="(x,index2) in text_list2" :key="index2" class="text_list">
				{{x.msg}}
				<view class="shanchucommon"><image src="../../../static/xiangqin/shanchucommon.jpeg" @click="deletes(x.id)"></image></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg: [{
						text: '打招呼用语'
					},
					{
						text: '常用语'
					}
				],
				text_valeue: '',
				text_list1:[],
				text_list2:[],
				tabIndex:0,
				type:1,
			}
		},
		onShow() {
		},
		onLoad(){
			this.show()
		},
		methods: {
			deletes(x){
				console.log(x)
				this.$http.post('lessonxiangqin/api/delUserMsg',{
					msgId:x
				},{})
				.then(res=>{
					console.log(res.data.msg)
					if(res.data.code == 0){
						uni.showToast({
							title:res.data.msg
						})
						this.show()
						this.text_valeue = ''
					}
				
				})
				.catch(err=>{
					console.log(err)
				})
			},
			dian(e) {
				console.log(e)
				this.tabIndex = e
				this.type = e+1
			},
			show(){
				this.text_list1 =[]
				console.log(this.text_list1)
				this.text_list2 =[]
				this.$http.post('lessonxiangqin/api/getUserMsg',{
					userId:uni.getStorageSync('userId'),
				},{})
				.then(res=>{
					console.log(res)
					_.each(res.data.data, o => {
						if(o.type == 1){
							this.text_list1.push(o)
						}else if(o.type == 2){
							this.text_list2.push(o)
						}
						
					})
				
				})
				.catch(err=>{
					console.log(err)
				})
			},
			add(){
				if(this.text_valeue == ''){
					uni.showToast({
						title:'请先输入常用短语',
						icon:'none'
					})
				}else{
					this.$http.post('lessonxiangqin/api/addUserMsg',{
						userId:uni.getStorageSync('userId'),
						type:this.type,
						msg:this.text_valeue
					},{})
					.then(res=>{
						console.log(res)
						if(res.data.code == 0){
							uni.showToast({
								title:res.data.msg
							})
							this.show()
							this.text_valeue = ''
						}
					})
					.catch(err=>{
						console.log(err)
					})
					
				}
			}
			
		}
	}
</script>

<style lang="scss">
	page{
		background: #fff;
		height: 100%;
	}
	.content{
		height: 100%;
		padding-top: 10rpx;
	}
	.upload_text{
		width: 95%;
		margin: 40rpx auto 0;
		height: 150rpx;
		display: flex;
		justify-content: center;
		position: relative;
		textarea{
			width: 95%;
			color: #444;
			height: 100%;
			border: 1rpx solid #D3D3D3;
		}
		text{
			
			font-size: 20rpx;
			position: absolute;
			right: 20rpx;
			bottom: 20rpx;
			color: #C9C9C9;
		}
	
	}
	._next{
		width: 562rpx;
		height: 110rpx;
		background-color: #25D3D2;
		color: #fff;
		font-size: 42rpx;
		line-height: 110rpx;
		text-align: center;
		border-radius: 110rpx;
		margin-left: 13%;
		margin-top: 20rpx;
	}
	.i_gzs {
		width: 100%;
		margin: 10upx 0 auto;
		background-color: #fff;
		display: flex;
		.ges {
			flex: 1;
			height: 80upx;
			display: flex;
			position: relative;
			align-items: center;
			justify-content: center;
			font-size: 32upx;
	
			&.current {
				color: #49DFDF;
				transition: .5s;
	
				&:after {
					content: '';
					transition: .5s;
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 66rpx;
					height: 0;
					border-bottom: 4rpx solid #49DFDF;
				}
			}
		}
	}
	.text_list{
		width: 96%;
		height: 100rpx;
		border-bottom: 1px solid grey;
		line-height: 90rpx;
		margin-left: 2%;
		margin-top: 20rpx;
		
	}
		.shanchucommon{
			width: 50rpx;
			height: 50rpx;
			// border: 1px solid red;
			margin-top: -80rpx;
			margin-left: 90%;
			image{
				width: 50rpx;
				height: 50rpx;
			}
		}
</style>
