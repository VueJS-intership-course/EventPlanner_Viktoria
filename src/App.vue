<template>
  <Header />
  <!-- RouterView set key param to be $route.fullPath for example -->
  <RouterView />
</template>
<script setup>
import Header from "@/components/Header.vue";
</script>
