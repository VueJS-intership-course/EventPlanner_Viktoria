<template>
  <div v-if="isLoading">
    <p>Loading event details...</p>
  </div>
  <div v-if="event" class="container my-4">
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
        <p class="mb-2"><strong>Date:</strong></p>
        <p class="mb-2">
          <strong>Event Time:</strong> {{ event.time }} / {{ event.date }}
        </p>
        <p class="mb-2">
          <strong>Your Time:</strong>
          {{ getUserTime(event.date, event.time, event.location) }}
        </p>

        <p class="mb-2">
          <strong>Tickets Left:</strong> {{ event.ticketCount }}
        </p>
        <p class="mb-2"><strong>Price:</strong> ${{ event.price }}</p>
        <p v-if="userStore.isAdmin" class="mb-2">
          <strong>Budget:</strong> ${{ event.budget }}
        </p>
        <p class="mb-2"><strong>User:</strong> ${{ event.users }}</p>

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
            v-if="userStore.user && !userStore.isAdmin && !event.users.includes(userStore.user.email)"
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
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useEventStore } from "@/store/eventStore";
import { useUserStore } from "@/store/userStore";
import EditEventModal from "@/components/EditEventModal.vue";
import getUserTime from "@/utils/transformTime.js";

const route = useRoute();
const router = useRouter();
const eventStore = useEventStore();
const userStore = useUserStore();

const eventId = computed(() => route.params.id);
const event = computed(() => eventStore.selectedEvent);
const isLoading = ref(true);
const isEditing = computed(() => eventStore.isEditing);

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

