import { createRouter, createWebHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'
import Console from '~@/pages/index.vue'

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'Console',
		component: Console,
	},
	{
		path: '/cache/:id',
		name: 'Cache',
		component: () => import('~@/pages/cache/index.vue'),
		redirect: { name: 'Details' },
		children: [
			{
				path: 'details',
				name: 'Details',
				component: () => import('~@/pages/cache/details.vue'),
			},
			{
				path: 'connect',
				name: 'Connect',
				component: () => import('~@/pages/cache/connect.vue'),
			},
			{
				path: 'metrics',
				name: 'Metrics',
				component: () => import('~@/pages/cache/metrics.vue'),
			},
			{
				path: 'cli',
				name: 'Cli',
				component: () => import('~@/pages/cache/cli.vue'),
			},
			{
				path: 'token',
				name: 'Token',
				component: () => import('~@/pages/cache/token.vue'),
			},
		],
	},
	{
		path: '/account',
		name: 'Account',
		component: () => import('~@/pages/account/index.vue'),
		redirect: { name: 'Billing' },
		children: [
			{
				path: 'teams',
				name: 'Teams',
				component: () => import('~@/pages/account/teams.vue'),
			},
			{
				path: 'billing',
				name: 'Billing',
				component: () => import('~@/pages/account/billing.vue'),
			},
			{
				path: 'cost-explorer',
				name: 'CostExplorer',
				component: () => import('~@/pages/account/cost-explorer.vue'),
			},
			{
				path: 'settings',
				name: 'Settings',
				component: () => import('~@/pages/account/settings.vue'),
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
