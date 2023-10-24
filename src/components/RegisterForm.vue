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
                <input type="email" class="form-control" id="email" v-model="email" required>
              </div>
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" v-model="username" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="password" required>
              </div>
              <div class="mb-3">
                <label for="repeatPassword" class="form-label">Repeat Password</label>
                <input type="password" class="form-control" id="repeatPassword" v-model="repeatPassword" required>
              </div>
              <div class="mb-3">
                <label for="timezone" class="form-label">Timezone</label>
                <input type="text" class="form-control" id="timezone" v-model="searchQuery" @input="filterTimezones" placeholder="Search Timezones">
                <select class="form-select" v-model="timezone">
                  <option v-for="tz in filteredTimezones" :key="tz" :value="tz">{{ tz }}</option>
                </select>
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
import { ref, computed } from 'vue';
import { authService } from '@/services/userAuthentication.js';
import moment from 'moment-timezone';

const email = ref('');
const password = ref('');
const username = ref('');
const repeatPassword = ref('');
const timezone = ref('CET');
const timezones = moment.tz.names();
const searchQuery = ref('');
const filteredTimezones = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return timezones.filter(tz => tz.toLowerCase().includes(query));
});

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
    };

    await authService.register(user, password.value);
    console.log("registered");
  } catch (error) {
    console.error(error.message);
  }
};

const filterTimezones = () => {
  // Filter the timezones based on the search query
  // The filtered timezones will automatically update in the dropdown
};
</script>
