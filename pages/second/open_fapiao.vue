<template>
	<view class="fapiao">
		<view class="fa_msg">
			<view class="fa_msg_content" 
			v-for="(item,index) in fapiaoMsg" :key="index">
				<text>{{item.text}}</text>
				<input type="text" v-model="item.content" :placeholder="item.pladloer" />
			</view>
			<view class="ti_submit" @click="submit_fa">
				提交
			</view>
		</view>
		<view class="fapiao_jieshao">
			<p>1、电子发票与纸质发票具有同等法律效力，可作为用户维权、报修的有效凭据；</p>
			<p>2、请确保发票抬头、纳税人识别或统一社会信用代码的准确性；</p>
			<p>3、自2017年7月1日起，增值税普通发票不填写纳税人识别或统一社会信用代码不得作为税收凭证。</p>
		</view>
	</view>
</template>

<script>
	import _ from 'lodash'
	export default {
		data() {
			return {
				fapiaoMsg: [
					{
						text: '企业单位',
						pladloer: '',
						content: ''
					},
					{
						text: '发票抬头',
						pladloer: '请输入发票抬头',
						content: ''
					},
					{
						text: '发票内容',
						pladloer: '请输入发票内容',
						content: ''
					},
					{
						text: '识别号',
						pladloer: '纳税人识别号或统一信用码',
						content: ''
					},
					{
						text: '邮箱地址',
						pladloer: '用于接收电子发票',
						content: ''
					},
					{
						text: '企业电话',
						pladloer: '填写企业电话',
						content: ''
					},
					{
						text: '开户银行',
						pladloer: '填写开户银行',
						content: ''
					},
					{
						text: '银行账号',
						pladloer: '填写银行账号',
						content: ''
					},
					{
						text: '企业地址',
						pladloer: '填写企业地址',
						content: ''
					}
				]
			}
		},
		methods: {
			submit_fa () {
				let arr = []
				_.each(this.fapiaoMsg, o => {
					arr.push(o.content)
				})
				console.log(arr)
				if (arr[1] === '') {
					this.$api.msg('信息不能为空')
					return
				}
				this.$http.post('lessonaqi/api/lessonaddfapiao',{
					userid: uni.getStorageSync('userId'),
					name: arr[1], //抬头
					suihao: arr[3], //税号
					dizhi: arr[8], //公司地址
					dianhua: arr[5], //公司电话
					yinhang: arr[6], //开户银行
					zhanghu: arr[7]
				},{})
				.then(res => {
					console.log(res)
					if (res.data === 1) {
						uni.showToast({
							title: '提交成功'
						})
						setTimeout(()=>{
							uni.navigateBack({
								delta:1,
								animationType: 'pop-out'
							})
						},1000)
					}
				})
				.catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F5F5F5;
	}
	.fapiao {
		width: 100%;
	}
	.fa_msg {
		width: 96%;
		margin: 20upx auto;
		height: 1100upx;
		background-color: #fff;
		border-radius: 20upx;
		.fa_msg_content {
			width: 96%;
			height: 100upx;
			margin: auto;
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			border-bottom: 1px solid #F5F5F5;
			font-size: 32upx;
			line-height: 100upx;
			input {
				width: 70%;
				height: 100%;
			}
		}
		.ti_submit {
			width: 500upx;
			height: 80upx;
			margin: 50upx auto;
			border: 1px solid #C1C1C1;
			border-radius: 50upx;
			font-size: 32upx;
			text-align: center;
			line-height: 80upx;
		}
	}
	.fapiao_jieshao {
		width: 96%;
		height: 300upx;
		margin: auto;
		font-size: 28upx;
		font-weight: 600;
	}
</style>
