import { Empty } from 'ant-design-vue'
import { createVNode } from 'vue'
import EmailErrorVue from '~@/components/Icon/EmailError.vue'
export default defineComponent({
	setup(_, { emit }) {
		return () => (
			<Empty
				class="rounded-lg bg-gray-50 !m-0 !py-12"
				image={createVNode(EmailErrorVue)}
				imageStyle={{ height: 100 }}
				description={
					<div class="mx-auto my-4 max-w-screen-md text-gray-600">
						<h3 class="text-base">Need Verify In Your Email</h3>
						<div class="py-1">
							<p>
								We have noticed that your account requires email verification.
								Please check your email inbox for further instructions on how to
								complete the verification process.
							</p>
						</div>
					</div>
				}
			></Empty>
		)
	},
})
