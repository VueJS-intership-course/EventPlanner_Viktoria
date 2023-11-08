<template>
  <HighchartsMap :eventCountByCountry="eventCountByCountry" />
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useEventStore } from "@/store/eventStore.js";
import { getCountryFromCoords } from "@/utils/getTzFromCoords.js";
import HighchartsMap from "@/pages/home-page/mapChart.vue";

const store = useEventStore();

store.getEventList();

const events = ref([]);
const eventCountByCountry = ref({});

const countEventsByCountry = () => {
  events.value.forEach(async (event) => {
    const country = await getCountryFromCoords(event.location);
    eventCountByCountry.value[country] =
      (eventCountByCountry.value[country] || 0) + 1;
  });
};

onMounted(async () => {
  await store.getEventList();
  events.value = store.events;
  countEventsByCountry();
});
</script>
