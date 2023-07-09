import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// 定义传入的拦截器接口，并且都是可以可选的。
interface IRequestInterceptors<T = AxiosResponse> {
	// 请求成功时的拦截器
	requestSuccessInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
	// 请求失败时的拦截器
	requestErrorInterceptor?: (err: any) => any
	// 响应成功时的拦截器
	responseSuccessInterceptor?: (res: T) => T
	// 响应失败时的拦截器
	responseErrorInterceptor?: (err: any) => any
}

export interface IRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
	// 每个request实例可以不传入拦截器
	interceptors?: IRequestInterceptors<T>
	// 是否显示loading
	showLoading?: boolean
}

export interface IResponseData extends AxiosResponse {
	config: IRequestConfig
}

const DEFAULT_LOADING = false

class Request {
	private instance: AxiosInstance
	private showLoading: boolean
	private loading?: any

	constructor(config: IRequestConfig) {
		// 默认不加载loading
		this.showLoading = config.showLoading ?? DEFAULT_LOADING
		this.instance = axios.create(config)

		// 创建实例请求拦截器
		this.instance.interceptors.request.use(
			config.interceptors?.requestSuccessInterceptor,
			config.interceptors?.requestErrorInterceptor
		)
		// 创建实例响应拦截器
		this.instance.interceptors.response.use(
			config.interceptors?.responseSuccessInterceptor,
			config.interceptors?.responseErrorInterceptor
		)
		// 添加请求拦截器
		this.instance.interceptors.request.use(
			(config: IRequestConfig) => {
				// 在发送请求之前做些什么
				if (this.showLoading) {
					// 添加加载loading...
					/*
						this.loading = ElLoading.service({
							lock: true,
							text: "loading...",
							background: "rgba(255, 255, 255, 1)"
						});
					 */
				}
				return config
			},
			(error) => {
				toast.warning(error.message ?? '未知请求错误')
				// 对请求错误做些什么
				this.loading?.close()
				return Promise.reject(error)
			}
		)
		// 添加响应拦截器
		this.instance.interceptors.response.use(
			(response: any) => {
				// 2xx 范围内的状态码都会触发该函数。
				// 对响应数据进行格式化
				/* if (response.data) {
					this.loading?.close()
					return response.data
				} */
				return response
			},
			(error) => {
				// 超出 2xx 范围的状态码都会触发该函数。
				const code = error.response?.status
				const statusCode = error?.response.status || error?.status

				let { msg, message } = error?.response?.data ?? {}

				if (!msg && message) {
					msg = message
				}

				if (!msg) {
					switch (code) {
						case 400:
							msg = '参数错误'
							break
						case 500:
							msg = '服务端错误'
							break
						case 404:
							msg = '请求资源不存在'
							break
						case 403:
							// userStore().info = null;
							// window.location.replace(
							// 	import.meta.env.VITE_API_URL + '/engula/auth0/login'
							// )
							msg = '身份已过期，请重新登录'
							break
						default:
							msg = error.message ?? '未知响应错误'
							break
					}
				}
				toast.warning(msg)
				// 超出 2xx 范围的状态码都会触发该函数。
				// 对响应错误做点什么
				return Promise.reject(error)
			}
		)
	}
	/** 通用请求工具函数 */
	request<T>(config: IRequestConfig<T>): Promise<T> {
		return new Promise((resolve, reject) => {
			// 定制该请求是否加loading。当为传入该参数时，默认为true
			if (config.showLoading === false) {
				this.showLoading = false
			}
			// 创建单个请求的请求拦截器
			if (config.interceptors?.requestSuccessInterceptor) {
				// 直接调用，然后将处理后的config返回
				config = config.interceptors.requestSuccessInterceptor(config)
			}
			this.instance
				.request<any, T>(config)
				.then((res) => {
					// 调用传入的响应拦截器 [单个请求对返回数据的处理]
					if (config.interceptors?.responseSuccessInterceptor) {
						res = config.interceptors.responseSuccessInterceptor(res)
					}
					resolve(res)
				})
				.catch((err) => {
					reject(err)
				})
				.finally(() => {
					/* 避免影响下一次请求设置的 showLoading */
					this.showLoading = DEFAULT_LOADING
				})
		})
	}

	get<T>(config: IRequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: 'GET' })
	}

	post<T>(config: IRequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: 'POST' })
	}

	delete<T>(config: IRequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: 'DELETE' })
	}

	patch<T>(config: IRequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: 'PATCH' })
	}

	put<T>(config: IRequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: 'PUT' })
	}
}

export default Request
