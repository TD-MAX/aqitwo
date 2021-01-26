<template>
	<view class="about">
		<view class="about_head">
			<image src="../../static/f667fa917bd16d930b548adc6406bf6.png" mode=""></image>
			{{version}}
		</view>
		<view class="about_content">
			<view class="_cont">
				<p>检测更新</p>
				<text 
				:class="{'colo' : zuixin !== ''}"
				@click="gengxin"
				>
					{{zuixin === '' ? '已是最新版' : zuixin}}
				</text>
			</view>
			<view class="_cont" @click="toggleMessage('success')">
				<p>当前版本</p>
				<text>{{version}}</text>
			</view>
			<view class="_cont" @click="serve">
				<p>服务条款与隐私协议</p>
			</view>
		</view>
		<uni-popup ref="popupDialog" type="dialog" @change="change">
			<uni-popup-dialog 
			title="当前版本号" 
			:content="version" 
			:before-close="true" 
			@confirm="dialogConfirm" 
			@close="dialogClose"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		components: {
			uniPopupDialog
		},
		data() {
			return {
				version: this.$store.state.version, //版本号
				zuixin: ''
			}
		},
		onLoad() {
			this.AndroidCheckUpdate()
		},
		methods: {
			//检查版本更新
			AndroidCheckUpdate() {
				let _this = this;
				this.$http.post('lessonaqi/api/lessonappbanben', {
						version: this.version
					}, {})
					.then(res => {
						console.log(res)
						if (res.data !== '') {
							this.zuixin = '检测到新版本'
						} else {
							console.log('已是最新版本')
						}
					})
			},
			//版本更新
			gengxin () {
				let _this = this;
				this.$http.post('lessonaqi/api/lessonappbanben', {
						version: this.version
					}, {})
					.then(res => {
						console.log(res)
						if (res.data !== '') {
							let url = res.data
							plus.runtime.openURL(`${url}`)
						} else {
							this.$api.msg('已是最新版本')
						}
					})
					.catch(err=>{
						console.log(err)
					})
			},
			//服务与隐私
			serve () {
				uni.navigateTo({
					url: './server',
					animationType: 'pop-in'
				})
			},
			//当前版本
			toggleMessage (type) {
				this.$refs.popupDialog.open()
			},
			/**
			 * 对话框点击确认按钮
			 */
			dialogConfirm(done) {
				// this.$refs.popupMessage.open()
				console.log('点击确认');
				// 需要执行 done 才能关闭对话框
				done()
			},
			dialogClose (done) {
				console.log('点击取消')
				// this.$refs.popopMessage.open()
				done()
			},
			change (e) {
				//记录点击状态
			},
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
		background-color: #F5F5F5;
	}
	.about{
		width: 100%;
	}
	.about_head{
		width: 100%;
		height: 300upx;
		background-color: #fff;
		color: #696969;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		image{
			width: 110upx;
			height: 110upx;
		}
	}
	.about_content{
		width: 100%;
		margin: 10upx auto;
		font-size: 32upx;
		background-color: #fff;
		._cont{
			width: 96%;
			height: 80upx;
			margin: auto;
			display: flex;
			justify-content: space-between;
			line-height: 80upx;
			border-bottom: 1px solid #F5F5F5;
			text{
				color: #696969;
			}
			.colo{
				color: red;
			}
		}
	}
</style>
