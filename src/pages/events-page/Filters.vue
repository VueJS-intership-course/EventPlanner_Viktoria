<template>
  <div class="container my-4">
    <form @submit.prevent="applyFilters" class="row g-3">
      <div class="col-md-2">
        <label for="fromDate" class="form-label">From Date:</label>
        <input
          type="date"
          class="form-control"
          id="fromDate"
          v-model="filterOptions.fromDate"
        />
      </div>
      <div class="col-md-2">
        <label for="toDate" class="form-label">To Date:</label>
        <input
          type="date"
          class="form-control"
          id="toDate"
          v-model="filterOptions.toDate"
        />
      </div>
      <div class="col-md-2">
        <label for="minPrice" class="form-label">Min Price:</label>
        <input
          type="number"
          class="form-control"
          id="minPrice"
          v-model="filterOptions.minPrice"
        />
      </div>
      <div class="col-md-2">
        <label for="maxPrice" class="form-label">Max Price:</label>
        <input
          type="number"
          class="form-control"
          id="maxPrice"
          v-model="filterOptions.maxPrice"
        />
      </div>
      <div class="col-md-2">
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
      <div class="col-md-2">
        <label for="searchQuery" class="form-label">Search Event:</label>
        <input
          type="text"
          class="form-control"
          id="searchQuery"
          v-model="filterOptions.searchQuery"
        />
      </div>
      <div class="col-md-12 d-flex justify-content-end">
        <button type="submit" class="btn btn-primary">Apply Filters</button>
      </div>
      <div v-if="filtersApplied" class="col-md-12 d-flex justify-content-end">
        <button @click="resetFilters" class="btn btn-secondary">Reset Filters</button>
      </div>
    </form>
  </div>
</template>


<script setup>
import { useEventStore } from "@/store/eventStore.js";
import { useRouter } from "vue-router";
import { computed, ref, watch } from "vue";
const eventStore = useEventStore();
const router = useRouter(); 


const filtersApplied = ref(false);
const filterOptions = computed(() => eventStore.filterOptions);

const applyFilters = () => {
  const fromDate = filterOptions.value.fromDate
    ? new Date(filterOptions.value.fromDate).toISOString().split("T")[0]
    : null;
  const toDate = filterOptions.value.toDate
    ? new Date(filterOptions.value.toDate).toISOString().split("T")[0]
    : null;
  eventStore.filterOptions.fromDate = fromDate;
  eventStore.filterOptions.toDate = toDate;
  eventStore.applyFilters();
  filtersApplied.value = true;

  router.push({
    query: {
      fromDate,
      toDate,
      minPrice: filterOptions.value.minPrice,
      maxPrice: filterOptions.value.maxPrice,
      searchQuery: filterOptions.value.searchQuery,
      availableTickets: filterOptions.value.ticketStatus === 'available',
      soldOut: filterOptions.value.ticketStatus === 'sold-out',
    },
  });
};

const resetFilters = () => {
  eventStore.resetFilters();
  filtersApplied.value = false;
  router.push({ query: null });
};

watch(filterOptions.value, (newOptions, oldOptions) => {
  if (newOptions.maxPrice === "") {
    eventStore.filterOptions.maxPrice = null;
  }
});

</script>
