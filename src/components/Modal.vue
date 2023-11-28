<template>
  <div class="modal-backdrop show"></div>
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
const { title, modalId } = defineProps({
  title: {
    type: String,
    required: true,
  },
  modalId: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["save", "cancel"]);

const handleSave = () => {
  emit("save");
};

const handleCancel = () => {
  emit("cancel");
};
</script>

<style scoped>

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.modal-dialog {
  max-width: 500px;
}

.modal-body {
  padding: 20px;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>