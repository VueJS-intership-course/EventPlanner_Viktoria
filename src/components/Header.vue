<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">eVENTS</a>
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
            <RouterLink class="nav-link active" aria-current="page" to="/"
              >Home</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/events">Events</RouterLink>
          </li>
          <li v-if="isAuthenticated" class="nav-item">
            <RouterLink to="/overview" class="nav-link" href="#"
              >Overview</RouterLink
            >
          </li>
          <li v-if="isAuthenticated" class="nav-item dropdown">
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
        <span id="helloUser" v-if="loggedUser">
          Hello, {{ loggedUser.username }}
          <i v-if="isAuthenticated" class="bi bi-database-fill-check"></i>
        </span>
        <RouterLink class="nav-link" to="/profile" v-if="loggedUser">
          Profile
        </RouterLink>
        <button @click="logoutUser" v-if="loggedUser" class="btn btn-danger">
          Logout
        </button>
        <RouterLink to="/register" v-if="!loggedUser" class="btn btn-primary">
          Register
        </RouterLink>
        <RouterLink to="/login" v-if="!loggedUser" class="btn btn-primary">
          Login
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/userStore.js";


const router = useRouter();
const store = useUserStore();

const loggedUser = computed(() => store.user);
const isAuthenticated = computed(() => store.isAdmin);

const logoutUser = () => {
  store.logout();
  router.push("/login");
};
</script>

<style lang="scss" scoped>
.container {
  margin: 1.5rem;
}

span {
  margin: 1rem;
}

.btn {
  margin: 1rem;
}
</style>
