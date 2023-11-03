<template>
  <div>
    <div class="container my-4">
      <form @submit.prevent="applyFilters" class="row g-3">
        <div class="col-md-3">
          <label for="fromDate" class="form-label">From Date:</label>
          <input
            type="date"
            class="form-control"
            id="fromDate"
            v-model="filterOptions.fromDate"
          />
        </div>
        <div class="col-md-3">
          <label for="toDate" class="form-label">To Date:</label>
          <input
            type="date"
            class="form-control"
            id="toDate"
            v-model="filterOptions.toDate"
          />
        </div>
        <div class="col-md-3">
          <label for="minPrice" class="form-label">Min Price:</label>
          <input
            type="number"
            class="form-control"
            id="minPrice"
            v-model="filterOptions.minPrice"
          />
        </div>
        <div class="col-md-3">
          <label for="maxPrice" class="form-label">Max Price:</label>
          <input
            type="number"
            class="form-control"
            id="maxPrice"
            v-model="filterOptions.maxPrice"
          />
        </div>
        <div class="col-md-3">
          <label for="ticketStatus" class="form-label">Ticket Status:</label>
          <select
            class="form-select"
            id="ticketStatus"
            v-model="filterOptions.ticketStatus"
          >
            <option value="all">All Events</option>
            <option value="available">Available</option>
            <option value="sold-out">Sold Out</option>
          </select>
        </div>

        <div class="col-md-3">
          <label for="searchQuery" class="form-label">Search Event:</label>
          <input
            type="text"
            class="form-control"
            id="searchQuery"
            v-model="filterOptions.searchQuery"
          />
        </div>
        <div class="col-md-3">
          <button type="submit" class="btn btn-primary">Apply Filters</button>
        </div>
        <div class="col-md-3">
          <button @click="resetFilters" class="btn btn-secondary">
            Reset Filters
          </button>
        </div>
      </form>
    </div>
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

const router = useRouter();

const userStore = useUserStore();
const eventStore = useEventStore();

eventStore.getEventList();
// const allEvents = computed(() => eventStore.events);

const goToEventDetails = (eventId) => {
  router.push({ name: "event-details", params: { id: eventId } });
};

const searchQuery = ref("");

const filterOptions = ref({
  fromDate: null,
  toDate: null,
  minPrice: null,
  maxPrice: null,
  searchQuery: "",
  ticketStatus: "all",
});

const applyFilters = () => {
  const queryParameters = {
    fromDate: filterOptions.value.fromDate,
    toDate: filterOptions.value.toDate,
    minPrice: filterOptions.value.minPrice,
    maxPrice: filterOptions.value.maxPrice,
    searchQuery: filterOptions.value.searchQuery,
    ticketStatus: filterOptions.value.ticketStatus,
  };

  router.push({ name: "event-list", query: queryParameters });
};

const resetFilters = () => {
  filterOptions.value = {
    fromDate: null,
    toDate: null,
    minPrice: null,
    maxPrice: null,
    searchQuery: "",
    ticketStatus: "all",
  };
  applyFilters();
};

onBeforeMount(() => {
  const { query } = router.currentRoute.value;
  if (query) {
    filterOptions.value = {
      fromDate: query.fromDate || null,
      toDate: query.toDate || null,
      minPrice: query.minPrice || null,
      maxPrice: query.maxPrice || null,
      availableTickets: query.availableTickets === "true",
      soldOut: query.soldOut === "true",
    };
    searchQuery.value = query.searchQuery || "";
  }
});

const filteredEvents = computed(() => {
  const { fromDate, toDate, minPrice, maxPrice, searchQuery, ticketStatus } =
    filterOptions.value;

  const filteredEvents = eventStore.events.filter((event) => {
    const eventDate = new Date(event.date);

    if (fromDate && eventDate < new Date(fromDate)) return false;
    if (toDate && eventDate > new Date(toDate)) return false;
    if (minPrice !== null && event.price < minPrice) return false;
    if (maxPrice !== null && event.price > maxPrice) return false;
    if (ticketStatus === "available" && event.ticketCount <= 0) return false;
    if (ticketStatus === "sold-out" && event.ticketCount > 0) return false;
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      if (
        !event.name.toLowerCase().includes(lowerCaseQuery) &&
        !event.description.toLowerCase().includes(lowerCaseQuery)
      ) {
        return false;
      }
    }

    return true;
  });

  return filteredEvents;
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
