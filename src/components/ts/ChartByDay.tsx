import { SkeletonInput } from 'ant-design-vue'
import Echarts from '~@/components/Echart.vue'

export default defineComponent({
	props: {
		loading: {
			type: Boolean,
			default: true,
		},
		options: {
			type: Object as PropType<any>,
			default: () => ({}),
		},
		fee: {
			type: [String, Number],
			default: 0,
		},
	},
	emits: ['update:modelValue'],
	setup(props) {
		return () => (
			<>
				<div class="bg-gray-100 py-8">
					<div class="mx-auto px-4 container !max-w-screen-xl">
						<h3 class="m-0 text-base">Usage For Current Billing</h3>
						<div class="mt-4 flex flex-col gap-8 md:flex-row">
							<div class="m-chart min-h-[100px] flex-1 rounded-lg bg-white">
								{!props.loading && props.options ? (
									<Echarts options={props.options} />
								) : (
									<ChartSkelet active={props.loading} />
								)}
							</div>
							<div
								class={`rounded-lg px-5 pt-4 pb-4 shadow-sm bg-white md:text-center flex flex-col md:justify-center md:items-center min-w-[180px]`}
							>
								<div class="mb-1 leading-5 text-[#606266] opacity-70">Fee</div>
								{!props.loading && props.fee ? (
									<div class="text-info-8 text-xl font-normal">
										{props.fee}
										<span class="pl-1">$</span>
									</div>
								) : (
									<SkeletonInput
										active={props.loading}
										size="small"
										block
										style={{ height: 16 }}
										class="mt-2"
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</>
		)
	},
})

const ChartSkelet = defineComponent({
	props: {
		active: {
			type: Boolean,
			default: true,
		},
	},
	setup(props) {
		return () => (
			<div class="h-full flex items-center justify-center">
				<div class="w-full">
					<div class="h-full flex flex-col gap-2 px-4">
						<div class="flex gap-4">
							<SkeletonInput
								active={props.active}
								size="small"
								class="[&span:!w-20]"
							/>
							<SkeletonInput
								active={props.active}
								size="small"
								style={{ width: '300px', height: '16px' }}
							/>
						</div>
						<SkeletonInput
							active={props.active}
							size="small"
							block
							style={{ height: 16 }}
						/>
						<SkeletonInput
							active={props.active}
							size="small"
							block
							style={{ height: 16 }}
						/>
					</div>
				</div>
			</div>
		)
	},
})
