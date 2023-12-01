<template>
  <Header :key="$route.fullPath" />
  <RouterView />
</template>
<script setup>
import Header from "@/components/Header.vue";
</script>
