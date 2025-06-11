<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  products: {
    type: Array,
    required: true
  }
})

// Category options derived from products
const categories = computed(() => {
  const set = new Set(props.products.map(p => p.category))
  return Array.from(set)
})

const selectedCategory = ref('')
const priceSort = ref('') // '', 'asc', 'desc'

// Filter and sort products
const filteredProducts = computed(() => {
  let filtered = props.products

  // Filter by category
  if (selectedCategory.value) {
    filtered = filtered.filter(p => p.category === selectedCategory.value)
  }

  // Sort by price
  if (priceSort.value === 'asc') {
    filtered = filtered.slice().sort((a, b) => a.price - b.price)
  } else if (priceSort.value === 'desc') {
    filtered = filtered.slice().sort((a, b) => b.price - a.price)
  }

  return filtered
})

// Emit filtered result to parent so it can render list
import { watch, defineEmits } from 'vue'
const emit = defineEmits(['update:filteredProducts'])

watch(filteredProducts, (val) => {
  emit('update:filteredProducts', val)
}, { immediate: true })
</script>

<template>
  <div>
    <label class="block mb-3">
      Category:
      <select v-model="selectedCategory" class="border rounded px-3 py-1 w-full">
        <option value="">All Categories</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </label>

    <label class="block mb-3">
      Sort by Price:
      <select v-model="priceSort" class="border rounded px-3 py-1 w-full">
        <option value="">None</option>
        <option value="asc">Low to High</option>
        <option value="desc">High to Low</option>
      </select>
    </label>
  </div>
</template>
