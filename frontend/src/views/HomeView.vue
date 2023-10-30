<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';

const router = useRouter();

const logout = () => {
  localStorage.removeItem('isAuthenticated'); // Remove the authentication flag
  router.push({ name: 'Login' }); // Navigate back to the login screen
};
</script>


<template>
  <main>
    <div class="wrapper">
      <button class="btn-primary" @click="logout">Logout</button>
    </div>
  </main>
</template>

