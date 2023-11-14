<template>
  <div>
    <EventByMonthChart :eventCount="eventCountByMonth" />
  </div>
  <div>
    <EventsCalendar :current-user-events="transformedEvents" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useEventStore } from "@/store/eventStore";
import EventByMonthChart from "@/components/highcharts/EventByMonthChart.vue";
import EventsCalendar from "@/components/EventsCalendar.vue";

const store = useEventStore();
store.getEventList();

const allEvents = computed(() => store.events);
const eventCountByMonth = computed(() => store.eventCountByMonth);

const transformedEvents = computed(() =>
  allEvents.value.map((event) => ({
    id: event.id,
    title: event.name,
    start: event.utcTime,
  }))
);
</script>
