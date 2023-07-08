import { createRouter, createWebHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: () => import('~@/pages/index.vue'),
		redirect: { name: 'Home' },
		children: [
			{
				path: 'home',
				name: 'Home',
				component: () => import('~@/pages/home.vue'),
			},
			{
				path: 'about',
				name: 'About',
				component: () => import('~@/pages/about.md'),
			},
			{
				path: 'echarts',
				name: 'Echarts',
				component: () => import('~@/pages/echarts.vue'),
			},
		],
	},
	{
		path: '/404',
		component: () => import('~@/pages/404.vue'),
	},
	{
		path: '/:pathMatch(.*)',
		redirect: '/404',
	},
]

export const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: routes,
})

export default router
