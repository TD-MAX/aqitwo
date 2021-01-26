<template>
	<view class="home_body">
		<view class="home_swiper">
			<u-swiper @change="change" :height="280"
			:list="imgList" :title="false" :mode="indicator" 
			:indicatorPos="indicatorPos"></u-swiper>
		</view>
		<view class="home_card">
			<view class="card_head">
				<text>创业活动</text>
				<view class="card_head_right">更多></view>
			</view>
			<view class="card_content">
				<view class="card_content_left" v-for="(x,indexs) in hdList" :key="indexs">
					<view class="left_image">
						<view class="left_image_text">
							{{x.huodongfeiyong ? x.huodongfeiyong + '元' : '免费'}}
						</view>
						<u-image :width="'300'" :height="'260'"
						:src="x.fengmian" :borderRadius="10"></u-image>
					</view>
					<view class="left_test">
						<text class="content_text">{{x.title}}</text>
						<text class="content_text">{{x.huodongkaishitime}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="">
			<u-gap :bg-color="'#F5F5F5'" :height="'10'" 
			:margin-top="'10'"></u-gap>
		</view>
		<view class="home_card1">
			<view class="card_head">
				<text>创业空间</text>
			</view>
			<view class="home_swiper1">
				<u-swiper :list="spaceList" :title="true" 
				:mode="indicator" :indicatorPos="indicatorPos"
				:effect3d="true" :effect3dPreviousMargin="215" :imgMode="'aspectil'"></u-swiper>
			</view>
		</view>
		<view class="">
			<u-gap :bg-color="'#F5F5F5'" :height="'10'" 
			:margin-top="'10'"></u-gap>
		</view>
		<view class="home_card2">
			<view class="card_head">
				<text>创业政策</text>
				<view class="card_head_right">
					更多>
				</view>
			</view>
			<view class="card_content2">
				<view class="card_content2_text" v-for="n in 2" :key="n">
					<view class="card_text_left">
						<text>共战疫情，众志成城-减税，减租等政策；北京市各企业出手扶贫</text>
						<text>2020-03-13</text>
					</view>
					<view class="card_text_right">
						<image 
						src="../../static/photo.png" mode="aspectFill">
						</image>
					</view>
				</view>
			</view>
		</view>
		<view class="home_card3">
			<view class="card_head">
				<text>创业家庭</text>
			</view>
			<view class="card_head1">
				<text>项目之家</text>
				<view class="card_head_right">
					更多
				</view>
			</view>
			</u-cell-item>
			<view class="card3_content">
				<view class="content_box" v-for="a in 2" :key="a">
					<text class="text_name">山西推动有限科技公司</text>
					<u-slider :value="10" :min="0" :max="5000" activeColor="#EC4800" inactiveColor="#ffffff" blockColor="#EC4800" blockWidth="12" ></u-slider>
					<view class="box-bottom">
						<view class="box-bottom-jine">
							<text>目标金额</text>
							<text>5000万元</text>
						</view>
						<view class="box-bottom-jine">
							<text>目标金额</text>
							<text>5000万元</text>
						</view>
						<view class="box-bottom-jine">
							<view class="touzi">
								投资
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="">
			<u-gap :bg-color="'#F5F5F5'" :height="'10'" 
			:margin-top="'10'"></u-gap>
		</view>
		<view class="home_card4">
			<view class="card_head1">
				<text>创业导师</text>
				<view class="card_head_right">
					更多>
				</view>
			</view>
			<view class="card_content4">
				<view class="content4-box" v-for="x in 8" :key="x">
					<image src="../../static/photo.png" mode="aspectFill"></image>
					<text>景大空间孵化器—空间预约</text>
				</view>
			</view>
		</view>
		<view class="">
			<u-gap :bg-color="'#F5F5F5'" :height="'10'" 
			:margin-top="'10'"></u-gap>
		</view>
		<view class="home_card">
			<view class="card_head">
				<text>创业圈子</text>
				<view class="card_head_right">更多></view>
			</view>
			<view class="card_content">
				<view class="card_content_left">
					<view class="left_image">
						<view class="left_image_text">
							免费
						</view>
						<u-image :width="'300'" :height="'260'"
						:src="src" :borderRadius="10"></u-image>
					</view>
					<view class="left_test">
						<text class="content_text">创业那点事</text>
						<text class="content_text">07月10日 08:00</text>
					</view>
				</view>
				<view class="card_content_left">
					<view class="left_image">
						<view class="left_image_text">
							免费
						</view>
						<u-image :width="'300'" :height="'260'"
						:src="src" :borderRadius="10"></u-image>
					</view>
					<view class="left_test">
						<text class="content_text">寻直通道和之人嘻嘻哈哈个谁来回答我文化方式</text>
						<text class="content_text">07月10日 08:00</text>
					</view>
				</view>
			</view>
		</view>
		<view class="">
			<u-gap :bg-color="'#F5F5F5'" :height="'10'" 
			:margin-top="'10'"></u-gap>
		</view>
		<view class="home_card_last">
			<view class="card_head">
				<text>招聘话题</text>
				<view class="card_head_right">更多></view>
			</view>
			<view class="last_content" v-for="c in 2" :key="c">
				<view class="last_content_user">
					<view class="user_img">
						<image src="../../static/photo.png" mode="aspectFill"></image>
					</view>
					<view class="user_name_time">
						<p>超超</p>
						<text>2020-11-09</text>
					</view>
				</view>
				<view class="last_content_usertext">
					<text>T11生鲜超市国奥店招聘</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import _ from 'lodash'
	export default {
		data() {
			return {
				imgList:[], //轮播图列表
				imgLists: [
					{
						image: 'http://qilianxiangqin.oss-cn-beijing.aliyuncs.com/aqi/pload/2021/01/20/a0752360-8db2-4208-a5f0-8227aab127e7.png?Expires=2241855013&OSSAccessKeyId=LTAI4GBFk5WDFTUSnuimghyp&Signature=HQtPHEqswHUjJ8P8eN6IGFC99A8%3D',
						title: '企业入驻'
					},
					{
						image: 'http://qilianxiangqin.oss-cn-beijing.aliyuncs.com/aqi/pload/2021/01/21/17460081-9b65-42a2-8be2-99a806fd2575.png?Expires=2241936018&OSSAccessKeyId=LTAI4GBFk5WDFTUSnuimghyp&Signature=mqBb1mPsdE%2F%2Fyfp3KQbqm5D9QWA%3D',
						title: '签到积分'
					},
					{
						image: 'http://qilianxiangqin.oss-cn-beijing.aliyuncs.com/aqi/pload/2020/12/01/538385a5-2d1c-4250-8d99-61690e23e5da.jpg',
						title: '同城房产'
					}
				],
				spaceList: [], //空间列表
				hdList: [], //活动；列表
				indicator: 'round',
				indicatorPos: 'bottomRight',
				src:'../../static/photo.png'
			}
		},
		methods: {
			change (e) {},
			//顶部轮播图展示
			imgShow () {
				this.$http.post('cl/api/getcllunbotu',{},{})
				.then(res => {
					console.log(res)
					_.each(res.data, o => {
						this.imgList.push({
							image: o.lunbotu
						})
					})
				})
				.catch(err => {
					console.log(err)
				})
			},
			//创业活动列表展示
			hdShow () {
				this.$http.post('cl/api/getchuangyehuodonglist',{
					pageNum: 1,
					pageSize: 2
				},{})
				.then(res => {
					console.log(res)
					this.hdList = res.data.rows
				})
				.catch(err => {
					console.log(err)
				})
			},
			//创业空间列表展示
			interspace () {
				this.$http.post('cl/api/getchuangyekongjianlist',{
					pageNum: 1,
					pageSize: 5
				},{})
				.then(res => {
					console.log(res)
					_.each(res.data.rows, o => {
						this.spaceList.push({
							image: o.fengmian
						})
					})
				})
				.catch(err => {
					console.log(err)
				})
			}
		},
		onShow() {
			this.imgShow() //轮播图展示
			this.hdShow() //活动列表展示
			this.interspace()  //活动空间列表展示
		}
	}
</script>

<style>
	.home_body {
		width: 100%;
	}
	.home_swiper {
		width: 94%;
		height: 280upx;
		background-color: #fff;
		border-radius: 40upx;
		overflow: hidden;
		margin: auto;
	}
	.home_card {
		width: 94%;
		height: 430upx;
		margin: auto;
		/* border: 1px solid red; */
	}
	.card_head {
		width: 100%;
		height: 80upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 32upx;
		font-weight: 600;
	}
	.card_head1 {
		width: 100%;
		height: 60upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 28upx;
		/* font-weight: 600; */
	}
	.card_head_right {
		width: 100upx;
		height: 40upx;
		background-color: #EC4800;
		color: white;
		font-size: 24upx;
		text-align: center;
		line-height: 40upx;
		border-radius: 40upx;
	}
	.card_content {
		width: 100%;
		height: 350upx;
		display: flex;
		justify-content: space-between;
	}
	.card_content_left {
		width: 46%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.left_image {
		width: 100%;
		height: 260upx;
		position: relative;
	}
	.left_image_text {
		width: 100upx;
		height: 40upx;
		position: absolute;
		top: 10upx;
		left: 10upx;
		background-color: #EC4800;
		color: white;
		font-size: 28upx;
		text-align: center;
		line-height: 40upx;
		border-radius: 50upx;
		z-index: 99;
	}
	.card_content_left text {
		display: block;
		font-size: 28upx;
		font-weight: 600;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.home_card1 {
		width: 94%;
		height: 360upx;
		margin: auto;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		/* border: 1px solid red; */
	}
	.home_swiper1 {
		width: 90%;
		margin: auto;
	}
	.home_card2 {
		width: 94%;
		height: 380upx;
		margin: auto;
		display: flex;
		flex-direction: column;
	}
	.card_content2 {
		width: 100%;
		height: 320upx;
		display: flex;
		flex-direction: column;
	}
	.card_content2_text {
		width: 100%;
		height: 140upx;
		margin: 10upx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #F5F5F5;
	}
	.card_text_left {
		width: calc(100% - 165upx);
		height: 100%;
		padding: 6upx 0;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-size: 28upx;
		/* font-weight: 600; */
	}
	.card_text_left text {
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient:vertical;
	}
	.card_text_right {
		width: 160upx;
		height: 134upx;
	}
	.card_text_right image {
		width: 100%;
		height: 100%;
		border-radius: 10upx;
	}
	.home_card3 {
		width: 94%;
		height: 780upx;
		margin: auto;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.card3_content {
		width: 100%;
		height: 620upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.content_box {
		width: 100%;
		height: 300upx;
		position: relative;
		border-radius: 20upx;
		padding: 80upx 20upx;
		box-sizing: border-box;
		background-color: #C3C3C3;
		color: white;
	}
	.text_name {
		display: block;
		margin: 20upx 0;
	}
	.box-bottom {
		width: 100%;
		height: 90upx;
		position: absolute;
		bottom: 10upx;
		left: 20upx;
		display: flex;
		/* border: 1px solid red; */
	}
	.box-bottom-jine {
		flex: 1;
		height: 100%;
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		justify-content: space-around;
	}
	.box-bottom-jine .touzi {
		width: 120upx;
		height: 40upx;
		text-align: center;
		line-height: 40upx;
		font-size: 26upx;
		border: 1px solid #fff;
		border-radius: 50upx;
	}
	.home_card4 {
		width: 94%;
		height: 350upx;
		margin: auto;
		/* border: 1px solid red; */
	}
	.card_content4 {
		width: 100%;
		height: 280upx;
		display: flex;
		justify-content: space-between;
		flex-shrink: 0;
		white-space: nowrap;
		overflow-x: auto;
		/* border: 1px solid red; */
		font-size: 28upx;
		box-sizing: border-box;
	}
	.content4-box {
		width: 200upx;
		height: 280upx;
		margin: 0 10upx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.content4-box image {
		width: 100%;
		height: 180upx;
		border-radius: 20upx;
	}
	.content4-box text {
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient:vertical;
	}
	.home_card_last {
		width: 94%;
		margin: auto;
	}
	.last_content {
		width: 100%;
		height: 180upx;
		margin: 5upx 0;
	}
	.last_content_user {
		width: 100%;
		height: 120upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.user_img {
		width: 100upx;
		height: 100upx;
	}
	.user_img image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.user_name_time {
		width: calc(100% - 120upx);
		height: 120upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.last_content_usertext {
		width: 100%;
		height: 60upx;
		line-height: 60upx;
		font-weight: 600;
	}
</style>
