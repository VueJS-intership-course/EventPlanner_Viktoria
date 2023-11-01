<template>
  <div class="modal show" style="display: block">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editProductModalLabel">Edit User</h5>
          <button type="button" class="close" @click="cancelClicked">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
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
            <label for="eventDescription">New timezone</label>
            <time-zone-dropdown
              @selected="handleSelectedTimezone"
            ></time-zone-dropdown>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="saveClicked">
            Save
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            @click="cancelClicked"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useUserStore } from "@/store/userStore.js";
import { useRouter } from "vue-router";
import TimeZoneDropdown from "@/components/TimeZoneDropdown.vue";

const router = useRouter();

const store = useUserStore();
const editedUser = computed(() => store.editedUser);

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
