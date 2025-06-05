<template>
  <div class="max-w-2xl mx-auto py-10 px-6 bg-white shadow rounded-lg mt-10">
    <h2 class="text-2xl font-semibold mb-6 text-gray-800">Edit Product</h2>

    <form @submit.prevent="handleSubmit" class="space-y-5">
      <!-- Product Name -->
      <div>
        <label class="block mb-1 text-sm font-medium text-gray-700">Name</label>
        <input
          v-model="form.name"
          type="text"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <!-- Price -->
      <div>
        <label class="block mb-1 text-sm font-medium text-gray-700">Price (Rs)</label>
        <input
          v-model.number="form.price"
          type="number"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <!-- Category -->
      <div>
        <label class="block mb-1 text-sm font-medium text-gray-700">Category</label>
        <input
          v-model="form.category"
          type="text"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <!-- Description -->
      <div>
        <label class="block mb-1 text-sm font-medium text-gray-700">Description</label>
        <textarea
          v-model="form.description"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
        ></textarea>
      </div>

      <!-- Submit Button -->
      <div>
        <button
          type="submit"
          class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Update Product
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '@/store/products'

const route = useRoute()
const router = useRouter()
const store = useProductsStore()

const form = ref({
  name: '',
  price: '',
  category: '',
  description: '',
})

const productId = parseInt(route.params.id)

onMounted(() => {
  const product = store.products.find((p) => p.id === productId)
  if (!product) {
    // Optional: fetch from API if not found in store
    return alert('Product not found')
  }

  form.value = { ...product }
})

async function handleSubmit() {
  await store.updateProduct(productId, form.value)
  router.push('/')
}
</script>
