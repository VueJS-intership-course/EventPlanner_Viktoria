import fb from "@/firebase/fbConfig.js";
import generateUniqueKey from "@/utils/randomUUID.js";
import { customFirebaseOperation } from "@/firebase/fbConfig.js";

export const eventService = {
  async getAll() {
    const querySnapshot = await fb.fireStore.collection("events").get();
    const data = querySnapshot.docs.map((doc) => doc.data());
    return data;
  },

  async getEventById(id) {
    const querySnapshot = await customFirebaseOperation(
      "events",
      "get",
      { id }
    );
    if (querySnapshot.docs.length > 0) {
      return querySnapshot.docs[0].data();
    }
    console.log("Event document does not exist.");
    return null;
  },

  async addEvent(event) {
    await customFirebaseOperation("events", "add", {
      id: generateUniqueKey(),
      ...event,
    });
  },

  async deleteEvent(event) {
    await customFirebaseOperation("events", "delete", event);
  },

  async editEvent(event) {
    await customFirebaseOperation("events", "update", event);
  },

  async buyTicket(event) {
    const currentUserEmail = useUserStore().user.email;
    if (Array.isArray(event.users)) {
      const updatedUsers = [...event.users, currentUserEmail];
      await customFirebaseOperation("events", "update", {
        ...event,
        ticketCount: event.ticketCount - 1,
        users: updatedUsers,
      });
    } else {
      console.error("event.users is not an array");
    }
  },

  async addExpense(event, expense) {
    await customFirebaseOperation("events", "update", {
      ...event,
      expenses: [...event.expenses, expense],
    });
  },

  async deleteExpense(event, category, expenseId) {
    const updatedExpenses = event.expenses.filter(
      (expense) => !(expense.category === category && expense.id === expenseId)
    );
    await customFirebaseOperation("events", "update", {
      ...event,
      expenses: updatedExpenses,
    });
  },
};
