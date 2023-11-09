<template>
  <div class="demo-app">
    <FullCalendar class="demo-app-calendar" :options="calendarOptions">
      <template v-slot:eventContent="arg">
        <b>{{ arg.timeText }}</b>
        <i>{{ arg.event.title }}</i>
      </template>
    </FullCalendar>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEventStore } from "@/store/eventStore";

const store = useEventStore();
store.getEventList();

defineProps({
  currentUserEvents: {
    type: Array,
    required: true,
  },
});

const allEvents = computed(() => store.events);

const transformedEvents = computed(() =>
  allEvents.value.map((event) => ({
    id: event.id,
    title: event.name,
    start: event.utcTime,
  }))
);

const transformedEventsRef = ref([]);
transformedEventsRef.value = transformedEvents.value;

const handleEvents = (events) => {
  transformedEventsRef.value = events;
};

const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  headerToolbar: {
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth,timeGridWeek",
  },
  initialView: "dayGridMonth",
  initialEvents: transformedEventsRef.value,
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  eventsSet: handleEvents,
});
</script>

<style scoped>
.demo-app {
  display: flex;
  min-height: 100vh;
  font-family: 'Arial', 'Helvetica Neue', 'Helvetica', sans-serif;
  font-size: 14px;
  justify-content: center;
  align-items: center;
}

.demo-app-calendar {
  width: 80%;
  margin: auto;
}

/* Adjust the following styles based on your preferences */
.fc-dayGridMonth-view,
.fc-timeGridWeek-view {
  border: 1px solid #ddd;
  border-radius: 5px;
}

.fc-day,
.fc-time-grid-event {
  background-color: #f8f9fa;
  border: 1px solid #ced4da;
  border-radius: 3px;
}

.fc-event-title {
  color: #333;
  font-size: 12px;
}

.fc-today {
  background-color: #e8f5e9;
  border-radius: 3px;
}
</style>
