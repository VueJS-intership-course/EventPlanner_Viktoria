<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <Card>
          <h2 v-if="!userStore.isAdmin" class="card-title text-center mb-4">
            Register
          </h2>
          <h2 v-if="userStore.isAdmin" class="card-title text-center mb-4">
            Add a New Admin
          </h2>

          <Form @submit="registerUser" :validation-schema="registerSchema">
            <InputField
              label="Email"
              inputId="email"
              v-model="email"
              :inputAttrs="{ type: 'email', name: 'email' }"
            />
            <InputField
              label="Username"
              inputId="username"
              v-model="username"
              :inputAttrs="{ type: 'text', name: 'username' }"
            />
            <InputField
              label="Password"
              inputId="password"
              v-model="password"
              :inputAttrs="{ type: 'password', name: 'password' }"
            />
            <InputField
              label="Repeat Password"
              inputId="repeatPassword"
              v-model="repeatPassword"
              :inputAttrs="{ type: 'password', name: 'repeatPassword' }"
            />
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
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/store/userStore.js";
import { useRouter } from "vue-router";
import { Form } from "vee-validate";
import { registerSchema } from "@/utils/validationSchemas.js";
import TimeZoneDropdown from "@/components/TimeZoneDropdown.vue";
import InputField from "@/components/InputField.vue";
import Card from "@/components/Card.vue";
import showNotification from "@/utils/toastifyNotification.js";

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

    await userStore.register(user, password.value);
    router.push("/");
    showNotification("Registered successfully!");
  } catch (error) {
    console.error(error.message);
  }
};
</script>
