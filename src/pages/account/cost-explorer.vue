<template>
	<div class="mb-6 mt-4 flex flex-row-reverse">
		<ASelect
			v-model:value="month"
			style="width: 148px"
			:options="select_list"
			@change="hlChange"
		>
			<template #suffixIcon>
				<CalendarOutlined class="text-base" />
			</template>
		</ASelect>
	</div>

	<div
		class="grid grid-cols-1 mb-6 border border-gray-200 rounded-lg p-2 sm:px-4 sm:py-4"
	>
		<div style="width: 100%; height: 220px">
			<Echart width="100%" height="220px" :options="options" />
		</div>
	</div>

	<ATable
		:columns="columns"
		:data-source="current_month_list"
		:show-sorter-tooltip="false"
		:pagination="false"
	>
		<template #bodyCell="{ column, record }">
			<template v-if="column.key === 'id'">
				<span>
					<ATag color="volcano" @click="hcDetail(record)">detail</ATag>
				</span>
			</template>
		</template>
	</ATable>

	<MonthViewModal ref="mRef" />
</template>
<script lang="ts" setup>
import { getFeeOrgList, getFeeListByDay } from '~@/api/fee'
import { get_stacked_chart_data } from '~@/composables/utils'
import dayjs from 'dayjs'
import type { DetailList } from '#/cache'
import { CalendarOutlined } from '@ant-design/icons-vue'

const options = ref()
const cache_name = ref('')
const detail_list = ref()
const current_month_list = ref()
const month = ref('2023 May')
console.log(month)
const select_list = computed(() => get_month_select_ist(detail_list.value))

const mRef = ref()

/* export interface DetailList {
	cacheServiceId: number
	: string
	monthStr: string
	monthStr_en?: string
	avgMb: number
	fee: number
}
 */

const columns = [
	{
		title: 'Name',
		dataIndex: 'cacheServiceName',
		key: 'cacheServiceName',
	},
	{
		title: 'avg MB',
		dataIndex: 'avgMb',
		key: 'avgMb',
	},
	{
		title: 'Fee',
		dataIndex: 'fee',
		key: 'fee',
		sorter: {
			compare: (a: any, b: any) => a.fee - b.fee,
		},
	},
	{
		title: 'Detail',
		dataIndex: 'id',
		key: 'id',
		width: '20%',
	},
]

function hlChange(val: any) {
	month.value = val
	current_month_list.value = detail_list.value.filter(
		(item: DetailList) => item.monthStr === val || item.monthStr_en === val
	)
	initChart()
}

function hcDetail(row: any) {
	mRef.value.cacheName = row.cacheServiceName
	mRef.value.open = true
	mRef.value.initData(row.cacheServiceId, row.monthStr)
}

onMounted(async () => {
	const res = await getFeeOrgList()
	if (res.detailList) {
		res.detailList.map(
			(item) => (item.monthStr_en = dayjs(item.monthStr).format('YYYY MMM'))
		)
		detail_list.value = res.detailList
		console.log(detail_list.value, res.detailList)
		current_month_list.value = res.detailList.filter(
			(item) =>
				item.monthStr === month.value || item.monthStr_en === month.value
		)
		console.log(current_month_list.value)
	}
	initChart()
})

function initChart() {
	getFeeListByDay({ monthStr: dayjs(month.value).format('YYYY-MM') }).then(
		(res) => {
			if (res) {
				const list = get_stacked_chart_data(res)
				options.value = filterOption(list)
			}
		}
	)
}

function filterOption({ x, series, legend }: any) {
	const option = {
		grid: {
			top: '10px',
			bottom: '60px',
			left: '10px',
			right: '20px',
			containLabel: true,
		},
		legend: {
			data: legend,
			bottom: 0,
			marginTop: 10,
			icon: 'roundRect',
			itemGap: 30,
		},
		// TAG 优化图表显示
		tooltip: {
			trigger: 'axis',
			axisPointer: { type: 'shadow' },
			formatter: function (params: any) {
				let str = ''
				params.forEach((item: any) => {
					str += `<div style="display: flex;justify-content: space-between;align-items: center;gap:30px;">
						<span>${item.marker} ${item.seriesName}</span>
						<span style="font-weight: 600;"> $ ${item.value}</span>
						</div>`
				})
				return `
				<div style="padding-bottom:10px">${params[0].axisValue}</div>
				${str}
				`
			},
		},
		xAxis: [
			{
				data: x,
				axisLabel: {
					show: true,
					type: 'time',
					margin: 10,
					color: '#1e324f',
					formatter: function (value: string) {
						return dayjs(value).format('DD')
					},
					// TAG 格式化时间显示
					/* formatter: function (value: string) {
						return dayjs(value).format("DD");
					} */
				},
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
				axisTick: { show: false }, // 刻度格子线
			},
		],
		yAxis: [
			{
				axisLine: {
					show: false, //隐藏y轴线
				},
				axisTick: {
					show: false, //隐藏刻度线
				},
				axisLabel: {
					show: false, //隐藏刻度值
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: 'rgba(39, 76, 129, 0.11)',
						type: 'dashed',
						width: 0.5,
					},
				},
			},
		],
		series,
	}
	return option
}

function get_month_select_ist(arr: any) {
	if (!arr) return
	let map = new Map()
	for (let item of arr) {
		if (!map.has(item.monthStr || item.monthStr_en)) {
			map.set(item.monthStr, {
				label: item.monthStr_en,
				value: item.monthStr,
			})
		}
	}
	return [...map.values()]
}
</script>
