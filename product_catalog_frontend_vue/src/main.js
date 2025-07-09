import "./assets/main.css";
import router from "./router/index.js";
import { createPinia } from "pinia";

import { createApp, markRaw } from "vue";

import App from "./App.vue";
const pinia = createPinia()

const app = createApp(App)

pinia.use(({store}) => {
  store.router = markRaw(router)
})

app.use(router)
app.use(pinia)

app.mount("#app")
