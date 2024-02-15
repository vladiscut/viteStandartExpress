import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Signin from '../views/SignIn.vue'
import { useAuthStore } from '../stores/auth'
import TableMembers from '../views/TableMembers.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin,
      meta: {
        auth: false
      }
    },
    {
      path: '/table',
      name: 'table',
      component: TableMembers,
      meta: {
        auth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.auth && !authStore.UserInfo.token) {
    next('/signin')
  } else if (!to.meta.auth && authStore.UserInfo.token) {
    next('/table')
  } else {
    next()
  }
})
export default router
