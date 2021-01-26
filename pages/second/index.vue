<template>
	<view class="fapiao_list">
		<view class="fapiao_list_content" 
		v-for="(item,index) in fp_list" :key="index"
		@click="update_fapiao(item.fapiaoid)">
			<view class="fa_msg_content">
				<text>发票抬头</text>
				<input type="text" v-model="item.name" placeholder="发票抬头" />
			</view>
			<view class="fa_msg_content">
				<text>识别号</text>
				<input type="text" v-model="item.suihao" placeholder="纳税人识别号或统一信用码" />
			</view>
			<view class="fa_msg_content">
				<text>公司地址</text>
				<input type="text" v-model="item.dizhi" placeholder="公司地址" />
			</view>
			<view class="fa_msg_content">
				<text>公司电话</text>
				<input type="text" v-model="item.dianhua" placeholder="公司电话" />
			</view>
			<view class="fa_msg_content">
				<text>开户银行</text>
				<input type="text" v-model="item.yinhang" placeholder="开户银行" />
			</view>
			<view class="fa_msg_content">
				<text>银行账户</text>
				<input type="text" v-model="item.zhanghu" placeholder="银行账户" />
			</view>
		</view>
		<button @click="add_fapiao">添加发票</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fp_list: []
			}
		},
		onLoad() {
			
		},
		methods: {
			//发票列表
			show () {
				this.$http.post('lessonaqi/api/lessonfapiaolist',{
					userid: uni.getStorageSync('userId')
				},{})
				.then(res=>{
					console.log(res)
					this.fp_list = res.data
				})
				.catch(err=>{
					console.log(err)
				})
			},
			//添加发票
			add_fapiao () {
				uni.navigateTo({
					url: './open_fapiao',
					animationType: 'pop-in'
				})
			},
			//发票信息修改
			update_fapiao (e) {
				uni.navigateTo({
					url: './update_fapiao?data=' + e,
					animationType: 'pop-in'
				})
			}
		},
		onShow() {
			this.show()
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F5F5F5;
	}
	.fapiao_list {
		width: 100%;
		padding-bottom: 80upx;
	}
	.fapiao_list_content {
		width: 96%;
		height: 480upx;
		margin: 20upx auto;
		border-radius: 20upx;
		background-color: #fff;
		.fa_msg_content {
			width: 96%;
			height: 80upx;
			margin: auto;
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			// border-bottom: 1px solid #F5F5F5;
			font-size: 28upx;
			line-height: 80upx;
			input {
				font-size: 28upx;
				width: 80%;
				height: 100%;
			}
		}
	}
	button{
		width: 96%;
		height: 80upx;
		position: fixed;
		bottom: 0;
		left: 15upx;
		font-size: 32upx;
		text-align: center;
		line-height: 80upx;
		background-color: red;
		color: white;
	}
</style>
