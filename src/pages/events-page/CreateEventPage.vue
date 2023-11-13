<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title text-center mb-4">Create a new Event</h2>
            <Form @submit="createEvent" :validationSchema="createEventSchema">
              <div class="mb-3">
                <label for="eventName" class="form-label">Event Name</label>
                <Field
                  type="text"
                  class="form-control"
                  id="eventName"
                  name="eventName"
                  v-model="eventName"
                />
                <ErrorMessage name="eventName" class="text-danger" />
              </div>
              <div class="mb-3">
                <label for="eventDescription" class="form-label"
                  >Event Description</label
                >
                <Field
                  as="textarea"
                  class="form-control"
                  id="eventDescription"
                  name="eventDescription"
                  v-model="eventDescription"
                  required
                />
                <ErrorMessage name="eventDescription" class="text-danger" />
              </div>
              <div class="mb-3">
                <label for="eventDate" class="form-label">Event Date</label>
                <Field
                  type="date"
                  class="form-control"
                  id="eventDate"
                  name="eventDate"
                  v-model="eventDate"
                  required
                />
                <ErrorMessage name="eventDate" class="text-danger" />
              </div>
              <div class="mb-3">
                <label for="eventTime" class="form-label">Event Time</label>
                <Field
                  type="time"
                  class="form-control"
                  id="eventTime"
                  name="eventTime"
                  v-model="eventTime"
                  required
                />
                <ErrorMessage name="eventTime" class="text-danger" />
              </div>
              <div class="mb-3">
                <label for="ticketCount" class="form-label"
                  >Available Tickets</label
                >
                <Field
                  type="number"
                  class="form-control"
                  id="ticketCount"
                  name="ticketCount"
                  v-model="ticketCount"
                  required
                />
                <ErrorMessage name="ticketCount" class="text-danger" />
              </div>
              <div class="mb-3">
                <label for="price" class="form-label">Ticket Price</label>
                <Field
                  type="number"
                  class="form-control"
                  id="price"
                  name="price"
                  v-model="price"
                  required
                />
                <ErrorMessage name="price" class="text-danger" />
              </div>
              <div class="mb-3">
                <label for="budget" class="form-label">Event Budget</label>
                <Field
                  type="number"
                  class="form-control"
                  id="budget"
                  name="budget"
                  v-model="budget"
                  required
                />
                <ErrorMessage name="budget" class="text-danger" />
              </div>
              <div class="mb-3">
                <label class="form-label">Event Location</label>
                <MapComponent
                  :onMapClick="onMapClick"
                  style="height: 500px; width: 600px"
                />
              </div>
              <button type="submit" class="btn btn-primary">
                Create Event
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MapComponent from "@/components/MapComponent.vue";
import { useEventStore } from "@/store/eventStore.js";
import { ref } from "vue";
import { useRouter } from "vue-router";
import moment from "moment-timezone";
import { Field, Form, ErrorMessage } from "vee-validate";
import { createEventSchema } from "@/utils/validationSchemas.js";
import { convertCoordsToTz } from "@/utils/coordsUtils.js";
import showNotification from "@/utils/toastifyNotification.js";

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

const onMapClick = (lonLat) => {
  location.value = lonLat;
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
  };
  try {
    eventStore.addEvent(event);
    router.push("/events");
  } catch (error) {
    console.error("Error while adding the event:", error);
    showNotification("Error addin the event");
  }
};
</script>
