<template>
  <div>
    <highcharts :options="chartOptions" class="chart-container"></highcharts>
  </div>
</template>

<script setup>
import {  reactive, watch } from "vue";

const props = defineProps({
  eventCount: {
    type: Array,
    required: true,
  },
});

const chartOptions = reactive({
  chart: {
    type: "column",
    // backgroundColor: "#eee",
  },
  title: {
    text: "Event Count by Month",
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
      data: props.eventCount,
      color: "#3f51b5",
    },
  ],
});

watch(
  () => props.eventCount,
  (newVal) => {
    chartOptions.series[0].data = newVal;
  }
);
</script>
