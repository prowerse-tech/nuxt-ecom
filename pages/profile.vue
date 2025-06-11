<template>
  <div class="max-w-xl mx-auto mt-10">
    <h1 class="text-2xl font-bold mb-4">Profile</h1>
    <div v-if="user" class="p-4 border rounded">
      <p><strong>Username:</strong> {{ user.username }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
    </div>
    <div v-else>
      <p>Loading user info...</p>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '../store/users'

definePageMeta({
  middleware: 'auth' 
})

const userStore = useUserStore()
const user = userStore.user
</script>
