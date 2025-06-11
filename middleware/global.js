import { useUserStore } from '../store/users'

export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore()

  // Allow access to the login page
  if (to.path === '/login') return

  // Redirect to login if user is not logged in
  if (!userStore.user) {
    return navigateTo('/login')
  }
})
