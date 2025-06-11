import './assets/fonts/fonts.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import AOS from 'aos'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// 初始化 AOS
AOS.init({
  duration: 2000,
  once: true,
})
