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

    async logout() {
      this.user = null;
      await authService.logout();
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
