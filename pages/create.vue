<template>
    <div class="max-w-2xl mx-auto py-10 px-6 bg-white shadow rounded-lg mt-10">
        <h2 class="text-2xl font-semibold mb-6 text-gray-800">Add New Product</h2>

        <form @submit.prevent="handleSubmit" class="space-y-5">
            <!-- Product Name -->
            <div>
                <label class="block mb-1 text-sm font-medium text-gray-700">Name</label>
                <input v-model="form.name" type="text"
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Product name" required />
            </div>

            <!-- Price -->
            <div>
                <label class="block mb-1 text-sm font-medium text-gray-700">Price (rs)</label>
                <input v-model.number="form.price" type="number"
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="19.99" step="0.01" required />
            </div>

            <!-- Category -->
            <div>
                <label class="block mb-1 text-sm font-medium text-gray-700">Category</label>
                <input v-model="form.category" type="text"
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Apparel" required />
            </div>

            <!-- Description -->
            <div>
                <label class="block mb-1 text-sm font-medium text-gray-700">Description</label>
                <textarea v-model="form.description"
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4" placeholder="Product description..."></textarea>
            </div>

            <!-- Submit Button -->
            <div>
                <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                    Add Product
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '@/store/products'

const router = useRouter()
const store = useProductsStore()

const form = ref({
    name: '',
    price: '',
    category: '',
    description: '',
})

async function handleSubmit() {
    console.log("orm value:", form.value);

    await store.createProduct(form.value)
    router.push('/') // go back to index page
}
</script>
