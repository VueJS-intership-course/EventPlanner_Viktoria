<template>
  <section v-if="currentUser" class="vh-100" style="background-color: #eee">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-12 col-xl-4">
          <div class="card" style="border-radius: 15px">
            <div class="card-body text-center">
              <div class="mt-3 mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                  class="rounded-circle img-fluid"
                  style="width: 100px"
                />
              </div>
              <h4 class="mb-2">{{ currentUser.username }}</h4>
              <p class="text-muted mb-4">
                {{ currentUser.email }} <span class="mx-2">|</span>
                {{ currentUser.timezone }}
              </p>
              <button
                @click="editProfile"
                type="button"
                class="btn btn-primary btn-rounded btn-lg"
              >
                Edit Profile
              </button>
              <div class="d-flex justify-content-between text-center mt-5 mb-2">
                <div>
                  <p class="mb-2 h5">{{ pastEvents.length }}</p>
                  <p class="text-muted mb-0">Past Events</p>
                </div>
                <div class="px-3">
                  <p class="mb-2 h5">{{ currentUserEvents.length }}</p>
                  <p class="text-muted mb-0">Total Events</p>
                </div>
                <div>
                  <p class="mb-2 h5">{{ upcomingEvents.length }}</p>
                  <p class="text-muted mb-0">Upcoming events</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!userStore.isAdmin" class="col-md-12 col-xl-4">
          <div class="card text-center" style="border-radius: 15px">
            <div class="mt-3 mb-4"></div>
            <h4 class="mb-2">My Events</h4>
            <p class="text-muted mb-4">
              <a
                href="#"
                class="link-opacity-50-hover"
                @click="selectEventType('past')"
                >Past Events</a
              >
              <span class="mx-2">|</span>
              <a
                href="#"
                class="link-opacity-50-hover"
                @click="selectEventType('upcoming')"
                >Upcoming Events</a
              >
            </p>

            <div>
              <ul
                class="list-group"
                style="max-height: 300px; overflow-y: auto"
              >
                <li v-for="event in filteredEvents" class="list-group-item">
                  <p class="text-">{{ event.name }}</p>
                  <RouterLink :to="'/event/' + event.id" class="btn btn-primary"
                    >Details</RouterLink
                  >
                </li>
              </ul>
            </div>
            <div v-if="!currentUserEvents" class="mt-3">Loading....</div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section v-if="!currentUser">
    <h3 class="mt-5">You are currently not logged in</h3>
    <RouterLink to="/login" class="btn btn-primary">Log In</RouterLink> or
    <RouterLink to="/register" class="btn btn-secondary">Sign up</RouterLink>
  </section>
  <EditUserModal v-if="isEditing" />
</template>

<script setup>
import { computed, ref } from "vue";
import { useUserStore } from "@/store/userStore.js";
import { useEventStore } from "@/store/eventStore.js";
import EditUserModal from "./EditUserModal.vue";

const userStore = useUserStore();
const eventStore = useEventStore();
eventStore.getEventList();

const currentUser = computed(() => userStore.user);
const allEvents = computed(() => eventStore.events);
const isEditing = computed(() => userStore.isEditing);

const currentUserEvents = computed(() => {
  return allEvents.value.filter((event) =>
    event.users.includes(currentUser.value.email)
  );
});

const selectedEventType = ref("upcoming");

const selectEventType = (eventType) => {
  selectedEventType.value = eventType;
};

const upcomingEvents = computed(() => {
  return currentUserEvents.value.filter((event) => isEventUpcoming(event));
});

const pastEvents = computed(() => {
  return currentUserEvents.value.filter((event) => !isEventUpcoming(event));
});

const filteredEvents = computed(() => {
  if (selectedEventType.value === "upcoming") {
    return upcomingEvents.value;
  }
  if (selectedEventType.value === "past") {
    return pastEvents.value;
  }
  return [];
});

const isEventUpcoming = (event) => {
  return new Date(event.utcTime) > new Date();
};

const editProfile = () => {
  userStore.isEditing = true;
  userStore.editedUser = { ...currentUser.value };
};
</script>
