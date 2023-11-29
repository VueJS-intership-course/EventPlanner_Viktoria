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
          type="date"
          inputId="fromDate"
          :value="eventStore.filterOptions.fromDate"
          @update:modelValue="(value) => (eventStore.filterOptions.fromDate = value)"
        />
      </div>
      <div class="col-md-2">
        <InputField
          label="To Date"
          type="date"
          inputId="toDate"
          :value="eventStore.filterOptions.toDate"
          @update:modelValue="(value) => (eventStore.filterOptions.toDate = value)"
        />
      </div>
      <div class="col-md-2">
        <InputField
          label="Min Price"
          type="number"
          inputId="minPrice"
          :value="eventStore.filterOptions.minPrice"
          @update:modelValue="(value) => (eventStore.filterOptions.minPrice = value)"
        />
      </div>
      <div class="col-md-2">
        <InputField
          label="Max Price"
          type="number"
          inputId="maxPrice"
          :value="eventStore.filterOptions.maxPrice"
          @update:modelValue="(value) => (eventStore.filterOptions.maxPrice = value)"
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
          label="Search Event"
          type="text"
          inputId="searchQuery"
          :value="eventStore.filterOptions.searchQuery"
          @update:modelValue="(value) => (eventStore.filterOptions.searchQuery = value)"
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
</script>
