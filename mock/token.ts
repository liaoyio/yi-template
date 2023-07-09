import { MockMethod } from 'vite-plugin-mock'
export default [
	{
		url: '/engula/cache_service/access_token/list',
		method: 'get',
		response: () => {
			return {
				list: [
					{
						id: 20,
						cacheServiceId: 14,
						accessToken: '63246934340262050070490945954639',
						mode: 'ro',
						createdDate: 1678696767000,
						updatedDate: 1678696767000,
					},
					{
						id: 21,
						cacheServiceId: 19,
						accessToken: '53129606367344825403981911731704',
						mode: 'rw',
						createdDate: 1678696771000,
						updatedDate: 1678696771000,
					},
					{
						id: 22,
						cacheServiceId: 14,
						accessToken: '79696561575625006070158980018399',
						mode: 'ro',
						createdDate: 1678696773000,
						updatedDate: 1678696773000,
					},
					{
						id: 23,
						cacheServiceId: 14,
						accessToken: '99696561575625006070158980018439',
						mode: 'ro',
						createdDate: 1678696773000,
						updatedDate: 1678696773000,
					},
					{
						id: 24,
						cacheServiceId: 18,
						accessToken: '293434656157562500607015898004939',
						mode: 'rw',
						createdDate: 1678696773000,
						updatedDate: 1678696773000,
					},
				],
			}
		},
	},
	{
		url: '/engula/cache_service/access_token/add',
		method: 'put',
		response: () => {
			return {
				id: 23,
				accessToken: '645663604385503274043057222204230',
			}
		},
	},
	{
		url: '/engula/cache_service/access_token/delete',
		method: 'delete',
		response: () => {
			return {
				ok: true,
			}
		},
	},
	{
		url: '/engula/cache_service/access_token/mode/update',
		method: 'post',
		response: () => {
			return {
				ok: true,
			}
		},
	},
	{
		url: '/engula/fee/stripe/pk',
		method: 'get',
		response: () => {
			return {
				pk: 'pk_test_51McKuKHLx89RNo7rjmtJAY6EJBzQtPYDtHx9mTOzDelZuMX3QLHJC0QKw1JzsUGAABkAZJlgGl9Rs0YUmnS07Fmc009HFDgNL6',
			}
		},
	},
	{
		url: '/engula/fee/create-payment-intent',
		method: 'post',
		response: () => {
			return {
				clientSecret:
					'pk_test_51McKuKHLx89RNo7rjmtJAY6EJBzQtPYDtHx9mTOzDelZuMX3QLHJC0QKw1JzsUGAABkAZJlgGl9Rs0YUmnS07Fmc009HFDgNL6',
			}
		},
	},
	{
		url: '/engula/home/user_cache_service/number',
		method: 'get',
		response: () => {
			return {
				userNumber: 153,
				cacheServiceNumber: 273,
			}
		},
	},
] as MockMethod[]
