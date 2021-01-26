<template>
	<view class="lvshi_continue">
		<view class="lvshi_bei">
			<view class="lvshi_msg">
				<view class="">
					<image :src="newlist.zhaopian" mode="aspectFill"></image>
				</view>
				<view class="msg_right">
					<p>{{newlist.name}}律师</p>
					<text>山西长治</text>
					<text>擅长：企业法务、公司治理、企业兼重组、国企改革、政府法务</text>
				</view>
			</view>
		</view>
		<view class="lvshi_fuwu">
			<view class="fuwu_head">
				<image src="../../static/lvshi/lvshifuwudanwei.png" mode="aspectFit"></image>
				<p>律师服务单位</p>
			</view>
			<view class="fuwu_content">
				<text>{{newlist.jingli}}</text>
			</view>
		</view>
		<view class="lvshi_dangan">
			<view class="fuwu_head">
				<image src="../../static/lvshi/lvshidangan.png" mode="aspectFit"></image>
				<p>律师档案</p>
			</view>
			<!-- <view class="dangan_msg">
				<view class="_tit">
					<text>执业证号：</text>
				</view>
				<view class="_tent">
					<text>11101200811715711</text>
				</view>
			</view>
			<view class="dangan_msg">
				<view class="_tit">
					<text>办公地址：</text>
				</view>
				<view class="_tent">
					<text>山西省长治市潞洲区</text>
				</view>
			</view>
			<view class="dangan_msg">
				<view class="_tit">
					<text>执业经历：</text>
				</view>
				<view class="_tent">
					<text>2004年从事律师职业至今，师从国家一级律师张建云</text>
				</view>
			</view> -->
			<view class="dangan_msg">
				<view class="_tit">
					<text>律师简介：</text>
				</view>
				<view class="_tent">
					<text>{{newlist.gerenjieshao}}</text>
				</view>
			</view>
		</view>
		<!-- <view class="lvshi_anli">
			<view class="fuwu_head">
				<image src="../../static/lvshi/lvshidangan.png" mode="aspectFit"></image>
				<p>律师经典案例</p>
				<text>查看更多>>></text>
			</view>
			<view class="anli_msg">
				<ul>
					<li>买卖合同纠纷</li>
					<li>诉讼中被解除股东身份</li>
				</ul>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '', //id
				newlist: {}
			}
		},
		methods: {
			show () {
				this.$http.post('lessonaqi/api/lessongetlvshiinfo',{
					id: this.id
				},{})
				.then(res => {
					console.log(res)
					this.newlist = res.data
				})
				.catch(err => {
					console.log(err)
				})
			}
		},
		onLoad(option) {
			this.id = option.id
			this.show()
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
		background-color: #F5F5F5;
	}
	.lvshi_bei {
		width: 100%;
		height: 180upx;
		position: relative;
		padding-top: 20upx;
		box-sizing: border-box;
		/* background-color: #fff; */
		background-image: url(../../static/qyservice/fawubeijin.png);
		background-size: 100% 100%;
	}
	.lvshi_msg {
		width: 96%;
		height: 250upx;
		margin: auto;
		display: flex;
		border-radius: 20upx;
		background-color: #fff;
		.msg_right {
			width: calc(100% - 170upx);
			height: 180upx;
			margin: 20upx 0;
			display: flex;
			flex-direction: column;
			line-height: 45upx;
			font-size: 28upx;
			// border: 1px solid red;
			p {
				font-size: 32upx;
			}
		}
		image {
			width: 120upx;
			height: 120upx;
			border-radius: 20upx;
			margin: 20upx;
		}
	}
	.lvshi_fuwu {
		width: 96%;
		margin: 110upx auto 0 auto;
		background-color: #fff;
		border-radius: 20upx;
		box-sizing: border-box;
		padding: 20upx;
		.fuwu_head {
			width: 100%;
			height: 80upx;
			display: flex;
			line-height: 80upx;
			image {
				width: 80upx;
				height: 80upx;
				margin-right: 20upx;
			}
		}
		.fuwu_content {
			width: 100%;
			margin: 10upx 0 0 0;
			font-size: 28upx;
			text-indent: 56upx;
		}
	}
	.lvshi_dangan {
		width: 96%;
		margin: 20upx auto;
		background-color: #fff;
		border-radius: 20upx;
		box-sizing: border-box;
		padding: 20upx;
		.fuwu_head {
			width: 100%;
			height: 80upx;
			display: flex;
			line-height: 80upx;
			image {
				width: 80upx;
				height: 80upx;
				margin-right: 20upx;
			}
		}
		.dangan_msg {
			width: 100%;
			display: flex;
			margin: 10upx auto;
			font-size: 28upx;
			._tit {
				width: 140upx;
				// background-color: yellow;
			}
			._tent {
				width: calc(100% - 140upx);
				// background-color: red;
			}
		}
	}
	.lvshi_anli {
		width: 96%;
		margin: 20upx auto;
		background-color: #fff;
		border-radius: 20upx;
		box-sizing: border-box;
		padding: 20upx;
		.fuwu_head {
			width: 100%;
			height: 80upx;
			display: flex;
			position: relative;
			line-height: 80upx;
			image {
				width: 80upx;
				height: 80upx;
				margin-right: 20upx;
			}
			text {
				position: absolute;
				font-size: 28upx;
				right: 0;
			}
		}
		.anli_msg {
			width: 90%;
			margin: 10upx auto;
			font-size: 28upx;
			ul {
				padding: 0;
				// background-color: yellow;
			}
			li {
				margin-top: 10upx;
			}
		}
	}
</style>
