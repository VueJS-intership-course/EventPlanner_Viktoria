<template>
  <div class="container my-4">
    <h1 class="display-4">Budget for {{ event.name }}</h1>
    <p><strong>Start Budget:</strong> ${{ event.budget }}</p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useEventStore } from "@/store/eventStore";

const route = useRoute();
const eventStore = useEventStore();
const eventId = computed(() => route.params.id);
const event = computed(() => eventStore.selectedEvent);

eventStore.getEventById(eventId.value);
</script>
