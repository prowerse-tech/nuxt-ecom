import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Index from '@/pages/index.vue'

// Mock NuxtLink component since it's used in the template
const NuxtLinkStub = {
  template: '<a><slot /></a>',
  props: ['to']
}

// Mock the products store
const fetchProductsMock = vi.fn()
const deleteProductMock = vi.fn()

vi.mock('@/store/products', () => ({
  useProductsStore: () => ({
    products: [
      { id: 1, name: 'Product A', price: 100, category: 'Category A' },
      { id: 2, name: 'Product B', price: 200, category: 'Category B' },
    ],
    fetchProducts: fetchProductsMock,
    deleteProduct: deleteProductMock,
  }),
}))

describe('pages/index.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock global confirm dialog
    global.confirm = vi.fn(() => true) // default to 'OK'
  })

  it('calls fetchProducts on mount', () => {
    mount(Index, {
      global: {
        stubs: {
          NuxtLink: NuxtLinkStub,
        }
      }
    })
    expect(fetchProductsMock).toHaveBeenCalled()
  })

  it('filters products based on searchQuery', async () => {
    const wrapper = mount(Index, {
      global: {
        stubs: {
          NuxtLink: NuxtLinkStub,
        }
      }
    })

    const input = wrapper.find('input[type="text"]')
    await input.setValue('Product A')

    // filteredProducts computed should update
    expect(wrapper.vm.filteredProducts.length).toBe(1)
    expect(wrapper.vm.filteredProducts[0].name).toBe('Product A')
  })

  it('calls deleteProduct when confirmed', async () => {
    const wrapper = mount(Index, {
      global: {
        stubs: {
          NuxtLink: NuxtLinkStub,
        }
      }
    })

    // Mock confirm to return true (confirm)
    global.confirm = vi.fn(() => true)

    // Trigger delete button click on first product
    const deleteButtons = wrapper.findAll('button')
    await deleteButtons[0].trigger('click')

    expect(global.confirm).toHaveBeenCalledWith('Are you sure you want to delete this product?')
    expect(deleteProductMock).toHaveBeenCalledWith(1)
  })

  it('does NOT call deleteProduct when cancelled', async () => {
    const wrapper = mount(Index, {
      global: {
        stubs: {
          NuxtLink: NuxtLinkStub,
        }
      }
    })

    // Mock confirm to return false (cancel)
    global.confirm = vi.fn(() => false)

    // Trigger delete button click on first product
    const deleteButtons = wrapper.findAll('button')
    await deleteButtons[0].trigger('click')

    expect(global.confirm).toHaveBeenCalled()
    expect(deleteProductMock).not.toHaveBeenCalled()
  })

  it('shows "No products found." message when no filtered products', async () => {
    const wrapper = mount(Index, {
      global: {
        stubs: {
          NuxtLink: NuxtLinkStub,
        }
      }
    })

    const input = wrapper.find('input[type="text"]')
    await input.setValue('Nonexistent Product')

    expect(wrapper.text()).toContain('No products found.')
  })
})
