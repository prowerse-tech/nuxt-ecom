import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)

  onMounted(() => {
    try {
      const storedUser = localStorage.getItem('user')
      if (storedUser) user.value = JSON.parse(storedUser)
    } catch {
      user.value = null
    }
  })

  function setUser(newUser) {
    user.value = newUser
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  function logout() {
    localStorage.removeItem('user')
    user.value = null
  }

  return { user, setUser, logout }
})
