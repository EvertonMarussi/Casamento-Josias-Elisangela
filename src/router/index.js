import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/LandingHome.vue'

const routes = [
  {
    path: '/',
    name: 'LandingHome',
    component: Home
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router