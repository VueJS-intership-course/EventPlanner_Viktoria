<template>
  <div id="world-map"></div>
</template>

<script setup>
import Highcharts from "highcharts";
import mapData from "@highcharts/map-collection/custom/world.geo.json";
import { computed, watch, onMounted, ref } from "vue";

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

let chart = ref(null)

const initMap = () => {
  chart = Highcharts.mapChart("world-map", {
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

onMounted(() => {
  initMap();

  console.warn(chart)
})

watch(transformedArray, () => {
  console.warn('call')
  // todo: reload map
});
</script>
