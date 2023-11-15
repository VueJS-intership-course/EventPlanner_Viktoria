<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-6 mt-5">
        <div class="card">
          <div class="card-body">
            <EventByMonthChart :eventCount="eventCountByMonth" />
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <EventsCalendar :current-user-events="transformedEvents" />
          </div>
        </div>
      </div>
    </div>
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
