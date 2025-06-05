import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [],
  }),

  actions: {
    // Example usage in your store action:
    async fetchProducts() {
      this.products = await $fetch("/api/products");
    },
    async createProduct(productData) {
      try {
        const created = await $fetch("/api/products", {
          method: "POST",
          body: productData,
        });
        this.products.push(created);
      } catch (error) {
        console.error("Error creating product:", error);
      }
    },

    async updateProduct(id, productData) {
      const updated = await $fetch(`/api/products/${id}`, {
        method: "PUT",
        body: productData,
      });
      const index = this.products.findIndex((p) => p.id === id);
      if (index !== -1) {
        this.products.splice(index, 1, updated);
      }
    },
    async deleteProduct(id) {
      await $fetch(`/api/products/${id}`, { method: "DELETE" });
      this.products = this.products.filter((p) => p.id !== id);
    },
  },
});
