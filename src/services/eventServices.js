import fb from "@/firebase/fbConfig.js";
import generateUniqueKey from "@/utils/randomId.js";

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
          time,
          date,
          location,
          ticketCount,
          price,
        } = doc.data();
        const event = {
          id,
          name,
          description,
          date,
          time,
          location,
          ticketCount,
          price,
        };
        data.push(event);
      });
      return data;
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  },

  async getEventByID(id) {
    try {
      const querySnapshot = await fb.fireStore
        .collection("events")
        .where("id", "==", id)
        .get();
      if (querySnapshot.docs.length > 0) {
        const eventData = querySnapshot.data();
        console.log(eventData);
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
        location: event.location,
        ticketCount: event.ticketCount,
        price: event.price,
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
        location: event.location,
        ticketCount: event.ticketCount,
        price: event.price,
      });
    } catch (error) {
      console.error("Error editing event: ", error);
    }
  },
};
