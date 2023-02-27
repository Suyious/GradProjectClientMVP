import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter as Router } from 'react-router-dom'
import Login from '.'

describe('Login', () => {

	beforeEach(() => {
		render(<Login/>, { wrapper: Router })
	})

	it('should display error on empty input', async () => {
		const user = userEvent.setup()
		// fireEvent.click(screen.getByRole('button'))
		const spytag = vi.spyOn(user, 'click')
		await user.click(screen.getByRole('button'))
		expect(spytag).toHaveBeenCalledTimes(1)
		const errors = await screen.findAllByText(/this field may not be blank/i)
		expect(errors).toHaveLength(2)
	})

	it('should display error on wrong input', async () => {
		fireEvent.change(screen.getByLabelText(/email/i), { target: {	value: 'wrong@mail.com' } })
		fireEvent.change(screen.getByLabelText(/password/i), { target: {	value: 'password' } })
		fireEvent.click(screen.getByRole('button'))
		const error = await screen.findByText(/invalid credentials/i)
		expect(error).toBeInTheDocument()
	})

	it('should display error on wrong input', async () => {
		fireEvent.change(screen.getByLabelText(/email/i), { target: {	value: 'TinaRe@mail.com' } })
		fireEvent.change(screen.getByLabelText(/password/i), { target: {	value: 'pissword' } })
		fireEvent.click(screen.getByRole('button'))
	})
})
