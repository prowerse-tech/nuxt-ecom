import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useProductsStore = defineStore("products", () => {
  // state
  const products = ref([]);

  // filter criteria as reactive refs (you can update these from UI)
  const selectedCategory = ref("");
  const minPrice = ref(0);
  const maxPrice = ref(100000); // adjust as needed

  // actions
  async function fetchProducts() {
    products.value = await $fetch("/api/products");
  }

  async function createProduct(productData) {
    try {
      const created = await $fetch("/api/products", {
        method: "POST",
        body: productData,
      });
      products.value.push(created);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  }

  async function updateProduct(id, productData) {
    const updated = await $fetch(`/api/products/${id}`, {
      method: "PUT",
      body: productData,
    });
    const index = products.value.findIndex((p) => p.id === id);
    if (index !== -1) {
      products.value.splice(index, 1, updated);
    }
  }

  async function deleteProduct(id) {
    await $fetch(`/api/products/${id}`, { method: "DELETE" });
    products.value = products.value.filter((p) => p.id !== id);
  }

  // computed getters for unique categories from products
  const categories = computed(() => {
    const set = new Set(products.value.map((p) => p.category));
    return Array.from(set);
  });

  // computed filtered products based on current filters
  const filteredProducts = computed(() => {
    return products.value.filter((product) => {
      const matchesCategory = selectedCategory.value
        ? product.category === selectedCategory.value
        : true;

      const matchesPrice =
        product.price >= minPrice.value && product.price <= maxPrice.value;

      return matchesCategory && matchesPrice;
    });
  });

  // Expose all reactive state and actions
  return {
    products,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,

    // filter criteria
    selectedCategory,
    minPrice,
    maxPrice,

    // getters
    categories,
    filteredProducts,
  };
});
