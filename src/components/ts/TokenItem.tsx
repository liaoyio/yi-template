import { Button, TypographyParagraph } from 'ant-design-vue'
import CopyAble from '~@/components/CopyAble.vue'

export default defineComponent({
	props: {
		item: {
			// type: Object as PropType<CacheItem>,
			type: Object as any,
		},
	},
	emits: ['editClick', 'deleteClick'],
	setup(props, { emit, expose }) {
		return () => (
			<>
				<div
					class="mb-8 border border-gray-200 rounded-lg p-4 sm:px-8 sm:py-4"
					key={props.item.id}
				>
					<div class="flex">
						{Token}
						<ul class="text-info-8 flex flex-1 flex-col pl-7">
							<li class="flex items-center">
								<h3 class="text-base">Access Token:</h3>
								{/* @click="handleCopyClick(item.accessToken as string)" */}
								<div class="group flex items-center">
									{/* <TypographyParagraph copyable={{ text: props.item.accessToken }}/> */}
									<CopyAble text={props.item.accessToken}>
										<span class="font-semibold">
											{props.item.show ? props.item.accessToken : '**********'}
										</span>
									</CopyAble>
									{/* {item.show ? (
                  <EyeOutlined class="hover:opacity-70" style={{ width: 18, color: "#1677ff" }} />
                ) : (
                  <EyeInvisibleOutlined
                    class="hover:opacity-70"
                    style={{ width: 18, color: "#1677ff" }}
                  />
                )} */}
								</div>
							</li>
							<li class="text-info-4 py-1">
								Added on {props.item.createdDate}
								{/* { dayjs(item.createdDate).format("MMM D, YYYY") } */}
							</li>
							<li class="flex items-center">
								<h3 class="text-base">Mode:</h3>
								<span class="pl-2 text-gray-800">
									{props.item.mode == 'ro' ? 'Read Only' : 'Read & Write'}
								</span>
								<span
									onClick={() => {
										emit('editClick', props.item)
									}}
								>
									{Edit}
								</span>
							</li>
						</ul>
						<div class="flex items-center gap-6">
							<Button
								danger
								onClick={() => {
									emit('deleteClick', props.item.id)
								}}
							>
								Delete
							</Button>
						</div>
					</div>
				</div>
			</>
		)
	},
})

const Edit = (
	<svg
		class="ml-2 !cursor-pointer !text-gray-400 hover:!opacity-70"
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 24 24"
	>
		<path
			fill="currentColor"
			d="M2 24v-4h20v4H2Zm2-6v-3.75l9.05-9.05l3.75 3.75L7.75 18H4Zm2-2h.9L14 8.95L13.05 8L6 15.1v.9Zm11.925-8.15l-3.75-3.75l1.8-1.8q.275-.3.7-.287t.7.287l2.35 2.35q.275.275.275.688t-.275.712l-1.8 1.8ZM6 16Z"
		/>
	</svg>
)

const Token = (
	<svg
		class="text-gray-600 !h-8 !w-8"
		xmlns="http://www.w3.org/2000/svg"
		width="2em"
		height="2em"
		viewBox="0 0 24 24"
	>
		<path
			fill="currentColor"
			d="M5.854 6.146a.5.5 0 0 0-.708 0l-.646.647l-.646-.647a.5.5 0 1 0-.708.708l.647.646l-.647.646a.5.5 0 1 0 .708.708l.646-.647l.646.647a.5.5 0 1 0 .708-.708L5.207 7.5l.647-.646a.5.5 0 0 0 0-.708Zm3.292 0a.5.5 0 1 1 .708.708l-.647.646l.647.646a.5.5 0 0 1-.708.708L8.5 8.207l-.646.647a.5.5 0 1 1-.708-.708l.647-.646l-.647-.646a.5.5 0 1 1 .708-.708l.646.647l.646-.647ZM11.5 8a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1Zm-8-5A2.5 2.5 0 0 0 1 5.5v4A2.5 2.5 0 0 0 3.5 12h9A2.5 2.5 0 0 0 15 9.5v-4A2.5 2.5 0 0 0 12.5 3h-9ZM2 5.5A1.5 1.5 0 0 1 3.5 4h9A1.5 1.5 0 0 1 14 5.5v4a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 9.5v-4Z"
		/>
	</svg>
)
