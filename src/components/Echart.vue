<template>
	<div
		v-if="props.options"
		id="my-eharts"
		ref="chartRef"
		:style="{ height: props.height, width: props.width }"
	/>
</template>

<script lang="ts" setup>
import type { ECharts } from 'echarts'
import * as echarts from 'echarts'

const props = defineProps({
	width: {
		type: String,
		default: '100%',
	},
	height: {
		type: String,
		default: '100%',
	},
	options: {
		type: Object as any,
		default: () => ({}),
	},
	isClick: {
		type: Boolean,
		default: false,
	},
})

const chartRef = ref<HTMLCanvasElement | null>(null)

let chart: ECharts | null = null

watch(
	() => props.options,
	(options) => {
		nextTick(() => {
			if (chart) {
				chart.setOption(options, true)
			}
		})
	},
	{
		deep: true,
	}
)
const emits = defineEmits(['chart-click'])

// 设置异步，不然图例一开始的宽度不正确。
onMounted(() =>
	nextTick(() => {
		initChart()
	})
)

// 初始化echart
const initChart = (): void => {
	const _c = document.getElementById('my-eharts') as HTMLElement
	if (_c) _c.style.width = '100%'

	const chartRefWrap = unref(chartRef)

	if (chartRefWrap) {
		chart = echarts.init(chartRefWrap, '', { renderer: 'svg' })
		// 若图表需要点击事件做些其他功能，在初始化示例时注册图表的点击事件
		if (props.isClick) {
			chart.on('click', (params: any) => emits('chart-click', params))
		}
		//true用来解决数据不更新问题
		chart.setOption(props.options, true)
		window.addEventListener('resize', chartsResize)
	}
}
onActivated(() => {
	// 防止keep-alive之后图表变形
	if (chart) {
		nextTick(() => {
			chart!.resize()
		})
	}
})

const chartsResize = () => {
	chart && chart.resize()
}

onBeforeUnmount(() => {
	window.removeEventListener('resize', chartsResize)
	chart = null
})
</script>
