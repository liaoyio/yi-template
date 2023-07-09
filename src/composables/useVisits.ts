import { useRequest } from 'vue-request'

export function useVisits() {
	// 开发环境下
	if (import.meta.env.DEV) {
		const visits = useStorage('visits-kv', 0)
		if (typeof visits.value === 'number') {
			visits.value++
		}
		return visits
	}

	const { data: visits } = useRequest(async function () {
		try {
			return Number(12) ?? 0
		} catch (error) {
			console.error(error)
			return 0
		}
	})
	return visits ?? 0
}
