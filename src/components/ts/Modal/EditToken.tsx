import { Modal, Select } from 'ant-design-vue'

export default defineComponent({
	emits: ['updateOk'],
	setup(_, { expose, emit }) {
		const mode = ref()
		const open = ref(false)
		const loading = ref(false)
		expose({ open, loading, mode })
		return () => (
			<>
				<Modal
					title="Update Access Token"
					style="top: 200px"
					open={open.value}
					onOk={() => emit('updateOk', mode.value)}
					confirmLoading={loading.value}
					onCancel={() => (open.value = false)}
				>
					<Select
						style="width: 100%; margin-top: 20px; margin-bottom: 20px;"
						v-model:value={mode.value}
						placeholder="Please select the Mode"
						options={[
							{ value: 'ro', label: 'Read Only' },
							{ value: 'rw', label: 'Read & Write' },
						]}
					/>
				</Modal>
			</>
		)
	},
})
