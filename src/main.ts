import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from '@/i18n/i18n'

const app = createApp(App)
window.addEventListener("error", (e) => {
  console.error(e.message);
});
app.use(router)
  .use(i18n)
  .mount('#app')
