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
          :value="filterOptions.fromDate"
          @update:modelValue="(value) => (filterOptions.fromDate = value)"
        />
      </div>
      <div class="col-md-2">
        <InputField
          label="To Date"
          type="date"
          inputId="toDate"
          :value="filterOptions.toDate"
          @update:modelValue="(value) => (filterOptions.toDate = value)"
        />
      </div>
      <div class="col-md-2">
        <InputField
          label="Min Price"
          type="number"
          inputId="minPrice"
          :value="filterOptions.minPrice"
          @update:modelValue="(value) => (filterOptions.minPrice = value)"
        />
      </div>
      <div class="col-md-2">
        <InputField
          label="Max Price"
          type="number"
          inputId="maxPrice"
          :value="filterOptions.maxPrice"
          @update:modelValue="(value) => (filterOptions.maxPrice = value)"
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
        <InputField
          label="Search Event"
          type="text"
          inputId="searchQuery"
          v-model="filterOptions.searchQuery"
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
import { computed, watch } from "vue";
import InputField from "@/components/InputField.vue";
import { filterSchema } from "@/utils/validationSchemas.js";
import { Form} from "vee-validate";

const eventStore = useEventStore();
const router = useRouter();

const filterOptions = computed(() => eventStore.filterOptions);

const applyFilters = () => {
  const { fromDate, toDate, minPrice, maxPrice, ticketStatus, searchQuery } =
    filterOptions.value;
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

  eventStore.applyFilters();
  eventStore.filtersApplied = true;

  router.push({ query });
};

const resetFilters = () => {
  eventStore.resetFilters();
  eventStore.filtersApplied = false;
  router.push({ query: null });
};



watch(filterOptions.value, (newOptions, oldOptions) => {
  if (newOptions.maxPrice === "") {
    eventStore.filterOptions.maxPrice = null;
  }
});
</script>
