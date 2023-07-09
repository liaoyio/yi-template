<template>
	<AModal
		v-model:open="open"
		:title="cacheName"
		:closable="false"
		style="width: 900px"
		centered
	>
		<template #footer>
			<AButton @click="open = false"> Close </AButton>
		</template>

		<div style="width: 100%; height: 180px">
			<TsEmptyCharSkelet v-if="loading" :active="true" />
			<Echart v-else width="100%" height="200px" :options="options" />
		</div>
	</AModal>
</template>

<script lang="ts" setup>
import { getFeeListByDay } from '~@/api/fee'
import { curren_month_option, get_chart_data } from '~@/composables/utils'

const open = ref(false)
const cacheName = ref('')
const options = ref()
const loading = ref(true)

const initData = (cacheServiceId: number, monthStr: string) => {
	setTimeout(() => {
		getFeeListByDay({ cacheServiceId, monthStr }).then((res) => {
			if (res) {
				const data = get_chart_data(res)
				options.value = curren_month_option(data)
			}
		})
		loading.value = false
	}, 800)
}

defineExpose({ initData, open, cacheName })
</script>
