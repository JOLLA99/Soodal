
<template>
  <div class="container">
    <Sidebar />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Sidebar from './components/sidebar.vue';
import Main from '@/components/Main.vue'
import DoughnutChart from '@/components/DoughnutChart.vue'
import RecentContract from '@/components/RecentContract.vue'
import PayTop from '@/components/PayTop.vue'
import CountTop from '@/components/CountTop.vue'
</script>

<style>
body {
  height: 100%;
  overflow: hidden;
}

.container {
  display: flex;
  width: 100%;
}

.sidebar {
  flex: 0 0 30%;
  /* Sidebar takes up 30% of the container width */
}

.content {
  padding: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 0 70%;
  /* Content takes up 70% of the container width */
}
</style>
