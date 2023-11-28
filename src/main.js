import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router/index.js";
import { createPinia } from "pinia";
import fb from "@/firebase/fbConfig.js";
import { useUserStore } from "@/store/userStore.js";
import "@/styles-config.js";
import Highcharts from "highcharts";
import HighchartsVue from "highcharts-vue";
import HighchartsMap from "highcharts/modules/map";

HighchartsMap(Highcharts);

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(HighchartsVue, { Highcharts });

const store = useUserStore();

await new Promise((resolve, reject) => {
  fb.auth.onAuthStateChanged(async (user) => {
    if (user) {
      try {
        const userData = await store.getUser(user.email);
        store.setUser(userData);
        resolve(userData);
      } catch (error) {
        reject(error);
      }
    } else {
      store.setUser(null);
      resolve(null);
    }
  });
});

app.use(router);

app.mount("#app");
