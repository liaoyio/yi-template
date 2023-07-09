import { Empty } from 'ant-design-vue'
import { createVNode } from 'vue'
import SearchNullVue from '~@/components/Icon/SearchNull.vue'

export default defineComponent({
	setup() {
		return () => (
			<Empty
				class="rounded-lg bg-gray-50 !m-0 !py-12"
				imageStyle={{ height: 90 }}
				image={createVNode(SearchNullVue)}
				description={
					<div class="mx-auto my-4 max-w-screen-md text-gray-600">
						<div class="py-1">
							<p>Data Not Found</p>
						</div>
					</div>
				}
			></Empty>
		)
	},
})
