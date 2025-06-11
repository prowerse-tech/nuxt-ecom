import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password } = body

  // Basic validation
  if (!username || !password) {
    return { success: false, message: 'Username and password are required' }
  }

    // Simulate a user authentication check
  if (username === 'admin' && password === 'password123') {
    return {
      success: true,
      user: {
        id: 1,
        username: 'admin',
        email: 'admin@example.com'
      }
    }
  }

  return { success: false, message: 'Invalid credentials' }
})
