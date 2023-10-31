<template>
    <div class="mb-3">
      <label for="timezone">Timezone:</label>
      <input
        class="form-control"
        v-model="timezone"
        @input="filterTimezones"
        @focus="isVisible = true"
        placeholder="Start typing..."
      />
      <ul v-show="isVisible" class="options-list">
        <li v-for="tz in filteredTimezones" @click="selectTimezone(tz)" :key="tz">
          {{ tz }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import {timezones} from "@/utils/timezones.js";
  
  const timezone = ref("");
  const isVisible = ref(false);
  
  const filteredTimezones = computed(() => {
    return timezones.filter((tz) => tz.toLowerCase().includes(timezone.value.toLowerCase()));
  });
  
  const filterTimezones = () => {
    isVisible.value = true;
  };
  
  const selectTimezone = (tz) => {
    timezone.value = tz;
    isVisible.value = false;
  };
  </script>
  
  <style scoped>
    .options-list {
      list-style: none;
      padding: 0;
      margin: 0;
      border: 1px solid #ccc;
      border-top: none;
      max-height: 150px; 
      overflow-y: auto;
    }
  
    .options-list li {
      padding: 10px;
      cursor: pointer;
    }
  
    .options-list li:hover {
      background-color: #ccc;
    }
  </style>
  