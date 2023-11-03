<template>
  <modal
    :title="modalTitle"
    :modalId="modalId"
    @save="saveClicked"
    @cancel="cancelClicked"
  >
    <Form>
      <div class="form-group">
        <label for="eventName">Event Name</label>
        <Field
          type="text"
          class="form-control"
          id="eventName"
          name="eventName"
          v-model="editedEvent.name"
        />
        <ErrorMessage name="eventName" class="text-danger" />
      </div>
      <div class="form-group">
        <label for="eventDescription">Event Description</label>
        <Field
          as="textarea"
          class="form-control"
          id="eventDescription"
          name="eventDescription"
          v-model="editedEvent.description"
        />
        <ErrorMessage name="eventDescription" class="text-danger" />
      </div>
      <div class="form-group">
        <label for="eventDate">Event Date</label>
        <Field
          type="date"
          class="form-control"
          id="eventDate"
          name="eventDate"
          v-model="editedEvent.date"
        />
        <ErrorMessage name="eventDate" class="text-danger" />
      </div>
      <div class="form-group">
        <label for="eventTime">Event Time</label>
        <Field
          type="time"
          class="form-control"
          id="eventTime"
          name="eventTime"
          v-model="editedEvent.time"
        />
        <ErrorMessage name="eventTime" class="text-danger" />
      </div>
      <div class="form-group">
        <label for="ticketCount">Available Tickets</label>
        <Field
          type="number"
          class="form-control"
          id="ticketCount"
          name="ticketCount"
          v-model="editedEvent.ticketCount"
        />
        <ErrorMessage name="ticketCount" class="text-danger" />
      </div>
      <div class="form-group">
        <label for="ticketPrice">Ticket Price</label>
        <Field
          type="number"
          class="form-control"
          id="ticketPrice"
          name="ticketPrice"
          v-model="editedEvent.price"
        />
        <ErrorMessage name="ticketPrice" class="text-danger" />
      </div>
      <MapComponent :onMapClick="onMapClick" style="height: 300px; width: 450px; margin: 10px;" />
    </Form>
  </modal>
</template>

<script setup>
import { computed } from "vue";
import { useEventStore } from "@/store/eventStore.js";
import { useRouter } from "vue-router";
import Modal from "@/components/Modal.vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import MapComponent from "./MapComponent.vue";

const router = useRouter();

const store = useEventStore();
const editedEvent = computed(() => store.editedEvent);

const modalTitle = "Edit Event";
const modalId = "editEventModal";

const onMapClick = (lonLat) => {
  editedEvent.value.location = lonLat;
};

const saveClicked = () => {
  editedEvent.value.utcTime = `${editedEvent.value.date}T${editedEvent.value.time}`;
  store.editEvent(editedEvent.value);
  store.isEditing = false;
  router.push("/events");
};

const cancelClicked = () => {
  store.isEditing = false;
};

</script>
