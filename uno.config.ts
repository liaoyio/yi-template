import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetTypography,
	presetUno,
	presetWebFonts,
} from 'unocss'

import presetAutoprefixer from 'unocss-preset-autoprefixer'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'

export default defineConfig({
	shortcuts: [
		{ flex_c: 'flex items-center' },
		{ flex_cc: 'flex items-center justify-center' },
		{ flex_col_center: 'flex flex-col items-center justify-center' },
		[
			/^base-border-(.*)$/,
			(match) => `border-1 border-style-dashed border-${match[1]}`,
		],
		{
			'border-base': 'border-gray-500:10',
			'bg-base': 'bg-white dark:bg-hex-121212',
			'ly-btn':
				'px-4 py-1 inline-block bg-cyan6 hover:bg-cyan7 text-white cursor-pointer disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50',
			link: 'op50 hover:op100 hover:text-cyan6',
			divider: 'border-b border-base',
		},
	],
	theme: {
		colors: {
			'a-d': '#ff4d4f',
			'd-hv': '#ff7875',
			'o-g': '#f16538',
			'a-s': '#00b96b',
			'as-hv': '#20c77c',
		},
	},
	transformers: [transformerDirectives(), transformerVariantGroup()],
	presets: [
		presetAttributify(),
		presetIcons({
			autoInstall: true,
		}),
		presetUno(),
		presetWebFonts({
			// use --> class="font-sans" || --at-apply: font-sans;
			fonts: {
				sans: 'Inter:100,200,500,400,700,800',
			},
		}),
		presetTypography(),
		presetAutoprefixer(['defaults', 'not IE 11']),
	],
	rules: [],
})
