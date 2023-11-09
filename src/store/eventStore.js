import { defineStore } from "pinia";
import { eventService } from "@/services/eventServices.js";

export const useEventStore = defineStore({
  id: "eventStore",
  state: () => ({
    events: [],
    isEditing: false,
    editedEvent: {},
    selectedEvent: {},
    filterOptions: {
      fromDate: null,
      toDate: null,
      minPrice: null,
      maxPrice: null,
      searchQuery: "",
      ticketStatus: "all",
    },
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

    async buyTicket(event) {
      try {
        await eventService.buyTicket(event);
        await this.getEventList();
      } catch (error) {
        console.error("Error buying a ticket:", error);
      }
    },

    async addExpense(event, expense){
      try {
        await eventService.addExpense(event, expense);
        await this.getEventList();
      } catch (error) {
        console.error("Error adding an expense:", error);
      }
    },

    applyFilters() {
      this.filterOptions = {
        fromDate: this.filterOptions.fromDate,
        toDate: this.filterOptions.toDate,
        minPrice: this.filterOptions.minPrice,
        maxPrice: this.filterOptions.maxPrice,
        searchQuery: this.filterOptions.searchQuery,
        ticketStatus: this.filterOptions.ticketStatus,
      };
    },

    resetFilters() {
      this.filterOptions = {
        fromDate: null,
        toDate: null,
        minPrice: null,
        maxPrice: null,
        searchQuery: "",
        ticketStatus: "all",
      };
      this.applyFilters();
    },
  },

  getters: {
    filteredEvents() {
      const {
        fromDate,
        toDate,
        minPrice,
        maxPrice,
        searchQuery,
        ticketStatus,
      } = this.filterOptions;

      return this.events.filter((event) => {
        const eventDate = event.utcTime.split("T")[0];

        if (fromDate && eventDate < fromDate) return false;
        if (toDate && eventDate > toDate) return false;
        if (minPrice !== null && event.price < minPrice) return false;
        if (maxPrice !== null && event.price > maxPrice) return false;
        if (ticketStatus === "available" && event.ticketCount <= 0)
          return false;
        if (ticketStatus === "sold-out" && event.ticketCount > 0) return false;
        if (searchQuery) {
          const lowerCaseQuery = searchQuery.toLowerCase();
          if (
            !event.name.toLowerCase().includes(lowerCaseQuery) &&
            !event.description.toLowerCase().includes(lowerCaseQuery)
          ) {
            return false;
          }
        }

        return true;
      });
    },
  },
});
