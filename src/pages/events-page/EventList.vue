<template>
  <!-- <div> -->
  <!-- Filter Form -->
  <!-- <form @submit.prevent="applyFilters" class="row g-3">
      <div class="col-md-2">
        <label for="fromDate" class="form-label">From Date:</label>
        <input type="date" class="form-control" id="fromDate" v-model="filterOptions.fromDate" />
      </div>
      <div class="col-md-2">
        <label for="toDate" class="form-label">To Date:</label>
        <input type="date" class="form-control" id="toDate" v-model="filterOptions.toDate" />
      </div>
      <div class="col-md-2">
        <label for="minPrice" class="form-label">Min Price:</label>
        <input type="number" class="form-control" id="minPrice" v-model="filterOptions.minPrice" />
      </div>
      <div class="col-md-2">
        <label for="maxPrice" class="form-label">Max Price:</label>
        <input type="number" class="form-control" id="maxPrice" v-model="filterOptions.maxPrice" />
      </div>
      <div class="col-md-2">
        <label class="form-check-label">Available Tickets:</label>
        <input type="checkbox" class="form-check-input" v-model="filterOptions.availableTickets" />
      </div>
      <div class="col-md-2">
        <label class="form-check-label">Sold Out:</label>
        <input type="checkbox" class="form-check-input" v-model="filterOptions.soldOut" />
      </div>
      <div class="col-md-2">
        <button type="submit" class="btn btn-primary">Apply Filters</button>
      </div>
    </form>
  </div> -->
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
          {{ getUserTime(event.date, event.time, event.location) }}
        </li>
        <li class="list-group-item">${{ event.price }}</li>
        <li class="list-group-item">Tickets left: {{ event.ticketCount }}</li>
      </ul>
      <div v-if="userStore.user" class="card-body" >
        <button
          @click="goToEventDetails(event.id)"
          class="btn btn-primary"
        >
          Details
        </button>
        <button
          v-if="!userStore.isAdmin && !event.users.includes(userStore.user.email)"
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
import { computed, ref } from "vue";
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

// const filterOptions = ref({
//   fromDate: null,
//   toDate: null,
//   minPrice: null,
//   maxPrice: null,
//   availableTickets: true,
//   soldOut: false,
// });

// const searchQuery = ref("");

// const applyFilters = () => {
//   eventStore.setFilterOptions(filterOptions.value);
//   eventStore.setSearchQuery(searchQuery.value);
// };

const filteredEvents = computed(() => eventStore.filteredEvents);

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
