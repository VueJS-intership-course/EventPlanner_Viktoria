import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/home-page/HomePage.vue";
import EventsPage from "@/pages/events-page/EventsPage.vue";
import Profile from "@/pages/user-profile/Profile.vue";
import Login from "@/components/LoginForm.vue";
import Register from "@/components/RegisterForm.vue";

export const routes = [
  {
    path: "/",
    name: "entry",
    component: HomePage,
  },
  {
    path: "/events",
    name: "events",
    component: EventsPage,
  },
  {
    path: "/login",
    name: "login",
    component: Login,

  },
  {
    path: "/register",
    name: "register",
    component: Register,

  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
});

export default router;