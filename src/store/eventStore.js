import { defineStore } from "pinia";
import { eventService } from "../services/eventServices.js";

export const useEventStore = defineStore({
  id: "eventStore",
  state: () => ({
    events: [],
    coords: [],
  }),

  actions: {
    async getEventList() {
      try {
        this.events = await eventService.getAll();
      } catch (error) {
        console.error("Error fetching event list:", error);
      }
    },

    async getEventByID(id) {
      try {
        const event = await eventService.getEventByID(id);
        return event;
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    },

    async addEvent(event) {
      try {
        await eventService.addEvent(event);
        await this.getEventList();
        this.coords = [];
      } catch (error) {
        console.error("Error adding an event:", error);
      }
    },

    async removeEvent(event) {
      try {
        await eventService.deleteEvent(event);
        await this.getEventList();
      } catch (error) {
        console.error("Error removing an event:", error);
      }
    },

    async editEvent(event) {
      try {
        await eventService.editEvent(event);
        await this.getEventList();
      } catch (error) {
        console.error("Error editing an event:", error);
      }
    },

    setNewEventLocation(lon, lat) {
      this.coords = [lon, lat];
    },
  },

  getters: {
    // TODO
    // filteredProducts() {
    //   if (!this.events || this.selectedCategory === "all") {
    //     return this.events.filter(
    //       (event) =>
    //         event.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
    //         event.description
    //           .toLowerCase()
    //           .includes(this.searchQuery.toLowerCase())
    //     );
    //   }
    //   return this.events.filter(
    //     (event) =>
    //       event.category === this.selectedCategory &&
    //       (event.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
    //         event.description
    //           .toLowerCase()
    //           .includes(this.searchQuery.toLowerCase()))
    //   );
    // },
    // TODO
  },
});
