<template>
  <div class="max-w-md mx-auto mt-20">
    <h1 class="text-2xl font-bold mb-6">Login</h1>
    <form @submit.prevent="login" class="space-y-4">
      <div>
        <label for="username" class="block text-sm font-semibold">Username</label>
        <input
          v-model="username"
          type="text"
          id="username"
          name="username"
          required
          class="w-full p-2 border rounded-md"
        />
      </div>
      <div>
        <label for="password" class="block text-sm font-semibold">Password</label>
        <input
          v-model="password"
          type="password"
          id="password"
          name="password"
          required
          class="w-full p-2 border rounded-md"
        />
      </div>
      <div class="mt-4">
        <button type="submit" class="w-full py-2 bg-blue-500 text-white rounded-md">
          Login
        </button>
      </div>
    </form>
    <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/users'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const userStore = useUserStore()

const login = async () => {
  try {
    const res = await $fetch('/api/login', {
      method: 'POST',
      body: {
        username: username.value,
        password: password.value
      }
    })

    if (res.success) {
      userStore.setUser(res.user)
      router.push('/')
    } else {
      error.value = res.message || 'Invalid credentials'
    }
  } catch (err) {
    error.value = 'An error occurred. Please try again later.'
  }
}
</script>

<style scoped>
/* You can use Tailwind for styling */
</style>
