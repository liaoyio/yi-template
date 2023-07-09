import { Modal, Form, FormItem, Select } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'

const rules: Record<string, Rule[]> = {
	mode: [
		{
			required: true,
			message: 'Please select the Mode',
			trigger: 'change',
		},
	],
}

export default defineComponent({
	emits: ['addOk'],
	setup(_, { expose, emit }) {
		const formRef = ref()

		const open = ref(false)
		const loading = ref(false)

		const form = reactive({
			mode: null,
		})

		const resetForm = () => {
			formRef.value.resetFields()
		}

		expose({ resetForm, open, loading })

		return () => (
			<>
				<Modal
					title="Add Access Token"
					style={{ top: 200 }}
					open={open.value}
					destroyOnClose
					onOk={() => emit('addOk', form.mode)}
					confirmLoading={loading.value}
					onCancel={() => (open.value = false)}
					okButtonProps={{
						disabled: !form.mode,
					}}
				>
					<div>
						<Form
							ref={formRef}
							layout="vertical"
							model={form}
							rules={rules}
							name="add-token"
							style={{ maxWidth: 520 }}
						>
							<FormItem name="mode" label="Mode">
								<Select
									v-model:value={form.mode}
									placeholder="Please select the Mode"
									options={[
										{ value: 'ro', label: 'Read Only' },
										{ value: 'rw', label: 'Read & Write' },
									]}
								/>
							</FormItem>
						</Form>
					</div>
				</Modal>
			</>
		)
	},
})
