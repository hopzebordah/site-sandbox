import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    base: '/apps/admin',
    build: {
        outDir: '../server/src/public/apps/admin',
    },
})
