import HomePage from "@/pages/home-page/HomePage.vue";
import Profile from "@/pages/user-profile/Profile.vue";
import Login from "@/pages/login-register/LoginPage.vue";
import Register from "@/pages/login-register/RegisterPage.vue";
import EventList from "@/pages/events-page/EventList.vue";
import CreateEventPage from "@/pages/events-page/CreateEventPage.vue";
import EventDetailsPage from "@/pages/events-page/EventDetailsPage.vue";
import EventBudgetPage from "@/pages/budget-page/BudgetPage.vue";
import OverviewPage from "@/pages/overview-page/OverviewPage.vue";
import NotFound from "@/pages/404notFound.vue";

export const routes = [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/events",
      name: "event-list",
      component: EventList,
    },
    {
      path: "/events/:id",
      name: "event-details",
      component: EventDetailsPage,
    },
    {
      path: "/create-event",
      name: "create-event",
      component: CreateEventPage,
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
      path: "/register-admin",
      name: "registerAdmin",
      component: Register,
    },
    {
      path: "/events/:id/budget",
      name: "event-budget",
      component: EventBudgetPage,
    },
    {
      path: "/overview",
      name: "overview",
      component: OverviewPage,
    },
    {
      path: "/:catchAll(.*)",
      component: NotFound,
    },
  ];