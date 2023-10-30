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
        <p class="mb-2"><strong>Date:</strong> {{ event.date }}</p>
        <p class="mb-2"><strong>Time:</strong> {{ event.time }}</p>
        <p class="mb-2"><strong>Location:</strong> {{ event.location }}</p>
        <p class="mb-2">
          <strong>Tickets Left:</strong> {{ event.ticketCount }}
        </p>
        <p class="mb-2"><strong>Price:</strong> ${{ event.price }}</p>

        <div class="mt-4">
          <button
            v-if="userStore.isAdmin"
            @click="deleteEvent"
            class="btn btn-danger mr-2"
          >
            Delete Event
          </button>
          <button
            v-if="userStore.isAdmin"
            @click="editEvent"
            class="btn btn-primary mr-2"
          >
            Edit Event
          </button>
          <button
            v-if="userStore.user && !userStore.isAdmin"
            @click="buyTicket"
            class="btn btn-primary mr-2"
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
import { computed, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useEventStore } from "@/store/eventStore";
import { useUserStore } from "@/store/userStore";
import EditEventModal from "../../components/EditEventModal.vue";

const route = useRoute();
const router = useRouter();
const eventStore = useEventStore();
const userStore = useUserStore();
const eventId = computed(() => route.params.id);
const event = ref(null);
const isLoading = ref(true);
const isEditing = computed(() => eventStore.isEditing);

onMounted(async () => {
  try {
    event.value = await eventStore.getEventById(eventId.value);
    isLoading.value = false;
  } catch (error) {
    console.error("Error fetching event:", error);
    isLoading.value = false;
  }
});

const editEvent = () => {
  eventStore.isEditing = true;
  eventStore.editedEvent = { ...event.value };
};

const deleteEvent = () => {
  eventStore.removeEvent(event.value);
  router.push("/eventlist");
};

</script>
