<template>
  <HighchartsMap :eventCountByCountry="eventCountByCountry" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useEventStore } from "@/store/eventStore.js";
import { getCountryFromCoords } from "@/utils/coordsUtils.js";
import HighchartsMap from "@/pages/home-page/MapChart.vue";

const store = useEventStore();

store.getEventList();

const events = ref([]);
const eventCountByCountry = ref({});

const countEventsByCountry = () => {
  events.value.forEach(async (event) => {
    let country = await getCountryFromCoords(event.location);
    if (country === "United States") {
      country = "United States of America";
    }
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
