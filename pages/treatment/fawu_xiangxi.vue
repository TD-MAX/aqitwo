<template>
	<view class="faw">
		<view class="" v-if="new_list !== null">
			<h3>案情介绍</h3>
			<view class="nav-head">
				<text>{{new_list.anqingjieshao}}</text>
			</view>
			<h3>律师解读</h3>
			<view class="nav-head">
				<text>{{new_list.lvshijiedu}}</text>
			</view>
			<h3>判决宗旨</h3>
			<view class="nav-head">
				<text>{{new_list.panjueyaozhi}}</text>
			</view>
			<h4>来源：</h4>
			<view class="bottom">
				<text>{{new_list.shoulilvshi}}</text>
				<text>{{new_list.createdate}}</text>
			</view>
		</view>
		<view class="null" v-if="new_list === null">
			<text>暂无此案情信息~~~</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				new_list: null
			}
		},
		methods: {
			show () {
				this.$http.post('lessonaqi/api/lessongetanliinfo',{
					id: this.id
				},{})
				.then(res => {
					if (res.data) {
						this.new_list = res.data
						console.log(res.data)
					}
				})
				.catch(err => {
					console.log(err)
				})
			}
		},
		onLoad(option) {
			this.id = option.data
			this.show()
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
	}
	.faw {
		width: 100%;
		padding-left: 1%;
	}
	h3 {
		text-align: center;
	}
	h4{
		margin: 20upx 0;
	}
	.null {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.nav-head {
		width: 98%;
		box-sizing: border-box;
		padding: 15upx;
		box-shadow: #6496C6 1px 1px 1px 1px;
		border: 1px solid #6496C6;
		font-size: 28upx;
		/* color: #9DDDFA; */
		line-height: 45upx;
		margin: 20upx 0;
	}
	.nav-head text {
		display: block;
		text-indent: 56upx;
	}
	.bottom {
		width: 98%;
		display: flex;
		justify-content: space-between;
	}
</style>
