import { Modal } from 'ant-design-vue'
import { ExclamationCircleFilled } from '@ant-design/icons-vue'
export default defineComponent({
	emits: ['updateOk'],
	setup(_, { expose, emit }) {
		const open = ref(false)
		expose({ open })
		return () => (
			<>
				<Modal
					title="Update Access Token"
					style="top: 200px"
					open={open.value}
					onOk={() => (open.value = false)}
					onCancel={() => (open.value = false)}
				>
					<div class="flex">
						<ExclamationCircleFilled class="text-2xl text-[#faad14]" />
						<h4 class="ml-2 font-semibold">
							{/* 您最多可创建5个缓存服务 */}
							You can create 5 cache services in the free layer.
						</h4>
					</div>
					{/* 如果您需要更多的缓存服务，请先<a class="is-link" href="#">升级您的账户。</a> */}
					<div class="text-info-88 pb-0 pl-9 text-start text-sm">
						You can{' '}
						<a class="is-link" href="#">
							add a payment method
						</a>
						to upgrade your plan and create more cache services.
					</div>
				</Modal>
			</>
		)
	},
})
