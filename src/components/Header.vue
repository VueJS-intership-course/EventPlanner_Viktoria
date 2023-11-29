<template>
  <nav class="navbar navbar-expand-lg bg-dark">
    <div class="container-fluid">
      <span class="navbar-brand">eVENTS</span>
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
            <RouterLink class="nav-link" aria-current="page" to="/"
              >Home</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/events">Events</RouterLink>
          </li>
          <li v-if="store.isAdmin" class="nav-item">
            <RouterLink to="/overview" class="nav-link" href="#"
              >Overview</RouterLink
            >
          </li>
          <li v-if="store.isAdmin" class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Admin
            </a>
            <ul class="dropdown-menu">
              <li>
                <RouterLink class="dropdown-item" to="/register-admin"
                  >Add admins</RouterLink
                >
              </li>
              <li>
                <RouterLink class="dropdown-item" to="/create-event"
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
        <RouterLink class="nav-link" to="/profile" v-if="store.user">
          Profile
        </RouterLink>
        <button @click="logoutUser" v-if="store.user" class="btn btn-danger">
          Logout
        </button>
        <RouterLink to="/register" v-if="!store.user" class="btn btn-primary">
          Register
        </RouterLink>
        <RouterLink to="/login" v-if="!store.user" class="btn btn-primary">
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
.container {
  margin: 1.5rem;
}

.btn {
  margin: 1rem;
}

.navbar {
  background-color: #333;
  border-bottom: 2px solid #111;
  padding: 0.5rem 1rem;
}

.navbar-brand {
  color: white;
  font-size: 1.5rem;
}

.nav-link {
  color: white;
  transition: color 0.4s ease;

  &:hover {
    color: #cbcbcb;
  }

  &:focus {
    color: #666;
  }
}
.dropdown-menu {
  background-color: #444;
  border: none;
}

.dropdown-item {
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
