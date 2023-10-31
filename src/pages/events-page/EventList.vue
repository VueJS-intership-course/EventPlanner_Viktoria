<template>
  <div class="card-container">
    <div v-for="event in allEvents" :key="generateUniqueKey" class="card">
      <img
        class="card-img-top"
        src="https://picsum.photos/280/200"
        alt="Event image top"
      />
      <div class="card-body">
        <h5 class="card-title">{{ event.name }}</h5>
        <p class="card-text">{{ event.description }}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          {{ getUserTime(event.date, event.time, event.location ) }}
        </li>
        <li class="list-group-item">${{ event.price }}</li>
        <li class="list-group-item">Tickets left: {{ event.ticketCount }}</li>
      </ul>
      <div class="card-body">
        <button
          v-if="userStore.user && !userStore.isAdmin"
          @click="buy"
          class="btn btn-primary"
        >
          Buy a ticket
        </button>
        <button
          v-if="userStore.user"
          @click="goToEventDetails(event.id)"
          class="btn btn-primary"
        >
          Details
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useEventStore } from "@/store/eventStore.js";
import generateUniqueKey from "../../utils/randomId";
import { useUserStore } from "../../store/userStore";
import { useRouter } from "vue-router";
import getUserTime from "@/utils/transformTime.js";

const router = useRouter();

const userStore = useUserStore();
const eventStore = useEventStore();

eventStore.getEventList();
const allEvents = computed(() => eventStore.events);
const goToEventDetails = (eventId) => {
  router.push({ name: "event-details", params: { id: eventId } });
};
</script>

<style scoped>
.card-container {
  display: flex;
  justify-content: center;
  gap: 25px;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 15px;
}

.card {
  width: 280px;
}
</style>
