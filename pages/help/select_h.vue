<template>
	<view class="he_body">
		<view class="he_head">
			<view class="input">
				<i class="iconfont">&#xe6a6;</i>
				<input type="text" value="" />
			</view>
		</view>
		<view class="he_content">
			<view class="content_left">
				<view class="left_text" 
				v-for="(item,index) in selectList" :key="index"
				@click="tap(index)"
				:class="{'left_texts' : tabindex === index}"
				>
					<text>{{item.text}}</text>
				</view>
			</view>
			<scroll-view class="content_right" scroll-y="true" @scrolltolower="bottom_updata">
				<view class="right_view" v-for="(n,index1) in allist" :key="index1" @click="to(n.id)">
					<image :src="n.fengmian" mode="aspectFit" v-if="n.fengmian !== null"></image>
					<image src="../../static/photo.png" mode="aspectFit" v-if="n.fengmian === null"></image>
					<text>{{n.title}}</text>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabindex: 0,
				selectList:[
					{
						text: "所有分类"
					},
					{
						text: "智能设备"
					},
					{
						text: "互联网+服务"
					},
					{
						text: "企业服务"
					},
					{
						text: "文化娱乐"
					},
					{
						text: "AI机器人"
					},
					{
						text: "智能家居"
					},
					{
						text: "教育培训"
					},
					{
						text: "特色餐饮"
					},
					{
						text: "母婴幼教"
					},
					{
						text: "美容养生"
					},
					{
						text: "生活消费"
					}
				],
				pageNum: 1,
				allist:[],
				loadingtype: 'more'
			}
		},
		methods: {
			//点击select
			tap (e) {
				this.tabindex = e
				this.pageNum = 1
				this.allist = []
				if (e === 0) {
					let type = ''
					this.show(type)
				} else {
					let type = this.selectList[e].text
					this.show(type)
				}
			},
			show (type) {
				this.$http.post('lessonaqi/api/lessonqiyehuzhulistsaixuan',{
					userid: uni.getStorageSync('userId'),
					pageNum: this.pageNum,
					pageSize: 12,
					hangye: type
				},{})
				.then(res => {
					console.log(res)
					if (res.data.rows !== null) {
						this.allist = this.allist.concat(res.data.rows)
						let more_page = Math.ceil(res.data.total / 12)
						if (this.pageNum === more_page) {
							this.loadingtype = 'nomore'
						}
						this.pageNum++
					}
				})
				.catch(err => {
					console.log(err)
				})
			},
			to (value) {
				uni.navigateTo({
					url: './g_xiang?id=' + value
				})
			},
			bottom_updata () {
				if (this.tabindex === 0) {
					let type = ''
					if (this.loadingtype === 'more') {
						this.show(type)
					} else {
						this.$api.msg('没有更多数据了')
					}
				} else {
					let type = this.selectList[this.tabindex].text
					if (this.loadingtype === 'more') {
						this.show(type)
					} else {
						this.$api.msg('没有更多数据了')
					}
				}
			},
		},
		onLoad() {
			this.show()
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F7F7F7;
	}
	.he_body {
		width: 100%;
	}
	.he_head {
		width: 96%;
		height: 100upx;
		margin: 10upx auto;
		display: flex;
		justify-content: space-around;
		.input {
			width: 100%;
			height: 90%;
			display: flex;
			line-height: 100upx;
			padding: 0 20upx;
			// border: 1px solid red;
			box-sizing: border-box;
			justify-content: space-between;
			box-shadow: #C4C4C4 0 5upx 10upx 1upx; 
			input {
				width: 90%;
				height: 100%;
			}
		}
	}
	.he_content {
		width: 96%;
		margin: 10upx auto;
		display: flex;
		.content_left {
			width: 180upx;
			height: 1080upx;
			background-color: #fff;
			display: flex;
			flex-direction: column;
			.left_text {
				flex: 1;
				text-align: center;
				line-height: 90upx;
				font-size: 28upx;
			}
			.left_texts {
				background-color: #F5F5F5;
			}
		}
		.content_right {
			width: calc(100% - 180upx);
			max-height: 1080upx;
			display: flex;
			flex-wrap: wrap;
			box-sizing: border-box;
			.right_view {
				width: 42%;
				height: 200upx;
				float: left;
				margin: 5upx 20upx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				// border: 1px solid red;
				text-align: center;
				font-size: 28upx;
				image {
					width: 98%;
					height: 140upx;
					border-radius: 20upx;
				}
			}
		}
	}
</style>
