import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router/index.js";
import { createPinia } from "pinia";
import fb from "@/firebase/fbConfig.js";
import { useUserStore } from "@/store/userStore.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);

const store = useUserStore();

fb.auth.onAuthStateChanged((user) => {
    if (user) {
      store.setUser(user);
    } 
  });

app.mount("#app");
