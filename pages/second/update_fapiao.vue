<template>
	<view class="fapiao_list">
		<view class="fapiao_list_content">
			<view class="fa_msg_content">
				<text>发票抬头</text>
				<input type="text" v-model="new_list.name" placeholder="发票抬头" />
			</view>
			<view class="fa_msg_content">
				<text>识别号</text>
				<input type="text" v-model="new_list.suihao" placeholder="纳税人识别号或统一信用码" />
			</view>
			<view class="fa_msg_content">
				<text>公司地址</text>
				<input type="text" v-model="new_list.dizhi" placeholder="公司地址" />
			</view>
			<view class="fa_msg_content">
				<text>公司电话</text>
				<input type="text" v-model="new_list.dianhua" placeholder="公司电话" />
			</view>
			<view class="fa_msg_content">
				<text>开户银行</text>
				<input type="text" v-model="new_list.yinhang" placeholder="开户银行" />
			</view>
			<view class="fa_msg_content">
				<text>银行账户</text>
				<input type="text" v-model="new_list.zhanghu" placeholder="银行账户" />
			</view>
		</view>
		<button @click="update_fapiao">修改信息</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '', //发票id
				new_list: {}
			}
		},
		methods: {
			//查询发票信息
			show () {
				this.$http.post('lessonaqi/api/lessonfapiaoxiangqing',{
					fapiaoid: this.id
				},{})
				.then(res=>{
					console.log(res)
					this.new_list = res.data
				})
				.catch(err=>{
					console.log(err)
				})
			},
			//修改
			update_fapiao () {
				this.$http.post('lessonaqi/api/lessonupdatefapiao',{
					fapiaoid: this.id,
					name: this.new_list.name,
					suihao: this.new_list.suihao,
					dizhi: this.new_list.dizhi,
					dianhua: this.new_list.dianhua,
					yinhang: this.new_list.yinhang,
					zhanghu: this.new_list.zhanghu,
					userid: uni.getStorageSync('userId')
				},{})
				.then(res => {
					console.log(res)
					if (res.data === 1) {
						uni.showToast({
							title: '修改成功',
							duration: 1000
						})
						setTimeout(()=>{
							uni.navigateBack({
								delta: 1
							})
						},1000)
					}
				})
				.catch(err => {
					console.log(err)
				})
			}
		},
		onShow() {
			this.show()
		},
		onLoad(option) {
			this.id = option.data
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
		bottom: 10upx;
		left: 15upx;
		font-size: 32upx;
		text-align: center;
		line-height: 80upx;
		background-color: red;
		color: white;
	}
</style>
