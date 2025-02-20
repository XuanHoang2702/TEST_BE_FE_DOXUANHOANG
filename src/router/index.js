import { createRouter, createWebHistory } from 'vue-router'
import FrontView from '../views/page/TestFront.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/test-front',
      name: 'FrontView',
      component: FrontView,
    },
  ],
})

export default router
