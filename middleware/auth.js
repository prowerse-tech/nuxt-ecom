import { useUserStore } from '../store/users'
export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore()

  const publicPages = ['/login', '/register'] // Add more if needed

  if (publicPages.includes(to.path)) return

  if (!userStore.user) {
    return navigateTo('/login')
  }
})
