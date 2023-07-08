import Toyi from './presets'
import { defineConfig } from 'vite'

// @see: https://vitejs.dev/config/
export default defineConfig(() => {
	// Continue to add your configuration ...
	return {
		plugins: [Toyi()],
	}
})
