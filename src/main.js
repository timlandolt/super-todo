import './assets/scss/main.scss'

import {createApp} from 'vue'
import App from './App.vue'
import {useFavicon} from '@vueuse/core'
import {createPinia} from "pinia";

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);


const icon = useFavicon();
icon.value = 'super-todo-logo.svg';

app.mount('#app');
