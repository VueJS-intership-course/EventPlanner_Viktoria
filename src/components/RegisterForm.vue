<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title text-center mb-4">Register</h2>
            <form @submit.prevent="registerUser">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="email"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  v-model="username"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="password"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="repeatPassword" class="form-label"
                  >Repeat Password</label
                >
                <input
                  type="password"
                  class="form-control"
                  id="repeatPassword"
                  v-model="repeatPassword"
                  required
                />
              </div>
              <div class="mb-3">
                <time-zone-dropdown @selected="handleSelectedTimezone"></time-zone-dropdown>
               
              </div>
              <button type="submit" class="btn btn-primary">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { authService } from "@/services/userAuthentication.js";
import { useRouter } from "vue-router";
import TimeZoneDropdown from "./TimeZoneDropdown.vue";

const router = useRouter();

const email = ref("");
const password = ref("");
const username = ref("");
const repeatPassword = ref("");
const timezone = ref("");
// const isVisible = ref(false);

const handleSelectedTimezone = (selectedTimezone) => {
    timezone.value = selectedTimezone; 
  };

const registerUser = async () => {
  try {
    if (password.value !== repeatPassword.value) {
      console.error("Passwords do not match");
      return;
    }
    const user = {
      email: email.value,
      username: username.value,
      timezone: timezone.value,
      isAdmin: false,
    };

    await authService.register(user, password.value);
    router.push("/");
  } catch (error) {
    console.error(error.message);
  }
};

</script>

<style scoped>
  .options-list {
    list-style: none;
    padding: 0;
    margin: 0;
    border: 1px solid #ccc;
    border-top: none;
    max-height: 150px; 
    overflow-y: auto;
  }

  .options-list li {
    padding: 10px;
    cursor: pointer;
  }

  .options-list li:hover {
    background-color: #ccc;
  }
</style>
