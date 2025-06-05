<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Product Management</h1>
      <NuxtLink to="/create" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Add Product
      </NuxtLink>
    </div>

    

    <!-- Search and Filter -->
    <div class="flex flex-wrap gap-4 mb-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by name..."
        class="w-full sm:w-1/2 px-4 py-2 border rounded"
      />
      <!-- Add more filters here -->
    </div>

    <!-- Product Table -->
    <div class="overflow-x-auto">
      <table class="w-full table-auto bg-white shadow rounded">
        <thead class="bg-gray-200">
          <tr>
            <th class="text-left px-4 py-2">Name</th>
            <th class="text-left px-4 py-2">Price</th>
            <th class="text-left px-4 py-2">Category</th>
            <th class="text-left px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in filteredProducts" :key="product.id" class="border-t">
            <td class="px-4 py-2">{{ product.name }}</td>
            <td class="px-4 py-2">${{ product.price }}</td>
            <td class="px-4 py-2">{{ product.category }}</td>
            <td class="px-4 py-2 space-x-2">
              <NuxtLink :to="`/edit/${product.id}`" class="text-blue-600 hover:underline">Edit</NuxtLink>
              <button @click="deleteProduct(product.id)" class="text-red-600 hover:underline">Delete</button>
            </td>
          </tr>
          <tr v-if="filteredProducts.length === 0">
            <td colspan="4" class="px-4 py-4 text-center text-gray-500">No products found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProductsStore } from '../store/products'

const store = useProductsStore()
const searchQuery = ref('')

onMounted(() => {
  store.fetchProducts()
})

const filteredProducts = computed(() => {
  if (!searchQuery.value) return store.products
  return store.products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

function deleteProduct(id) {
  if (confirm('Are you sure you want to delete this product?')) {
    store.deleteProduct(id)
  }
}
</script>
