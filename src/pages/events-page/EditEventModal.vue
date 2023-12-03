<template>
  <modal
    title="Edit Event"
    modalId="editEventModal"
    @save="saveClicked"
    @cancel="cancelClicked"
  >
    <Form :validation-schema="editEventSchema">
      <InputField
        label="Event Name"
        inputId="eventName"
        v-model="store.editedEvent.name"
        :inputAttrs="{ type: 'text', name: 'eventName' }"
      />
      <InputField
        label="Event Description"
        inputId="eventDescription"
        v-model="store.editedEvent.description"
        :inputAttrs="{ type: 'textarea', name: 'eventDescription' }"
      />
      <InputField
        label="Event Date"
        inputId="eventDate"
        v-model="eventDate"
        :inputAttrs="{ type: 'date', name: 'eventDate' }"
      />
      <InputField
        label="Event Time"
        inputId="eventTime"
        v-model="eventTime"
        :inputAttrs="{ type: 'time', name: 'eventTime' }"
      />
      <InputField
        label="Ticket Count"
        inputId="ticketCount"
        v-model="store.editedEvent.ticketCount"
        :inputAttrs="{ type: 'number', name: 'ticketCount' }"
      />
      <InputField
        label="Ticket Price"
        inputId="price"
        v-model="store.editedEvent.price"
        :inputAttrs="{ type: 'number', name: 'price' }"
      />
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
import InputField from "@/components/InputField.vue";
import moment from "moment-timezone";
import { Form } from "vee-validate";
import MapComponent from "@/components/maps/MapComponent.vue";
import { getEventTime } from "@/utils/timeUtils.js";
import {
  convertCoordsToTz,
  getCountryFromCoords,
} from "@/utils/coordsUtils.js";
import { editEventSchema } from "@/utils/validationSchemas.js";
import showNotification from "@/utils/toastifyNotification.js";

const router = useRouter();
const store = useEventStore();

const tz = computed(() => convertCoordsToTz(store.editedEvent.location));

const datetime = computed(() =>
  moment(
    getEventTime(store.editedEvent.utcTime, tz.value),
    "DD MMM YYYY | HH:mm"
  ).format("HH:mm YYYY-MM-DD")
);
const eventTime = ref(datetime.value.split(" ")[0]);
const eventDate = ref(datetime.value.split(" ")[1]);

const onMapClick = (lonLat) => {
  store.editedEvent.location = lonLat;
};

const saveClicked = () => {
  editEventSchema
    .validate({
      eventName: store.editedEvent.name,
      eventDescription: store.editedEvent.description,
      eventDate: eventDate.value,
      eventTime: eventTime.value,
      ticketCount: store.editedEvent.ticketCount,
      price: store.editedEvent.price,
    })
    .then(async () => {
      const eventDatetime = `${eventDate.value}T${eventTime.value}`;

      store.editedEvent.utcTime = moment
        .tz(eventDatetime, tz.value)
        .utc()
        .toISOString();
      store.editedEvent.country = await getCountryFromCoords(
        store.editedEvent.location
      );
      store.editEvent(store.editedEvent);
      store.isEditing = false;
      router.push("/events");
      showNotification("Event edited successfully!");
    });
};

const cancelClicked = () => {
  store.isEditing = false;
};
</script>
