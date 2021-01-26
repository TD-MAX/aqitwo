<template>
	<view class="new_location">
		<view class="_locationmsg">
			<input type="text" v-model="name" placeholder="收货人姓名" />
		</view>
		<view class="_locationmsg">
			<input type="text" v-model="phone" placeholder="手机号码" />
		</view>
		<view class="row">
			<text class="name">选择地址：</text>
			<view class="value">
				<biaofun-region @change="onChangeRegion">
					
				</biaofun-region>
			</view>
		</view>
		<view class="xianxi">
			<textarea placeholder="详细地址" v-model="xiangxi" maxlength="140" />
		</view>
		<view class="sub_but" @click="add_location">
			<button>{{dizhiid == undefined ? '保存' : '修改'}}</button>
		</view>
	</view>
</template>

<script>
	import biaofunRegion from '@/components/biaofun-region/biaofun-region.vue'; //省市区选择器
	export default {
		components: {
			biaofunRegion
		},
		data() {
			return {
				sheng: '',//省
				shi: '', //市
				qu: '' ,//区
				name: '', //名字
				phone: '', //手机号
				xiangxi: '', //详细地址
				youbian: '', //邮编
				dizhiid: '', //地址id
			}
		},
		methods: {
			//选择省市区
			onChangeRegion(region) {
				console.log(region)
				this.sheng = region[0].name
				this.shi = region[1].name
				this.qu = region[2].name
				console.log(this.sheng)
				console.log(this.shi)
				console.log(this.qu)
			},
			//添加/修改地址
			add_location () {
				if (this.dizhiid != undefined) {
					//修改
					this.$http.post('lessonaqi/api/lessonupdateuserdizhi',{
						dizhiid: this.dizhiid,
						dizhi: this.xiangxi,
						shoujihao: this.phone,
						youbian: this.youbian,
						userid: uni.getStorageSync('userId'),
						lianxiren: this.name,
						sheng: this.sheng,
						shi: this.shi,
						qu: this.qu
					},{})
					.then(res=>{
						console.log(res)
						if (res.data === 1) {
							uni.showToast({
								title:'修改成功',
								duration:1000
							})
							setTimeout(()=>{
								uni.navigateBack({
									delta: 1,
									animationType:'pop-out'
								})
							},1000)
						} else {
							this.$api.msg('修改失败，请重试')
						}
					})
					.catch(err=>{
						console.log(err)
					})
				} else {
					//保存
					this.$http.post('lessonaqi/api/lessonadduserdizhi',{
						lianxiren: this.name,
						dizhi: this.xiangxi,
						shoujihao: this.phone,
						userid: uni.getStorageSync('userId'),
						sheng: this.sheng,
						shi: this.shi,
						qu: this.qu,
						youbian: this.youbian
					},{})
					.then(res=>{
						if (res.data === 1) {
							uni.showToast({
								title:'添加成功',
								duration:1000
							})
							setTimeout(()=>{
								uni.navigateBack({
									delta: 1,
									animationType:'pop-out'
								})
							},1000)
							
						} else {
							this.$api.msg('添加失败，请重试')
						}
					})
					.catch(err=>{
						console.log(err)
					})
				}
			},
			//单条地址查询
			show () {
				this.$http.post('lessonaqi/api/lessonselectuserdizhi',{
					dizhiid: this.dizhiid
				},{})
				.then(res=>{
					console.log(res)
					this.name = res.data.lianxiren
					this.phone = res.data.shoujihao
					this.sheng = res.data.sheng
					this.shi = res.data.shi
					this.qu = res.data.qu
					this.xiangxi = res.data.dizhi
				})
				.catch(err=>{
					console.log(err)
				})
			}
		},
		onLoad (option) {
			this.dizhiid = option.data
			if (this.dizhiid != undefined) {
				this.show()
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		width: 100%;
		height: 100%;
	}
	.new_location {
		width: 100%;
		height: 100%;
		position: relative;
	}

	._locationmsg {
		height: 80upx;
		width: 92%;
		margin: auto;
		border-bottom: 1px solid #C1C1C1;
		padding-left: 10upx;
		line-height: 80upx;
		margin: auto;
		input {
			width: 80%;
			height: 100%;
			font-size: 32upx;
		}
	}
	.row {
		display: flex;
		width: 92%;
		margin: auto;
		padding-left: 10upx;
		height: 80upx;
		align-items: center;
		color: #040506;
		border-bottom: 1px solid #C1C1C1;
		.name {
			flex-shrink: 0;
		}
		
		.value {
			flex: 1;
		}
	}
	.row:active {
		opacity: 0.8;
	}
	.xianxi{
		width: 92%;
		margin: auto;
		font-size: 32upx;
		padding-left: 10upx;
		padding-top: 20upx;
		border-bottom: 1px solid #C1C1C1;
	}
	.sub_but{
		width: 92%;
		height: 80upx;
		margin: auto;
		position: absolute;
		bottom: 20upx;
		left: 30upx;
		button{
			width: 100%;
			height: 100%;
			font-size: 32upx;
			text-align: center;
			line-height: 80upx;
			border-radius: 50upx;
			background-color: red;
			color: white;
			
		}
	}
</style>
