<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title text-center mb-4">Register</h2>
            <Form @submit="registerUser" :validation-schema="vSchema">
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
                <label for="repeatPassword" class="form-label" >Repeat Password</label>
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
import { authService } from "@/services/userAuthentication.js";
import { useRouter } from "vue-router";
import TimeZoneDropdown from "./TimeZoneDropdown.vue";
import {
  Field,
  Form,
  ErrorMessage,
} from "vee-validate";
import * as Yup from "yup";
const router = useRouter();

const email = ref("");
const password = ref("");
const username = ref("");
const repeatPassword = ref("");
const timezone = ref("");

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

const vSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Email must be a valid email address"),
  username: Yup.string()
    .required("Username is required")
    .min(4, "Username must be at least 4 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  repeatPassword: Yup.string()
    .required("Repeat Password is required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

</script>
