<template>
	<div class="grid grid-cols-1 mt-8 gap-6">
		<div class="card-box">
			<!-- <h3 class="text-bold m-0 text-base">Current Month</h3> -->
			<div class="grid-card">
				<div class="items">
					<div class="title">Storage Bytes</div>
					<div class="meat">{{ cards?.storageBytes ?? 0 }}</div>
				</div>
				<div class="items">
					<div class="title">Read Bytes</div>
					<div class="meat">{{ cards?.readBytes ?? 0 }}</div>
				</div>

				<div class="items">
					<div class="title">Write Bytes</div>
					<div class="meat">{{ cards?.writeBytes ?? 0 }}</div>
				</div>
				<div class="items">
					<div class="title">Fee</div>
					<div class="meat">{{ cards?.fee ?? 0 }}<span>$</span></div>
				</div>
			</div>
		</div>

		<div class="flex items-center">
			<h4 class="text-lg">Filter Data</h4>
			<div class="ml-auto">
				<!-- select -->
				<a-select
					v-model:value="unit"
					style="width: 200px"
					:options="options"
					@change="hlChange"
				>
					<template #suffixIcon>
						<FieldTimeOutlined class="text-base" />
					</template>
				</a-select>
			</div>
		</div>

		<!--  chartList  -->
		<div v-for="(option, key) in metrics" :key="key" class="chart_item">
			<h4>{{ titleMap[key] }}</h4>
			<div class="_chart">
				<Echart height="240px" :options="option" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { formatBytes, toThousandFilter } from '~@/composables/utils'
import { FieldTimeOutlined } from '@ant-design/icons-vue'
import type { ChartParams, ChartRes, Metrics, Cards } from '#/cache'
// import type { SelectProps } from 'ant-design-vue';

const options = ref([
	{ value: 'hour', label: 'Past Hour' },
	{ value: 'hour,3', label: 'Past 3 Hours' },
	{ value: 'hour,12', label: 'Past 12 Hours' },
	{ value: 'day', label: 'Past Day' },
	{ value: 'day,3', label: 'Past 3 Days' },
	{ value: 'week', label: 'Past Week' },
])

const route = useRoute()
const unit = ref('hour')
const metrics = ref<Metrics>()
const cards = ref<Cards>()

const params = reactive<ChartParams>({
	cacheServiceId: route.params.id as string,
	start: getTimeAgo('hour') / 1000,
	end: new Date().getTime() / 1000,
	step: '3m',
})

const titleMap = {
	memory_used_bytes: 'Memory Used Bytes',
	db_keys: 'Db keys',
	client_commands_total: 'Client Commands Total',
	hit_rate: 'Hit Rate',
}

function formatCharts(res: ChartRes) {
	let memo = {} as any
	let card = {} as any
	for (const [key, value] of Object.entries(res)) {
		if (value instanceof Array) {
			const x = value.map((item) => {
				// const formatStr = lang.value ? "D MMM HH:mm" : "YYYY年MM月DD日 HH:mm";
				return dayjs(item[0] * 1000).format('D MMM HH:mm')
			})

			const y = value.map((item) => (item[1] == 'NaN' ? 0 : Number(item[1])))
			const item = mergeData({ x, y })

			memo[key] = item
		} else {
			card[key] = key == 'fee' ? toThousandFilter(value) : formatBytes(value)
		}
	}
	return { memo, card }
}

watchEffect(() => {
	const init = () => {
		getChart(params).then((res) => {
			const { memo, card } = formatCharts(res)
			metrics.value = memo
			cards.value = card
		})
	}
	init()
})

function hlChange(e: any) {
	const setMap = new Map([
		['hour', '3m'],
		['hour,3', '20m'],
		['hour,12', '30m'],
		['day', '1h'],
		['day,3', '3h'],
		['week', '6h'],
	])

	const [type, ago] = e.split(',')
	const start = getTimeAgo(type as any, ago ? Number(ago) : 1) / 1000

	params.start = start
	params.step = setMap.get(e) as string
}

function getTimeAgo(type: 'hour' | 'day' | 'week', ago = 1) {
	const now = new Date().getTime()
	const hour = 60 * 60 * 1000 // 1小时的毫秒数
	const day = 24 * hour // 1天的毫秒数
	const week = 7 * day // 1周的毫秒

	switch (type) {
		case 'hour':
			return now - ago * hour
		case 'day':
			return now - ago * day
		case 'week':
			return now - ago * week
		default:
			return now - ago * hour
	}
}

function mergeData(value: any) {
	const res = {
		// 悬浮提示相关
		tooltip: {
			trigger: 'axis',
		},
		//图表边界控制
		/* grid: {
			top: "10px",
			bottom: "10px",
			left: "10px",
			right: "10px",
			containLabel: true
		}, */
		grid: {
			left: '0',
			right: '0',
			bottom: '2%',
			top: '10px',
			containLabel: true,
		},
		xAxis: {
			type: 'category',
			axisLabel: {
				show: true,
				margin: 10,
				color: '#1e324f',
			},
			data: value.x,
			axisLine: {
				// show:false
				lineStyle: {
					color: 'rgba(39, 76, 129, 0.11)',
					width: 0.5,
				},
			},
			splitLine: {
				show: false,
			},
			axisTick: { show: false }, //不显示坐标轴刻度
		},
		yAxis: {
			type: 'value',

			axisLine: { show: false }, //不显示坐标抽轴线
			axisTick: { show: false }, //不显示坐标轴刻度
			splitLine: {
				show: true,
				lineStyle: {
					color: 'rgba(39, 76, 129, 0.11)',
					type: 'dashed',
					width: 0.5,
				},
			},
		},

		series: [
			{
				data: value.y,
				type: 'line',
				smooth: false,
				symbol: 'circle',
				symbolSize: 6,
				animation: true,
				areaStyle: {
					color: 'rgba(128, 255, 165,0.2)',
				},
				lineStyle: { color: '#67c23a', width: 3 },
				itemStyle: {
					color: '#67c23a',
				},
			},
		],
	}
	return res
}
</script>

<style lang="scss" scoped>
.card-box {
	border-radius: 0.5rem;
	background-color: rgba(243, 244, 246, 1);
	padding: 1.5rem;

	.grid-card {
		@apply mt-4 grid gap-2 sm: grid-cols-4 sm:gap-4;
	}
}

.grid-card .items {
	@apply rounded-lg px-5 pt-4 pb-3 shadow-sm bg-white;

	.title {
		@apply text-[#606266] mb-1 leading-5 opacity-70;
	}

	.meat {
		color: rgba(0, 0, 0, 0.8);
		@apply text-xl font-normal;
	}

	span {
		padding-left: 0.25rem;
	}
}

.chart_item {
	@apply grid grid-cols-1 gap-8 rounded-lg border border-gray-200 p-4 sm: px-8 sm:py-7;

	h4 {
		margin: 0px;
		margin-bottom: 0.25rem;
		font-size: 1rem;
	}

	._chart {
		width: 100%;
		height: 260px;
	}
}
</style>
