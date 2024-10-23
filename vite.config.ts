import { fileURLToPath, URL } from 'node:url'

import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

const isGithubPages = process.env.VITE_DEPLOY === 'github'
const isAmplify = process.env.VITE_DEPLOY === 'amplify'

// https://vitejs.dev/config/
export default defineConfig ({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base:isGithubPages?`/personalWebsite/`:`/`,
})

