import { defineStore } from 'pinia'
import type { IUserInfo } from '~@/api/auth'

type User = {
	user: null | IUserInfo
}

export default defineStore('user', {
	state: (): User => ({
		user: {} as null | IUserInfo,
	}),
	actions: {
		async getUser() {
			const res = await userInfo()
			this.user = res
		},
	},
	persist: true,
})
