<template>
  <Sidebar />
  <div class="content">
    <router-view />
  </div>

</template>

<script setup>
import Sidebar from './components/sidebar.vue';
// import LoginGuide from './components/LoginGuide.vue';
</script>

<style>
.content {
  /* display: flex; */
  align-items: center;
  justify-content: center;
  flex: 1;
  margin: 0;
  padding: 0;
}
</style>