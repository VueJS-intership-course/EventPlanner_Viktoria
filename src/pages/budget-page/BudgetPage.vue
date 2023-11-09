<template>
  <div class="container my-4">
    <h1 class="display-4">Budget for {{ event.name }}</h1>
    <p><strong>Start Budget:</strong> ${{ event.budget }}</p>
    <p v-if="revenue"><strong>Revenue from tickets:</strong> Revenue: ${{ revenue }}</p>
    <p v-if="revenue"><strong>Total Budget:</strong> ${{ totalBudget }}</p>

    <div class="row">
      <div class="col-md-6">
        <h2 class="mt-4">Expenses</h2>
        <ul class="list-group">
          <li v-for="category in expenseCategories" :key="category" class="list-group-item d-flex justify-content-between align-items-center">
            {{ category }} - ${{ getCategoryExpense(category) }}
          </li>

          <li class="list-group-item d-flex justify-content-between align-items-center">
            <strong>Total Expenses:</strong>
            <span class="badge bg-primary rounded-pill">${{ totalExpenses }}</span>
          </li>

          <li class="list-group-item d-flex justify-content-between align-items-center">
            <strong v-if="totalExpenses > totalBudget" class="text-danger">Over Budget:</strong>
            <strong v-if="totalExpenses < totalBudget" class="text-primary">Remaining Budget:</strong>

            <span class="badge bg-danger rounded-pill">${{ remainingBudget }}</span>
          </li>
        </ul>
      </div>
      <div class="col-md-6">
        <form @submit.prevent="addExpense" class="mt-4">
          <div class="mb-3">
            <label for="category" class="form-label">Expense Category</label>
            <select class="form-select" id="category" v-model="expense.category" required>
              <option value="Utilities">Utilities</option>
              <option value="Rent">Rent</option>
              <option value="Promotion">Promotion and Marketing</option>
              <option value="Equipment">Equipment and Supplies</option>
              <option value="Catering">Catering</option>
              <option value="Staff">Staff</option>
              <option value="Other">Other Expenses</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="cost" class="form-label">Expense Cost</label>
            <input type="number" class="form-control" id="cost" v-model="expense.cost" required>
          </div>
          <button type="submit" class="btn btn-primary">Add Expense</button>
        </form>
      </div>
    </div>
  </div>

</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useEventStore } from "@/store/eventStore";

const router = useRouter();
const eventStore = useEventStore();
const event = computed(() => eventStore.selectedEvent);

const expenseCategories = [
  "Utilities",
  "Rent",
  "Promotion",
  "Equipment",
  "Catering",
  "Staff",
  "Other"
];

const getCategoryExpense = (category) => {
  const categoryExpenses = groupedExpenses.value[category];
  return categoryExpenses ? categoryExpenses.reduce((acc, expense) => acc + expense.cost, 0) : 0;
};

const revenue = computed(() => {
  if (event.value)
    return event.value.users.length * event.value.price;
});

const totalBudget = computed(() => revenue.value + event.value.budget);

const expenses = computed(() => event.value.expenses);

const groupedExpenses = computed(() => {
  const grouped = {};
  if (!expenses.value) return;
  expenses.value.forEach((expense) => {
    if (!grouped[expense.category]) {
      grouped[expense.category] = [];
    }
    grouped[expense.category].push(expense);
  });
  return grouped;
});

const totalExpenses = computed(() => expenses.value.reduce((acc, expense) => acc + expense.cost, 0));

const remainingBudget = computed(() => totalBudget.value - totalExpenses.value);

const expense = ref({
  category: "utilities", 
  cost: 0,
});

const addExpense = async () => {
  try {
    await eventStore.addExpense(event.value, expense.value);
    expense.value = { category: "utilities", cost: 0 }; 
    eventStore.selectedEvent = eventStore.getEventById(event.value.id);
  } catch (error) {
    console.error("Error adding expense: ", error);
  }
};

</script>
