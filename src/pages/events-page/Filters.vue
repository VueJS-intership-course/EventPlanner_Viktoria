<template>
  <div class="container my-4">
    <Form
      @submit="applyFilters"
      class="row g-3"
      :validation-schema="filterSchema"
    >
      <div class="col-md-2">
        <InputField
              label="From Date"
              inputId="fromDate"
              v-model="eventStore.filterOptions.fromDate"
              :inputAttrs="{ type: 'date', name: 'fromDate' }"
            />
      </div>
      <div class="col-md-2">
        <InputField
              label="To Date"
              inputId="toDate"
              v-model="eventStore.filterOptions.toDate"
              :inputAttrs="{ type: 'date', name: 'toDate' }"
            />
      </div>
      <div class="col-md-2">
        <InputField
              label="Min Price"
              inputId="minPrice"
              v-model="eventStore.filterOptions.minPrice"
              :inputAttrs="{ type: 'number', name: 'minPrice' }"
            />
      </div>
      <div class="col-md-2">
        <InputField
              label="Max Price"
              inputId="maxPrice"
              v-model="eventStore.filterOptions.maxPrice"
              :inputAttrs="{ type: 'number', name: 'maxPrice' }"
            />
      </div>
      <div class="col-md-2">
        <label for="ticketStatus" class="form-label">Ticket Status:</label>
        <select
          class="form-select"
          id="ticketStatus"
          v-model="eventStore.filterOptions.ticketStatus"
        >
          <option value="all">All Events</option>
          <option value="available">Available</option>
          <option value="sold-out">Sold Out</option>
        </select>
      </div>
      <div class="col-md-2">
        <InputField
              label="Search"
              inputId="searchQuery"
              v-model="eventStore.filterOptions.searchQuery"
              :inputAttrs="{ type: 'text', name: 'searchQuery' }"
            />
      </div>
      <div class="col-md-12 d-flex justify-content-end">
        <button type="submit" class="btn btn-primary">Apply Filters</button>
      </div>
      <div
        v-if="eventStore.filtersApplied"
        class="col-md-12 d-flex justify-content-end"
      >
        <button @click="resetFilters" class="btn btn-secondary">
          Reset Filters
        </button>
      </div>
    </Form>
  </div>
</template>

<script setup>
import { useEventStore } from "@/store/eventStore.js";
import { useRouter } from "vue-router";
import InputField from "@/components/InputField.vue";
import { filterSchema } from "@/utils/validationSchemas.js";
import { Form } from "vee-validate";
import { onBeforeMount, computed } from "vue";
import { queryParamsProperties } from "@/utils/constants.js";

const eventStore = useEventStore();
const router = useRouter();

const applyFilters = () => {
  const { fromDate, toDate, minPrice, maxPrice, ticketStatus, searchQuery } =
    eventStore.filterOptions;
  const query = {};

  const addQueryParam = (key, value) => {
    if (value) {
      query[key] = value;
    }
  };

  addQueryParam(
    "fromDate",
    fromDate ? new Date(fromDate).toISOString().split("T")[0] : null
  );
  addQueryParam(
    "toDate",
    toDate ? new Date(toDate).toISOString().split("T")[0] : null
  );
  addQueryParam("minPrice", minPrice);
  addQueryParam("maxPrice", maxPrice);
  addQueryParam(
    "ticketStatus",
    ["available", "sold-out"].includes(ticketStatus) ? ticketStatus : null
  );
  addQueryParam("searchQuery", searchQuery);

  eventStore.filtersApplied = true;

  router.push({ query });
};

const resetFilters = () => {
  eventStore.resetFilters();
  eventStore.filtersApplied = false;
  router.push({ query: null });
  eventStore.showFilters = false;
};

const hasActiveFilters = computed(() => {
  const { query } = router.currentRoute.value;
  return queryParamsProperties.some((item) => query[item]);
});

onBeforeMount(() => {
  const { query } = router.currentRoute.value;

  if (query) {
    eventStore.filterOptions.fromDate = query.fromDate || null;
    eventStore.filterOptions.toDate = query.toDate || null;
    eventStore.filterOptions.minPrice = query.minPrice || null;
    eventStore.filterOptions.maxPrice = query.maxPrice || null;
    eventStore.filterOptions.ticketStatus = "all";
    if (query.ticketStatus === "available") {
      eventStore.filterOptions.ticketStatus = "available";
    }
    if (query.availableTickets === "sold-out") {
      eventStore.filterOptions.ticketStatus = "sold-out";
    }
    eventStore.filterOptions.searchQuery = query.searchQuery || "";
    eventStore.filtersApplied = hasActiveFilters ? true : false;
  }
});
</script>
