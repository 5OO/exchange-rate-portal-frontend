import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/history/:currency',
      name: 'history',
      component: () => import('../views/ExchangeRateHistoryView.vue')
    },
    {
      path: '/calculator',
      name: 'calculator',
      component: () => import('../views/CalculatorView.vue')
    }
  ]
})

export default router
