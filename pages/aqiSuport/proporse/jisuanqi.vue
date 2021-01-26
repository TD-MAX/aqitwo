<template>
	<div>
		<view>
			
			<view class="table_view">
				<table class="table_style">
					
					<!-- 贷款金额 -->
					<tr class="inp">
						<td>
							贷款金额：
						</td>
						<td>
							<input class="input_box" type="text" name="input" placeholder="" v-model="je" value="100" />
							<!-- <span style=" position: absolute; top: 9.5%; right: 26%; display: table-cell;background-color: #FFFFFF;white-space: nowrap; padding: 5px 10px;">万元</span> -->
							<span >万元</span>
						</td>
					</tr>

					<!-- 贷款期限 -->
					<tr>
						<td>
							贷款期限：
						</td>
						<td>
							<picker mode="selector" :range="qisList" @change="selectChange" class="picked">
								<view class="qici">{{qis === '' ? '请选择期限': qis}}</view>
							</picker>
							<span>期</span>	
						</td>
					</tr>

					<!-- 贷款利率 -->
					<tr class="inp">
						<td>
							贷款利率：
						</td>
						<td>
							<input class="input_box" type="text" name="input" placeholder="" v-model="lv" value="5.0" />
							<!-- <span style=" position: absolute; top: 15%; right: 30%; display: table-cell;background-color: #FFFFFF;white-space: nowrap; padding: 5px 10px;">%</span> -->
							<span >%</span>
						</td>
					</tr>

					<!-- 还款方式 -->
					<tr>
						<td class="td01">
							还款方式：
						</td>
						<td class="radio-box">
							<radio-group>
								<!-- <radio class="rad" value="r1" checked="true" />等额本息</label> -->
								<radio class="rad" value="r2" checked="true" />等额本金</label>
							</radio-group>

						</td>
					</tr>
				</table>
				<!-- 按钮 -->
				<br />
				<table class="but">

					<button label="InteresTresult" class="mini-btn" size="mini" @click="toSim">计算</button>
					<button class="mini-btn" size="mini" @click="sum">重置</button>
				</table>
			</view>
		</view>

		<br />

		<!-- 子页面 -->
		<!-- 利息数据集 -->
		<table class="table" v-show="show">
			<!-- 列表数据 -->
			<!-- 利息 -->
			<tr>
				<td colspan="2">
					利息总额:{{hlixi}}
				</td>
				<td></td>
				<td colspan="2">
					累计还款总额:{{hje}}
				</td>
			</tr>
			<tr>
				<td>
					期次
				</td>
				<td>
					偿还本金(元)
				</td>
				<td>
					偿还利息(元)
				</td>
				<td>
					合计还款(元)
				</td>
				<td>
					剩余本金(元)
				</td>
			</tr>

			<tr v-for="(item,index) in zhiList" :key="index">
				<td>
					{{item.qis}}
				</td>
				<td>
					{{item.hbenjin}}
				</td>
				<td>
					{{item.lixi}}
				</td>
				<td>
					{{item.cbenjin}}
				</td>
				<td v-if="item.sbenjin<0">
					0
				</td>
				<td v-if="item.sbenjin>0">
					{{item.sbenjin}}
				</td>
			</tr>


		</table>
	</div>

</template>

