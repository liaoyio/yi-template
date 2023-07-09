<template>
	<Layout>
		<!--TODO: v-bind 进阶用法，直接传入多个值 (类似于tsx组件中的 <Child { ...props }) /> -->
		<!-- 顶部 chart -->
		<TsChartByDay v-bind="chart_data" />
		<div class="mx-auto px-4 pb-20 pt-8 container !max-w-screen-xl">
			<h1 class="mt-2 text-2xl">Cache Services</h1>
			<div class="grid-cols-2 mt-6 flex items-center gap-2 sm:grid sm:gap-8">
				<div class="w-full flex">
					<!-- 搜索框 -->
					<div class="hidden !min-w-90 md:!block">
						<AInput
							v-model="search_value"
							placeholder="Search..."
							@change="(e: any) => (search_value = e.target.value)"
						/>
					</div>
					<!-- 状态筛选 -->
					<div class="md:ml-9">
						<ASelect
							ref="select"
							v-model:value="select_value"
							style="width: 240px"
						>
							<ASelectOption value="1">
								<div class="status-row">
									<span class="bg-a-s"></span>Running
								</div>
							</ASelectOption>
							<ASelectOption value="-10">
								<div class="status-row">
									<span class="bg-o-g"></span>Terminated
								</div>
							</ASelectOption>
						</ASelect>
					</div>
				</div>
				<!-- 刷新按钮 -->
				<div class="flex items-center justify-end gap-4">
					<ATooltip placement="top" title="Refresh">
						<AButton
							type="default"
							:loading="refresh_loading"
							:icon="h(IconSync)"
							class="hidden shrink-0 justify-center md:flex !items-center !p-0"
							@click="hcRefresh"
						/>
					</ATooltip>
					<AButton
						type="primary"
						:disabled="!user?.isVerified"
						@click="hcaddCache"
					>
						Create
					</AButton>
				</div>
			</div>
			<!-- Cache 列表 -->
			<div class="mt-6 min-h-[300px] sm:mt-10">
				<ASpin
					:spinning="cache_loading"
					style="display: flex; align-items: center; justify-content: center"
				>
					<!-- 邮箱未验证 -->
					<TsEmptyEmailNotVerified v-if="!user?.isVerified" />
					<!-- 验证通过... -->
					<div v-else>
						<div
							v-if="cache_res?.list"
							class="grid gap-6 sm:grid-cols-2 sm:gap-8"
						>
							<TsCacheItem
								v-for="item in searchlist"
								:key="item.id"
								:item="item"
								@item-click="hcCacheItem"
							/>
						</div>
						<!-- 请求完毕后 cacheList为空... -->
						<TsEmptyNotCache
							v-if="!cache_loading && !cache_res?.list"
							@on-click="add_modal = true"
						/>
						<!-- 搜索为空时.. -->
						<TsEmptySearch v-if="!searchlist?.length" />
					</div>
				</ASpin>
			</div>
			<!-- 添加缓存 Modal -->
			<TsAddCacheModal
				ref="addModalRef"
				v-model="add_modal"
				@add-success="hcaddCacheCb"
			/>
			<!-- 创建中状态点击 Modal -->
			<TsModalCreating ref="creatingRef" />
		</div>
	</Layout>
</template>

<script setup lang="ts">
import { createVNode, h } from 'vue'
import { LimitReached, ContactUs } from '~@/components/ts/Modal/_VNode'
import IconSync from '~@/components/Icon/Sync.vue'
import { get_chart_data, curren_month_option } from '~@/composables/utils'
import { Modal, message } from 'ant-design-vue'
import cacheStore from '~@/stores/cacheStore'

type ByDayProps = {
	fee: number | string
	options: object | null
	loading: boolean
}

const addModalRef = ref()
const creatingRef = ref()
const add_modal = ref<boolean>(false)

const refresh_loading = ref(false)
const search_value = ref('')
const select_value = ref('1')
const timer = ref(120)

const router = useRouter()
const store = cacheStore()

const user = computed(() => userStore().user)

let { cache_res, cache_loading, cache_refresh } = getCacheList(false)

const chart_data = reactive<ByDayProps>({
	fee: '',
	options: null,
	loading: true,
})

getFeeListByDay({}).then((res) => {
	if (res) {
		chart_data.fee = res.reduce((a, b) => a + b.fee, 0).toFixed(2)
		const _data = get_chart_data(res)
		chart_data.options = curren_month_option(_data)
		chart_data.loading = false
	}
})

watch(
	add_modal,
	() => {
		addModalRef.value.resetForm()
	},
	{ flush: 'post' }
)

function hcRefresh() {
	refresh_loading.value = true
	message.loading({ content: 'Loading...', key: 'refresh', duration: 1.5 })
	setTimeout(() => {
		cache_refresh()
		refresh_loading.value = false
		message.success({ content: 'Loaded!', key: 'sc', duration: 2 })
	}, 1000)
}

const hcCacheItem = (item: any) => {
	if (item.status == 0) return creatingRef.value.show()
	if (item.status == 1) router.push({ name: 'Cache', params: { id: item.id } })
}

const searchlist = computed(() => {
	const list = cache_res.value?.list
	if (!list) {
		return null
	}
	if (list) {
		const val = select_value.value
		const e = search_value.value

		const _list = cache_res.value!.list.filter((i) =>
			val == '1'
				? i.status != '-1' && i.status != '-10'
				: ['-1', '-10'].includes(i.status as string)
		)
		if (e) {
			return _list.filter(
				(i) => i.name.indexOf(e) != -1 || i.des.indexOf(e) != -1
			)
		} else {
			return _list
		}
	}
})

/* 新建 Cache  */
const hcaddCache = async () => {
	if (!user.value) {
		return
	}
	if (!user.value.canCreateCacheService) {
		Modal.warning({
			title: 'An unknown error occurred !',
			content: createVNode(ContactUs),
		})
		return
	}

	/* 如果是免费用户，且已经创建了5个cache Limit Reached */
	if (cache_res.value!.list?.length > 5 && user.value.feeType === 0) {
		Modal.error({
			width: 440,
			title: 'You can create 5 cache services in the free layer.',
			content: createVNode(LimitReached),
		})
		return
	}
	store.getCloudProvider()
	add_modal.value = true
}

/* 轮询请求 */
const { pause, resume } = useIntervalFn(
	async () => {
		if (!cache_res.value || timer.value <= 0) {
			pause()
			return
		}
		timer.value -= 2
		const runing_list = cache_res.value.list.filter((item) => item.status === 0)
		if (!runing_list.length) pause()
		else {
			timerCacheList().then((res) => {
				cache_res.value = res
			})
		}
	},
	2000,
	{ immediate: true }
)

const hcaddCacheCb = () => {
	timer.value = 120
	resume()
}
</script>

<style lang="scss" scoped>
::v-deep(.ant-btn-loading-icon) {
	display: flex;
	justify-content: center;
	align-items: center;
}

::v-deep(.ant-skeleton-input-sm, .ant-skeleton-button-sm) {
	height: 16px !important;
}

.status-row {
	@apply flex items-center;
	span {
		@apply mr-2 block h-2 w-2 rounded-full;
	}
}
</style>
