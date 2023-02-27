import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import Navigation from '.'
import { NavLink } from 'react-router-dom'

describe('Navigation', () => {

	describe('On props and children being passed', () => {
		const title = 'mvp'

		beforeEach(() => {
			render(
				<Navigation logo={title}>
					<ul className="navigation-links">
						<li><NavLink to="/user/signup">
							<pre>signup</pre>
						</NavLink></li>
						<li><NavLink to="/user/login">
							<pre>login</pre>
						</NavLink></li>
					</ul>
				</Navigation>,
				{ wrapper: Router }
			)
		})

		it('displays Logo', () => {
			expect(screen.getByRole('link', { name: title })).toBeInTheDocument()
		})

		it('displays navigation links', () => {
			expect(screen.getByRole('link', { name: /signup/i })).toBeInTheDocument()
			expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument()
		})
	})

	describe('On props or children NOT being passed', () => {
		const title = 'mvp'

		beforeEach(() => {
			render(<Navigation/>, { wrapper: Router })
		})

		it('displays NO logo', () => {
			expect(screen.queryByRole('link', { name: title })).not.toBeInTheDocument()
		})

		it('displays NO navigation links', () => {
			expect(screen.queryByRole('link', { name: /signup/i })).not.toBeInTheDocument()
			expect(screen.queryByRole('link', { name: /login/i })).not.toBeInTheDocument()
		})
	})

})
