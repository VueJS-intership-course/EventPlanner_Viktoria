<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <Card>
          <h2 class="card-title text-center mb-4">Login</h2>
          <Form @submit="loginUser" :validation-schema="loginSchema">
            <InputField
              label="Email"
              inputId="email"
              :value="email"
              @update:modelValue="(value) => (email = value)"
              type="email"
            />
            <InputField
              label="Password"
              inputId="password"
              :value="password"
              @update:modelValue="(value) => (password = value)"
              type="password"
            />
            <button type="submit" class="btn btn-primary">Login</button>
          </Form>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { authService } from "@/services/userAuthentication.js";
import { useRouter } from "vue-router";
import Card from "@/components/Card.vue";
import { loginSchema } from "@/utils/validationSchemas.js";
import InputField from "../../components/InputField.vue";
import { Form } from "vee-validate";

const router = useRouter();

const email = ref("");
const password = ref("");

const loginUser = async () => {
  try {
    console.log(email.value, password.value);
    await authService.login(email.value, password.value);
    router.push("/");
  } catch (error) {
    console.error("Error signing in:", error);
  }
};
</script>
