<template>
  <div class="card">
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  border-radius: 15px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.card-title {
  color: #333;
}
.btn:hover {
  background-color: #0056b3;
}
</style>
