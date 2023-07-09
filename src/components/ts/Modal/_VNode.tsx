export const LimitReached = defineComponent({
	setup() {
		return () => (
			<div class="text-info-88 pb-2 text-start text-sm">
				You can
				<a class="is-link" href="#">
					add a payment method
				</a>
				to upgrade your plan and create more cache services.
			</div>
		)
	},
})
export const ContactUs = defineComponent({
	setup() {
		return () => (
			<div class="text-info-88 text-base">
				Click here to{' '}
				<a
					style="color: #67c23a; cursor: pointer;"
					href="mailto:support@montplex.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					Contact US
				</a>
			</div>
		)
	},
})
