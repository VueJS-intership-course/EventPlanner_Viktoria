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
          v-model="date"
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
          v-model="time"
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
import { computed, ref } from "vue";
import { useEventStore } from "@/store/eventStore.js";
import { useRouter } from "vue-router";
import Modal from "@/components/Modal.vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import MapComponent from "./MapComponent.vue";
import { getEventTime} from "@/utils/transformTime.js";
import convertCoordsToTz from "@/utils/getTzFromCoords.js";
import moment from "moment-timezone";

const router = useRouter();

const store = useEventStore();
const editedEvent = computed(() => store.editedEvent);

console.log(editedEvent.value.location);
const tz = computed(() => convertCoordsToTz(editedEvent.value.location));


const datetime = computed(() => getEventTime(editedEvent.value.utcTime, tz.value));
const time = ref(datetime.value.split(" ")[0]);
const date = ref(datetime.value.split(" ")[1]);

const modalTitle = "Edit Event";
const modalId = "editEventModal";

const onMapClick = (lonLat) => {
  editedEvent.value.location = lonLat;
};

const saveClicked = () => {
  const eventDatetime = `${date.value}T${time.value}`;

  editedEvent.value.utcTime = moment.tz(eventDatetime, tz.value).utc().toISOString()
  store.editEvent(editedEvent.value);
  store.isEditing = false;
  router.push("/events");
};

const cancelClicked = () => {
  store.isEditing = false;
};

</script>
