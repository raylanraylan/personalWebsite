import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      emitFile: true,
      filename: "stats.html",
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base:'/personalWebsite/',
  build:{
    rollupOptions:{
      output:{
        chunkFileNames:'assets/js/[name]-[hash],js',
        entryFileNames:'assets/js/[name]-[hash],js',
        assetFileNames:'assets/[ext]/[name]-[hash].[ext]',
        manualChunks(id){
          if(id.includes('node_modules')){
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    },
    // minify:'terser',
    // terserOptions:{
    //   compress:{
    //     drop_console:true,
    //     drop_debugger:true
    //   }
    // }
  }
})
