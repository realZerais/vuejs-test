import { createRouter, createWebHistory } from 'vue-router'
import UserPosts from '@/Components/UserPosts.vue'
import Users from '@/Components/Users.vue'

const routes = [
  // dynamic segments start with a colon
  { path: '/', name: 'Home', component: Users },
  { path: '/user/:id/posts', name: 'UserPosts', component: UserPosts },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
