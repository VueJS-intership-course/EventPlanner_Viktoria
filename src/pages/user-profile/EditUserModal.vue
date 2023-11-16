<template>
  <modal
    :title="modalTitle"
    :modalId="modalId"
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
import showNotification from "@/utils/toastifyNotification.js";
import InputField from "@/components/InputField.vue";

const router = useRouter();

const userStore = useUserStore();
const editedUser = computed(() => userStore.editedUser);

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
