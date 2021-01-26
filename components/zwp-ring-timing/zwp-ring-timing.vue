<template>
	<view v-if="showViewToken" class="ring-timing" :style="containerStyles">
		<!-- #ifndef APP-NVUE -->
		<view class="ring-timing-half ring-timing-left" :style="leftStyles" @transitionend="onTimingEnd" />
		<view class="ring-timing-half ring-timing-right" :style="rightStyles" />
		<!-- #endif -->
		<!-- #ifdef APP-NVUE -->
		<view :ref="`leftHalf${showViewToken}`" class="ring-timing-half ring-timing-left" :style="leftStyles" />
		<view :ref="`rightHalf${showViewToken}`" class="ring-timing-half ring-timing-right" :style="rightStyles" />
		<!-- #endif -->
		<view class="ring-timing-center" :style="centerStyles"><slot /></view>
	</view>
</template>

<script>
// #ifdef APP-NVUE
const animation = weex.requireModule('animation')
// #endif

/**
 * zwp-ring-timing 圆环计时器，不使用canvas和定时器，仅css
 * @property {String} *mode 模式，可选值：timing定时器，chart当作图表用于展示数据（图表模式仅限看看，真要做图表还是用canvas好）
 * @property {String} activeColor 进度条走过的颜色
 * @property {String} defaultColor 进度条底色
 * @property {String} centerBgColor 圆环中间区域的背景色
 * @property {Number} radius 圆形半径或整个组件的一半尺寸（包含了圆环的宽度）
 * @property {Number} barWidth 圆环宽度
 * @property {Number} startDeg 进度开始的角度
 * @property {Number} duration timing模式的定时时间
 * @property {Number} value chart模式的值（1~100）
 * @event {Function} timingEnd timing模式下定时完成的回调
 */

export default {
	props: {
		mode: {
			validator: value => ['timing', 'chart'].includes(value),
			default: 'timing'
		},
		activeColor: {
			type: String,
			default: '#42b983'
		},
		defaultColor: {
			type: String,
			default: '#EEEEEE'
		},
		centerBgColor: {
			type: String,
			default: '#FFFFFF'
		},
		radius: {
			type: Number,
			default: 100
		},
		barWidth: {
			type: Number,
			default: 10
		},
		startDeg: {
			type: Number,
			default: 0
		},
		duration: {
			type: Number,
			default: 1
		},
		value: Number
	},

	data() {
		return {
			isStart: false,
			showViewToken: Date.now() // nvue用来重置进度的
		}
	},
	
	computed: {
		containerStyles() {
			const { radius, startDeg, activeColor } = this
			return {
				borderRadius: `${radius}rpx`,
				height: `${radius * 2}rpx`,
				width: `${radius * 2}rpx`,
				transform: `rotate(${startDeg}deg)`,
				backgroundColor: activeColor
			}
		},
		leftStyles() {
			const { mode, radius, defaultColor, isStart, duration, value } = this
			return {
				height: `${radius * 2}rpx`,
				width: `${radius}rpx`,
				backgroundColor: defaultColor,
				borderTopLeftRadius: `${radius}rpx`,
				borderBottomLeftRadius: `${radius}rpx`,
				...(mode == 'timing' ? {
					// #ifndef APP-NVUE
					transitionDuration: `${isStart ? duration : 0}s`,
					transform: `rotate(${isStart ? 180 : -180}deg)`
					// #endif
				} : {
					transform: `rotate(${-180 + value * 3.6}deg)`
				})
			}
		},
		rightStyles() {
			const { mode, radius, activeColor, defaultColor, isStart, duration, value } = this
			return {
				height: `${radius * 2}rpx`,
				width: `${radius}rpx`,
				backgroundColor: defaultColor,
				borderTopRightRadius: `${radius}rpx`,
				borderBottomRightRadius: `${radius}rpx`,
				...(mode == 'timing' ? {
					// #ifndef APP-NVUE
					backgroundColor: isStart ? activeColor : defaultColor,
					transitionDelay: `${isStart ? duration / 2 : 0}s`,
					transform: `rotate(${isStart ? 0 : -180}deg)`
					// #endif
				} : {
					backgroundColor: value >= 50 ? activeColor : defaultColor,
					transform: `rotate(${value >= 50 ? 0 : -180}deg)`,
				})
			}
		},
		centerStyles() {
			const { radius, centerBgColor, barWidth, startDeg } = this
			return {
				borderRadius: `${radius - barWidth}rpx`,
				height: `${(radius - barWidth) * 2}rpx`,
				width: `${(radius - barWidth) * 2}rpx`,
				transform: `translate(-50%, -50%) rotate(-${startDeg}deg)`,
				backgroundColor: centerBgColor,
				left: `${radius}rpx`,
				top: `${radius}rpx`
			}
		}
	},

	methods: {
		// #ifdef APP-NVUE
		createAnimation(direction, styles, callback = () => {}) {
			let { showViewToken, duration } = this
			let isLeft = direction == 'left'
			animation.transition(
				this.$refs[`${direction}Half${showViewToken}`],
				{
					styles,
					duration: isLeft ? duration * 1000 : 0,
					delay: !isLeft ? (duration / 2) * 1000 : 0,
					timingFunction: 'linear'
				},
				callback
			)
		},
		// #endif
		start() {
			if (this.mode == 'chart') return
			// #ifndef APP-NVUE
			this.isStart = true
			// #endif
			// #ifdef APP-NVUE
			const { createAnimation, activeColor, onTimingEnd } = this
			createAnimation('left', {
				transform: 'rotate(180deg)'
			}, onTimingEnd)
			createAnimation('right', {
				backgroundColor: activeColor,
				transform: 'rotate(0)'
			})
			// #endif
		},
		end() {
			if (this.mode == 'chart') return
			// #ifndef APP-NVUE
			this.isStart = false
			// #endif
			// #ifdef APP-NVUE
			this.showViewToken = 0
			this.$nextTick(() => {
				this.showViewToken = Date.now()
			})
			// #endif
		},
		onTimingEnd() {
			this.$emit('timingEnd')
		}
	}
}
</script>

<style scoped>
.ring-timing {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	position: relative;
}
.ring-timing-half {
	flex: 1;
	/* #ifndef APP-NVUE */
	transition-property: transform, background-color;
	transition-timing-function: linear;
	/* #endif */
	/* #ifdef APP-NVUE */
	transform: rotate(-180deg);
	/* #endif */
}
.ring-timing-left {
	transform-origin: right center;
}
.ring-timing-right {
	transform-origin: left center;
}
.ring-timing-center {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	justify-content: center;
	align-items: center;
	overflow: hidden;
	position: absolute;
}
</style>
