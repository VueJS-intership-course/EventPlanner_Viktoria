<template>
    <div class="mb-3">
      <label :for="inputId" class="form-label">{{ label }}</label>
      <Field :type="type" :id="inputId" :name="inputId" v-model="inputValue"  class="form-control"/>
      <ErrorMessage :name="inputId" class="text-danger" />
    </div>
  </template>
  
  <script setup>
  import { Field, ErrorMessage } from "vee-validate";
  import { ref } from "vue";
  
  const props = defineProps({
    label: String,
    type: String,
    inputId: String,
    value: String,
  });
  
  const inputValue = ref(props.value);
  </script>
  