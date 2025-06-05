import { setActivePinia, createPinia } from 'pinia'
import { useProductsStore } from '@/store/products'
import { describe, it, beforeEach, vi, expect } from 'vitest'

// Mock $fetch globally
global.$fetch = vi.fn()

describe('products store', () => {
  let store

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useProductsStore()
    store.products = [] // reset state
    vi.clearAllMocks()
  })

  it('fetches products and updates the state', async () => {
    const mockProducts = [
      { id: 1, name: 'Test Product', price: 100, category: 'Test' }
    ]
    global.$fetch.mockResolvedValueOnce(mockProducts)

    await store.fetchProducts()

    expect(global.$fetch).toHaveBeenCalledWith('/api/products')
    expect(store.products).toEqual(mockProducts)
  })

  it('creates a new product and adds it to the store', async () => {
    const newProduct = { id: 2, name: 'New Product', price: 50, category: 'Category' }
    global.$fetch.mockResolvedValueOnce(newProduct)

    await store.createProduct({ name: 'New Product', price: 50, category: 'Category' })

    expect(global.$fetch).toHaveBeenCalledWith('/api/products', {
      method: 'POST',
      body: { name: 'New Product', price: 50, category: 'Category' },
    })
    expect(store.products).toContainEqual(newProduct)
  })

  it('updates an existing product', async () => {
    store.products = [
      { id: 3, name: 'Old Product', price: 70, category: 'OldCat' }
    ]
    const updatedProduct = { id: 3, name: 'Updated Product', price: 80, category: 'NewCat' }
    global.$fetch.mockResolvedValueOnce(updatedProduct)

    await store.updateProduct(3, updatedProduct)

    expect(global.$fetch).toHaveBeenCalledWith('/api/products/3', {
      method: 'PUT',
      body: updatedProduct,
    })
    expect(store.products[0]).toEqual(updatedProduct)
  })

  it('deletes a product from the store', async () => {
    store.products = [
      { id: 4, name: 'Delete Me', price: 40, category: 'Trash' }
    ]
    global.$fetch.mockResolvedValueOnce({})

    await store.deleteProduct(4)

    expect(global.$fetch).toHaveBeenCalledWith('/api/products/4', { method: 'DELETE' })
    expect(store.products).toEqual([])
  })
})
