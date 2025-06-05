import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Create from '@/pages/create.vue'

// Mock the router
const pushMock = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}))

// Mock the store
const createProductMock = vi.fn()
vi.mock('@/store/products', () => ({
  useProductsStore: () => ({
    createProduct: createProductMock,
  }),
}))

describe('pages/create.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('submits the form, calls store.createProduct, and redirects', async () => {
    const wrapper = mount(Create)

    // Set input values by placeholder selector
    await wrapper.find('input[placeholder="Product name"]').setValue('Test Product')
    await wrapper.find('input[placeholder="19.99"]').setValue('123.45')
    await wrapper.find('input[placeholder="e.g., Apparel"]').setValue('Test Category')
    await wrapper.find('textarea[placeholder="Product description..."]').setValue('Test description')

    // Call the handleSubmit method
    await wrapper.vm.handleSubmit()

    // Assert createProduct called with correct form data
    expect(createProductMock).toHaveBeenCalledWith({
      name: 'Test Product',
      price: 123.45,           // Note: v-model.number converts to number
      category: 'Test Category',
      description: 'Test description',
    })

    // Assert router.push called with '/'
    expect(pushMock).toHaveBeenCalledWith('/')
  })
})
