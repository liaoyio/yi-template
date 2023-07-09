import { Modal, Button, Input, message } from 'ant-design-vue'

export default defineComponent({
	emits: ['delete-cache'],
	setup(_, { emit }) {
		const vmName = ref('')
		const open = ref(false)

		const hide = () => (open.value = false)

		const hasdel = ref(false)
		const loading = ref(false)
		const route = useRoute()
		const router = useRouter()
		const store = cacheStore()

		const hcNameInput = (e: any) => {
			hasdel.value = e.target.value === store.oneCache?.one?.name
		}

		const onOk = () => {
			loading.value = true
			setTimeout(() => {
				cacheOne({ id: route.params.id as any, opt: 'terminate' })
					.then((res) => {
						if (res.one) {
							emit('delete-cache')
							router.replace('/')
							message.success('cache terminate')
						}
					})
					.catch(() => message.error('Request Error'))
					.finally(() => (loading.value = false))
			}, 300)
		}

		return () => (
			<>
				<div class="grid grid-cols-3 gap-8 border rounded-lg bg-red-50 p-4 !border-red-200 sm:p-[1.75rem_2rem]">
					<div class="col-span-2">
						<h4 class="text-lg">Delete this database</h4>
						<div class="text-gray-600">
							<p>
								Once you delete a database, there is no going back. Please be
								certain.
							</p>
						</div>
					</div>
					<div class="h-full flex flex-row-reverse items-center">
						<Button
							type="primary"
							danger
							loading={loading.value}
							onClick={() => (open.value = true)}
						>
							Delete
						</Button>
					</div>
				</div>
				{/* DeleteTost */}
				<Modal
					title="Delete Cache Service"
					open={open.value}
					cancelText="Cancel"
					okText="Delete"
					onOk={onOk}
					onCancel={hide}
					confirm-loading={loading.value}
					okButtonProps={{
						disabled: !hasdel.value,
						loading: loading.value,
						danger: true,
					}}
				>
					<div class="space-y-4">
						<div>
							<p>All data will be deleted permanently.</p>
							<div class="alert-base danger mt-2 px-4 text-red-500">
								This action cannot be undone.
							</div>
						</div>

						<div class="rounded-lg bg-gray-100 px-6 py-5 space-y-2">
							<p class="mb-2">
								Please type
								<span class="c-tag font-semibold">
									<code> {store.oneCache?.one.name} </code>
								</span>
								to confirm.
							</p>

							<Input
								onInput={hcNameInput}
								v-model={vmName}
								placeholder="enter the name of the Cache service"
							/>
						</div>
					</div>
				</Modal>
			</>
		)
	},
})
