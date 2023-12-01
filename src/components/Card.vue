<template>
  <div class="card custom-card">
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.custom-card {
  border-radius: 15px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}
</style>