<script>	
	export default {
		data() {
			return {
				// 设置子页面默认不显示
				show: false,
				//传值
				qisList:['12','24'],
				je: '', //贷款金额(显示)
				lv: '', //贷款利率(显示)
				jes: '', //贷款金额(计算)
				lvs: '', //贷款利率(计算)
				qis: '', //贷款期限
				hbenjin: '', //偿还本金
				lixi: '', //偿还利息
				cbenjin: '', //合计还款
				sbenjin: '', // 剩余还款本金
				hlixi: 0, //归还利息总额
				hje: 0, // 还款总额
				ylv: '', // 月利率
				qs: this.qis, // 贷款期数
				zhiList: [], //还款详细信息数组
				indexs:0,
				// 
				dkqxArray:['12','24'],
				dkqxIndex:0,
				dkqxArrayType:'12',
				
				// 贷款期限下拉框值
				statelist:[
					{
						value:'12',
						label:'1年12期'
					},
					{
						value:'24',
						label:'2年24期'
					}
				]
				
				
			}
		},
		created(){
			this.dkqx=this.statelist[0].value;
		},
		methods: {
			dkqx(e){
				this.dkqxIndex=e.target.value;
				this.dkqxArrayType=this.dkqxArray[this.dkqxIndex]
			},
			//选择期限
			selectChange (evt) {
				console.log(evt.detail.value)
				this.indexs = evt.detail.value
				this.qis = this.qisList[this.indexs]
			},
			toSim() {
				// 变量赋值
				this.zhiList = []
				this.show = true
				this.jes = this.je * 10000
				this.lvs = this.lv / 100
				this.ylv = this.lvs / 12
				this.sbenjin = this.jes
				this.hbenjin = parseInt(this.jes) / parseInt(this.qis)
				this.hlixi = 0
				// this.qs=this.qis
				// console.log(this.ylv)

				this.lixiList = []
				this.huankuanList = []

				// 循环向数组中添加值
				for (var i = 1; i <= this.qis; i++) {
					this.zhiList.push({
						// 期次、偿还本金、利息、合计还款、剩余未还本金
						qis: i,
						hbenjin: parseFloat(this.hbenjin).toFixed(0),
						lixi: parseFloat((parseInt(this.sbenjin) - parseInt(this.hbenjin) * (i - 1)) * this.lvs / 12).toFixed(0),
						cbenjin: parseFloat(parseInt(this.hbenjin) + (parseInt(this.sbenjin) - parseInt(this.hbenjin) * (i - 1)) * this
							.lvs / 12).toFixed(0),

						sbenjin: parseFloat(parseInt(this.sbenjin) - parseInt(this.hbenjin) * i - ((parseInt(this.sbenjin) - parseInt(
							this.hbenjin) * (i - 1)) * this.lvs / 12)).toFixed(0),

					})
					this.lixiList.push(this.zhiList[i - 1].lixi)
					this.huankuanList.push(this.zhiList[i - 1].cbenjin)
				}

				// 利息和
				var lixih = 0
				for (i = 0; i < this.lixiList.length; i++) {
					lixih += parseInt(this.lixiList[i])

				}
				this.hlixi = lixih

				// 累计还款
				var jeh = 0
				for (i = 0; i < this.huankuanList.length; i++) {
					jeh += parseInt(this.huankuanList[i])

				}
				this.hje = jeh
			},
			sum () {
				this.show = false
				this.je = ''
				this.lv = ''
				this.qis = ''
			}

		},
		components: {

		}

	}
</script>

<style>
	.qici{
		border: 1px solid #000000;
		width: 200upx;
	}
	.title {
		text-align: center;
		color: #666666;
	}

	.table_view[data-v-8d055134] {
		margin: auto;
		width: auto;
	}

	.table_view {
		padding: 40upx;
	}

	.table_style {
		height: 100upx;
		width: 660upx;
	}

	.table_style td {
		padding: 0px;
		display: inline-flex;
		font-size: 30upx;
	}

	.inp {
		margin: 40upx 0px;
		display: block;
	}

	.input_box[data-v-8d055134] {
		height: 60upx;
	}

	span {
		line-height: 60upx;
	}

	.parent {
		height: 60upx;
		overflow: hidden;
		border: 1px solid #000000;
	}

	.parent select {
		background: transparent;
		border: none;
		padding-left: 10px;
		width: 120px;
		height: 100%;
	}

	.parent select[data-v-8d055134] {
		width: 100%;
	}

	.table_view {
		border-collapse: collapse;
		text-align: left;
		margin-left: 30upx;
		border-color: #808080;
		width: 700upx;
		border-bottom: 1px solid #F2F2F2;
	}

	/* 输入框样式 */
	.input_box {
		border: 0.5px solid #000000;
		width: 200upx;
		padding: 1upx 0upx;
	}

	td {
		font-size: 20upx;
	}

	/* 按钮table */
	.but {
		margin: auto;
	}

	/* 按钮间距 */
	.mini-btn {
		margin-left: 10upx;
	}

	/* 单选框样式  begin*/
	.rad {
		zoom: 70%;
	}

	label:first-child {
		margin-right: 40rpx;
	}

	label input,
	.radio_on {
		display: none;
	}

	.pos {
		display: inline;
		vertical-align: middle;
	}

	.radio_bg {
		position: relative;
		display: inline-block;
		height: 20rpx;
		width: 20rpx;
		border: 1px solid #B3B4B8;
		border-radius: 50%;
	}

	label:hover.radio_bg,
	label input:checked+span.pos span.radio_bg {
		border: 1px solid #27B28B;
	}

	label input:checked+span.pos span.radio_bg.radio_on {
		display: inline-block;
		position: absolute;
		top: 2rpx;
		left: 2rpx;
		width: 10rpx;
		height: 10rpx;
		border-radius: 50%;
		background-color: #27B28B;
	}

	/* end */

	.table {
		border-collapse: collapse;
		text-align: left;
		margin-left: 20upx;
		border-color: #808080;
	}

	.table td {
		font-size: 20upx;
		padding: 0px 5px;
		text-align: left;
	}

	.table tr {
		height: 80upx;
		line-height: 80upx;
	}
	/* 选择器字体 */
	.picked{
		margin-top: 10upx;
		margin-right: 10upx;
	}
</style>
