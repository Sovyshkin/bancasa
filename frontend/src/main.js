import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import { createPinia } from "pinia";
import router from "./router/router";


axios.defaults.baseURL = process.env.VUE_APP_STRAPI_URL || "/api";

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount("#app");
