<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <Card>
          <h2 class="card-title text-center mb-4">Create a new Event</h2>
          <Form @submit="createEvent" :validationSchema="createEventSchema">
            <InputField
              label="Event Name"
              inputId="eventName"
              v-model="eventName"
              type="text"
            />
            <InputField
              label="Event Description"
              inputId="eventDescription"
              v-model="eventDescription"
              type="textarea"
            />
            <InputField
              label="Event Date"
              inputId="eventDate"
              v-model="eventDate"
              type="date"
            />
            <InputField
              label="Event Time"
              inputId="eventTime"
              v-model="eventTime"
              type="time"
            />
            <InputField
              label="Ticket Count"
              inputId="ticketCount"
              v-model="ticketCount"
              type="number"
            />
            <InputField
              label="Ticket Price"
              inputId="price"
              v-model="price"
              type="number"
            />
            <InputField
              label="Event Budget"
              inputId="budget"
              v-model="budget"
              type="number"
            />
            <InputField
              label="Event Image"
              inputId="eventImage"
              type="file"
              @change="handleImageUpload"
            />
            <div class="mb-3">
              <label class="form-label">Event Location</label>
              <MapComponent :onMapClick="onMapClick" />
            </div>
            <button type="submit" class="btn btn-primary">Create Event</button>
          </Form>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useEventStore } from "@/store/eventStore.js";
import { useRouter } from "vue-router";
import moment from "moment-timezone";
import { Form } from "vee-validate";
import { createEventSchema } from "@/utils/validationSchemas.js";
import {
  convertCoordsToTz,
  getCountryFromCoords,
} from "@/utils/coordsUtils.js";
import showNotification from "@/utils/toastifyNotification.js";
import MapComponent from "@/components/maps/MapComponent.vue";
import Card from "@/components/Card.vue";
import InputField from "@/components/InputField.vue";
import fb from "@/firebase/fbConfig.js";

const router = useRouter();
const eventStore = useEventStore();

const eventName = ref("");
const eventDescription = ref("");
const eventDate = ref("");
const eventTime = ref("");
const ticketCount = ref("");
const price = ref("");
const budget = ref("");
const location = ref([]);
const imageURL = ref("");

const onMapClick = (lonLat) => {
  location.value = lonLat;
};

const handleImageUpload = async (event) => {
  const imageFile = event.target.files[0];
  const storageRef = fb.storage.ref();
  const imageRef = storageRef.child(`event_images/${eventName.value}`);

  try {
    await imageRef.put(imageFile);
    imageURL.value = await imageRef.getDownloadURL();
    showNotification("Image uploaded successfully");
  } catch (error) {
    showNotification("Error uploading image! Please try again");
    console.error("Error uploading image:", error);
  }
};

const createEvent = async () => {
  const eventTimezone = await convertCoordsToTz(location.value);
  const eventDatetime = `${eventDate.value}T${eventTime.value}`;

  console.log("Event Timezone:", eventTimezone);
  console.log("Event Datetime:", eventDatetime);
  const event = {
    name: eventName.value,
    description: eventDescription.value,
    utcTime: moment.tz(eventDatetime, eventTimezone).utc().toISOString(),
    ticketCount: ticketCount.value,
    location: location.value,
    country: await getCountryFromCoords(location.value),
    price: price.value,
    budget: budget.value,
    users: [],
    expenses: [],
    imageURL: imageURL.value,
  };
  try {
    console.log("Event:", event);
    eventStore.addEvent(event);
    router.push("/events");
  } catch (error) {
    console.error("Error while adding the event:", error);
    showNotification("Error adding the event");
  }
};
</script>
