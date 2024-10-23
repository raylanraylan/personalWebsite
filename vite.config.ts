import { fileURLToPath, URL } from 'node:url'

import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
process.env.VITE_BASE = process.env.VITE_BASE
// https://vitejs.dev/config/
export default defineConfig (({ command, mode }) =>{
  return{  
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    base:process.env.VITE_BASE,
  }
})