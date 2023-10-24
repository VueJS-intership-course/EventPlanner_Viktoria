<template>
    <div class="home-page">
        <h1>Home Page</h1>

    <ul v-for="timezone in timezones" :key="timezone">
            <li>{{ timezone }}</li>
    </ul>
    </div>
</template>

<script setup>
import { useUserStore } from '../../store/userStore';
import { computed } from 'vue';
import {timezones} from "@/utils/timezones.js";

const store = useUserStore();
store.getAllUsers();
const allUsers = computed(() => store.allUsers);
</script>