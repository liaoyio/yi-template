<template>
	<div class="bg-white py-6">
		<ATable
			:columns="columns"
			:data-source="data_source"
			:show-sorter-tooltip="false"
			:pagination="false"
		>
			<!-- <template #headerCell="{ column }">
				<template v-if="column.key === 'monthStr'">
					<span> Data <CalendarOutlined /></span>
				</template>
				<template v-if="column.key === 'fee'">
					<span> Fee <DollarCircleOutlined /></span>
				</template>
			</template> -->

			<template #bodyCell="{ column, record }">
				<template v-if="column.key === 'isPaid'">
					<span>
						<ATag :color="record.isPaid ? 'green' : 'volcano'">
							{{ record.isPaid }}
						</ATag>
					</span>
				</template>
				<template v-else-if="column.key === 'fee'">
					<span> $ {{ record.fee }} </span>
				</template>
			</template>
		</ATable>
	</div>
</template>
<script lang="ts" setup>
// import { CalendarOutlined,DollarCircleOutlined } from '@ant-design/icons-vue'
import dayjs from 'dayjs'

import { getFeeOrgList } from '~@/api/fee'
import { striptPk, getClientSecret } from '~@/api/stript'

import type { FeeOrg } from '#/cache'

const data_source = ref()
const pk = ref()

const columns = [
	{
		title: 'Date',
		dataIndex: 'monthStr',
		key: 'monthStr',
		sorter: {
			compare: (a: any, b: any) => a.monthStr - b.monthStr,
			multiple: 1,
		},
	},
	{
		title: 'Fee',
		dataIndex: 'fee',
		key: 'fee',
		sorter: {
			compare: (a: any, b: any) => a.fee - b.fee,
			multiple: 2,
		},
	},
	{
		title: 'Payment Status',
		dataIndex: 'isPaid',
		key: 'isPaid',
		width: '20%',
	},
]

getFeeOrgList().then((res) => {
	data_source.value = res.summaryList
})

striptPk().then((res) => (pk.value = res.pk))

function handlePayFor(row: FeeOrg) {
	const { cacheServiceId, monthStr, fee, isPaid } = row
	getClientSecret({ cacheServiceId, monthStr }).then((res) => {})
}
</script>
