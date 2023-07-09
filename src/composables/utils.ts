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

export function formatBytes(bytes: number): string {
	const _f3 = (num: number) =>
		num.toLocaleString('en-US', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		})
	const _m = (num: number) => Math.pow(1024, num)

	if (!bytes || bytes == 0) return '0'
	if (bytes < 1024) {
		return `${bytes} B`
	} else if (bytes < _m(2)) {
		return `${_f3(bytes / 1024)} KB`
	} else if (bytes < _m(3)) {
		return `${_f3(bytes / _m(2))} MB`
	} else if (bytes < _m(4)) {
		return `${_f3(bytes / _m(3))} GB`
	} else {
		// (bytes < _m(5))
		return `${_f3(bytes / _m(4))} TB`
	}
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(date: number | string) {
	const num = date ? Number(date) : 0
	// 判断是否为整数
	const isInteger = parseInt(num.toString()) == parseFloat(num.toString())
	// .replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ","));
	const filterStr = (str: string) =>
		str.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
	return isInteger ? filterStr(num.toString()) : filterStr(num.toFixed(2))
}

/* 堆叠折线图 */
export function get_stacked_chart_data(arr: any) {
	let meno: any = {}
	let series = []
	const x = Array.from(new Set(arr.map((v: any) => v.dayStr)))
	arr.forEach((item: any) => {
		if (!meno[item.cacheServiceName]) {
			meno[item.cacheServiceName] = []
		}
		meno[item.cacheServiceName].push({ dayStr: item.dayStr, fee: item.fee })
	})
	for (const [key, value] of Object.entries(meno)) {
		// @ts-ignore
		const fee_list = value.sort((a, b) => {
			// @ts-ignore
			return new Date(a.dayStr) - new Date(b.dayStr)
		})
		series.push({
			name: key,
			type: 'line',
			stack: 'Total',
			symbol: 'circle', //数值点设定为实心点
			symbolSize: 6, // 折线的点的大小
			animation: true,
			data: fee_list.map((_v: any) => _v.fee.toFixed(2)),
		})
	}
	return {
		x,
		legend: Object.keys(meno),
		series,
	}
}
