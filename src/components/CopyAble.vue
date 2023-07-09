<template>
	<div class="_aphy group">
		<span>
			<slot />
		</span>
		<Tooltip v-if="isSupported" :title="copied ? 'Copied' : 'Copy'">
			<div class="_copy ml-1" @click="() => copy(text)">
				<CheckOutlined
					v-if="copied"
					class="hidden hover:opacity-60 group-hover:!inline-flex"
				/>
				<CopyOutlined
					v-else
					class="hidden hover:opacity-60 group-hover:!inline-flex"
				/>
			</div>
		</Tooltip>
	</div>
</template>

<script setup lang="ts">
import { Tooltip } from 'ant-design-vue'
import { CheckOutlined, CopyOutlined } from '@ant-design/icons-vue'

const props = defineProps({
	text: {
		type: String,
		default: '',
	},
	hover: {
		type: Boolean,
		default: false,
	},
})

const { copy, copied, isSupported } = useClipboard({
	source: props.text,
})
</script>

<style lang="scss" scoped>
._aphy {
	height: 100%;
	width: 100%;
	line-height: 1.25rem;
	padding-top: 4px;
	padding-bottom: 4px;
}

._copy {
	line-height: inherit;
	display: inline-block;
	min-width: 20px;
	color: #1677ff;
	text-decoration: none;
	outline: none;
	cursor: pointer;
	transition: all 0.3s;
	box-sizing: border-box;
}
</style>
