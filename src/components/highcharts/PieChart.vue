<template>
    <div>
      <highcharts v-if="pieChartOptions" :options="pieChartOptions"></highcharts>
    </div>
  </template>
  
  <script setup>
  import { computed } from "vue";
  
const props = defineProps({
    groupedExpenses: {
      type: Object,
      required: true,
    },
    totalExpenses: {
      type: Number,
      required: true,
    },
  });
  
  const getCategoryExpensePercentage = (category) => {
    const categoryExpenses = props.groupedExpenses[category];
    const totalCategoryExpenses = categoryExpenses ? categoryExpenses.reduce((acc, expense) => acc + expense.cost, 0) : 0;
  
    return totalCategoryExpenses && props.totalExpenses
      ? ((totalCategoryExpenses / props.totalExpenses) * 100).toFixed(2)
      : 0;
  };
  
  const pieChartOptions = computed(() => {
    if (!props.groupedExpenses) return null;
  
    const categories = Object.keys(props.groupedExpenses);
    const data = categories.map(category => ({
      name: category,
      y: parseFloat(getCategoryExpensePercentage(category)),
    }));
  
    return {
      chart: {
        type: "pie",
      },
      title: {
        text: "Expense Categories",
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.2f}%</b>",
      },
      series: [
        {
            name: "Percentage",
          data,
        },
      ],
    };
  });
  </script>
  
  