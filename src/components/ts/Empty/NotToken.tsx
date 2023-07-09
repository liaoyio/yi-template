import { Empty, Button } from 'ant-design-vue'
export default defineComponent({
	emits: ['btnClick'],
	setup(_, { emit }) {
		return () => (
			<Empty
				class="rounded-lg bg-gray-50 !m-0 !py-12"
				imageStyle={{ height: 90 }}
				description={
					<div class="mx-auto my-4 max-w-screen-sm text-gray-600">
						<h3>The assess token list is empty !</h3>
						<div>
							<p>Please add manually assess token.</p>
						</div>
					</div>
				}
			>
				<Button
					type="primary"
					onClick={() => {
						emit('btnClick')
					}}
				>
					Create Now
				</Button>
			</Empty>
		)
	},
})
