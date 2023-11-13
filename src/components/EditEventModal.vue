<template>
  <modal
    title="Edit Event"
    modalId="editEventModal"
    @save="saveClicked"
    @cancel="cancelClicked"
  >
    <Form :validation-schema="editEventSchema">
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
          v-model="eventDate"
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
          v-model="eventTime"
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
        <label for="price">Ticket Price</label>
        <Field
          type="number"
          class="form-control"
          id="price"
          name="price"
          v-model="editedEvent.price"
        />
        <ErrorMessage name="price" class="text-danger" />
      </div>
      <MapComponent
        :onMapClick="onMapClick"
        style="height: 300px; width: 450px; margin: 10px"
      />
    </Form>
  </modal>
</template>

<script setup>
import { computed, ref } from "vue";
import { useEventStore } from "@/store/eventStore.js";
import { useRouter } from "vue-router";
import Modal from "@/components/Modal.vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import MapComponent from "./MapComponent.vue";
import { getEventTime } from "@/utils/transformTime.js";
import {convertCoordsToTz} from "@/utils/coordsUtils.js";
import moment from "moment-timezone";
import { editEventSchema } from "@/utils/validationSchemas.js";
import showNotification from "@/utils/toastifyNotification.js";

const router = useRouter();
const store = useEventStore()
;
const editedEvent = computed(() => store.editedEvent);
const tz = computed(() => convertCoordsToTz(editedEvent.value.location));

const datetime = computed(() =>
  getEventTime(editedEvent.value.utcTime, tz.value)
);
const eventTime = ref(datetime.value.split(" ")[0]);
const eventDate = ref(datetime.value.split(" ")[1]);

const onMapClick = (lonLat) => {
  editedEvent.value.location = lonLat;
};

const saveClicked = () => {
  editEventSchema
    .validate({
      eventName: editedEvent.value.name,
      eventDescription: editedEvent.value.description,
      eventDate: eventDate.value,
      eventTime: eventTime.value,
      ticketCount: editedEvent.value.ticketCount,
      price: editedEvent.value.price,
    })
    .then(() => {
      const eventDatetime = `${eventDate.value}T${eventTime.value}`;

      editedEvent.value.utcTime = moment
        .tz(eventDatetime, tz.value)
        .utc()
        .toISOString();
      store.editEvent(editedEvent.value);
      store.isEditing = false;
      router.push("/events");
      showNotification("Event edited successfully!");
    });
};

const cancelClicked = () => {
  store.isEditing = false;
};
</script>
