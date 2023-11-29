import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/store/userStore.js";
import { routes } from "@/router/routes.js";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeResolve(async (to, from, next) => {
  const store = useUserStore();
  // rework authorization check based on meta prop of the accessed route
  if (
    (to.name === "login" && store.isLogged) ||
    (to.name === "register" && store.isLogged) ||
    (to.name === "create-event" && !store.isAdmin) ||
    (to.name === "event-budget" && !store.isAdmin)||
    (to.name === "registerAdmin" && !store.isAdmin) ||
    (to.name === "overview" && !store.isAdmin) 
  ) {
    next({ name: "home" });
    return;
  } 
  
  next();
});

export default router;
