<template>
  <modal
    :title="modalTitle"
    :modalId="modalId"
    @save="saveClicked"
    @cancel="cancelClicked"
  >
    <Form :validation-schema="editUserSchema">
      <div class="form-group">
        <label for="username">New Username</label>
        <Field
          type="text"
          class="form-control"
          id="username"
          name="username"
          v-model="editedUser.username"
        />
        <ErrorMessage name="username" class="text-danger" />
      </div>
      <div class="form-group">
        <label for="timezone">New Timezone</label>
        <time-zone-dropdown
          @selected="handleSelectedTimezone"
        ></time-zone-dropdown>
      </div>
    </Form>
  </modal>
</template>

<script setup>
import { computed } from "vue";
import { useUserStore } from "@/store/userStore.js";
import { useRouter } from "vue-router";
import TimeZoneDropdown from "@/components/TimeZoneDropdown.vue";
import Modal from "@/components/Modal.vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import { editUserSchema } from "@/utils/validationSchemas.js";

const router = useRouter();

const store = useUserStore();
const editedUser = computed(() => store.editedUser);

const modalTitle = "Edit Profile";
const modalId = "editProfileModal";

const handleSelectedTimezone = (selectedTimezone) => {
  editedUser.value.timezone = selectedTimezone;
};

const saveClicked = () => {
  editUserSchema
    .validate({
      username: editedUser.value.username,
    })
    .then(() => {
      store.editUser(editedUser.value);
      store.isEditing = false;
      router.push("/profile");
    })
    .catch((err) => {
      //toastify
    });
};

const cancelClicked = () => {
  store.isEditing = false;
};
</script>
