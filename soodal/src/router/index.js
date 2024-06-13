import { createRouter, createWebHistory } from 'vue-router';
// import Sidebar from '@/components/sidebar.vue';
import Main from '@/components/Main.vue';
import List from '@/components/List.vue'; 
import Preparation from '@/components/LoginGuide.vue';
import Calendar from '@/components/Calendar.vue';

const routes = [
  { path: '/', component: Preparation },
  { path: '/main', component: Main },
  { path: '/calendar', component: Calendar },
  { path: '/list', component: List },
  { path: '/data/:id', component: List }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
