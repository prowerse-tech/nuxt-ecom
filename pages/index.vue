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
      <input v-model="searchQuery" type="text" placeholder="Search by name..."
        class="w-full sm:w-1/2 px-4 py-2 border rounded" />
      <!-- Add more filters here -->
    </div>

    <!-- Wrap filter and table in flex container -->
    <div class="flex flex-col md:flex-row gap-6">

      <!-- Product Filter (fixed width or flexible) -->
      <div class="md:w-1/4 bg-white p-4 rounded shadow">
        <h2 class="text-xl font-semibold mb-4">Filter Products</h2>
        <ProductFilter :products="store.products" @update:filteredProducts="updateFilteredProducts" />

      </div>

      <!-- Product Table (takes remaining width) -->
      <div class="flex-1 overflow-x-auto bg-white p-4 rounded shadow">
        <table class="w-full table-auto">
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

  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

import { ref, computed, onMounted } from 'vue'
import { useProductsStore } from '../store/products'
import ProductFilter from '../components/ProductFilter.vue'

const store = useProductsStore()
const searchQuery = ref('')
const filteredByFilter = ref([])

function updateFilteredProducts(filteredList) {
  filteredByFilter.value = filteredList
}

onMounted(async () => {
  await store.fetchProducts()
  filteredByFilter.value = store.products
})

const filteredProducts = computed(() => {
  if (!searchQuery.value) return filteredByFilter.value
  return filteredByFilter.value.filter(product =>
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

function deleteProduct(id) {
  if (confirm('Are you sure you want to delete this product?')) {
    store.deleteProduct(id)
  }
}

</script>
