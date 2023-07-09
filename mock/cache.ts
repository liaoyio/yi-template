import { MockMethod } from 'vite-plugin-mock'
export default [
	{
		url: '/engula/auth0/user',
		method: 'get',
		response: () => {
			return {
				id: 211,
				nickname: 'a2417276459@gmail.com',
				picture:
					'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
				roles: ['engula_user'],
				feeType: 0,
				isVerified: true,
				canCreateCacheService: true,
				lastLoginTime: 1685097892000,
			}
		},
	},
	{
		url: '/engula/cache_service/list',
		method: 'get',
		response: () => {
			return {
				list: [
					{
						id: 12,
						orgId: 2,
						name: 'DBTEST-2001',
						des: 'desc',
						status: 0,
						cloudProvider: 'aws',
						region: 'ap-northeast-1',
						createdDate: 1678695874000,
						updatedDate: 1678695875000,
					},
					{
						id: 13,
						orgId: 2,
						name: 'DBTEST-2002',
						des: 'desc',
						status: 1,
						cloudProvider: 'aws',
						region: 'ap-northeast-1',
						createdDate: 1678695886000,
						updatedDate: 1678695886000,
					},
					{
						id: 14,
						orgId: 2,
						name: 'DBTEST-2003',
						des: 'desc',
						status: '-10',
						cloudProvider: 'aws',
						region: 'ap-northeast-1',
						createdDate: 1678695891000,
						updatedDate: 1678695891000,
					},
				],
			}
		},
	},
	{
		url: '/engula/region/list',
		method: 'get',
		response: () => {
			return {
				list: [
					{
						cloudProvider: 'aws',
						regions: ['ap-east-1', 'ap-southeast-1', 'us-east-1'],
					},
					{
						cloudProvider: 'Alibaba',
						regions: ['ap-east-1', 'ap-southeast-1', 'us-east-1'],
					},
					{
						cloudProvider: 'OPPO',
						regions: ['ap-east-1', 'ap-southeast-1', 'us-east-1'],
					},
				],
				zonesByRegion: {
					'ap-east-1': [
						'ap-northeast-1d',
						'ap-northeast-1c',
						'ap-northeast-1a',
					],
					'ap-southeast-1': ['cn-northwest-1a'],
					'us-east-1': [
						'ap-northeast-2a',
						'ap-northeast-2b',
						'ap-northeast-2c',
					],
				},
			}
		},
	},
	{
		url: '/engula/cache_service/add',
		method: 'put',
		response: () => {
			return {
				id: 13,
				accessToken: 'et ut fugiat ipsum Lorem',
			}
		},
	},
	{
		url: '/engula/cache_service/one',
		method: 'get',
		response: () => {
			return {
				one: {
					id: 21,
					orgId: 2,
					name: 'Cache Service Test',
					des: 'This is a Cache Service Test',
					status: 1,
					cloudProvider: 'aws',
					region: 'ap-northeast-1',
					createdDate: 1678695891000,
					updatedDate: 1678695891000,
				},
				host: 'mdawmdiwmda0oq.engula-aws-ap-northeast-1.montplex.com',
			}
		},
	},
	{
		url: '/engula/cache_service/rename',
		method: 'post',
		response: () => {
			return {
				id: 70,
				name: 'Cache Service Test-2023',
			}
		},
	},
	{
		url: '/engula/command/exe',
		method: 'get',
		response: () => {
			return {
				ok: 100,
			}
		},
	},
] as MockMethod[]
