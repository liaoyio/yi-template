export default defineComponent({
	props: {
		item: {
			type: Object,
			default: () => ({}),
		},
	},
	emits: ['itemClick'],
	setup(props, { emit }) {
		return () => (
			<div
				id={`cache-item-${props.item.id}`}
				class={`flex flex-col border border-gray-200 rounded-lg shadow-sm ${
					props.item.status == '-10' ? 'cursor-not-allowed' : ''
				}`}
			>
				<div
					class={`p-4 sm:p-6 sm:pb-6 sm:pt-6 ${
						props.item.status == '-10' ? 'opacity-70' : ''
					}`}
				>
					<div
						onClick={() => emit('itemClick', props.item)}
						class={`flex items-center justify-between text-lg ${
							props.item.status != '-10'
								? 'cursor-pointer'
								: 'cursor-not-allowed'
						}`}
					>
						<span>{props.item.name}</span>
						<span class="text-[#67c23a]">
							{props.item.status == '1' ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="1.2em"
									height="1.2em"
									viewBox="0 0 1024 1024"
								>
									<path
										fill="currentColor"
										d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0zm0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01zm20.368-642.368c-12.496 12.496-12.496 32.752 0 45.248l115.76 115.76H287.68c-17.68 0-32 14.336-32 32s14.32 32 32 32h362.464l-117.76 117.744c-12.496 12.496-12.496 32.752 0 45.248c6.256 6.256 14.432 9.376 22.624 9.376s16.368-3.12 22.624-9.376l189.008-194l-189.008-194c-12.512-12.496-32.752-12.496-45.264 0z"
									/>
								</svg>
							) : null}
						</span>
					</div>
					<span class="mt-1.5 flex items-center gap-1.5 opacity-50">
						<span>Regional</span>
						{props.item.cloudProvider}
						<span>{props.item.region}</span>
					</span>
					<div class="mt-1.5 flex items-center justify-between gap-1.5">
						<span class="flex-1 opacity-50">Status</span>
						<span class="inline-flex items-center gap-1">
							<StatusIcon status={props.item.status} />
							<StatusInfo status={props.item.status} />
						</span>
					</div>
				</div>
			</div>
		)
	},
})

const StatusIcon = defineComponent({
	props: {
		status: {
			type: [String, Number],
			required: true,
		},
	},
	setup(props) {
		const element = () => {
			if (props.status == '0') {
				return (
					<svg
						class="is_loading inline-block h-[18px] w-[18px] text-[#00b173]"
						style="vertical-align:-2px;"
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 1024 1024"
					>
						<path
							fill="currentColor"
							d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"
						/>
					</svg>
				)
			} else if (props.status == '1') {
				return <span class="s_running mr-1"></span>
			} else if (props.status == '10') {
				return (
					<svg
						class="inline-block h-[18px] w-[18px] text-[#f16538]"
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 1024 1024"
					>
						<path
							fill="currentColor"
							d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372c0-89 31.3-170.8 83.5-234.8l523.3 523.3C682.8 852.7 601 884 512 884zm288.5-137.2L277.2 223.5C341.2 171.3 423 140 512 140c205.4 0 372 166.6 372 372c0 89-31.3 170.8-83.5 234.8z"
						/>
					</svg>
				)
			} else {
				return null
			}
		}
		return () => element()
	},
})

const StatusInfo = defineComponent({
	props: {
		status: {
			type: [String, Number],
			required: true,
		},
	},

	setup(props) {
		const _color: { [key: string]: string } = {
			'0': '#67c23a',
			'1': '#67c23a',
			'20': '#f16538',
			'200': '#6b7280',
			'-1': '#f16538',
			'-10': '#f16538',
		}

		const _title: { [key: string]: string } = {
			'0': 'creating',
			'1': 'running',
			'20': 'limited',
			'200': 'reject',
			'-1': 'stopped',
			'-10': 'terminated',
		}
		return () => (
			<span style={{ color: _color[props.status] ?? '#111' }} class="text-lg">
				{_title[props.status] ?? ''}
			</span>
		)
	},
})
