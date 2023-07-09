<template>
	<Layout>
		<div class="bg-gray-100 py-6 shadow">
			<div class="mx-auto px-4 container !max-w-screen-xl">
				<h1 class="text-bold m-0 text-4xl">Payment</h1>
			</div>
		</div>

		<div class="mx-auto px-4 container !max-w-screen-xl">
			<div class="mt-6">
				<ATabs v-model:activeKey="activeTab" @tabClick="tabsClick">
					<!-- <ATabPane key="teams" tab="Teams" /> -->
					<ATabPane key="billing" tab="Billing" force-render />
					<ATabPane key="cost-explorer" tab="Cost Explorer" />
					<ATabPane key="settings" tab="Settings" />
				</ATabs>
				<RouterView />
			</div>
		</div>
	</Layout>
</template>

<script setup lang="ts">
const router = useRouter()
const activeTab = ref('billing')

function tabsClick(key: any) {
	activeTab.value = key
	router.replace({ name: titleCase(key) })
}

// store.oneCache()
/* 监听路由变化,切换子路由页面时保持tab选中状态 */
watch(
	() => router.currentRoute.value.path,
	(newValue: string) => {
		const pathStr = newValue.split('/').pop()
		activeTab.value = pathStr as string
	},
	{ immediate: true }
)

/* 首字母大写 */
function titleCase(str: string | undefined) {
	const cb = (e: string) =>
		e.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
	if (!str) return
	return str
		.split(/-/)
		.map((item) => cb(item))
		.join('')
}
</script>
