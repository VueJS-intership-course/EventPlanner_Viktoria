export const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/pages/home-page/HomePage.vue"),
  },
  {
    path: "/events",
    name: "event-list",
    component: () => import("@/pages/events-page/EventList.vue"),
  },
  {
    path: "/events/:id",
    name: "event-details",
    component: () => import("@/pages/events-page/EventDetailsPage.vue"),
  },
  {
    path: "/create-event",
    name: "create-event",
    component: () => import("@/pages/events-page/CreateEventPage.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/pages/user-profile/Profile.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/login-register/LoginPage.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/pages/login-register/RegisterPage.vue"),
  },
  {
    path: "/register-admin",
    name: "registerAdmin",
    component: () => import("@/pages/login-register/RegisterAdminPage.vue"),
  },
  {
    path: "/events/:id/budget",
    name: "event-budget",
    component: () => import("@/pages/budget-page/BudgetPage.vue"),
  },
  {
    path: "/overview",
    name: "overview",
    component: () => import("@/pages/overview-page/OverviewPage.vue"),
  },
  {
    path: "/:catchAll(.*)",
    component: () => import("@/pages/404notFound.vue"),
  },
];
