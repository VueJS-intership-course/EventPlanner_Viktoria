import HomePage from "@/pages/home-page/HomePage.vue";
import Profile from "@/pages/user-profile/Profile.vue";
import Login from "@/components/LoginForm.vue";
import Register from "@/components/RegisterForm.vue";
import EventList from "@/pages/events-page/EventList.vue";
import CreateEventPage from "@/pages/events-page/CreateEventPage.vue";
import EventDetailsPage from "@/pages/events-page/EventDetailsPage.vue";
import EventBudgetPage from "@/pages/budget-page/BudgetPage.vue";

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
      path: "/event/:id",
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
      path: "/events/:id/budget",
      name: "event-budget",
      component: EventBudgetPage,
    },
  ];