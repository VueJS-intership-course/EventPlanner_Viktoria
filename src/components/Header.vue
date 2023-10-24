<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <h1 v-if="loggedUser">
          Hello, {{ loggedUser.username }} <i v-if="isAuthenticated" class="bi bi-database-fill-check"></i>
        </h1>
      </div>
      <div class="col-md-6">
        <button @click="logoutUser" v-if="store.user" class="btn btn-danger">
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/store/userStore.js";
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const store = useUserStore();

const loggedUser = computed(() => store.user);
// const isAuthenticated = computed(() => false);
const isAuthenticated = computed(() => store.isAdmin);

const logoutUser = () => {
  store.logout();
  router.push("/login");
};
</script>


<style scoped>
.container {
  margin: 1.5rem;
}
</style>
