<template>
<InputField :componentProps="{class: 'custom'}" />

  <div class="mb-3" >
    <label :for="inputId" class="form-label">{{ label }}</label>
    <Field
      v-bind="fieldAttrs"
      :value="value"
      @input="updateInputValue"
      class="form-control"
    />
    <!-- use computed property that determinate "as" for vee validate -->
    <!-- <Field
      v-if="type === 'textarea'"
_
      as="textarea"
      :id="inputId"
      :name="inputId"
      :value="value"
      @input="updateInputValue"
      class="form-control"
    /> -->
    <ErrorMessage :name="inputId" class="text-danger" />
  </div>
</template>

<script setup>
import { Field, ErrorMessage } from "vee-validate";
import {computed} from 'vue';

const props = defineProps({
  inputAttrs: {
    type: Object,
    default: () => ({})
  },
  label: String,
  type: String,
  inputId: String,
  value: [String, Number, Date],
});

const emit = defineEmits(["update:modelValue"]);

const updateInputValue = (event) => {
  emit("update:modelValue", event.target.value);
};

const fieldAttrs = computed(() => {

  const attrs = {...props.inputAttrs.value}
  if (props.type.value === 'textarea') {
    attrs.as = 'textarea'
  }

  return attrs
})

</script>
