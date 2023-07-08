import { router } from './router'

useTitle(
	() => {
		const { path } = router.currentRoute.value
		if (path === '/') {
			return '| Home'
		}
		return path.replaceAll('/', ' · ')
	},
	{
		titleTemplate: `${import.meta.env.VITE_APP_TITLE} %s`,
	}
)
