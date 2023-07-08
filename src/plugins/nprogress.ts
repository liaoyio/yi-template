import { router } from './router'
import { useNProgress } from '@vueuse/integrations/useNProgress'

// https://vueuse.org/integrations/useNProgress/
const { start, done } = useNProgress()

router.beforeEach(() => start())

router.afterEach(() => done(true))

/* router.beforeEach((to, from) => {
	const cookie = Cookies.get(CacheEnum.COOKIE)
	const isLogin = cookie ? true : false
	console.log('全局导航守卫------>isLogin', isLogin)
	if (import.meta.env.VITE_NODE_ENV !== 'development') {
		const cookie = Cookies.get(CacheEnum.COOKIE)
		if (to.meta.auth && !cookie) {
			window.location.replace(
				import.meta.env.VITE_API_URL + '/engula/auth0/login'
			)
		}
	}
}) */
