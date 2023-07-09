<template>
	<Layout>
		<TsNavInfo />
		<main class="mx-auto px-4 pb-20 pt-8 container !max-w-screen-xl">
			<ATabs v-model:activeKey="activeTab" @tabClick="tabsClick">
				<ATabPane key="details" tab="Details" />
				<ATabPane key="connect" tab="Connect" force-render />
				<ATabPane key="cli" tab="Cli" />
				<ATabPane key="token" tab="Token" />
				<ATabPane key="metrics" tab="Metrics" />
				<RouterView />
			</ATabs>
		</main>
	</Layout>
</template>

<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const store = cacheStore()

const activeTab = ref('details')

store.setOneCache({ id: route.params.id as string })

function tabsClick(key: any) {
	activeTab.value = key
	router.replace({ name: titleCase(key) })
}

/* 监听路由变化,切换子路由页面时保持tab选中状态 */
watch(
	() => router.currentRoute.value.path,
	(newValue: string) => {
		const pathStr = newValue.split('/').pop()
		// activeTab.value = titleCase(pathStr) as string;
		activeTab.value = pathStr as string
	},
	{ immediate: true }
)

/* 首字母大写 */
function titleCase(str: string | undefined) {
	if (!str) return
	return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
}

// const updateName = (name: string) => (cache.value!.name = name);
</script>
