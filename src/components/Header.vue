<template>
  <nav class="navbar navbar-expand-lg bg-dark">
    <div class="container-fluid">
      <span class="navbar-title m-2">eVENTS</span>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink
              class="nav-link nav-link-style"
              aria-current="page"
              to="/"
              >Home</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link nav-link-style" to="/events"
              >Events</RouterLink
            >
          </li>
          <li v-if="store.isAdmin" class="nav-item">
            <RouterLink to="/overview" class="nav-link nav-link-style" href="#"
              >Overview</RouterLink
            >
          </li>
          <li v-if="store.isAdmin" class="nav-item dropdown">
            <a
              class="nav-link nav-link-style dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Admin
            </a>
            <ul class="dropdown-menu dropdown-menu-style">
              <li>
                <RouterLink
                  class="dropdown-item dropdown-item-style"
                  to="/register-admin"
                  >Add admins</RouterLink
                >
              </li>
              <li>
                <RouterLink
                  class="dropdown-item dropdown-item-style"
                  to="/event-form"
                  >Add new events</RouterLink
                >
              </li>
            </ul>
          </li>
        </ul>
        <span id="helloUser" v-if="store.user">
          Hello, {{ store.user.username }}
          <i v-if="store.isAdmin" class="bi bi-database-fill-check"></i>
        </span>
        <RouterLink
          class="nav-link nav-link-style"
          to="/profile"
          v-if="store.user"
        >
          Profile
        </RouterLink>
        <button
          @click="logoutUser"
          v-if="store.user"
          class="btn m-3 btn-danger"
        >
          Logout
        </button>
        <RouterLink
          to="/register"
          v-if="!store.user"
          class="btn m-3 btn-primary"
        >
          Register
        </RouterLink>
        <RouterLink to="/login" v-if="!store.user" class="btn m-3 btn-primary">
          Login
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/userStore.js";

const router = useRouter();
const store = useUserStore();

const logoutUser = () => {
  store.logout();
  router.push("/login");
};
</script>

<style lang="scss" scoped>
.navbar-title {
  color: white;
  font-size: 1.5rem;
}

.nav-link-style {
  color: white;
  transition: color 0.4s ease;

  &:hover {
    color: #cbcbcb;
  }

  &:focus {
    color: #666;
  }
}
.dropdown-menu-style {
  background-color: #444;
  border: none;
}

.dropdown-item-style {
  color: #ccc;

  &:hover {
    background-color: #333;
    color: #fff;
  }
}

#helloUser {
  color: #cfcfcf;
  margin-right: 1rem;
}
</style>
