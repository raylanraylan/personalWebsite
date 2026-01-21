import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/

export default defineConfig (({ command, mode }) =>{
  if (mode==='github'){
    return{  
      plugins: [
        vue(),tailwindcss(),
      ],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url))
        }
      },
      base:'/personalWebsite/',
    }
  } 

  if(mode==='aws'){
    return{  
      plugins: [
        vue(),
      ],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url))
        }
      },
    }
  }
  return{  
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
  }
})