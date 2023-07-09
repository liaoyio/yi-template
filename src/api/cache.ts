import { http } from '~@/composables/http'
import { useRequest } from 'vue-request'

import {
	ICacheRes,
	AddCacheParams,
	AddCacheRes,
	CacheByIdParams,
	RegionListRes,
	ITokenListRes,
	addTokenParams,
	updateTokenParams,
	ICacheOneRes,
} from '#/cache'

/**
 * Get list cache service
 */
export const getCacheList = (showLoading: boolean) => {
	const { data, loading, refresh, error } = useRequest(() =>
		http.get<ICacheRes>({
			url: '/cache_service/list',
			showLoading,
		})
	)
	return {
		cache_res: data,
		cache_loading: loading,
		cache_error: error,
		cache_refresh: refresh,
	}
}

export const timerCacheList = () => {
	return http.get<ICacheRes>({
		url: '/cache_service/list',
	})
}

/**
 * Add cache service
 */
export const addCache = (data: AddCacheParams) => {
	return http.put<AddCacheRes>({
		url: '/cache_service/add',
		data,
	})
}

/**
 * Get one cache service
 * @param id cache service id
 * @param opt 'stop' or 'terminate'  Cache Service
 */
export const cacheOne = (params: CacheByIdParams) => {
	return http.get<ICacheOneRes>({
		url: '/cache_service/one',
		params,
	})
}
/**
 * Get one cache service
 * @param id cache service id
 * @param name  Cache new Name
 */
type TRename = { id: string | number; name: string }
export const cacheRename = (data: TRename) => {
	return http.post<TRename>({
		url: '/cache_service/rename',
		data,
	})
}

/**
 *  获取云厂商和区域列表
 */
export const getCloudProviderList = () => {
	return http.get<RegionListRes>({
		url: '/region/list',
	})
}

/**
 *  列表访问令牌
 */
export const getTokenList = (cacheServiceId?: number) => {
	return http.get<ITokenListRes>({
		url: '/cache_service/access_token/list',
		params: { cacheServiceId },
	})
}

// redis://default:70c51cb8867142a8a45b2da7516c9dd1@us1-hip-bonefish-40037.upstash.io:40037

type addTokenRes = { accessToken: string; id: string }

/**
 *  添加访问令牌
 */
export const addToken = (data: addTokenParams) => {
	return http.put<addTokenRes>({
		url: '/cache_service/access_token/add',
		data,
	})
}

/**
 * 删除访问令牌
 */
export const deleteToken = (id: number) => {
	return http.delete<any>({
		url: `/cache_service/access_token/delete`,
		params: { id },
	})
}

/**
 * 更新访问令牌
 */
export const updateToken = (params: updateTokenParams) => {
	return http.post<any>({
		url: `/cache_service/access_token/mode/update`,
		params,
	})
}
