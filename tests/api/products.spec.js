import { describe, it, expect, vi, beforeEach } from 'vitest'
import indexHandler from '@/server/api/products/index'
import idHandler from '@/server/api/products/[id]'

// ✅ DO NOT import external vars (like eventUtils) and use them inside vi.mock
// Instead, inline the values you need in the factory itself
vi.mock('@/server/api/products/_productsStore', () => {
  return {
    products: [
      { id: 1, name: 'Product A', price: 100, category: 'Category A' },
      { id: 2, name: 'Product B', price: 200, category: 'Category B' },
    ],
  }
})

// ✅ h3 must be mocked with inline logic — no top-level refs
vi.mock('h3', async () => {
  const actual = await vi.importActual('h3')
  return {
    ...actual,
    readBody: async (event) => event._readBody,
    createError: ({ statusCode, statusMessage }) => ({ statusCode, statusMessage }),
    sendError: (_event, error) => error,
  }
})

// ✅ Create the event utilities inline (you can extract later if needed)
function createMockEvent(method, body = {}, params = {}) {
  return {
    req: { method },
    context: { params },
    _readBody: body,
  }
}

// ✅ TESTS
describe('API: /api/products/index.js', () => {
  it('returns products on GET', async () => {
    const event = createMockEvent('GET')
    const res = await indexHandler(event)
    expect(res).toBeInstanceOf(Array)
    expect(res.length).toBeGreaterThan(0)
  })

  it('creates a product on POST', async () => {
    const newProduct = { name: 'New', price: 300, category: 'Cat' }
    const event = createMockEvent('POST', newProduct)
    const res = await indexHandler(event)
    expect(res).toMatchObject(newProduct)
    expect(res.id).toBeDefined()
  })

  it('returns 405 on unsupported method', async () => {
    const event = createMockEvent('PUT')
    const res = await indexHandler(event)
    expect(res.statusCode).toBe(405)
  })
})

describe('API: /api/products/[id].js', () => {
  it('updates a product on PUT', async () => {
    const updateData = { name: 'Updated Name' }
    const event = createMockEvent('PUT', updateData, { id: 1 })
    const res = await idHandler(event)
    expect(res.name).toBe('Updated Name')
  })

  it('returns 404 if product not found on PUT', async () => {
    const event = createMockEvent('PUT', { name: 'X' }, { id: 999 })
    const res = await idHandler(event)
    expect(res.statusCode).toBe(404)
  })

  it('deletes a product on DELETE', async () => {
    const event = createMockEvent('DELETE', {}, { id: 2 })
    const res = await idHandler(event)
    expect(res).toEqual({ success: true })
  })

  it('returns 404 if product not found on DELETE', async () => {
    const event = createMockEvent('DELETE', {}, { id: 999 })
    const res = await idHandler(event)
    expect(res.statusCode).toBe(404)
  })

  it('returns 405 on unsupported method', async () => {
    const event = createMockEvent('POST', {}, { id: 1 })
    const res = await idHandler(event)
    expect(res.statusCode).toBe(405)
  })
})
