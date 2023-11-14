<template>
  <div class="container my-4">
    <button @click="toggleFilters" class="btn btn-primary position-relative">
      Toggle Filters
      <span
        v-if="hasActiveFilters"
        class="position-absolute top-0 start-100 translate-middle badge bg-danger"
      >
        {{ Object.keys(router.currentRoute.value.query).length }}
      </span>
    </button>
    <Filters v-if="showFilters" />
  </div>
  <div class="card-container d-flex justify-content-center gap-3 flex-wrap">
    <div
      v-for="event in filteredEvents"
      :key="generateUniqueKey"
      class="card"
      style="width: 280px"
    >
      <img class="card-img-top" :src="event.imageURL" alt="Event image top" />
      <div class="card-body">
        <h5 class="card-title">{{ event.name }}</h5>
        <p class="card-text">{{ truncateText(event.description, 100) }}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li v-if="userStore.user" class="list-group-item">
          {{ getUserTime(event.utcTime) }}
        </li>
        <li v-if="!userStore.user" class="list-group-item">
          {{ getEventTime(event.utcTime, convertCoordsToTz(event.location)) }}
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
            event.ticketCount > 0 &&
            isBeforeToday(event.utcTime)
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
import generateUniqueKey from "@/utils/randomUUID.js";
import { useUserStore } from "@/store/userStore.js";
import { useRouter } from "vue-router";
import { getUserTime, getEventTime } from "@/utils/timeUtils.js";
import Filters from "@/pages/events-page/Filters.vue";
import { convertCoordsToTz } from "@/utils/coordsUtils.js";

const router = useRouter();

const userStore = useUserStore();
const eventStore = useEventStore();

eventStore.getEventList();

const goToEventDetails = (eventId) => {
  router.push({ name: "event-details", params: { id: eventId } });
};

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const showFilters = ref(false);

const toggleFilters = () => {
  showFilters.value = !showFilters.value;
};

const isBeforeToday = (date) => {
  const today = new Date().toISOString();
  return date > today;
};

const hasActiveFilters = computed(() => {
  const { query } = router.currentRoute.value;

  return (
    (query.fromDate && query.fromDate !== "undefined") ||
    (query.toDate && query.toDate !== "undefined") ||
    (query.minPrice && query.minPrice !== "undefined") ||
    (query.maxPrice && query.maxPrice !== "undefined") ||
    query.availableTickets === "true" ||
    query.availableTickets === "false" ||
    query.soldOut === "true" ||
    query.soldOut === "false" ||
    query.searchQuery
  );
});

onBeforeMount(() => {
  const { query } = router.currentRoute.value;

  if (query) {
    eventStore.filterOptions.fromDate = query.fromDate || null;
    eventStore.filterOptions.toDate = query.toDate || null;
    eventStore.filterOptions.minPrice = query.minPrice || null;
    eventStore.filterOptions.maxPrice = query.maxPrice || null;
    eventStore.filterOptions.ticketStatus =
      query.availableTickets === "true"
        ? "available"
        : query.soldOut === "true"
        ? "sold-out"
        : "all";
    eventStore.filterOptions.searchQuery = query.searchQuery;

    const hasQueryParams =
      query.fromDate ||
      query.toDate ||
      query.minPrice ||
      query.maxPrice ||
      query.availableTickets ||
      query.soldOut ||
      query.searchQuery;

    eventStore.filtersApplied = hasQueryParams ? true : false;
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

<style>
.card-img-top {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
</style>
