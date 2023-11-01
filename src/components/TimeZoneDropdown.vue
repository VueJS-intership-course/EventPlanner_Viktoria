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
    <ul v-show="isVisible" class="tz-list">
      <li v-for="tz in filteredTimezones" @click="selectTimezone(tz)" :key="tz">
        {{ tz }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { timezones } from "@/utils/timezones.js";

const timezone = ref("");
const isVisible = ref(false);
const emit = defineEmits(["selected"]);

const filteredTimezones = computed(() => {
  return timezones.filter((tz) =>
    tz.toLowerCase().includes(timezone.value.toLowerCase())
  );
});

const filterTimezones = () => {
  isVisible.value = true;
};

const selectTimezone = (tz) => {
  timezone.value = tz;
  isVisible.value = false;
  emit("selected", tz);
};
</script>

<style scoped>
.tz-list {
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  border-top: none;
  max-height: 150px;
  overflow-y: auto;
}

.tz-list li {
  padding: 10px;
  cursor: pointer;
}

.tz-list li:hover {
  background-color: #ccc;
}
</style>
