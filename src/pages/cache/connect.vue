<template>
	<div
		class="grid grid-cols-1 gap-4 border border-gray-200 rounded-lg p-4 sm:p-[1.75rem,2rem]"
	>
		<div class="col-span-1">
			<h3 class="text-xl">Connect to your cache service</h3>
		</div>
		<div class="overflow-x-auto sm:overflow-hidden">
			<ARadioGroup
				v-model:value="codePan"
				button-style="solid"
				@change="(e) => (codePan = e.target.value)"
			>
				<ARadioButton v-for="item in tab_list" :key="item" :value="item">
					{{ item === 'Redis' ? 'Redis-Cli' : item === 'Php' ? 'PHP' : item }}
				</ARadioButton>
			</ARadioGroup>
			<component :is="codePan" />
		</div>
	</div>
</template>

<script setup lang="ts">
const codePan = ref('Redis')
let tab_list = reactive([
	'Redis',
	'Node',
	'Php',
	'Python',
	'Java',
	'Go',
	'Docker',
])
</script>

<script lang="ts">
import {
	Redis,
	Node,
	Php,
	Python,
	Go,
	Java,
	Docker,
} from '~@/components/ts/code-example/index'
export default {
	components: { Redis, Node, Php, Python, Go, Java, Docker },
}
</script>

<style lang="scss" scoped>
::v-deep(.hljs) {
	border-radius: 0.5rem;
	padding-top: 1rem;
	padding-bottom: 1rem;
}
</style>
