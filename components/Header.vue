<template>
  <header v-if="user" class="bg-white shadow-md px-6 py-4 flex justify-between items-center">
    <NuxtLink to="/" class="text-xl font-bold text-blue-600">Ecom-admin</NuxtLink>

    <div class="flex items-center gap-4">
      <NuxtLink to="/profile" class="text-gray-700 hover:text-blue-600">Profile</NuxtLink>
      <button
        @click="logout"
        class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  </header>
</template>

<script setup>
import { useUserStore } from '../store/users'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const user = computed(() => userStore.user)


const logout = () => {
  userStore.logout()
  router.push('/login')
}
</script>
