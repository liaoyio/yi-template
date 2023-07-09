import { Modal, Button } from 'ant-design-vue'
import Hourglass from '~@/components/Icon/Hourglass.vue'

export default defineComponent({
	setup(_, { expose }) {
		const open = ref(false)
		const show = () => (open.value = true)
		const hide = () => (open.value = false)

		expose({ show, hide })
		return () => (
			<Modal
				style={{ width: '24%' }}
				open={open.value}
				footer={null}
				onCancel={hide}
				closable={false}
			>
				<div class="flex flex-col gap-2">
					<Hourglass />
					<span class="text-base font-semibold">Cache is initializing...</span>
					<span>Your cache will be ready once this becomes available ...</span>
					<div class="mt-4">
						<Button
							type="primary"
							size="large"
							style="font-size: 14px"
							onClick={hide}
						>
							Got it!
						</Button>
					</div>
				</div>
			</Modal>
		)
	},
})
