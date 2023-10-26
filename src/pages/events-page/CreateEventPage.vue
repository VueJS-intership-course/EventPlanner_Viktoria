<template>
  <div style="width: 50%;" class="container mt-4">
    <h2>Create Event</h2>
    <form @submit.prevent="createEvent">
      <div class="mb-3">
        <label for="eventName" class="form-label">Event Name</label>
        <input
          type="text"
          class="form-control"
          id="eventName"
          v-model="eventName"
          required
        />
      </div>
      <div class="mb-3">
        <label for="eventDescription" class="form-label"
          >Event Description</label
        >
        <textarea
          class="form-control"
          id="eventDescription"
          v-model="eventDescription"
          required
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="eventDate" class="form-label">Event Date</label>
        <input
          type="date"
          class="form-control"
          id="eventDate"
          v-model="eventDate"
          required
        />
      </div>
      <div class="mb-3">
        <label for="eventTime" class="form-label">Event Time</label>
        <input
          type="time"
          class="form-control"
          id="eventTime"
          v-model="eventTime"
          required
        />
      </div>
      <div class="mb-3">
        <label for="ticketCount" class="form-label">Available Tickets</label>
        <input
          type="number"
          class="form-control"
          id="ticketCount"
          v-model="ticketCount"
          required
        />
      </div>
      <div class="mb-3">
        <label for="ticketPrice" class="form-label">Ticket Price</label>
        <input
          type="number"
          class="form-control"
          id="ticketPrice"
          v-model="price"
          required
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Event Location</label>
        <MapComponent />
      </div>

      <button type="submit" class="btn btn-primary">Create Event</button>
    </form>
  </div>
</template>

<script setup>
import MapComponent from "@/components/MapComponent.vue";
import { useEventStore } from "@/store/eventStore.js";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const eventStore = useEventStore();

const eventName = ref("");
const eventDescription = ref("");
const eventDate = ref("");
const eventTime = ref("");
const ticketCount = ref("");
const price = ref("");

const createEvent = () => {
  const event = {
    name: eventName.value,
    description: eventDescription.value,
    date: eventDate.value,
    time: eventTime.value,
    ticketCount: ticketCount.value,
    location: eventStore.coords,
    price: price.value,
  };

  console.log("Event:", event);

  eventStore.addEvent(event);
  router.push("/eventlist");
};
</script>
