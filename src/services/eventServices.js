import fb from "@/firebase/fbConfig.js";
import generateUniqueKey from "@/utils/randomId.js";
import { useUserStore } from "@/store/userStore.js";
import moment from "moment-timezone";

export const eventService = {
  async getAll() {
    try {
      const data = [];
      const querySnapshot = await fb.fireStore.collection("events").get();

      querySnapshot.forEach((doc) => {
        const {
          id,
          name,
          description,
          utcTime,
          location,
          ticketCount,
          price,
          budget,
          users,
        } = doc.data();
        const event = {
          id,
          name,
          description,
          utcTime,
          location,
          ticketCount,
          price,
          budget,
          users,
        };
        data.push(event);
      });
      return data;
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  },

  async getEventById(id) {
    try {
      const querySnapshot = await fb.fireStore
        .collection("events")
        .where("id", "==", id)
        .get();
      if (querySnapshot.docs.length > 0) {
        const eventData = querySnapshot.docs[0].data();
        return eventData;
      } else {
        console.log("Event document does not exist.");
        return null;
      }
    } catch (error) {
      console.error("Error retrieving event data:", error);
      throw error;
    }
  },

  async addEvent(event) {
    try {
      event.id = generateUniqueKey();
      await fb.fireStore.collection("events").add({
        id: event.id,
        name: event.name,
        description: event.description,
        date: event.date,
        time: event.time,
        utcTime: event.utcTime,
        location: event.location,
        ticketCount: event.ticketCount,
        price: event.price,
        budget: event.budget,
        users: event.users,
      });
    } catch (error) {
      console.error("Error adding an event:", error);
      throw error;
    }
  },

  async deleteEvent(event) {
    const querySnapshot = await fb.fireStore
      .collection("events")
      .where("id", "==", event.id)
      .get();
    if (querySnapshot.docs.length > 0) {
      const doc = querySnapshot.docs[0];
      try {
        await doc.ref.delete();
      } catch (error) {
        console.error("Error removing event: ", error);
      }
    }
  },

  async editEvent(event) {
    const querySnapshot = await fb.fireStore
      .collection("events")
      .where("id", "==", event.id)
      .get();

    const doc = querySnapshot.docs[0];
    try {
      await doc.ref.update({
        id: event.id,
        name: event.name,
        description: event.description,
        date: event.date,
        time: event.time,
        utcTime: event.utcTime,
        location: event.location,
        ticketCount: event.ticketCount,
        price: event.price,
        budget: event.budget,
      });
    } catch (error) {
      console.error("Error editing event: ", error);
    }
  },

  async buyTicket(event) {
    const querySnapshot = await fb.fireStore
      .collection("events")
      .where("id", "==", event.id)
      .get();

    const doc = querySnapshot.docs[0];
    try {
      if (Array.isArray(event.users)) {
        const updatedUsers = [...event.users, useUserStore().user.email];

        await doc.ref.update({
          ticketCount: event.ticketCount - 1,
          users: updatedUsers,
        });
      } else {
        console.error("event.users is not an array");
      }
    } catch (error) {
      console.error("Error buying ticket: ", error);
    }
  },
};
