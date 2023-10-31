<template>
  <div class="modal show" style="display: block">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editProductModalLabel">Edit Event</h5>
          <button type="button" class="close" @click="cancelClicked">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
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
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="saveClicked">
            Save
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            @click="cancelClicked"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useEventStore } from "../store/eventStore";
import { useRouter } from "vue-router";

const router = useRouter();

const store = useEventStore();
const editedEvent = computed(() => store.editedEvent);

const saveClicked = () => {
  store.editEvent(editedEvent.value);
  store.isEditing = false;
  router.push("/events");
};

const cancelClicked = () => {
  store.isEditing = false;
};
</script>
