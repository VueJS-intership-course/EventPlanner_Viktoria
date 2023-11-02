<template>
  <div style="width: 50%" class="container mt-4">
    <h2>Create Event</h2>
    <Form @submit="createEvent" :validationSchema="vSchema">
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
        <label for="ticketCount" class="form-label">Available Tickets</label>
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
        <label for="ticketPrice" class="form-label">Ticket Price</label>
        <Field
          type="number"
          class="form-control"
          id="ticketPrice"
          name="ticketPrice"
          v-model="price"
          required
        />
        <ErrorMessage name="ticketPrice" class="text-danger" />
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
        <MapComponent :onMapClick="onMapClick" />
      </div>
      <button type="submit" class="btn btn-primary">Create Event</button>
    </Form>
  </div>
</template>

<script setup>
import MapComponent from "@/components/MapComponent.vue";
import { useEventStore } from "@/store/eventStore.js";
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  Field,
  Form,
  ErrorMessage,
} from "vee-validate";
import * as Yup from "yup";

const router = useRouter();
const eventStore = useEventStore();

const eventName = ref("");
const eventDescription = ref("");
const eventDate = ref("");
const eventTime = ref("");
const ticketCount = ref("");
const price = ref('');
const budget = ref('');
const location = ref([]);

const onMapClick = (lonLat) => {
  location.value = lonLat;
};

const createEvent = async () => {
  const isValid = await form.validate();
  if (isValid) {
    const event = {
      name: eventName.value,
      description: eventDescription.value,
      date: eventDate.value,
      time: eventTime.value,
      ticketCount: ticketCount.value,
      location: location.value,
      price: price.value,
      budget: budget.value,
      users: [],
    };
    eventStore.addEvent(event);
    router.push("/events");
  }
};

const vSchema = Yup.object({
  eventName: Yup.string().required("Event Name is required"),
  eventDescription: Yup.string().required("Event Description is required"),
  eventDate: Yup.date().required("Event Date is required")
    .test(
      "is-greater-than-today",
      "Event Date must be in the future",
      function (value) {
        return value > new Date();
      }
    ),
  eventTime: Yup.string().required("Event Time is required"),
  ticketCount: Yup.number()
    .typeError("Available Tickets must be a number")
    .required("Available Tickets is required")
    .min(1, "Available Tickets must be greater than 0"), 
  price: Yup.number()
    .typeError("Ticket Price must be a number")
    .required("Ticket Price is required")
    .min(0.01, "Ticket Price must be greater than 0"), 
  budget: Yup.number()
    .typeError("Event Budget must be a number")
    .required("Event Budget is required")
    .min(1, "Event Budget must be greater than 0"),
});

</script>
