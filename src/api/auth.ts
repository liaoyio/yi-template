import { useRequest } from 'vue-request'
import { http } from '~@/composables/http'

export interface IUserInfo {
	isVerified: boolean // 注册时email验证
	canCreateCacheService: boolean // 是否可以创建缓存服务
	feeType: number // 0/1/2 free/pro/enterprise
	id: number
	email?: string
	lastLoginTime: number
	nickname: string
	picture: string
	roles: string[]
}

export interface IUsers {
	cacheServiceNumber: number
	userNumber: number
}

/**
 * Get Login user
 */
export const userInfo = () => {
	return http.get<IUserInfo>({
		url: '/auth0/user',
		showLoading: false,
	})
}

export const getUserInfo = () => {
	const { data, loading, refresh, error } = useRequest(() =>
		http.get<IUserInfo>({
			url: '/auth0/user',
		})
	)
	return {
		user: data,
		user_loading: loading,
		user_error: error,
		usser_refresh: refresh,
	}
}

/**
 * Get Users and Cache Service Number
 */
export const getUsers = () => {
	return http.get<IUsers>({
		url: '/home/user_cache_service/number',
		showLoading: false,
	})
}
