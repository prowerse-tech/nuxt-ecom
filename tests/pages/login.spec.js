import { render, fireEvent, screen } from '@testing-library/vue'
import Login from '~/pages/login.vue'

test('renders login form', async () => {
  render(Login)

  // Check if the form elements are rendered
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  expect(screen.getByText(/login/i)).toBeInTheDocument()

  // Simulate a user typing and submitting the form
  await fireEvent.update(screen.getByLabelText(/username/i), 'admin')
  await fireEvent.update(screen.getByLabelText(/password/i), 'password123')
  await fireEvent.click(screen.getByText(/login/i))

})
