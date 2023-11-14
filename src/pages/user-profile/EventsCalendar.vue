<template>
  <div class="container">
    <FullCalendar
      class="container-calendar"
      :options="calendarOptions"
      :key="calendarKey"
    >
      <template v-slot:eventContent="arg">
        <b>{{ arg.timeText }}</b>
        <i>{{ arg.event.title }}</i>
      </template>
    </FullCalendar>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const props = defineProps({
  currentUserEvents: {
    type: Array,
    required: true,
  },
});

const calendarKey = ref(0);

const calendarOptions = reactive({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  headerToolbar: {
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth,timeGridWeek",
  },
  initialView: "dayGridMonth",
  initialEvents: props.currentUserEvents,
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
});

watch(
  () => props.currentUserEvents,
  (newVal) => {
    console.log("newVal", newVal);
    calendarOptions.initialEvents = newVal;
    calendarKey.value += 1;
  }
);
</script>

<style scoped>
.container {
  display: flex;
  min-height: 100vh;
  font-family: "Arial", "Helvetica Neue", "Helvetica", sans-serif;
  font-size: 14px;
  justify-content: center;
  align-items: center;
}

.container-calendar {
  width: 80%;
  margin: auto;
}

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
