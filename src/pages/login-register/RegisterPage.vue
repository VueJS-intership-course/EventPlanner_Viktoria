<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h2 v-if="!userStore.isAdmin" class="card-title text-center mb-4">
              Register
            </h2>
            <h2 v-if="userStore.isAdmin" class="card-title text-center mb-4">
              Add a New Admin
            </h2>

            <Form @submit="registerUser" :validation-schema="registerSchema">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <Field
                  type="email"
                  class="form-control"
                  id="email"
                  name="email"
                  v-model="email"
                  required
                />
                <ErrorMessage name="email" class="text-danger" />
              </div>
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <Field
                  type="text"
                  class="form-control"
                  id="username"
                  name="username"
                  v-model="username"
                  required
                />
                <ErrorMessage name="username" class="text-danger" />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <Field
                  type="password"
                  class="form-control"
                  id="password"
                  name="password"
                  v-model="password"
                  required
                />
                <ErrorMessage name="password" class="text-danger" />
              </div>
              <div class="mb-3">
                <label for="repeatPassword" class="form-label"
                  >Repeat Password</label
                >
                <Field
                  type="password"
                  class="form-control"
                  id="repeatPassword"
                  name="repeatPassword"
                  v-model="repeatPassword"
                  required
                />
                <ErrorMessage name="repeatPassword" class="text-danger" />
              </div>
              <div class="mb-3">
                <time-zone-dropdown
                  @selected="handleSelectedTimezone"
                ></time-zone-dropdown>
                <p v-if="!timezoneChosen" class="text-danger">
                  Timezone is required!
                </p>
              </div>
              <button type="submit" class="btn btn-primary">Register</button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TimeZoneDropdown from "@/components/TimeZoneDropdown.vue";
import showNotification from "@/utils/toastifyNotification.js";
import { authService } from "@/services/userAuthentication.js";
import { useRouter } from "vue-router";
import { Field, Form, ErrorMessage } from "vee-validate";
import { registerSchema } from "@/utils/validationSchemas.js";
import { useUserStore } from "@/store/userStore.js";

const router = useRouter();
const userStore = useUserStore();

const email = ref("");
const password = ref("");
const username = ref("");
const repeatPassword = ref("");
const timezone = ref("");
const timezoneChosen = ref("");

const handleSelectedTimezone = (selectedTimezone) => {
  timezone.value = selectedTimezone;
  timezoneChosen.value = true;
};

const registerUser = async () => {
  try {
    if (!timezone.value) {
      timezoneChosen.value = false;
      return;
    }
    const user = {
      email: email.value,
      username: username.value,
      timezone: timezone.value,
      // check if the the current user logged is an admin, therefore is registering an admin
      isAdmin: userStore.isAdmin ? true : false,
    };

    await authService.register(user, password.value);
    router.push("/");
    showNotification("Registered successfully!");
  } catch (error) {
    console.error(error.message);
  }
};
</script>
