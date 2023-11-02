<template>
  <modal :title="modalTitle" :modalId="modalId" @save="saveClicked" @cancel="cancelClicked">
    <div class="form-group">
      <label for="eventName">Event Name</label>
      <input
        type="text"
        class="form-control"
        id="eventName"
        v-model="editedEvent.name"
        required
      />
    </div>
    <div class="form-group">
      <label for="eventDescription">Event Description</label>
      <textarea
        class="form-control"
        id="eventDescription"
        v-model="editedEvent.description"
        required
      ></textarea>
    </div>
    <div class="form-group">
      <label for="eventDate">Event Date</label>
      <input
        type="date"
        class="form-control"
        id="eventDate"
        v-model="editedEvent.date"
        required
      />
    </div>
    <div class="form-group">
      <label for="eventTime">Event Time</label>
      <input
        type="time"
        class="form-control"
        id="eventTime"
        v-model="editedEvent.time"
        required
      />
    </div>
    <div class="form-group">
      <label for="ticketCount">Available Tickets</label>
      <input
        type="number"
        class="form-control"
        id="ticketCount"
        v-model="editedEvent.ticketCount"
        required
      />
    </div>
    <div class="form-group">
      <label for="ticketPrice">Ticket Price</label>
      <input
        type="number"
        class="form-control"
        id="ticketPrice"
        v-model="editedEvent.price"
        required
      />
    </div>
  </modal>
</template>

<script setup>
import { computed } from "vue";
import { useEventStore } from "@/store/eventStore.js";
import { useRouter } from "vue-router";
import Modal from "@/components/Modal.vue"; 

const router = useRouter();

const store = useEventStore();
const editedEvent = computed(() => store.editedEvent);

const modalTitle = "Edit Event";
const modalId = "editEventModal";

const saveClicked = () => {
  store.editEvent(editedEvent.value);
  store.isEditing = false;
  router.push("/events");
};

const cancelClicked = () => {
  store.isEditing = false;
};
</script>
