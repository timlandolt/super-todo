import "./assets/scss/main.scss";

import {createApp} from "vue";
import App from "./App.vue";
import {useFavicon} from "@vueuse/core";
import {createPinia} from "pinia";

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);

// Mount
app.mount("#app");
