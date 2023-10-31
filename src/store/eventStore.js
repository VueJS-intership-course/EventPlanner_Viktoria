import { defineStore } from "pinia";
import { eventService } from "@/services/eventServices.js";
import tzlookup from "tz-lookup";
import { get } from "ol/proj";

export const useEventStore = defineStore({
  id: "eventStore",
  state: () => ({
    events: [],
    coords: [],
    isEditing: false,
    editedEvent: {
      id: "",
      name: "",
      description: "",
      date: "",
      time: "",
      location: [],
      ticketCount: "",
      price: "",
      budget: "",
    },
    selectedEvent: {},
    filterOptions: {
      fromDate: null,
      toDate: null,
      minPrice: null,
      maxPrice: null,
      availableTickets: true,
      soldOut: false,
    },
    searchQuery: "",
  }),

  actions: {
    async getEventList() {
      try {
        this.events = await eventService.getAll();
      } catch (error) {
        console.error("Error fetching event list:", error);
      }
    },

    async getEventById(id) {
      try {
        this.selectedEvent = await eventService.getEventById(id);
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

    setFilterOptions(options) {
      this.filterOptions = { ...options };
    },

    setSearchQuery(query) {
      this.searchQuery = query;
    },
  },

  getters: {
    filteredEvents() {
      const {
        fromDate,
        toDate,
        minPrice,
        maxPrice,
        availableTickets,
        soldOut,
      } = this.filterOptions;
      const filteredEvents = this.events.filter((event) => {
        // Filter by date range
        const eventDate = new Date(event.date);
        if (fromDate && eventDate < fromDate) return false;
        if (toDate && eventDate > toDate) return false;

        // Filter by ticket price range
        if (minPrice !== null && event.price < minPrice) return false;
        if (maxPrice !== null && event.price > maxPrice) return false;

        // Filter by availability
        if (availableTickets && event.ticketCount <= 0) return false;
        if (soldOut && event.ticketCount > 0) return false;

        // Filter by search query
        if (this.searchQuery) {
          const lowerCaseQuery = this.searchQuery.toLowerCase();
          if (
            !event.name.toLowerCase().includes(lowerCaseQuery) &&
            !event.description.toLowerCase().includes(lowerCaseQuery)
          ) {
            return false;
          }
        }

        return true;
      });

      return filteredEvents;
    },
  },
});
