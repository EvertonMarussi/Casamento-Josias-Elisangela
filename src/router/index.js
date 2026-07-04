import { createRouter, createWebHistory } from 'vue-router'
import rotasSite from './site'

const routes =  [ ...rotasSite ]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router