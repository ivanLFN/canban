import { createRouter, createWebHistory } from 'vue-router'
import CanbanView from '../views/CanbanView.vue'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: CanbanView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
