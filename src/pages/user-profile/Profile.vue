<template>
  <section v-if="currentUser" class="vh-100" style="background-color: #eee">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-12 col-xl-4">
          <div class="card" style="border-radius: 15px">
            <div class="card-body text-center">
              <div class="mt-3 mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                  class="rounded-circle img-fluid"
                  style="width: 100px"
                />
              </div>
              <h4 class="mb-2">{{ currentUser.username }}</h4>
              <p class="text-muted mb-4">
                {{ currentUser.email }} <span class="mx-2">|</span>
                {{ currentUser.timezone }}
              </p>
              <button @click="editProfile" type="button" class="btn btn-primary btn-rounded btn-lg">
                Edit Profile
              </button>
              <div class="d-flex justify-content-between text-center mt-5 mb-2">
                <div>
                  <p class="mb-2 h5">2</p>
                  <p class="text-muted mb-0">Past Events</p>
                </div>
                <div class="px-3">
                  <p class="mb-2 h5">4</p>
                  <p class="text-muted mb-0">Total Events</p>
                </div>
                <div>
                  <p class="mb-2 h5">6</p>
                  <p class="text-muted mb-0">Upcoming events</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12 col-xl-4">
          <div class="card" style="border-radius: 15px">
            <div class="card-body text-center">
              <div class="mt-3 mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                  class="rounded-circle img-fluid"
                  style="width: 100px"
                />
              </div>
              <h4 class="mb-2">{{ currentUser.username }}</h4>
              <p class="text-muted mb-4">
                {{ currentUser.email }} <span class="mx-2">|</span>
                {{ currentUser.timezone }}
              </p>
              <button @click="editProfile" type="button" class="btn btn-primary btn-rounded btn-lg">
                Edit Profile
              </button>
              <div class="d-flex justify-content-between text-center mt-5 mb-2">
                <div>
                  <p class="mb-2 h5">2</p>
                  <p class="text-muted mb-0">Past Events</p>
                </div>
                <div class="px-3">
                  <p class="mb-2 h5">4</p>
                  <p class="text-muted mb-0">Total Events</p>
                </div>
                <div>
                  <p class="mb-2 h5">6</p>
                  <p class="text-muted mb-0">Upcoming events</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </section>
  <section v-if="!currentUser">
    <h3>You are currently not logged in</h3>
    <RouterLink to="/login">Log In</RouterLink> or <RouterLink to="/register">Sign up</RouterLink>
</section>
</template>

<script setup>
import { computed, ref } from "vue";
import { useUserStore } from "../../store/userStore";
import {timezones} from "@/utils/timezones.js";

const store = useUserStore();
const currentUser = computed(() => store.user);


const editProfile = () => {
    //TODO
  editedUser.value = { ...currentUser.value };
};

const editedUser = ref({});

const saveProfileChanges = () => {
    //TODO
};

</script>
