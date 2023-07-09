import Request from './axios'

const defaultConfig = {
	// https://dev.montplex.com
	baseURL: '/engula',
	timeout: 10000,
	showLoading: true,
	headers: {
		Accept: 'application/json, text/plain, */*',
		'Content-Type': 'application/json',
		'X-Requested-With': 'XMLHttpRequest',
	},
	withCredentials: false,
}

export const http = new Request({
	...defaultConfig,
	interceptors: {
		/* 请求拦截器 */
		requestSuccessInterceptor(config) {
			return config
		},
		requestErrorInterceptor(err) {
			return err
		},
		/* 响应拦截器 */
		responseSuccessInterceptor(res) {
			return res.data
		},
		responseErrorInterceptor(err) {
			return err
		},
	},
})
