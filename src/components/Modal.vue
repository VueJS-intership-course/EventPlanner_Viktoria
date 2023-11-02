<template>
  <div class="modal show" style="display: block">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" :id="modalId">{{ title }}</h5>
          <button type="button" class="close" @click="handleCancel">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="handleSave">
            Save
          </button>
          <button type="button" class="btn btn-secondary" @click="handleCancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

const { title, modalId, saveFunction, cancelFunction } = defineProps([
  "title",
  "modalId",
  "saveFunction",
  "cancelFunction",
]);
const emit = defineEmits(["save", "cancel" ]);

const handleSave = () => {
  emit("save");
  if (saveFunction) {
    saveFunction();
  }
};

const handleCancel = () => {
  emit("cancel");
  if (cancelFunction) {
    cancelFunction();
  }
};
</script>
