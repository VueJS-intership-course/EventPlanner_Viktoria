<template>
    <div class="container my-4">
      <Filters />
  </div>
  <div class="card-container">
    <div v-for="event in filteredEvents" :key="generateUniqueKey" class="card">
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
          {{ getUserTime(event.utcTime) }}
        </li>
        <li class="list-group-item">${{ event.price }}</li>
        <li v-if="event.ticketCount > 0" class="list-group-item">
          Tickets left: {{ event.ticketCount }}
        </li>
        <li
          v-if="event.ticketCount <= 0"
          class="list-group-item"
          style="color: red"
        >
          SOLD OUT
        </li>
      </ul>
      <div v-if="userStore.user" class="card-body">
        <button @click="goToEventDetails(event.id)" class="btn btn-primary">
          Details
        </button>
        <button
          v-if="
            !userStore.isAdmin &&
            !event.users.includes(userStore.user.email) &&
            event.ticketCount > 0
          "
          @click="buyTicket(event)"
          class="btn btn-primary m-2"
        >
          Buy a ticket
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onBeforeMount } from "vue";
import { useEventStore } from "@/store/eventStore.js";
import generateUniqueKey from "../../utils/randomId";
import { useUserStore } from "../../store/userStore";
import { useRouter } from "vue-router";
import { getUserTime } from "@/utils/transformTime.js";
import Filters from "@/pages/events-page/Filters.vue";

const router = useRouter();

const userStore = useUserStore();
const eventStore = useEventStore();

eventStore.getEventList();

const goToEventDetails = (eventId) => {
  router.push({ name: "event-details", params: { id: eventId } });
};

const searchQuery = ref("");
const filterOptions = computed(() => eventStore.filterOptions);

onBeforeMount(() => {
  const { query } = router.currentRoute.value;
  if (query) {
    filterOptions.fromDate = query.fromDate || null;
    filterOptions.toDate = query.toDate || null;
    filterOptions.minPrice = query.minPrice || null;
    filterOptions.maxPrice = query.maxPrice || null;
    filterOptions.ticketStatus =
      query.availableTickets === "true"
        ? "available"
        : query.soldOut === "true"
        ? "sold-out"
        : "all";
    searchQuery.value = query.searchQuery || "";
  }
});

const filteredEvents = computed(() => {
  return eventStore.filteredEvents;
});

const buyTicket = (event) => {
  eventStore.buyTicket(event);
  router.push("/events");
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
