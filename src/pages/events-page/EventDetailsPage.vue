<template v-if="event">
  <div class="card">
    <div class="container my-4">
      <div class="row">
        <div class="col-md-6">
          <img
            :src="event.imageURL"
            alt="Event Image"
            class="img-fluid rounded"
          />
        </div>
        <div class="col-md-6">
          <h1 class="display-4">{{ event.name }}</h1>
          <p class="lead">{{ event.description }}</p>
          <p class="mb-2">
            <strong>Event Time in {{ eventTz }}:</strong>
            {{ getEventTime(event.utcTime, eventTz) }}
          </p>
          <p v-if="userStore.user" class="mb-2">
            <strong>Your Time:</strong>
            {{ getUserTime(event.utcTime) }}
          </p>

          <p v-if="ticketAvailable" class="mb-2">
            <strong>Tickets Left:</strong> {{ event.ticketCount }}
          </p>
          <p v-if="!ticketAvailable" class="mb-2 text-danger">
            <strong>Tickets sold out</strong>
          </p>
          <p class="mb-2"><strong>Price:</strong> ${{ event.price }}</p>
          <p v-if="userStore.isAdmin" class="mb-2">
            <strong>Budget:</strong> ${{ event.budget }}
          </p>
          <!-- <p v-if="userStore.isAdmin" class="mb-2">
            <strong>Users with tickets:</strong> {{ event.users }}
          </p> -->
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
            </button>
            <button
              v-if="
                userStore.user &&
                !userStore.isAdmin &&
                !event.users.includes(userStore.user.email) &&
                ticketAvailable &&
                isBeforeToday(event.utcTime)
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
    <EditEventModal v-if="isEditing" />
  </div>
  <div class="card">
    <div class="container my-4">
      <div class="row" v-if="event.location">
        <div class="col-md-6">
          <p class="lead">Event Location</p>
          <MapDisplay :location="event.location" />
        </div>
        <div class="col-md-6">
          <div v-if="!isBeforeToday(event.utcTime)" class="text-center">
            <p class="lead">This event has already passed!</p>
          </div>
          <div
            v-if="
              !userStore.isAdmin && event.users.includes(userStore.user.email)
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

const eventId = computed(() => route.params.id);
const event = computed(() => eventStore.selectedEvent);
const isEditing = computed(() => eventStore.isEditing);
const ticketAvailable = computed(() => event.value.ticketCount > 0);
const eventTz = computed(() =>
  event.value.location ? convertCoordsToTz(event.value.location) : null
);

eventStore.getEventById(eventId.value);

const editEvent = () => {
  eventStore.isEditing = true;
  eventStore.editedEvent = { ...event.value };
};

const confirmDeleteEvent = () => {
  const confirmation = window.confirm(
    "Are you sure you want to delete this event?"
  );
  if (confirmation) {
    eventStore.removeEvent(event.value);
    router.push("/events");
  }
};

const viewBudget = () => {
  router.push(`/events/${eventId.value}/budget`);
};

const buyTicket = () => {
  eventStore.buyTicket(event.value);
  router.push("/events");
};

const isBeforeToday = (date) => {
  const today = new Date().toISOString();
  return date > today;
};
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  margin-bottom: 20px;
}
// .img-fluid {
//   width: 100%;
// }
.display-4 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
}
.lead {
  font-size: 1.2rem;
  margin-bottom: 15px;
}
.text-center {
  text-align: center;
  margin-top: 20px;
}

.text-danger {
  color: #dc3545;
}
</style>
