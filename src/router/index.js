import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/LandingHome.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/site',
      name: 'LandingHome',
      component: Home
    }
  ]
})

export default router