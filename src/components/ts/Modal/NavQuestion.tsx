import { Modal, Button } from 'ant-design-vue'

export default defineComponent({
	props: {
		modelValue: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['update:modelValue'],
	setup(props, { emit }) {
		const handleCancel = () => {
			emit('update:modelValue', false)
		}

		return () => (
			<Modal
				open={props.modelValue}
				title="Docs & Support"
				onCancel={handleCancel}
				footer={
					<Button key="close" onClick={handleCancel}>
						Close
					</Button>
				}
			>
				<div class="grid gap-3 py-3">
					<a
						href="https://www.montplex.com/docs/docs/overall/create/"
						target="_blank"
						class="is-link relative h-auto flex_c rounded-md bg-white p-5 shadow hover:bg-blue-50"
					>
						{DescriptionIcon}
						<div class="ml-4 flex-grow text-base font-semibold">
							Documentation
						</div>
						{RightIcon}
					</a>

					<a
						href="https://www.montplex.com/docs/docs/contact/"
						target="_blank"
						class="is-link relative h-auto flex_c rounded-md bg-white p-5 shadow hover:bg-blue-50"
					>
						{Bug}
						<div class="ml-4 flex-grow text-base font-semibold">
							Report a Bug
						</div>
						{RightIcon}
					</a>

					<a
						href="mailto:support@montplex.com"
						target="_blank"
						rel="noopener noreferrer"
						class="is-link relative h-auto flex_c rounded-md bg-white p-5 shadow hover:bg-blue-50"
					>
						{Email}
						<div class="ml-4 flex-grow text-base font-semibold">Contact us</div>
						{RightIcon}
					</a>

					<a
						href="https://discord.gg/Z7AeCwVn"
						target="_blank"
						class="is-link relative h-auto flex_c rounded-md bg-white p-5 shadow hover:bg-blue-50"
					>
						{Discord}
						<div class="ml-4 flex-grow text-base font-semibold">
							Join our Discord community
						</div>
						{RightIcon}
					</a>

					<a
						href="https://twitter.com/MontplexDB"
						target="_blank"
						class="is-link relative h-auto flex_c rounded-md bg-white p-5 shadow hover:bg-blue-50"
					>
						{Twitter}
						<div class="ml-4 flex-grow text-base font-semibold">
							Follow us at Twitter{' '}
						</div>
						{RightIcon}
					</a>
				</div>
			</Modal>
		)
	},
})

const RightIcon = (
	<svg
		class="opacity-50"
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 24 24"
	>
		<path
			fill="currentColor"
			d="M9.4 18L8 16.6l4.6-4.6L8 7.4L9.4 6l6 6l-6 6Z"
		/>
	</svg>
)

const Bug = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 24 24"
	>
		<path
			fill="currentColor"
			d="M12 21q-1.65 0-3.025-.825T6.8 18H4v-2h2.1q-.075-.575-.088-.988T6 14H4v-2h2q0-.675.013-1.113T6.1 10H4V8h2.8q.35-.6.788-1.088T8.6 6.05L7 4.4L8.4 3l2.15 2.15q.575-.2 1.425-.2t1.425.2L15.6 3L17 4.4l-1.65 1.65q.575.375 1.038.863T17.2 8H20v2h-2.1q.075.575.088.95T18 12h2v2h-2q0 .6-.013 1.012T17.9 16H20v2h-2.8q-.8 1.35-2.175 2.175T12 21Zm-2-5h4v-2h-4v2Zm0-4h4v-2h-4v2Z"
		/>
	</svg>
)

const Email = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 24 24"
	>
		<path
			fill="currentColor"
			d="m20 8l-8 5l-8-5V6l8 5l8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z"
		/>
	</svg>
)

const Discord = (
	<svg width="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<path
			fill="currentColor"
			d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"
		></path>
	</svg>
)

const Twitter = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		width="20"
		height="20"
		aria-hidden="true"
		focusable="false"
		class="css-bk9fzy"
	>
		<path
			fill="currentColor"
			d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
		></path>
	</svg>
)

const DescriptionIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 24 24"
	>
		<path
			fill="currentColor"
			d="M8 18h8v-2H8v2Zm0-4h8v-2H8v2Zm-2 8q-.825 0-1.413-.588T4 20V4q0-.825.588-1.413T6 2h8l6 6v12q0 .825-.588 1.413T18 22H6Zm7-13h5l-5-5v5Z"
		/>
	</svg>
)
