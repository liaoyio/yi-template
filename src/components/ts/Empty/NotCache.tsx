import { Empty, Button } from 'ant-design-vue'

export default defineComponent({
	emits: ['onClick'],
	setup(_, { emit }) {
		return () => (
			<Empty
				class="rounded-lg bg-gray-50 !m-0 !py-12"
				imageStyle={{ height: 90 }}
				description={
					<div class="mx-auto my-4 max-w-screen-md text-gray-600">
						<h3 class="text-lg">Create a Cache Service</h3>
						<div class="py-1">
							<p>
								We manage the cache service for you and you only pay what you
								use.
							</p>
						</div>
					</div>
				}
			>
				<Button
					type="primary"
					onClick={() => {
						emit('onClick')
					}}
				>
					{' '}
					Create Now{' '}
				</Button>
			</Empty>
		)
	},
})
