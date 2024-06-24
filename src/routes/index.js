import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/pages/TheHome.vue'

const router = createRouter({
  routes: [{ path: '/', component: Home }],

  history: createWebHashHistory()
})
export default router
