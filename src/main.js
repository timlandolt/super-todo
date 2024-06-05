import './assets/scss/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import { useFavicon } from '@vueuse/core'

const app = createApp(App)

const icon = useFavicon();
icon.value = 'super-todo-logo.svg';

app.mount('#app')
