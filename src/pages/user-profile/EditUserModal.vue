<template>
  <modal :title="modalTitle" :modalId="modalId" @save="saveClicked" @cancel="cancelClicked">
    <div class="form-group">
      <label for="username">New Username</label>
      <input
        type="text"
        class="form-control"
        id="username"
        v-model="editedUser.username"
      />
    </div>
    <div class="form-group">
      <label for="timezone">New Timezone</label>
      <time-zone-dropdown @selected="handleSelectedTimezone"></time-zone-dropdown>
    </div>
  </modal>
</template>

<script setup>
import { computed } from "vue";
import { useUserStore } from "@/store/userStore.js";
import { useRouter } from "vue-router";
import TimeZoneDropdown from "@/components/TimeZoneDropdown.vue";
import Modal from "@/components/Modal.vue"; 

const router = useRouter();

const store = useUserStore();
const editedUser = computed(() => store.editedUser);

const modalTitle = "Edit Profile";
const modalId = "editProfileModal";

const handleSelectedTimezone = (selectedTimezone) => {
  editedUser.value.timezone = selectedTimezone;
};

const saveClicked = () => {
  store.editUser(editedUser.value);
  store.isEditing = false;
  router.push("/profile");
};

const cancelClicked = () => {
  store.isEditing = false;
};
</script>
