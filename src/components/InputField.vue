<template>
  <div class="mb-3">
    <label :for="inputId" class="form-label">{{ label }}</label>
    <Field
      v-bind="fieldAttrs"
      :modelValue="modelValue"
      @input="updateInputValue"
      class="form-control"
    />
    <ErrorMessage :name="inputId" class="text-danger" />
  </div>
</template>
  
  <script setup>
  import { Field, ErrorMessage } from "vee-validate";
  import { computed } from 'vue';
  
  const props = defineProps({
    inputAttrs: {
      type: Object,
      default: () => ({})
    },
    label: String,
    inputId: String,
    modelValue: [String, Number, Date],
  });
  
  const emit = defineEmits(["update:modelValue"]);
  
  const updateInputValue = (event) => {
    emit("update:modelValue", event.target.value);
  };
  
  const fieldAttrs = computed(() => {
    const attrs = { ...props.inputAttrs };
  
    if (props.inputAttrs.type === 'textarea') {
      attrs.as = 'textarea';
    }
  
    return attrs;
  });
  </script>
  