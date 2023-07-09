export const CachestatusTo = {
	'0': 'created', // 创建中
	'1': 'running', // 运行中
	'20': 'limited', // 限制
	'200': 'reject', // 废弃
	'-1': 'stopped', // 停用
	'-10': 'terminated', // 停止
} as const

export const statusStyle = {
	'0': '#67c23a',
	'1': '#67c23a',
	'20': '#f16538',
	'200': '#6b7280',
	'-1': '#f16538',
	'-10': '#f16538',
} as const

export const Cachestatus = {
	created: '0',
	running: '1',
	limited: '20',
	reject: '200',
	stopped: '-1',
	terminated: '-10',
} as const

/* 不同用户可以创建的 Cache 数量 */
export const hasCross = {
	lv1: 5,
}

export enum CacheEnum {
	COOKIE = 'Auth-Token',
	JSAUTH = 'JSESSIONID',
	REDIRECT_ROUTE_NAME = 'redirect_router_name',
}
