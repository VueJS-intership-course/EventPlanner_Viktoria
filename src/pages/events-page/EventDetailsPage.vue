<template>
    {{ event }}
</template>

<script setup>
import { useEventStore } from '../../store/eventStore';
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

const router = useRouter();
const eventStore = useEventStore();
const event = ref(null);

onMounted(() => {
  if (router.params.id) {
    const eventId = router.params.id;
    event.value = eventStore.getEventById(eventId);
  }
});


</script>