<template>
  <div>
    <div class="card">
      <div class="container my-4">
        <div class="row">
          <div class="col-md-6">
            <img
              src="https://picsum.photos/600/400"
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
            <p class="mb-2">
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
            <p v-if="userStore.isAdmin" class="mb-2">
              <strong>Users with tickets:</strong> {{ event.users }}
            </p>

            <div class="mt-4">
              <button
                v-if="userStore.isAdmin"
                @click="deleteEvent"
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
                  ticketAvailable
                "
                @click="buyTicket"
                class="btn btn-primary m-2"
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
        <div class="row">
          <div class="col-md-6">
          <p class="lead">Event Location</p>
          <MapDisplay :location="event.location" />
        </div>
        <div class="col-md-6">
          <p class="lead">Event Countdown</p>
          <p>TODO</p>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useEventStore } from "@/store/eventStore";
import { useUserStore } from "@/store/userStore";
import EditEventModal from "@/components/EditEventModal.vue";
import { getUserTime, getEventTime } from "@/utils/transformTime.js";
import convertCoordsToTz from "@/utils/getTzFromCoords.js";
import MapDisplay from "@/components/MapDisplay.vue";

const route = useRoute();
const router = useRouter();
const eventStore = useEventStore();
const userStore = useUserStore();

const eventId = computed(() => route.params.id);
const event = computed(() => eventStore.selectedEvent);
const isLoading = ref(true);
const isEditing = computed(() => eventStore.isEditing);
const ticketAvailable = computed(() => event.value.ticketCount > 0);
const eventTz = computed(() => convertCoordsToTz(event.value.location));

eventStore.getEventById(eventId.value);
if (eventId.value) {
  isLoading.value = false;
}

const editEvent = () => {
  eventStore.isEditing = true;
  eventStore.editedEvent = { ...event.value };
};

const deleteEvent = () => {
  eventStore.removeEvent(event.value);
  router.push("/events");
};

const viewBudget = () => {
  router.push(`/events/${eventId.value}/budget`);
};

const buyTicket = () => {
  eventStore.buyTicket(event.value);
  router.push("/events");
};
</script>
