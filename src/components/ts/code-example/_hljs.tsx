import { CheckOutlined, CopyOutlined } from '@ant-design/icons-vue'

import 'highlight.js/styles/atom-one-dark.css'
// import "highlight.js/lib/common";
import HljsVue from '@highlightjs/vue-plugin'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
hljs.registerLanguage('javascript', javascript)
import { useClipboard } from '@vueuse/core'

const EyeIcon = (
	<svg
		focusable="false"
		aria-hidden="true"
		viewBox="0 0 24 24"
		class="icon_root text-white"
	>
		<path
			fill="currentColor"
			d="M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z"
		></path>
	</svg>
)

const EyeInvisiblIcon = (
	<svg
		focusable="false"
		aria-hidden="true"
		viewBox="0 0 24 24"
		class="icon_root text-white"
	>
		<path
			fill="currentColor"
			d="M12 6c3.79 0 7.17 2.13 8.82 5.5-.59 1.22-1.42 2.27-2.41 3.12l1.41 1.41c1.39-1.23 2.49-2.77 3.18-4.53C21.27 7.11 17 4 12 4c-1.27 0-2.49.2-3.64.57l1.65 1.65C10.66 6.09 11.32 6 12 6zm-1.07 1.14L13 9.21c.57.25 1.03.71 1.28 1.28l2.07 2.07c.08-.34.14-.7.14-1.07C16.5 9.01 14.48 7 12 7c-.37 0-.72.05-1.07.14zM2.01 3.87l2.68 2.68C3.06 7.83 1.77 9.53 1 11.5 2.73 15.89 7 19 12 19c1.52 0 2.98-.29 4.32-.82l3.42 3.42 1.41-1.41L3.42 2.45 2.01 3.87zm7.5 7.5 2.61 2.61c-.04.01-.08.02-.12.02-1.38 0-2.5-1.12-2.5-2.5 0-.05.01-.08.01-.13zm-3.4-3.4 1.75 1.75c-.23.55-.36 1.15-.36 1.78 0 2.48 2.02 4.5 4.5 4.5.63 0 1.23-.13 1.77-.36l.98.98c-.88.24-1.8.38-2.75.38-3.79 0-7.17-2.13-8.82-5.5.7-1.43 1.72-2.61 2.93-3.53z"
		></path>
	</svg>
)

export default defineComponent({
	props: {
		code: {
			type: String,
			default: '',
		},
		password: {
			type: String,
			default: '',
		},
	},
	setup(props) {
		const code = props.code.replace(/\*\*\*\*\*\*\*\*\*\*/g, props.password)
		const showPassword = ref(false)
		const showCode = ref(props.code)
		const handleShowPassword = () => {
			showPassword.value = !showPassword.value
			showCode.value = showPassword.value ? props.code : code
		}

		const { copy, copied, isSupported } = useClipboard({
			source: showCode,
		})

		return () => (
			<div class="overflow-hidden !rounded-md">
				<div class="group relative">
					<div class="absolute right-2 top-4 z-10 hidden items-center gap-2 group-hover:flex">
						<button
							onClick={handleShowPassword}
							class="cursor-pointer items-center justify-center border-0 rounded-md bg-white bg-opacity-30 text-white !h-8 !w-8 !flex hover:bg-opacity-50"
						>
							{showPassword.value ? EyeIcon : EyeInvisiblIcon}
						</button>

						{isSupported.value && (
							<button
								onClick={() => copy(showCode.value)}
								class="cursor-pointer items-center justify-center border-0 rounded-md bg-white bg-opacity-30 text-white !h-8 !w-8 !flex hover:bg-opacity-50"
							>
								{copied.value ? (
									<CheckOutlined class="!text-base !text-white" />
								) : (
									<CopyOutlined class="!text-base !text-white" />
								)}
							</button>
						)}
					</div>
					<HljsVue.component
						language="js"
						code={showCode.value}
						class="rounded-lg py-2"
						style={{
							'padding-top': '0.5rem',
							'padding-bottom': '0.5rem',
							'border-radius': '0.5rem',
						}}
					/>
				</div>
			</div>
		)
	},
})
