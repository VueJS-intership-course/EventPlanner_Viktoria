import { defineStore } from "pinia";
import { authService } from "@/services/userAuthentication.js";

export const useUserStore = defineStore("users", {
  state: () => ({
    user: null,
    isEditing: false,
    editedUser: {
      email: "",
      username: "",
      timezone: "",
    },
  }),

  actions: {
    async setUser(user) {
      if (user) {
        this.user = await authService.getUser(user.uid);
      }
    },

    async getUser(email) {
      const user = await authService.getUser(email);
      this.user = user;
    },

    async logout() {
      this.user = null;
      await authService.logout();
    },

    async editUser(user) {
      try {
        await authService.editUser(user);
        this.user = user;
      } catch (error) {
        console.error("Error editing user:", error);
      }
    },

  },
  getters: {
    isAdmin() {
      if (this.user && this.user.isAdmin) return true;
    },

    isLogged() {
      if (this.user) return true;
    },
  },
});
