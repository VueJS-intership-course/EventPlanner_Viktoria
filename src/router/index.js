import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/store/userStore.js";
import { routes } from "@/router/routes.js";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeResolve((to, from, next) => {
  const store = useUserStore();
  const isAuthenticated = store.isLogged;
  const isAdmin = store.isAdmin;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "login" });
  } else if (
    (to.meta.requiresAdmin && !isAdmin) ||
    (to.name === "login" && isAuthenticated) ||
    (to.name === "register" && isAuthenticated)
  ) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
