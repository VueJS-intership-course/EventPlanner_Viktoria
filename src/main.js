import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router/index.js";
import { createPinia } from "pinia";
import fb from "@/firebase/fbConfig.js";
import { useUserStore } from "@/store/userStore.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap";
import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(HighchartsVue)

const store = useUserStore();

fb.auth.onAuthStateChanged(async (user) => {
  if (user) {
    await store.setUser(user);
  }
});

app.mount("#app");
