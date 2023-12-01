<template>
  <div class="container my-4">
    <button
      @click="toggleFilters"
      class="btn custom-btn btn-primary position-relative"
    >
      <i class="bi bi-funnel-fill"></i> Toggle Filters
      <span
        v-if="hasActiveFilters"
        class="position-absolute top-0 start-100 translate-middle badge bg-danger"
      >
        {{ Object.keys(router.currentRoute.value.query).length }}
      </span>
    </button>
    <Filters v-if="eventStore.showFilters" />
  </div>
  <div class="card-container d-flex justify-content-center gap-3 flex-wrap">
    <div
      v-for="event in eventStore.filteredEvents"
      :key="generateUniqueKey"
      class="card custom-card position-relative"
      style="width: 300px"
    >
      <span
        v-if="event.ticketCount <= 0"
        class="position-absolute top-0 end-0 badge bg-danger sold-out-badge"
      >
        SOLD OUT
      </span>
      <img
        class="card-img-top card-images"
        :src="event.imageURL"
        alt="Event image top"
      />
      <div class="card-body">
        <h5
          class="card-title custom-card-title overflow-hidden"
          data-bs-toggle="tooltip"
          :title="event.name"
        >
          {{ event.name }}
        </h5>
        <p class="card-text text-truncate">{{ event.description }}</p>
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
        <button
          @click="goToEventDetails(event.id)"
          class="btn custom-btn btn-primary"
        >
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
          class="btn custom-btn btn-warning m-2"
        >
          Buy a ticket
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeMount } from "vue";
import Filters from "@/pages/events-page/Filters.vue";
import generateUniqueKey from "@/utils/randomUUID.js";
import { useEventStore } from "@/store/eventStore.js";
import { useUserStore } from "@/store/userStore.js";
import { useRouter } from "vue-router";
import { getUserTime, getEventTime } from "@/utils/timeUtils.js";
import { convertCoordsToTz } from "@/utils/coordsUtils.js";
import { queryParamsProperties } from "@/utils/constants.js";

const router = useRouter();

const userStore = useUserStore();
const eventStore = useEventStore();

eventStore.getEventList();

const goToEventDetails = (eventId) => {
  router.push({ name: "event-details", params: { id: eventId } });
};

const isBeforeToday = (date) => {
  const today = new Date().toISOString();
  return date > today;
};

const toggleFilters = () => {
  eventStore.showFilters = !eventStore.showFilters;
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
    if (query.availableTickets === "soldout") {
      eventStore.filterOptions.ticketStatus = "sold-out";
    }
    eventStore.filterOptions.searchQuery = query.searchQuery || "";
    eventStore.filtersApplied = hasActiveFilters ? true : false;
  }
});

const buyTicket = (event) => {
  eventStore.buyTicket(event);
  router.push("/events");
};
</script>

<style lang="scss" scoped>
.custom-btn {
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
}
.sold-out-badge {
  font-size: 1.2rem;
  transform: rotate(20deg);
  padding: 8px 18px;
}

.custom-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
}

.card-images {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid #ddd;
}

.custom-card-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: rgb(60, 60, 60);
  margin: 10px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  
  &:hover {
    overflow: visible;
    white-space: normal;
  }
}
</style>
