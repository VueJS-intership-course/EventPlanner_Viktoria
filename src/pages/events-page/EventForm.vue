<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <Card>
          <h2 class="card-title text-center mb-4">
            {{ eventId ? "Edit" : "Create" }} Event
          </h2>
          <Form
            @submit="handleSubmit"
            :validationSchema="eventId ? editEventSchema : createEventSchema"
          >
            <InputField
              label="Event Name"
              inputId="eventName"
              v-model="eventName"
              :inputAttrs="{ type: 'text', name: 'eventName' }"
            />
            <InputField
              label="Event Description"
              inputId="eventDescription"
              v-model="eventDescription"
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
              v-model="ticketCount"
              :inputAttrs="{ type: 'number', name: 'ticketCount' }"
            />
            <InputField
              label="Ticket Price"
              inputId="price"
              v-model="price"
              :inputAttrs="{ type: 'number', name: 'price' }"
            />
            <InputField
              v-if="!eventId"
              label="Event Budget"
              inputId="budget"
              v-model="budget"
              :inputAttrs="{ type: 'number', name: 'budget' }"
            />
            <InputField
              v-if="!eventId"
              label="Event Image"
              inputId="eventImage"
              :inputAttrs="{ type: 'file', name: 'eventImage' }"
              @change="handleImageUpload"
            />
            <div class="mb-3">
              <label class="form-label">Event Location</label>
              <MapComponent :onMapClick="onMapClick" />
            </div>
            <button type="submit" class="btn btn-primary">
              {{ eventId ? "Save Changes" : "Create Event" }}
            </button>
          </Form>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useEventStore } from "@/store/eventStore.js";
import { useRouter, useRoute } from "vue-router";
import { getEventTime } from "@/utils/timeUtils.js";
import moment from "moment-timezone";
import { Form } from "vee-validate";
import {
  createEventSchema,
  editEventSchema,
} from "@/utils/validationSchemas.js";
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
const route = useRoute();

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

const eventId = ref(route.params.id || null);
if (eventId.value) {
  eventStore.getEventById(eventId.value);
}

const onMapClick = (lonLat) => {
  location.value = lonLat;
};

// create event logic
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

const handleCreate = async () => {
  const eventTimezone = await convertCoordsToTz(location.value);
  const eventDatetime = `${eventDate.value}T${eventTime.value}`;

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
    eventStore.addEvent(event);
    router.push("/events");
  } catch (error) {
    console.error("Error while adding the event:", error);
    showNotification("Error adding the event");
  }
};

// edit event logic
const handleEdit = async () => {
  editEventSchema
    .validate({
      eventName: eventName.value,
      eventDescription: eventDescription.value,
      eventDate: eventDate.value,
      eventTime: eventTime.value,
      ticketCount: ticketCount.value,
      price: price.value,
    })
    .then(async () => {
      const eventDatetime = `${eventDate.value}T${eventTime.value}`;
      const eventTimezone = await convertCoordsToTz(location.value);

      eventStore.selectedEvent.name = eventName.value;
      eventStore.selectedEvent.description = eventDescription.value;
      eventStore.selectedEvent.utcTime = moment
        .tz(eventDatetime, eventTimezone)
        .utc()
        .toISOString();
      eventStore.selectedEvent.ticketCount = ticketCount.value;
      eventStore.selectedEvent.location = location.value;
      eventStore.selectedEvent.country = await getCountryFromCoords(
        location.value
      );
      eventStore.selectedEvent.price = price.value;
      eventStore.editEvent(eventStore.selectedEvent);
      router.push("/events");
      showNotification("Event edited successfully!");
    });
};

const handleSubmit = () => {
  if (eventId.value) {
    handleEdit();
  } else {
    handleCreate();
  }
};

onMounted(async () => {
  if (eventId.value) {
    const tz = computed(() =>
      convertCoordsToTz(eventStore.selectedEvent.location)
    );

    const datetime = computed(() =>
      moment(
        getEventTime(eventStore.selectedEvent.utcTime, tz.value),
        "DD MMM YYYY | HH:mm"
      ).format("HH:mm YYYY-MM-DD")
    );
    eventName.value = eventStore.selectedEvent.name;
    eventDescription.value = eventStore.selectedEvent.description;
    eventTime.value = datetime.value.split(" ")[0];
    eventDate.value = datetime.value.split(" ")[1];
    location.value = eventStore.selectedEvent.location;
    ticketCount.value = eventStore.selectedEvent.ticketCount;
    price.value = eventStore.selectedEvent.price;
  }
});
</script>
