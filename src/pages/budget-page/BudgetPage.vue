<template v-if="event">
  <div class="container my-4">
    <h1 class="display-4">Budget for {{ event.name }}</h1>
    <p><strong>Start Budget:</strong> ${{ event.budget }}</p>
    <p v-if="revenue"><strong>Revenue from tickets:</strong> ${{ revenue }}</p>
    <p v-if="revenue"><strong>Total Budget:</strong> ${{ totalBudget }}</p>
    <div class="row">
      <div class="col-md-6">
        <Card>
          <label class="fs-2">Expenses</label>
          <ul class="list-group">
            <li
              v-for="category in expenseCategories"
              :key="category"
              class="list-group-item d-flex justify-content-between align-items-center"
            >
              {{ category }} - ${{ getCategoryExpense(category) }}
              <div class="d-flex flex-wrap">
                <span
                  v-for="expense in groupedExpenses[category]"
                  :key="generateUniqueKey()"
                  class="badge bg-secondary rounded-pill mx-1"
                  @click="deleteExpense(category, expense.id)"
                  style="cursor: pointer"
                >
                  ${{ expense.cost }}
                  <i class="bi bi-x-circle-fill"></i>
                </span>
              </div>
            </li>
            <li
              class="list-group-item d-flex justify-content-between align-items-center"
            >
              <strong>Total Expenses:</strong>
              <span class="badge bg-primary rounded-pill"
                >${{ totalExpenses }}</span
              >
            </li>
            <li
              class="list-group-item d-flex justify-content-between align-items-center"
            >
              <strong v-if="totalExpenses > totalBudget" class="text-danger"
                >Over Budget:</strong
              >
              <strong v-if="totalExpenses < totalBudget" class="text-primary"
                >Remaining Budget:</strong
              >
              <span class="badge bg-danger rounded-pill"
                >${{ remainingBudget }}</span
              >
            </li>
          </ul>
        </Card>
      </div>
      <div class="col-md-6">
        <Card>
          <label class="fs-2">Track an expense</label>
          <Form
            @submit="addExpense"
            class="mt-4"
            :validationSchema="budgetSchema"
          >
            <div class="mb-3">
              <label for="category" class="form-label">Expense Category</label>
              <select
                class="form-select"
                id="category"
                v-model="expense.category"
                required
              >
                <option value="Utilities">Utilities</option>
                <option value="Rent">Rent</option>
                <option value="Promotion">Promotion and Marketing</option>
                <option value="Equipment">Equipment and Supplies</option>
                <option value="Catering">Catering</option>
                <option value="Staff">Staff</option>
                <option value="Other">Other Expenses</option>
              </select>
            </div>
            <InputField
              label="Expense Cost"
              inputId="cost"
              v-model.number="expense.cost"
              type="number"
            />
            <button type="submit" class="btn btn-primary">Add Expense</button>
          </Form>
        </Card>

        <Card class="mt-4">
          <ExpensePieChart
            :groupedExpenses="groupedExpenses"
            :totalExpenses="totalExpenses"
          />
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { expenseCategories } from "@/utils/constants.js";
import { useEventStore } from "@/store/eventStore";
import ExpensePieChart from "@/components/highcharts/PieChart.vue";
import generateUniqueKey from "@/utils/randomUUID.js";
import InputField from "@/components/InputField.vue";
import { budgetSchema } from "@/utils/validationSchemas.js";
import { Form } from "vee-validate";
import Card from "../../components/Card.vue";

const eventStore = useEventStore();
const event = computed(() => eventStore.selectedEvent);

const getCategoryExpense = (category) => {
  const categoryExpenses = groupedExpenses.value[category];
  return categoryExpenses
    ? categoryExpenses.reduce((acc, expense) => acc + expense.cost, 0)
    : 0;
};

// revenue from ticket sales
const revenue = computed(() => {
  if (event.value.users) return event.value.users.length * event.value.price;
});

const totalBudget = computed(() => revenue.value + event.value.budget);
const expenses = computed(() => event.value.expenses);

const groupedExpenses = computed(() => {
  const grouped = {};
  if (!expenses.value) return grouped;
  expenses.value.forEach((expense) => {
    if (!grouped[expense.category]) {
      grouped[expense.category] = [];
    }
    grouped[expense.category].push(expense);
  });
  return grouped;
});

const totalExpenses = computed(() => {
  if (expenses.value)
    return Number(
      expenses.value.reduce((acc, expense) => acc + expense.cost, 0)
    );
});

const remainingBudget = computed(() => totalBudget.value - totalExpenses.value);

const expense = ref({
  category: "Utilities",
  cost: 0,
  id: "",
});

const addExpense = async () => {
  try {
    await eventStore.addExpense(event.value, expense.value);
    expense.value = { category: "", cost: 0, id: generateUniqueKey() };
    eventStore.selectedEvent = eventStore.getEventById(event.value.id);
  } catch (error) {
    console.error("Error adding expense: ", error);
  }
};

const deleteExpense = async (category, expenseId) => {
  try {
    await eventStore.deleteExpense(event.value, category, expenseId);
    eventStore.selectedEvent = eventStore.getEventById(event.value.id);
  } catch (error) {
    console.error("Error deleting expense: ", error);
  }
};
</script>

<style lang="scss" scoped>
.display-4 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.lead {
  font-size: 1.2rem;
  margin-bottom: 15px;
}

.list-group-item {
  border: none;
}

.list-group-item strong {
  margin-right: 5px;
}

.badge {
  padding: 6px 10px;
  font-size: 0.9rem;
  margin-right: 5px;
  cursor: pointer;
}

.text-danger {
  color: #dc3545;
}

.text-primary {
  color: #007bff;
}

.form-select {
  padding: 8px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.btn {
  border-radius: 5px;
  font-size: 1rem;
  padding: 8px 16px;
  margin-top: 10px;
}
</style>
