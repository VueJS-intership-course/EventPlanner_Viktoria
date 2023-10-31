import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/home-page/HomePage.vue";
import Profile from "@/pages/user-profile/Profile.vue";
import Login from "@/components/LoginForm.vue";
import Register from "@/components/RegisterForm.vue";
import EventList from "@/pages/events-page/EventList.vue";
import CreateEventPage from "@/pages/events-page/CreateEventPage.vue";
import EventDetailsPage from "@/pages/events-page/EventDetailsPage.vue";
import { useUserStore } from "@/store/userStore.js";
import { authStateChangedPromise } from "@/main.js";
import EventBudgetPage from "@/pages/budget-page/BudgetPage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/events",
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
      console.log(store.isAdmin);
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
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: '/events/:id/budget',
    name: 'event-budget',
    component: EventBudgetPage,
  }
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const store = useUserStore();
  await authStateChangedPromise();
  if (to.name !== "login" && to.name !== "register" && !store.isLogged) {
    next({ name: "login" });
  } else if (to.name === "login" && store.isLogged) {
    next({ name: "home" });
  } else {
    next();
  }
});


export default router;
