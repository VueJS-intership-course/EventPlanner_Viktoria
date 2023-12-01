<template v-if="eventStore.selectedEvent">
  <div class="custom-card">
    <div class="container my-4">
      <div class="row">
        <div class="col-md-6">
          <img
            :src="eventStore.selectedEvent.imageURL"
            alt="Event Image"
            class="img-fluid rounded"
          />
        </div>
        <div class="col-md-6">
          <h1 class="display-4 name">{{ eventStore.selectedEvent.name }}</h1>
          <p class="lead">{{ eventStore.selectedEvent.description }}</p>
          <p class="mb-2">
            <strong>Event Time in {{ eventTz }}:</strong>
            {{ getEventTime(eventStore.selectedEvent.utcTime, eventTz) }}
          </p>
          <p v-if="userStore.user" class="mb-2">
            <strong>Your Time:</strong>
            {{ getUserTime(eventStore.selectedEvent.utcTime) }}
          </p>

          <p v-if="ticketAvailable" class="mb-2">
            <strong>Tickets Left:</strong>
            {{ eventStore.selectedEvent.ticketCount }}
          </p>
          <p v-if="!ticketAvailable" class="mb-2 text-danger">
            <strong>Tickets sold out</strong>
          </p>
          <p class="mb-2">
            <strong>Price:</strong> ${{ eventStore.selectedEvent.price }}
          </p>
          <p v-if="userStore.isAdmin" class="mb-2">
            <strong>Budget:</strong> ${{ eventStore.selectedEvent.budget }}
          </p>
          <div class="mt-4">
            <button
              v-if="userStore.isAdmin"
              @click="confirmDeleteEvent"
              class="btn btn-danger m-2"
            >
              Delete Event
            </button>
            <button
              v-if="userStore.isAdmin"
              @click="editEvent"
              class="btn btn-primary m-2"
            >
              Edit Event
            </button>
            <button
              v-if="userStore.isAdmin"
              @click="viewBudget"
              class="btn btn-primary m-2"
            >
              View Budget
            </button>\
            <!--v-if statements separate it in computed prop -->
            <button
              v-if="
                userStore.user &&
                !userStore.isAdmin &&
                !eventStore.selectedEvent.users.includes(
                  userStore.user.email
                ) &&
                ticketAvailable &&
                isBeforeToday(eventStore.selectedEvent.utcTime)
              "
              @click="buyTicket"
              class="btn btn-warning m-2"
            >
              Buy a Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
    <EditEventModal v-if="eventStore.isEditing" />
  </div>
  <div class="custom-card">
    <div class="container my-4">
      <div class="row" v-if="eventStore.selectedEvent.location">
        <div class="col-md-6">
          <p class="lead">Event Location</p>
          <MapDisplay :location="eventStore.selectedEvent.location" />
        </div>
        <div class="col-md-6">
          <div
            v-if="!isBeforeToday(eventStore.selectedEvent.utcTime)"
            class="text-center"
          >
            <p class="lead">This event has already passed!</p>
          </div>
          <div
            v-if="
              !userStore.isAdmin &&
              eventStore.selectedEvent.users.includes(userStore.user.email)
            "
            class="text-center"
          >
            <p class="lead">You have a ticket for this event!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useEventStore } from "@/store/eventStore";
import { useUserStore } from "@/store/userStore";
import { getUserTime, getEventTime } from "@/utils/timeUtils.js";
import { convertCoordsToTz } from "@/utils/coordsUtils.js";
import MapDisplay from "@/components/maps/MapDisplay.vue";
import EditEventModal from "@/pages/events-page/EditEventModal.vue";

const route = useRoute();
const router = useRouter();
const eventStore = useEventStore();
const userStore = useUserStore();

const ticketAvailable = computed(
  () => eventStore.selectedEvent.ticketCount > 0
);
const eventTz = computed(() =>
  eventStore.selectedEvent.location
    ? convertCoordsToTz(eventStore.selectedEvent.location)
    : null
);

eventStore.getEventById(route.params.id);

const editEvent = () => {
  eventStore.isEditing = true;
  eventStore.editedEvent = { ...eventStore.selectedEvent };
};

const confirmDeleteEvent = () => {
  const confirmation = window.confirm(
    "Are you sure you want to delete this event?"
  );
  if (confirmation) {
    eventStore.removeEvent(eventStore.selectedEvent);
    router.push("/events");
  }
};

const viewBudget = () => {
  router.push(`/events/${route.params.id}/budget`);
};

const buyTicket = () => {
  eventStore.buyTicket(eventStore.selectedEvent);
  router.push("/events");
};

const isBeforeToday = (date) => {
  const today = new Date().toISOString();
  return date > today;
};
</script>

<style lang="scss" scoped>
.custom-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}
.name {
  font-size: 2.5rem;
  color: rgb(60, 60, 60);
  font-weight: 500;
  margin-bottom: 20px;
}
</style>
