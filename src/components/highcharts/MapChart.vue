<template>
  <div id="world-map"></div>
</template>

<script setup>
import Highcharts from "highcharts";
import mapData from "@highcharts/map-collection/custom/world.geo.json";
import { computed, watch } from "vue";

const eventCountByCountry = defineProps({
  eventCountByCountry: {
    type: Object,
    required: true,
  },
});

const transformedArray = computed(() => {
  return Object.entries(eventCountByCountry.eventCountByCountry).map(
    ([name, value]) => ({ name, value })
  );
});

const initMap = () => {
  Highcharts.mapChart("world-map", {
    chart: {
      map: mapData,
    },
    title: {
      text: "Events by Country",
    },
    series: [
      {
        data: transformedArray.value,
        name: "Events",
        joinBy: "name",
        states: {
          hover: {
            color: "#808080",
          },
        }, 
      },
    ],
    accessibility: {
      enabled: false,
    },
  });
};

watch(transformedArray, () => {
    initMap();
});
</script>
