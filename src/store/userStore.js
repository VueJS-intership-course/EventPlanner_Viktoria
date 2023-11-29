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

    async login(email, password) {
      const user = await authService.login(email, password);
      this.user = user;
    },
    async logout() {
      this.user = null;
      await authService.logout();
    },

    async register(email, password) {
      const user = await authService.register(email, password);
      this.user = user;
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
      return this.user && this.user.isAdmin;
    },

    isLogged() {
      return Boolean(this.user);
    },
  },
});
