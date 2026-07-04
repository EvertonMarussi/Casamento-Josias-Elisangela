import { createRouter, createWebHistory } from 'vue-router'
import rotasSite from './site'

const routes =  [ ...rotasSite ]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router