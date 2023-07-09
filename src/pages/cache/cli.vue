<template>
	<div
		class="w-full flex flex-col rounded-lg bg-[#191b24] py-4 font-mono text-gray-100 !mt-6"
	>
		<div id="tmi">
			<Terminal
				name="my-terminal"
				:show-header="false"
				title="liaoyi"
				context="➜"
				:init-log="initLog"
				@exec-cmd="onExecCmd"
			>
				<!-- :command-store="help" -->
				<template #header>
					<div class="flex items-center justify-between"></div>
				</template>
			</Terminal>
		</div>
	</div>
</template>

<script setup lang="ts">
import Terminal from 'vue-web-terminal'
import { xmtApi } from '~@/api/command'
import { useRoute } from 'vue-router'
const route = useRoute()

const initLog = [
	{
		type: 'normal',
		content: "<span class='cmd-init-title'>Welcome to Montplex CLI</span>",
	},
]

function onExecCmd(
	key: string,
	command: any,
	success: (arg0: {
		type: string
		class?: string
		tag?: string
		content: any
	}) => void,
	failed: (arg0: string) => void
) {
	if (key === 'fail') {
		failed('Something wrong!!!')
	} else {
		xmtApi({ cacheServiceId: route.params.id as any, command }).then((res) => {
			success({
				type: 'success',
				class: 'success',
				tag: '',
				content: JSON.stringify(res),
			})
		})
		/* let allClass = ["success", "error", "system", "info", "warning"];
		let clazz = allClass[Math.floor(Math.random() * allClass.length)];
		success({
			type: "normal",
			class: clazz,
			tag: "成功",
			content: command
		}); */
	}
}

/* setTimeout(() => {
	//  推送一条消息
	let message = {
		class: "warning",
		content: "This is a wanning message."
	};
	Terminal.$api.pushMessage("my-terminal", message);
	console.log(Terminal.$api);
}, 1000); */
</script>

<style lang="scss">
#tmi {
	width: 100%;
	height: 400px;
	.t-container {
		border-radius: 8px !important;
		box-shadow: none !important;
	}

	.t-disable-select > span:nth-child(2) {
		display: none;
	}
	.t-log-box {
		font-size: 16px !important;
		-webkit-margin-after: 4px;
		-webkit-margin-before: 4px;
	}
	.t-content-normal {
		font-size: 16px !important;
	}
	.t-cmd-line {
		font-size: 16px;
		.t-cmd-line-content {
			&::before {
				margin-right: 0;
			}

			font-size: 16px;
		}
	}
	.cmd-init-title {
		font-size: 16px;
		color: #00e994;
	}

	.t-window .cursor {
		background-color: #00e994;
		animation: cursor-flash 1.5s infinite;
		width: 3px !important;
		height: 100% !important;
		margin-top: 0 !important;
		margin-left: 4px !important;
	}
	.t-cmd-key {
		margin-left: 4px !important;
	}
}
</style>
