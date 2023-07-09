import { Tooltip, Button, Modal, Input, Alert, message } from 'ant-design-vue'
import ArrowLeftBold from '~@/components/Icon/ArrowLeftBold.vue'

export default defineComponent({
	setup() {
		const renameRef = ref()
		const onRename = (e: any) => {
			if (store.oneCache) {
				store.oneCache.one.name = e
			}
		}
		const router = useRouter()
		const store = cacheStore()
		const cache = computed(() => store.oneCache?.one)
		return () => (
			<>
				<div class="bg-gray-100 py-6 shadow">
					<div class="mx-auto px-4 container !max-w-screen-xl">
						<div class="flex items-center">
							<div>
								<Tooltip placement="left" title="Back">
									<Button
										onClick={() => router.replace({ name: 'Console' })}
										type="ghost"
										class="mr-4 h-10 w-8 flex items-center justify-center bg-transparent"
									>
										<ArrowLeftBold class="icon_root text-[#d1d5db] hover:text-[#67c23a]" />
									</Button>
								</Tooltip>
							</div>
							<div>
								<h1 class="m-0 flex items-center text-2xl font-bold leading-none">
									<span>{cache.value?.name}</span>
									<Tooltip placement="right" title="Rename Cache">
										<Button
											onClick={() => renameRef.value.show(cache.value?.name)}
											type="ghost"
											class="ml-3 h-auto inline-flex items-center !p-0"
										>
											<span>
												<svg
													class="icon_root text-gray-400"
													focusable="false"
													aria-hidden="true"
													viewBox="0 0 24 24"
												>
													<path d="m16.81 8.94-3.75-3.75L4 14.25V18h3.75l9.06-9.06zM6 16v-.92l7.06-7.06.92.92L6.92 16H6zm13.71-9.96c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83zM2 20h20v4H2z"></path>
												</svg>
											</span>
										</Button>
									</Tooltip>
								</h1>
								<div class="mr-20 mt-2">
									<div class="inline-flex flex-wrap items-center gap-2 text-sm">
										{/* <span>Free Tier</span>
										<span>·</span>
										<span>Single Replica</span>
										<span>·</span>
										<span>10K commands per day</span> */}
										<span>{cache.value?.des}</span>
									</div>
								</div>
							</div>
							{/* <div class="ml-auto">
								<Button
									onClick={() => (show.value = true)}
									type="default"
									icon={
										<svg
											width="1em"
											height="1em"
											focusable="false"
											aria-hidden="true"
											viewBox="0 0 24 24"
											class="icon_root text-gray-500"
										>
											<path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
										</svg>
									}
									class="items-center justify-center !flex"
								/>
							</div> */}
						</div>
					</div>
				</div>
				<RenamePopup ref={renameRef} onRename={onRename} />
			</>
		)
	},
})

const RenamePopup = defineComponent({
	emits: ['rename'],
	setup(_, { emit, expose }) {
		const loading = ref<boolean>(false)
		const open = ref<boolean>()
		const cache_name = ref<string>('')
		const old_cache_name = ref<string>('')
		const route = useRoute()

		const onOk = async () => {
			loading.value = true
			const body = { id: route.params.id as any, name: cache_name.value }
			const res = await cacheRename(body)
			if (res.id) {
				message.loading({ content: 'Loading...', key: 'rename' })
				setTimeout(() => {
					loading.value = false
					emit('rename', res.name)
					message.success({
						content: 'Rename Success!',
						key: 'rename',
						duration: 1.5,
					})
					open.value = false
				}, 1000)
			} else {
				message.error('Rename failed!')
			}
		}

		const show = (name: string) => {
			open.value = true
			cache_name.value = name
			old_cache_name.value = name
		}

		expose({ show })
		return () => (
			<Modal
				open={open.value}
				title="Rename"
				onOk={onOk}
				destroyOnClose
				cancelText="Close"
				okText="Rename"
				onCancel={() => (open.value = false)}
				confirm-loading={loading.value}
				okButtonProps={{
					disabled:
						!cache_name.value || cache_name.value === old_cache_name.value,
				}}
			>
				<label class="dialog-label my-3">Cache Service Name</label>
				<Input
					v-model:value={cache_name.value}
					placeholder="Please enter the cache name"
				/>
				<Alert
					class="!mt-6"
					message="Your connections and clients will not be affected by this change."
					type="info"
				/>
			</Modal>
		)
	},
})
