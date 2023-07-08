import dayjs from 'dayjs'
/**
 * 当前缓存月视图折线图
 * @param {string} 元素id
 */
export function curren_month_option({ x, y }: any) {
	let option = {
		grid: {
			top: '30px',
			bottom: '20px',
			left: '10px',
			right: '20px',
			containLabel: true,
		},
		tooltip: {
			trigger: 'axis',

			axisPointer: {
				type: 'shadow',
				shadowStyle: {
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [
							{
								offset: 0,
								color: 'rgba(128, 255, 165,0.2)',
							},
							{
								offset: 1,
								color: 'rgba(128, 255, 165,0.4)',
							},
						],
						global: false,
					},
				},
			},
		},
		xAxis: [
			{
				data: x,
				axisLabel: {
					show: true,
					margin: 10,
					color: '#1e324f',
					// 格式化时间显示
					formatter: function (value: string) {
						return dayjs(value).format('DD')
					},
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
		series: [
			{
				name: 'Fee',
				type: 'line',
				data: y,
				smooth: true, // 曲线或直线
				symbol: 'circle', //数值点设定为实心点
				symbolSize: 6, // 折线的点的大小
				animation: true,
				areaStyle: {
					color: 'rgba(128, 255, 165,0.2)',
				},
				itemStyle: {
					color: '#67c23a', //线的颜色
				},
			},
		],
	}
	return option
}

/* 当月缓存每日总计 折线图 */
export function get_chart_data(arr: any) {
	let meno: any = {}
	let c_array = []
	arr.forEach((item: any) => {
		if (!meno[item.dayStr]) {
			meno[item.dayStr] = []
		}
		meno[item.dayStr].push({ dayStr: item.dayStr, fee: item.fee })
	})
	for (const [key, value] of Object.entries(meno)) {
		// @ts-nocheck
		const fee_list = (value as any).sort(
			(a: { dayStr: string }, b: { dayStr: string }) => {
				// @ts-ignore
				return new Date(a.dayStr) - new Date(b.dayStr)
			}
		)
		c_array.push({
			data: key,
			sum: fee_list
				.map((_v: any) => _v.fee)
				.reduce((a: number, b: number) => a + b)
				.toFixed(2),
		})
	}
	return {
		x: c_array.map((i) => i.data),
		y: c_array.map((i) => i.sum),
	}
}
