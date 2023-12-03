<template>
  <div class="container">
    <div class="row justify-content-center">
      <Card style="width: 800px; margin-top: 1rem">
        <HighchartsMap :eventCountByCountry="eventCountByCountry" />
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useEventStore } from "@/store/eventStore.js";
import HighchartsMap from "@/components/highcharts/MapChart.vue";
import Card from "@/components/Card.vue";

const store = useEventStore();

const events = ref([]);
const eventCountByCountry = ref({});

const countEventsByCountry = () => {
  for (const event of events.value) {
    if (event.country === "United States") {
      event.country = "United States of America";
    }
    eventCountByCountry.value[event.country] =
      (eventCountByCountry.value[event.country] || 0) + 1;
  }
};

onMounted(async () => {
  await store.getEventList();
  events.value = store.events;
  countEventsByCountry();
});
</script>
