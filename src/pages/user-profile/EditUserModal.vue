<template>
  <modal
    title="Edit Profile"
    modalId="editProfileModal"
    @save="saveClicked"
    @cancel="cancelClicked"
  >
    <Form :validation-schema="editUserSchema">
      <InputField
        label="Username"
        inputId="username"
        :value="editedUser.username"
        @update:modelValue="(value) => (editedUser.username = value)"
        type="text"
      />
      <div class="form-group">
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
import { Form } from "vee-validate";
import { editUserSchema } from "@/utils/validationSchemas.js";
import showNotification from "@/utils/toastifyNotification.js";
import TimeZoneDropdown from "@/components/TimeZoneDropdown.vue";
import Modal from "@/components/Modal.vue";
import InputField from "@/components/InputField.vue";

const router = useRouter();

const userStore = useUserStore();
const editedUser = computed(() => userStore.editedUser);

const handleSelectedTimezone = (selectedTimezone) => {
  editedUser.value.timezone = selectedTimezone;
};

const saveClicked = () => {
  editUserSchema
    .validate({
      username: editedUser.value.username,
    })
    .then(() => {
      userStore.editUser(editedUser.value);
      userStore.isEditing = false;
      showNotification("Profile updated successfully!");
      router.push("/profile");
    })
    .catch((err) => {
      showNotification(err);
    });
};

const cancelClicked = () => {
  userStore.isEditing = false;
};
</script>
