<template>
  <div class="container my-4">
    <button @click="toggleFilters" class="btn btn-primary position-relative">
      <i class="bi bi-funnel-fill"></i> Toggle Filters
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
      class="card position-relative"
      style="width: 280px"
    >
      <span
        v-if="event.ticketCount <= 0"
        class="position-absolute top-0 end-0 badge bg-danger sold-out-badge"
      >
        SOLD OUT
      </span>
      <img class="card-img-top" :src="event.imageURL" alt="Event image top" />
      <div class="card-body">
        <h5 class="card-title">{{ event.name }}</h5>
        <p class="card-text">{{ truncateText(event.description, 80) }}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li v-if="userStore.user" class="list-group-item">
          <span v-if="!isBeforeToday(event.utcTime)">
            <i>*Past event</i>
          </span>
          <span v-if="isBeforeToday(event.utcTime)">
            {{ getUserTime(event.utcTime) }}
          </span>
        </li>
        <li v-if="!userStore.user" class="list-group-item">
          <p v-if="!isBeforeToday(event.utcTime)">Past event</p>
          <p v-if="isBeforeToday(event.utcTime)">
            {{ getEventTime(event.utcTime, convertCoordsToTz(event.location)) }}
          </p>
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
          class="btn btn-warning m-2"
        >
          Buy a ticket
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onBeforeMount } from "vue";
import Filters from "@/pages/events-page/Filters.vue";
import generateUniqueKey from "@/utils/randomUUID.js";
import { useEventStore } from "@/store/eventStore.js";
import { useUserStore } from "@/store/userStore.js";
import { useRouter } from "vue-router";
import { getUserTime, getEventTime } from "@/utils/timeUtils.js";
import { convertCoordsToTz } from "@/utils/coordsUtils.js";

const router = useRouter();

const userStore = useUserStore();
const eventStore = useEventStore();

eventStore.getEventList();

const goToEventDetails = (eventId) => {
  router.push({ name: "event-details", params: { id: eventId } });
};

// trim the text to have the same lenght text in each card
const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const isBeforeToday = (date) => {
  const today = new Date().toISOString();
  return date > today;
};

const showFilters = ref(false);

const toggleFilters = () => {
  showFilters.value = !showFilters.value;
};

const filteredEvents = computed(() => {
  return eventStore.filteredEvents;
});

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

const buyTicket = (event) => {
  eventStore.buyTicket(event);
  router.push("/events");
};
</script>

<style lang="scss" scoped>
.card-img-top {
  width: 100%;
  height: 12.5rem;
  object-fit: cover;
}

.sold-out-badge {
  font-size: 1.2rem;
  transform: rotate(20deg);
  padding: 8px 18px;
}
</style>
