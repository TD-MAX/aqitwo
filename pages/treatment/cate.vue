<template>
	<view class="cate_body">
		<view class="cate_dinier">
			<p>咨询问题</p>
			<uni-collapse ref="add" class="warp" @change="change" :accordion="true">
				<uni-collapse-item v-for="(sub,index) in data" :key="index" :title="sub.subtitle" :showAnimation="sub.showAnimation">
					<template>
						<text class="content">{{sub.subcontent}}</text>
					</template>
				</uni-collapse-item>
			</uni-collapse>
		</view>
		<view class="cate_bottom">
			<p>以上不能解决问题</p>
			<button class="button_ke" @click="kefu">我的客服</button>
		</view>
	</view>
</template>

<script>
	import uniCollapse from '@/components/zhedie/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/zhedie/uni-collapse-item/uni-collapse-item.vue'
	export default {
		components: {
			uniCollapse,
			uniCollapseItem
		},
		data() {
			return {
				data: [{
						type: false,
						showAnimation: true,
						subtitle: "1、什么是公司？",
						subcontent: "公司是指依照《公司法》在中国境内设立的有限责任公司和股份有限公司。"
					},
					{
						type: false,
						showAnimation: true,
						subtitle: "2、公司具有哪些特征？",
						subcontent: "（一）法人性。《公司法》明确规定，公司具有企业法人资格。《民法典》第五十八条规定，法人应当有自己的名称、组织机构、住所、财产或者经费。根据《公司法》关于公司设立条件的有关规定，有限责任公司和股份有限公司符合上述条件的要求，它们是法人的一种。作为独立法人，公司具有民事权利能力和行为能力，依法独立享有民事权利，承担民事责任。（二） 营利性。 公司是企业法人， 是以追求利润最大化为目的的企业组织。 这是公司区分非营利法人、 特别法人的本质特征。《 民法典》 第七十六条规定， 以取得利润并分配给股东等出资人为目的成立的法人， 为营利法人。 营利法人包括有限责任公司、 股份有限公司和其他企业法人等。"
					},
					{
						type: false,
						showAnimation: true,
						subtitle: "3、股东在公司享有哪些权利？",
						subcontent: "（一）享有资产收益的权利1.股利分配权；2.剩余财产分配权；3.新股认购优先权；4.转让出资或股份的权利；5.股份或股权收购请求权。（二）参与重大决策权1.参与公司重大决策表决权；2.对公司的经营提出建议或者质询权；3.提议召开临时股工大会权；4.查阅公司章程、股东大会记录以及财务会计报告等有关资料的权利；5.就股东会的决议向人民法院提起诉讼的权利。请求确认股东会决议无效或撤销股东会决议的权利。（三）选择管理者的权利1.选举公司董事、监事的权利；2.当选为公司董事、监事的权利。"
					},
					{
						type: false,
						showAnimation: true,
						subtitle: "4、公司需要承担哪些社会责任？",
						subcontent: "所谓公司的社会责任就是指公司在追求营利最大化的同时,也要兼顾到职工、消费者和当地社区的利益,自觉在公司经营决策中考虑到他们的利益，在公司生产经营中维护他们的利益，保护环境，避免资源浪费，促进经济持续稳定增长，在股东价值最大化的同时，提高事个社会福利的水平。因此，《公司法》第五条规定，公司从事经营活动，必须遵守法律、行政法规，遵守社会公德、商业道德，诚实守信，接受政府和社会公众的监督，承担社会责任。"
					}
				]
			}
		},
		methods: {
			change() {},
			kefu() {
				this.$api.msg('敬请期待')
			}
		}
	}
</script>

<style>
	.cate_body {
		width: 100%;
		height: 100%;
	}

	.cate_dinier {
		width: 100%;
		height: 100%;
		margin: 10upx auto;
	}

	.cate_dinier p {
		margin-left: 20upx;
		font-size: 32upx;
	}

	.content {
		padding: 15px;
		font-size: 14px;
		line-height: 20px;
		background-color: #f9f9f9;
		color: #666;
	}

	.cate_bottom {
		width: 100%;
		margin: 20upx auto;
		font-size: 32upx;
		padding: 0 20upx;
		box-sizing: border-box;
	}

	.button_ke {
		width: 400upx;
		height: 90upx;
		margin: 20upx auto;
		background-color: #FF0000;
		color: white;
		font-size: 32upx;
		text-align: center;
		line-height: 90upx;
	}
</style>
