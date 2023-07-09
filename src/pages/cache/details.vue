<template>
	<div class="grid grid-cols-1 mt-8 gap-8">
		<div id="section-info" class="border border-gray-200 rounded-lg p-4 sm:p-8">
			<div class="grid items-center gap-4 sm:grid-flow-col">
				<div class="relative">
					<div>
						<div class="text-gray-500">Region</div>
						<span class="font-semibold">{{ cache?.one.region }}</span>
					</div>
				</div>
				<div>
					<div class="text-gray-500">Endpoint</div>
					<CopyAble :text="cache?.host">
						<span class="font-semibold">{{ cache?.host }}</span>
					</CopyAble>
				</div>
				<div>
					<div class="text-gray-500">Password</div>
					<CopyAble :text="password"
						><span class="font-semibold">•••••••••</span></CopyAble
					>
				</div>
				<div>
					<div class="text-gray-500">Port</div>
					<CopyAble :text="port"
						><span class="font-semibold">{{ port }}</span></CopyAble
					>
				</div>
				<!-- {/* <div>
							<div class="text-gray-500">TLS/SSL</div>
							<Paragraph strong>Disabled</Paragraph>
						</div> */} -->
			</div>
			<div class="fuii-shell">
				<CopyAble :text="full_shell">
					<span class="font-semibold">{{ shell }}</span>
				</CopyAble>
			</div>
		</div>

		<TsDeleteCache />
	</div>
</template>

<script setup lang="ts">
const store = cacheStore()
const cache = computed(() => store.oneCache)
const port = computed(() => store.port as string)
const password = computed(() => store.getTokenByid(useRoute().params.id as any))

const shell = computed(() => {
	return `redis-cli -h ${store.oneCache?.host} -p ${store.port} -a **********`
})
const full_shell = computed(() => {
	return `redis-cli -h ${store.oneCache?.host} -p ${store.port} -a ${password.value}`
})
</script>

<style lang="scss" scoped>
.fuii-shell {
	@apply relative md: -m-8 md:mt-4 mt-6 flex cursor-pointer items-center justify-center rounded-b-lg bg-zinc-100 py-3 text-center hover:bg-zinc-200;
}

::v-deep(.ant-typography) {
	margin-bottom: 0 !important;
	height: 100%;
	width: 100%;
	background-color: transparent !important;
	font-size: 0.875rem !important;
	line-height: 1.25rem !important;
	margin-bottom: 0px !important;
	padding-top: 4px !important;
	padding-bottom: 4px !important;
}
</style>
