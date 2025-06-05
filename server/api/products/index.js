import { defineEventHandler, readBody, sendError, createError } from 'h3'
import { products } from './_productsStore'

export default defineEventHandler(async (event) => {
  const method = event.req.method

  if (method === 'GET') {
    return products
  }

  if (method === 'POST') {
    const newProduct = await readBody(event)
    newProduct.id = products.length ? products[products.length - 1].id + 1 : 1
    products.push(newProduct)
    return newProduct
  }

  return sendError(event, createError({ statusCode: 405, statusMessage: 'Method Not Allowed' }))
})
