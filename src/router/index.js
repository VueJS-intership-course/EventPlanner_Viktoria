import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/home-page/HomePage.vue";
import EventsPage from "@/pages/events-page/EventsPage.vue";
import Profile from "@/pages/user-profile/Profile.vue";
import Login from "@/components/LoginForm.vue";
import Register from "@/components/RegisterForm.vue";
import EventList from "@/pages/events-page/EventList.vue";
import CreateEventPage from "@/pages/events-page/CreateEventPage.vue";
import EventDetailsPage from "@/pages/events-page/EventDetailsPage.vue";
import { useUserStore } from "@/store/userStore.js";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/events",
    name: "events",
    component: EventsPage,
  },
  {
    path: "/eventlist",
    name: "eventList",
    component: EventList,
  },
  {
    path: "/event/:id",
    name: "event-details",
    component: EventDetailsPage,
  },
  {
    path: "/create-event",
    name: "create-event",
    component: CreateEventPage,
    beforeEnter: () => {
      const store = useUserStore();
      if (!store.isAdmin) {
        router.push({ name: "home" });
      }
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    beforeEnter: () => {
      const store = useUserStore();
      if (store.user) {
        router.push({ name: "profile" });
      }
    },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    beforeEnter: () => {
      const store = useUserStore();
      if (store.user) {
        router.push({ name: "profile" });
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
