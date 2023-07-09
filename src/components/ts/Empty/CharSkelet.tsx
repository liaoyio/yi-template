import { SkeletonInput } from 'ant-design-vue'

export default defineComponent({
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
								style="width:'300px';height:'16px'"
							/>
						</div>
						<SkeletonInput
							active={props.active}
							size="small"
							block
							style="height:'16px'"
						/>
						<SkeletonInput
							active={props.active}
							size="small"
							block
							style="height:'16px'"
						/>
					</div>
				</div>
			</div>
		)
	},
})
