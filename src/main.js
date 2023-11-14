import { createApp, markRaw } from "vue";
import App from "@/App.vue";
import router from "@/router/index.js";
import { createPinia } from "pinia";
import fb from "@/firebase/fbConfig.js";
import { useUserStore } from "@/store/userStore.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap";
import Highcharts from "highcharts";
import HighchartsVue from "highcharts-vue";
import HighchartsMap from "highcharts/modules/map";
import HighchartsMore from "highcharts/highcharts-more";

HighchartsMap(Highcharts);
HighchartsMore(Highcharts);

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(HighchartsVue, { Highcharts });

const store = useUserStore();

function authStateChangedPromise() {
  return new Promise((resolve, reject) => {
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
}

await authStateChangedPromise();

app.use(router);

app.mount("#app");
