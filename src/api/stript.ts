import { http } from '~@/composables/http'

export const striptPk = () => {
	return http.get<{ pk: string }>({
		url: '/fee/stripe/pk',
		showLoading: false,
	})
}

export const getClientSecret = (data: {
	cacheServiceId: string | number
	monthStr: string
}) => {
	return http.post<{ clientSecret: string }>({
		url: '/fee/create-payment-intent',
		showLoading: false,
		data,
	})
}
