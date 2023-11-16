<template>
  <div class="mb-3">
    <label :for="inputId" class="form-label">{{ label }}</label>
    <Field
      :type="type"
      :id="inputId"
      :name="inputId"
      :value="value"
      @input="updateInputValue"
      class="form-control"
    />
    <ErrorMessage :name="inputId" class="text-danger" />
  </div>
</template>

<script setup>
import { Field, ErrorMessage } from "vee-validate";

const props = defineProps({
  label: String,
  type: String,
  inputId: String,
  value: [String, Number, Date]
});

const emit = defineEmits(["update:modelValue"]);

const updateInputValue = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>
