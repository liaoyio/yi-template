import {
	Form,
	FormItem,
	Input,
	Modal,
	Select,
	SelectOption,
	message,
} from 'ant-design-vue'

import cacheStore from '~@/stores/cacheStore'

import type { Rule } from 'ant-design-vue/es/form'

const rules: Record<string, Rule[]> = {
	name: [
		{
			required: true,
			message: 'Please input cache name',
			trigger: 'blur',
		},
		{ min: 3, max: 20, message: 'Length should be 3 to 20', trigger: 'blur' },
	],
	cloudProvider: [
		{
			required: true,
			message: 'Please select cloud provider',
			trigger: 'change',
		},
	],
	des: [{ required: false }],
	region: [
		{ required: true, message: 'Please select region', trigger: 'change' },
	],
	primaryZone: [
		{
			required: true,
			message: 'Please select Primary Zone',
			trigger: 'change',
		},
	],
}

interface FormState {
	name: string
	des?: string
	region: string
	cloudProvider: string
	primaryZone: string
}

export default defineComponent({
	props: {
		modelValue: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['update:modelValue', 'add-success'],
	setup(props, { emit, expose }) {
		const store = cacheStore()

		let formState = reactive<FormState>({
			cloudProvider: '',
			name: '',
			region: '',
			des: '',
			primaryZone: '',
		})
		const createLoading = ref<boolean>(false)
		const formRef = ref()

		const handleCancel = () => {
			emit('update:modelValue', false)
		}

		const resetForm = () => {
			formRef.value.resetFields()
		}

		const regions = computed(() => {
			let _region: any = {}
			store.regionList &&
				store.regionList.map(
					(i) => i.regions && (_region[i.cloudProvider] = i.regions)
				)
			return _region
		})
		const zoneList = computed(() => {
			const list = store.zoneList?.[formState.region] ?? []
			return list
		})

		const cloud_provider_map = {
			'ap-east-1': 'Asia Pacific (Hong Kong)',
			'ap-southeast-1': 'Asia Pacific (Singapore)',
			'us-east-1': 'US East (N. Virginia)',
		}

		const onOk = () => {
			formRef.value.validateFields().then((values: any) => {
				createLoading.value = true
				const hide = message.loading('cache creating', 4)
				addCache(toRaw(formState))
					.then((res) => {
						if (res.id) {
							hide()
							emit('add-success')
							createLoading.value = false
							handleCancel()
							// formRef.value.resetFields()
						}
					})
					.catch(() => {
						message.error('request error', 2)
						createLoading.value = false
					})
					.finally(() => {
						createLoading.value = false
					})
			})
		}

		expose({ resetForm })

		return () => (
			<Modal
				open={props.modelValue}
				title="Create Cache Service"
				onOk={onOk}
				onCancel={handleCancel}
				confirm-loading={createLoading.value}
			>
				<Form
					ref={formRef}
					model={formState}
					rules={rules}
					layout="vertical"
					name="add_cache_from_modal"
				>
					<FormItem label="Cache Name" name="name" hasFeedback>
						<Input
							v-model:value={formState.name}
							placeholder="Please enter the cache name"
						/>
					</FormItem>

					<FormItem label="Describes" name="des" hasFeedback>
						<Input
							v-model:value={formState.des}
							placeholder="Please enter the describes"
						/>
					</FormItem>

					<FormItem label="Cloud Provider" name="cloudProvider" hasFeedback>
						<Select
							onChange={() => {
								formState.region = ''
							}}
							v-model:value={formState.cloudProvider}
							placeholder="Please select the cloud provider"
						>
							{store.regionList?.map((item: any) => (
								<SelectOption value={item.cloudProvider} key={item.id}>
									{item.cloudProvider}
								</SelectOption>
							))}
						</Select>
					</FormItem>

					{formState.cloudProvider ? (
						<FormItem label="Region" name="region" hasFeedback>
							<Select
								onChange={() => {
									formState.primaryZone = ''
								}}
								v-model:value={formState.region}
								placeholder="Please select the region"
							>
								{regions.value[formState.cloudProvider].map((item: any) => (
									<SelectOption value={item} key={item}>
										{(cloud_provider_map as any)?.[item] ?? item}
									</SelectOption>
								))}
							</Select>
						</FormItem>
					) : null}

					{formState.region ? (
						<FormItem label="Primary Zone" name="primaryZone" hasFeedback>
							<Select
								v-model:value={formState.primaryZone}
								placeholder="Please select the primary zone"
							>
								{zoneList.value.length &&
									zoneList.value.map((item: string) => (
										<SelectOption value={item} key={item}>
											{item}
										</SelectOption>
									))}
							</Select>
						</FormItem>
					) : null}
				</Form>
			</Modal>
		)
	},
})
