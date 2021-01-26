<template>
	<view class="content">
		<view class="_header">
			<text class="one">1</text>
			<view class=""></view>
			<text>2</text>
			<view class=""></view>
			<text>3</text>
		</view>
		<view class="_con">
			<text class="_top">我们怎么介绍你</text>
			<text>认真填写，为你匹配同城最适合异性</text>
		</view>
		<view class="sex">
			<view class="_top">
				<text class="_left">你的性别</text>
				<text>（*注册后不可更改）</text>
			</view>
			<view class="select_sex">
				<view class="boy" :class="{ select_boy: sex === '1' }" @click="select_sex('1')">
					<i class="iconfont">&#xe61a;</i>
					<text>男</text>
				</view>
				<view class="gils" :class="{ select_gils: sex === '0' }" @click="select_sex('0')">
					<i class="iconfont">&#xe6ee;</i>
					<text>女</text>
				</view>
			</view>
			<view class="list-cell b-b m-t" hover-class="cell-hover" :hover-stay-time="50">
				<text class="cell-tit">昵称</text>
				<input class="uni-input" v-model="name" placeholder="请输入昵称" maxlength="8" />
				<i class="iconfont">&#xe602;</i>
			</view>
			<view class="list-cell b-b m-t" hover-class="cell-hover" :hover-stay-time="50" @click="select_time">
				<text class="cell-tit">生日</text>
				<text class="cell-content">{{ birthday ? birthday : '点击设置生日' }}</text>
				<i class="iconfont">&#xe602;</i>
			</view>
			<min-popup heightSize="500" :show="show" @close="close"><min-picker :endTime="endTime" :startTime="startTimes" @cancel="cancel" @sure="sure"></min-picker></min-popup>
		</view>
		<view class="_next" @click="next">下一步</view>
	</view>
</template>

<script>
import _ from 'lodash';
import MinPopup from '../../components/min-picker/min-popup.vue';
import MinPicker from '../../components/min-picker/min-picker.vue';
import moment from 'moment';
export default {
	data() {
		return {
			startTimes: [1970, 1, 1],
			endTime: Number(moment().format('YYYY')) - 18,
			show: false,
			sex: '1',
			birthday: '',
			name: '',
			gender:''
		};
	},
	components: {
		MinPopup,
		MinPicker
	},
	onLoad() {},
	methods: {
		select_time() {
			this.show = true;
		},
		// 取消事件
		cancel() {
			this.close();
		},
		// 确认事件
		sure(e) {
			this.birthday = e;
		},
		// 关闭picker
		close() {
			this.show = false;
		},
		select_sex(e) {
			this.sex = e;
			console.log(this.sex);
		},
		next() {
			if (this.birthday && this.name) {
				let birthYear = this.birthday.slice(0, 4);
				let birthMonth = this.birthday.slice(5, 7);
				let birthDay = this.birthday.slice(8, 10);
				if(this.sex == 1){
					this.gender = 1
				}else if(this.sex == 0){
					this.gender = 2
				}
				this.$http
					.post(
						'lessonxiangqin/api/setUserInfo',
						{
							userId: uni.getStorageSync('userId'),
							nickname: this.name,
							birthYear: birthYear,
							birthMonth: birthMonth,
							birthDay: birthDay,
							gender: this.gender
						},
						{}
					)
					.then(res => {
						console.log('用户没问题');
						console.log(res);
						uni.redirectTo({
							url: `/pages/xiangqin/login/index3`
						});
					})
					.catch(err => {});
				this.$http
					.post(
						'lessonxiangqin/api/lessonyonhuxinxixiugai',
						{
							id: uni.getStorageSync('userId'),
							xiangqinname: this.name,
							birthday: this.birthday,
							gender: this.sex
						},
						{}
					)
					.then(res => {
						console.log('用户没问题');
						console.log(res);
						uni.redirectTo({
							url: `/pages/xiangqin/login/index3`
						});
					})
					.catch(err => {});
			} else {
				this.$api.msg('请填写完整的信息');
			}
		}
	}
};
</script>

<style lang="scss">
page {
	height: 100%;
}
.content {
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	box-sizing: border-box;
	padding: 200rpx 0;
	._header {
		display: flex;
		align-items: center;
		width: 65%;
		view {
			width: 170rpx;
			height: 2rpx;
			background-color: #25d3d2;
		}
		text {
			width: 45rpx;
			height: 45rpx;
			background-color: #e0e0e0;
			color: #000;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 50%;
			font-size: 28rpx;
		}
		.one {
			width: 54rpx;
			height: 54rpx;
			background-color: #25d3d2;
			font-size: 32rpx;
		}
	}
	._con {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 90rpx;
		text {
			font-size: 26rpx;
			color: #000;
		}
		._top {
			font-size: 40rpx;
			font-weight: 600;
		}
	}
	.sex {
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items: center;
		._top {
			width: 100%;
			display: flex;
			padding: 35rpx;
			align-items: center;
			box-sizing: border-box;
			text {
				font-size: 26rpx;
				color: #25d3d2;
			}
			._left {
				font-size: 40rpx;
				color: #000;
			}
		}
		.select_sex {
			width: 90%;
			display: flex;
			justify-content: space-between;
			view {
				width: 47%;
				height: 80rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 80rpx;
				background: #e0e0e0;
				color: #333;
				i {
					color: #b7b7b7;
				}
				text {
					padding-left: 20rpx;
				}
			}
			.gils {
				background: #e0e0e0;
				color: #333;
				i {
					color: #b7b7b7;
				}
			}
			.select_boy {
				background: #25d3d2;
				color: #fff;
				i {
					color: #fff;
				}
			}
			.select_gils {
				background: #fe8598;
				color: #fff;
				i {
					color: #fff;
				}
			}
		}
	}
	._next {
		width: 90%;
		height: 90rpx;
		background-color: #25d3d2;
		color: #fff;
		font-size: 42rpx;
		line-height: 90rpx;
		text-align: center;
		border-radius: 110rpx;
		margin-top: 160rpx;
	}
}
.list-cell {
	display: flex;
	align-items: center;
	/* align-items:baseline; */
	width: 100%;
	padding: 20rpx 43rpx;
	line-height: 60rpx;
	position: relative;
	background: #fff;
	justify-content: center;
	box-sizing: border-box;
	border-bottom: 1px solid #f3f4f6;
	&.log-out-btn {
		margin-top: 40rpx;
		.cell-tit {
			color: #303133;
			text-align: center;
			margin-right: 0;
		}
	}
	&.cell-hover {
		background: #fafafa;
	}
	&.b-b:after {
		left: 30rpx;
	}
	&.m-t {
		margin-top: 16rpx;
	}
	.header_img {
		width: 100rpx;
		height: 100rpx !important;
		border-radius: 100rpx;
	}
	.cell-more {
		/* align-self: baseline; */
		font-size: 30rpx;
		color: #333;
		margin-left: 10rpx;
	}
	.cell-tit {
		flex: 1;
		font-size: 30rpx;
		color: #333;
		margin-right: 10rpx;
	}
	.cell-tip {
		font-size: 28rpx;
		color: #333;
	}
	.uni-input {
		text-align: right;
		width: 500rpx;
	}
	.cell-content {
		font-size: 32rpx;
		color: #333;
		font-weight: 600;
	}
	.uni-padding-wrap {
		font-size: 32rpx;
		display: flex;
		align-items: center;
	}
	radio {
		transform: scale(0.75);
	}
	i {
		font-size: 26rpx;
		color: #949494;
	}
}
</style>
