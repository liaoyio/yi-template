import { RouterLink } from 'vue-router'
import { Tooltip, Button } from 'ant-design-vue'

export default defineComponent({
	setup(_, { emit }) {
		return () => (
			<div class="w-[360px] -mx-3 -my-3">
				<div class="h-[360px] overflow-y-scroll">
					<MesageItem />
				</div>
				<div class="border-t border-gray-100">
					<RouterLink to="/account/notifications">
						<a-button type="link" class="w-full !h-auto !py-2 !font-medium">
							View all
						</a-button>
					</RouterLink>
				</div>
			</div>
		)
	},
})

const MesageItem = defineComponent({
	setup(_, { emit }) {
		return () => (
			<div class="group flex items-start gap-4 border-b border-gray-100 p-4">
				<div class="mt-1 shrink-0">
					<div class="h-8 w-8 flex items-center justify-center rounded-full bg-orange-100 text-orange-500">
						<svg
							class="icon_root"
							focusable="false"
							aria-hidden="true"
							viewBox="0 0 24 24"
						>
							<path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path>
						</svg>
					</div>
				</div>
				<div class="flex-grow">
					<h4 class="text-sm leading-normal">Deleted inactive cluster: 123</h4>
					<div class="opacity-80">
						Due to inactivity of your cluster, it has been automatically deleted
					</div>
					<div class="mt-2 flex items-center gap-2 opacity-80">
						<Tooltip title={<span>2023年5月18日 22:27:54</span>}>
							<time>
								<span>1个月前</span>
							</time>
						</Tooltip>
						<span>•</span>
						<Button
							type="text"
							class="css-e11w5u shrink-0 opacity-80 !h-auto !px-1 !text-sm !text-gray-900 !hover:bg-transparent"
						>
							Archive
						</Button>
					</div>
				</div>
			</div>
		)
	},
})
