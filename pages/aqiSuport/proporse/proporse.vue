<template>
	<view class="proporse">
		<view class="proporse_nav">
			请填写本人实名信息
		</view>
		<view class="proporse_content">
			<view class="view">
				<input type="text" v-model="qiyename" placeholder="请填写企业名称(必填)" />
			</view>
			<view class="view">
				<input type="text" v-model="name" placeholder="请填写申请人姓名(必填)" />
			</view>
			<view class="view">
				<input type="text" v-model="phone" placeholder="请填写本人手机号码(必填)" />
			</view>
			<radio-group class="views">
				<label for="">是否法人</label>
				<label class="radio" @click="select(1)">
					<radio value='1' /><text>是</text>
				</label>
				<label class="radio" @click="select(2)">
					<radio value='2' /><text>否</text>
				</label>
			</radio-group>
			<view class="view">
				<input type="text" v-model="yixian" placeholder="请填写贷款意向额度(必填)" />
			</view>
			<picker class="suiwu" mode="selector" :range="jiList" @change="selectChange">
				<text>{{suiwupingji}}</text>
			</picker>
		</view>
		<view class="proporse_table">
			<view class="title">公司大客户及对应发票金额</view>
			<view class="table_head">
				<view>公司名称</view>
				<view>发票金额</view>
				<view>开票日期</view>
			</view>
			<view class="table_content" 
			v-for="(n,index) in tianbaoList" :key="index">
				<view><input type="text" v-model="n.name" /></view>
				<view><input type="text" v-model="n.money" /></view>
				<view><input type="text" v-model="n.date" /></view>
			</view>
		</view>
		<view class="table_img" @click="add">
			<image src="../../../static/jiahao.png" mode="aspectFill"></image>
		</view>
		<view class="submit_button" @click="to_see">
			提交
		</view>
		<view class="select_button" @click="select_see">
			进度查询
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				qiyename:'', //企业名称
				name:'',  //申请人姓名
				phone:'', //手机号
				yixian:'', //贷款意向
				isfaren:'', //是否法人
				suiwupingji:'请选择税务评级(必选)', //税务评级
				jiList:['A','B','M','C','D'],
				jiIndex:0,
				tianbaoList:[
					{
						name:'',
						money: '',
						date: ''
					},
					{
						name:'',
						money: '',
						date: ''
					},
					{
						name:'',
						money:'' ,
						date: ''
					}
				]
			}
		},
		methods: {
			//单选框
			select(e){
				console.log(e)
				this.isfaren = e
			},
			//添加
			add () {
				if(this.tianbaoList.length >= 8) {
					uni.showToast({
						title:'最多可添加8条！',
						icon:'none'
					})
				} else {
					this.tianbaoList.push({
						name:'',
						money:'',
						date:''
					})
				}
			},
			//级别选择
			selectChange (e) {
				this.jiIndex = e.detail.value
				this.suiwupingji = this.jiList[this.jiIndex]
			},
			//提交
			to_see(){
				let _this = this
				let id = uni.getStorageSync('userId')
				if (_this.tianbaoList[0].name !== ''
				&& _this.tianbaoList[0].money !== ''
				&& _this.tianbaoList[0].date !== ''
				&& _this.tianbaoList[1].name !== ''
				&& _this.tianbaoList[1].money !== ''
				&& _this.tianbaoList[1].date !== ''
				&& _this.tianbaoList[2].name !== ''
				&& _this.tianbaoList[2].money !== ''
				&& _this.tianbaoList[2].date !== '') {
					if(_this.isfaren){
						_this.$http.post('lessonaqi/api/lessondaikuanxinxitijiao',{
							userid:id,
							qiyename:_this.qiyename,
							name:_this.name,
							phone:_this.phone,
							isfaren:_this.isfaren,
							yixian:_this.yixian,
							suiwupingji:_this.suiwupingji,
							jsons:_this.tianbaoList
						},{})
						.then(res=>{
							if(res.data === 300) {
								uni.showToast({
									title:'您已提交过申请'
								})
							} else {
								uni.navigateTo({
									url:'./trade',
									animationType:'slide-in-bottom'
								})
							}
						})
						.catch(err=>{
							console.log(err)
						})
					} else {
						uni.showToast({
							title:'请勾选是否法人',
							icon:'none'
						})
					}
				} else {
					uni.showToast({
						title:'最少填满3组数据！',
						icon:'none',
						duration:1000
					})
				}
			},
			//进度查询
			select_see () {
				uni.navigateTo({
					url:'./trade',
					animationType:'pop-in'
				})
			}
		}
	}
</script>

<style lang="scss">
	.proporse{
		width: 100%;
		// padding-left: 40upx;
		height: 100%;
	}
	.proporse_nav{
		width: 90%;
		height: 100upx;
		// margin: auto;
		margin: 0 40upx;
		color: #000;
		font-size: 40upx;
		line-height: 100upx;
	}
	.proporse_content{
		width: 90%;
		margin: 0 40upx;
		.view{
			width: 100%;
			height: 80upx;
			border: 1px solid rgba(187,187,187,100);
			margin: 15upx 0 0 0;
			display: flex;
			justify-content: flex-end;
			input{
				width: 97%;
				height: 100%;
			}
		}
		.views{
			width: 60%;
			margin: 10upx 0;
			display: flex;
			justify-content: space-between;
		}
		.suiwu{
			width: 100%;
			height: 80upx;
			border: 1px solid rgba(187,187,187,100);
			margin: 15upx 0 0 0;
			color: #808090;
			line-height: 80upx;
			text{
				margin-left: 20upx;
			}
		}
	}
	.proporse_table{
		width: 90%;
		margin: 20upx 40upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		border: 1px solid rgba(187,187,187,100);
		.title{
			width: 500upx;
			height: 48upx;
			line-height: 48upx;
			font-size: 32upx;
			flex: 1;
			// border: 1px solid red;
			text-align: center;
			margin: auto;
		}
		.table_head{
			width: 100%;
			height: 56upx;
			line-height: 56upx;
			display: flex;
			justify-content: space-between;
			view{
				width: 33.33%;
				height: 100%;
				text-align: center;
				line-height: 56upx;
				box-sizing: border-box;
				border: 1px solid rgba(187,187,187,100)
			}
		}
		.table_content{
			width: 100%;
			height: 56upx;
			display: flex;
			justify-content: space-between;
			view{
				width: 33.33%;
				height: 100%;
				box-sizing: border-box;
				text-align: center;
				line-height: 56upx;
				border: 1px solid rgba(187,187,187,100)
			}
		}
	}
	.table_img{
		width: 48upx;
		height: 48upx;
		margin: 0 auto;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.submit_button{
		width: 376upx;
		height: 86upx;
		margin: 30upx auto;
		background-color: #3F3E51;
		color: white;
		border: 1px solid rgba(187,187,187,100);
		border-radius: 50upx;
		text-align: center;
		line-height: 86upx;
	}
	.select_button{
		width: 376upx;
		height: 86upx;
		margin: 0 auto;
		background-color: #3F3E51;
		color: white;
		border: 1px solid rgba(187,187,187,100);
		border-radius: 50upx;
		text-align: center;
		line-height: 86upx;
	}
</style>
