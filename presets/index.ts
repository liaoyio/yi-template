import { isPackageExists } from 'local-pkg'
import Prism from 'markdown-it-prism'
import { dirname, resolve } from 'path'
import { argv } from 'process'
import UnoCss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'

import {
	AntDesignVueResolver,
	ArcoResolver,
	DevUiResolver,
	ElementPlusResolver,
	HeadlessUiResolver,
	IduxResolver,
	InklineResolver,
	LayuiVueResolver,
	NaiveUiResolver,
	PrimeVueResolver,
	QuasarResolver,
	TDesignResolver,
	VantResolver,
	VarletUIResolver,
	ViewUiResolver,
	Vuetify3Resolver,
	VueUseComponentsResolver,
} from 'unplugin-vue-components/resolvers'

import Components from 'unplugin-vue-components/vite'

import { fileURLToPath } from 'url'
import { loadEnv } from 'vite'
import { AutoGenerateImports, vue3Presets } from 'vite-auto-import-resolvers'
import Compression from 'vite-plugin-compression'
import EnvTypes from 'vite-plugin-env-types'
import { viteMockServe as Mock } from 'vite-plugin-mock'
import Removelog from 'vite-plugin-removelog'
import Modules from 'vite-plugin-use-modules'
import VueDevTools from 'vite-plugin-vue-devtools'
import Markdown from 'vite-plugin-vue-markdown'
import { warmup as Warmup } from 'vite-plugin-warmup'

import I18N from '@intlify/unplugin-vue-i18n/vite'
import Legacy from '@vitejs/plugin-legacy'
import Vue from '@vitejs/plugin-vue'
import Jsx from '@vitejs/plugin-vue-jsx'

// <icon-xxx /> any svg-resolver
import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconResolver from 'unplugin-icons/resolver'

import type { Plugin } from 'vite'
import type { ComponentResolver } from 'unplugin-vue-components/types'

export default function () {
	const env = useEnv()
	const safelist =
		'prose px-2 sm:px-0 md:prose-lg lg:prose-lg dark:prose-invert text-left w-screen prose-slate prose-img:rounded-xl prose-headings:underline prose-a:text-blue-600'
	const plugins = [
		Legacy({
			targets: ['defaults', 'not IE 11'],
		}),
		EnvTypes({
			dts: 'presets/types/env.d.ts',
		}),
		// https://github.com/bluwy/vite-plugin-warmup (依赖预热，加快渲染，未来可能会内置到 vite 中)
		Warmup({
			clientFiles: ['./src/**/*'],
		}),
		// 模块自动加载
		Modules({
			auto: true,
			target: 'src/plugins',
		}),
		// vue 官方插件，用来解析 sfc
		Vue({
			include: [/\.vue$/, /\.md$/],
		}),
		// 调试工具
		env.VITE_APP_DEV_TOOLS && VueDevTools(),
		// mock 服务
		Mock({
			prodEnabled: env.VITE_APP_MOCK_IN_PRODUCTION,
		}),
		// 组件自动按需引入
		Components({
			directoryAsNamespace: true,
			// imports 指定组件所在目录，默认为 src/components
			// dirs: ['src/components/', 'src/pages/'],
			include: [/\.vue$/, /\.vue\?vue/, /\.[tj]sx$/, /\.md$/],
			// 排除 以 _ 开头并以 .tsx 结尾的文件
			exclude: [/^_[^/]+\.[tj]sx$/],
			extensions: ['md', 'vue', 'tsx', 'jsx'],
			dts: resolve(__dirname, './types/components.d.ts'),
			types: [
				{
					from: 'vue-router',
					names: ['RouterLink', 'RouterView'],
				},
			],
			resolvers: [
				...normalizeResolvers({
					onlyExist: [
						[
							AntDesignVueResolver({
								importStyle: false, // css in js
							}),
							'ant-design-vue',
						],
						[VueUseComponentsResolver(), '@vueuse/components'],
						[ElementPlusResolver(), 'element-plus'],
						[TDesignResolver({ library: 'vue-next' }), 'tdesign-vue-next'],
						// ---->
						[VantResolver(), 'vant'],
						[ArcoResolver(), '@arco-design/web-vue'],
						[InklineResolver(), '@inkline/inkline'],
						[QuasarResolver(), 'quasar'],
						[DevUiResolver(), 'vue-devui'],
						[NaiveUiResolver(), 'naive-ui'],
						[Vuetify3Resolver(), 'vuetify'],
						[PrimeVueResolver(), 'primevue'],
						[ViewUiResolver(), 'view-design'],
						[LayuiVueResolver(), 'layui-vue'],
						[VarletUIResolver(), '@varlet/ui'],
						[IduxResolver(), '@idux/components'],
						[InklineResolver(), '@inkline/inkline'],
						[HeadlessUiResolver(), '@headlessui/vue'],
					],
				}),
				IconResolver({ prefix: 'icon', customCollections: ['svg'] }),
			],
		}),
		// 使用 icones 中下载的图标：  <icon-ep:arrow-down-bold />
		Icons({
			compiler: 'vue3',
			customCollections: {
				svg: FileSystemIconLoader('./src/assets/svg', (svg) =>
					svg.replace(/^<svg /, '<svg fill="currentColor" ')
				),
			},
			autoInstall: true,
		}),
		// i18n 国际化支持
		I18N({
			runtimeOnly: false,
			compositionOnly: true,
			include: ['locales/**'],
		}),
		// jsx 和 tsx 支持
		Jsx(),
		// 生产环境资源压缩
		Compression({
			// @ts-ignore
			algorithm: env.VITE_APP_COMPRESSINON_ALGORITHM,
		}),
		// 生产环境下移除 console.log, console.warn, console.error
		process.env.NODE_ENV !== 'debug' && Removelog(),
		// 别名插件
		Alias(),
	]

	if (env.VITE_APP_API_AUTO_IMPORT) {
		const dirs = env.VITE_APP_DIR_API_AUTO_IMPORT
			? ['src/stores/**', 'src/composables/**', 'src/api/**']
			: undefined
		// api 自动按需引入
		plugins.push(
			AutoImport({
				dirs,
				dts: './presets/types/auto-imports.d.ts',
				imports: [
					...AutoGenerateImports({
						include: [...vue3Presets],
					}),
				],
				resolvers: normalizeResolvers({
					onlyExist: [
						[ElementPlusResolver(), 'element-plus'],
						[TDesignResolver({ library: 'vue-next' }), 'tdesign-vue-next'],
					],
				}),
				eslintrc: {
					enabled: true,
					globalsPropValue: true,
					filepath: 'presets/eslint/.eslintrc-auto-import.json',
				},
			})
		)
	}

	if (env.VITE_APP_MARKDOWN) {
		plugins.push(
			Markdown({
				wrapperClasses: safelist,
				markdownItSetup(md) {
					md.use(Prism)
				},
			})
		)
	}
	plugins.push(
		// @ts-ignore
		UnoCss({
			safelist: env.VITE_APP_MARKDOWN ? safelist.split(' ') : undefined,
		})
	)

	return plugins
}

