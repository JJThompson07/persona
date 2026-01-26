import { createRouter, createWebHistory } from 'vue-router';
// Define your route components here
// import HomeView from '../views/HomeView.vue'

import { House, Waypoints } from 'lucide-vue-next';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        icon: House,
        label: 'Home',
      },
    },
    {
      path: '/experience',
      name: 'experience',
      component: () => import('../views/ExperienceView.vue'),
      meta: {
        icon: Waypoints,
        label: 'Experience',
      },
    },
  ],
});

export default router;
