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
            <div class="mb-3">
              <label for="eventImage" class="form-label">Event Image</label>
              <Field
                type="file"
                class="form-control"
                id="eventImage"
                name="eventImage"
                @change="handleImageUpload"
              />
              <ErrorMessage name="eventImage" class="text-danger" />
            </div>
            <div class="mb-3">
              <label class="form-label">Event Location</label>
              <MapComponent
                :onMapClick="onMapClick"
                style="height: 500px; width: 600px"
              />
            </div>
            <button type="submit" class="btn btn-primary">Create Event</button>
          </Form>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import MapComponent from "@/components/maps/MapComponent.vue";
import Card from "@/components/Card.vue";
import { useEventStore } from "@/store/eventStore.js";
import { ref } from "vue";
import { useRouter } from "vue-router";
import moment from "moment-timezone";
import { Field, Form, ErrorMessage } from "vee-validate";
import { createEventSchema } from "@/utils/validationSchemas.js";
import { convertCoordsToTz } from "@/utils/coordsUtils.js";
import showNotification from "@/utils/toastifyNotification.js";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import InputField from "@/components/InputField.vue";

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
  const fbStorage = firebase.storage();
  const storageRef = fbStorage.ref();
  const imageRef = storageRef.child(`event_images/${eventName.value}`);

  try {
    await imageRef.put(imageFile);
    imageURL.value = await imageRef.getDownloadURL();
    console.log("Image uploaded successfully:", imageURL.value);
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};

const createEvent = (formData) => {
  const eventTimezone = convertCoordsToTz(location.value);
  const eventDatetime = `${formData.eventDate}T${formData.eventTime}`;

  const event = {
    name: formData.eventName,
    description: formData.eventDescription,
    utcTime: moment.tz(eventDatetime, eventTimezone).utc().toISOString(),
    ticketCount: formData.ticketCount,
    location: location.value,
    price: formData.price,
    budget: formData.budget,
    users: [],
    expenses: [],
    imageURL: imageURL.value,
  };
  try {
    eventStore.addEvent(event);
    router.push("/events");
  } catch (error) {
    console.error("Error while adding the event:", error);
    showNotification("Error adding the event");
  }
};
</script>
