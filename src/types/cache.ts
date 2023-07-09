import { Cachestatus } from '#/enum'

type StrTest = (typeof Cachestatus)[keyof typeof Cachestatus]

export interface ICacheItem {
	id: number
	name: string
	des: string
	orgId: number
	status: 0 | 1 | 20 | 200 | '-1' | '-10'
	cloudProvider: string
	region: string
	createdDate: number
	updatedDate: number
}

export interface FeeItem {
	cacheServiceId: number
	fee: number
	readBytes: number
	writeBytes: number
	monthStr: string
}

export type FeeRes = Array<FeeItem>

export type ICacheOneRes = { one: ICacheItem; host: string }

export interface FeeOrg extends FeeItem {
	cacheServiceName: string
	isPaid: boolean
}

// export type ICacheList = { list: ICacheListItem[] };

export interface FeeListOrg {
	detailList: DetailList[]
	summaryList: SummaryList[]
}

export interface SummaryList {
	monthStr: string
	fee: number
}

export interface DetailList {
	cacheServiceId: number
	cacheServiceName: string
	monthStr: string
	monthStr_en?: string
	avgMb: number
	fee: number
}

export type FeeByDayParams =
	| { cacheServiceId?: number; monthStr?: string }
	| undefined

export interface FeeByDayRes {
	cacheServiceId: number
	monthStr: string
	cacheServiceName: string
	dayStr: string
	fee: number
}

export interface ICacheRes {
	list: ICacheItem[]
}

export interface AddCacheParams {
	cloudProvider: string // 云提供商
	des?: string // 描述
	name: string // 自定义名
	region: string // 区域
	primaryZone: string
}

export interface CacheByIdParams {
	id: string
	opt?: 'stop' | 'terminate'
}

export interface AddCacheRes {
	/** 明文，可以直接显示*/
	accessToken: string
	/** added id*/
	id: number
}
export interface CloudProviderItem {
	cloudProvider: string
	regions: string[]
}
export interface RegionListRes {
	list: CloudProviderItem[]
	zonesByRegion: {
		[name: string]: string[]
	}
}

type Mode = 'ro' | 'rw'

export interface updateTokenParams {
	id: string | number
	mode: Mode
}

/* 查看密钥-默认隐藏 */
export interface ITokenListRes {
	list: ItokenItem[]
}

export interface ItokenItem {
	id: number
	cacheServiceId: number
	accessToken: string
	mode: Mode
	createdDate: number
	updatedDate: number
	show?: boolean
}

export interface addTokenParams {
	cacheServiceId: number | string
	mode: Mode
}

type Tcommand = 'set' | 'get' | 'del' | 'keys' | 'exists' | 'expire' | 'ttl'

// get a / set a 100
const Fcommand = (instruct: Tcommand, params: any): string =>
	`${instruct} ${params}`

export interface CommandParams {
	cacheServiceId: number | string
	command: string
}

// fixed: eg. 15s or 1m or 5m
type Tstep = '15s' | '1m' | '5m'

export interface ChartParams {
	cacheServiceId?: number | string
	start: number
	end?: number
	step?: Tstep | string
}

type TwoArr = Array<Array<string | number>>
// (number | string)[][]
export interface Metrics {
	/** 内存使用byte */
	memory_used_bytes: any[] | TwoArr
	/** keys数量  */
	db_keys: any[] | TwoArr
	/** 客户端命令数量 */
	client_commands_total: any[] | TwoArr
	/** 缓存命中率 */
	hit_rate: any[] | TwoArr
}

export interface Cards {
	fee: number
	readBytes: number
	storageBytes: number
	writeBytes: number
}

export interface ChartRes extends Metrics, Cards {
	[index: string]: any
}
