import { defineStore } from "pinia";
import { authService } from "@/services/userAuthentication.js";

export const useUserStore = defineStore("users", {
  state: () => ({
    user: null,
    allUsers: [],
  }),

  actions: {
    async setUser(user) {
      if (user) {
        this.user = await authService.getUser(user.uid);
      }
    },

    logout() {
      this.user = null;
      authService.logout();
    },

    async getAllUsers() {
      try {
        this.allUsers = await authService.getAll();
      } catch (error) {
        console.error("Error retrieving users:", error);
        throw error;
      }
    },
  },

  getters:{
    isAdmin(){
        return this.user.isAdmin;
    }
  }
});