// 获取环境变量
function useEnv() {
	function detectMode() {
		const { NODE_ENV } = process.env
		const hasModeIndex = argv.findIndex((a) => a === '--mode' || a === '-m')
		if (hasModeIndex !== -1) {
			return argv[hasModeIndex + 1]
		}
		return NODE_ENV || 'development'
	}

	const stringToBoolean = (v: string) => {
		return Boolean(v === 'true' || false)
	}

	const {
		VITE_APP_TITLE,
		VITE_APP_DEV_TOOLS,
		VITE_APP_MARKDOWN,
		VITE_APP_API_AUTO_IMPORT,
		VITE_APP_MOCK_IN_PRODUCTION,
		VITE_APP_DIR_API_AUTO_IMPORT,
		VITE_APP_COMPRESSINON_ALGORITHM,
	} = loadEnv(detectMode(), '.')

	return {
		VITE_APP_TITLE,
		VITE_APP_COMPRESSINON_ALGORITHM,
		VITE_APP_DEV_TOOLS: stringToBoolean(VITE_APP_DEV_TOOLS),
		VITE_APP_MARKDOWN: stringToBoolean(VITE_APP_MARKDOWN),
		VITE_APP_API_AUTO_IMPORT: stringToBoolean(VITE_APP_API_AUTO_IMPORT),
		VITE_APP_MOCK_IN_PRODUCTION: stringToBoolean(VITE_APP_MOCK_IN_PRODUCTION),
		VITE_APP_DIR_API_AUTO_IMPORT: stringToBoolean(VITE_APP_DIR_API_AUTO_IMPORT),
	}
}

type Arrayable<T> = T | Array<T>

interface Options {
	onlyExist?: [Arrayable<ComponentResolver>, string][]
	include?: ComponentResolver[]
}
export const normalizeResolvers = (options: Options = {}) => {
	const { onlyExist = [], include = [] } = options

	const existedResolvers = []
	for (let i = 0; i < onlyExist.length; i++) {
		const [resolver, packageName] = onlyExist[i]
		if (isPackageExists(packageName)) {
			existedResolvers.push(resolver)
		}
	}

	existedResolvers.push(...include)

	return existedResolvers
}

export const _dirname =
	typeof __dirname !== 'undefined'
		? __dirname
		: dirname(fileURLToPath(import.meta.url))

// 别名插件
function Alias(): Plugin {
	const src = resolve(_dirname, '../src')
	const tsx_components = resolve(_dirname, '../src/components/_tsx')
	const api = resolve(_dirname, '../src/api')
	const types = resolve(_dirname, '../src/types')
	return {
		name: 'vite-alias',
		enforce: 'pre',
		config(config) {
			config.resolve ??= {}
			config.resolve.alias = [
				{ find: /^~@/, replacement: src },
				{ find: /^tsx/, replacement: tsx_components },
				{ find: /^api/, replacement: api },
				{ find: /^#/, replacement: types },
			]
		},
	}
}
