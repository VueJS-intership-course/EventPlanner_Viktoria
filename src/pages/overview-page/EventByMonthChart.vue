<template>
  <div style="width: 900px;">
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script setup>
import { useEventStore } from "@/store/eventStore.js";
import { computed, onMounted, ref } from "vue";


const store = useEventStore();
store.getEventList();
const events = computed(() => store.events);

const eventCountByMonth = new Array(12).fill(0);

events.value.forEach((event) => {
  const date = new Date(event.utcTime);
  const month = date.getUTCMonth();
  eventCountByMonth[month]++;
});

const chartOptions = {
  chart: {
    type: "column", 
    backgroundColor: "#eee",
  },
  title: {
    text: "Event Count by Month in 2023",
  },
  xAxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    labels: {
      style: {
        color: "black",
      },
    },
  },
  yAxis: {
    title: {
      text: "Event Count",
      style: {
        color: "black",
      },
    },
    labels: {
      style: {
        color: "black",
      },
    },
  },
  plotOptions: {
    column: {
      colorByPoint: true,
    },
  },
  accessibility: {
    enabled: false,
  },
  series: [
    {
      name: "Events",
      data: eventCountByMonth,
      color: "#3f51b5",
    },
  ],
};


onMounted(() => {
   
});
</script>
