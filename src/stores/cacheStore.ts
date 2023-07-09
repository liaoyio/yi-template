import { defineStore } from 'pinia'

import {
	cacheOne,
	getTokenList,
	deleteToken,
	getCloudProviderList,
} from '~@/api/cache'

import {
	ICacheOneRes,
	CloudProviderItem,
	ItokenItem,
	CacheByIdParams,
} from '#/cache'

interface ZonesByRegion {
	[name: string]: string[]
}

interface IcacheStore {
	regionList: CloudProviderItem[] | null
	zoneList: ZonesByRegion
	oneCache: ICacheOneRes | null
	tokenList: ItokenItem[] | null
	port: string | null
}

export default defineStore('cacheStore', {
	state: (): IcacheStore => ({
		regionList: [],
		oneCache: null,
		tokenList: [],
		zoneList: {},
		port: '8125',
	}),
	actions: {
		async getCloudProvider() {
			const res = await getCloudProviderList()
			this.regionList = res.list
			this.zoneList = res.zonesByRegion
			console.log(res.zonesByRegion)
		},
		filterRegions(cloudProvider: string) {
			let _regions: any = {}
			this.regionList &&
				this.regionList.map(
					(i) => i.regions && (_regions[cloudProvider] = i.regions)
				)
			return _regions
		},
		async setOneCache(params: CacheByIdParams) {
			const res = await cacheOne(params)
			this.oneCache = res
			return res
		},
		updateOneCache(data: ICacheOneRes) {
			this.oneCache = data
		},
		async setTokenList(id: number) {
			const res = await getTokenList(id)
			const list: ItokenItem[] = res.list.map((v) => ({ ...v, show: false }))
			this.tokenList = list
		},
		deleteTokenList(id: number) {
			if (this.tokenList) {
				this.tokenList = this.tokenList.filter((item) => item.id !== id)
			}
		},
		getTokenByid(id: number) {
			if (this.tokenList) {
				const item = this.tokenList.find((_v) => _v.id === id)?.accessToken
				const spare = this.tokenList[0]?.accessToken
				return item ? item : spare
			}
		},
	},
})
