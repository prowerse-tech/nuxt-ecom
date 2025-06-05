import { defineEventHandler, readBody, sendError, createError } from 'h3'
import { products } from './_productsStore'

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params.id)
  const method = event.req.method

  if (method === 'PUT') {
    const updatedProduct = await readBody(event)
    const index = products.findIndex(p => p.id === id)
    if (index === -1) {
      return sendError(event, createError({ statusCode: 404, statusMessage: 'Product Not Found' }))
    }
    products[index] = { ...products[index], ...updatedProduct }
    return products[index]
  }

  if (method === 'DELETE') {
    const index = products.findIndex(p => p.id === id)
    if (index === -1) {
      return sendError(event, createError({ statusCode: 404, statusMessage: 'Product Not Found' }))
    }
    products.splice(index, 1)
    return { success: true }
  }

  return sendError(event, createError({ statusCode: 405, statusMessage: 'Method Not Allowed' }))
})
