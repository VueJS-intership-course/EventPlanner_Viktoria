<template>
  <div style="width: 900px;">
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script setup>
// import { onMounted } from "vue";
// import { useEventStore } from "../../store/eventStore";
// import { computed, watch } from "vue";


const props = defineProps({
  eventCount: {
    type: Array,
    required: true,
  },
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
      data: props.eventCount,
      color: "#3f51b5",
    },
  ],
};

</script>
