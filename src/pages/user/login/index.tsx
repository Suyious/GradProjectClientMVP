import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "../../../utils/axios"

const Login = (): JSX.Element => {

	const emailref = useRef(null)
	const passwordref = useRef(null)
	const [error, setError] = useState({})
	const navigate = useNavigate()

	const formsubmit = async (e) => {
		e.preventDefault()
		await axios.post('login/', {
			email: emailref.current.value,
			password: passwordref.current.value,
		}).then( response => {
			const token = response.data.token;
			// console.log(token)
			localStorage.setItem('access', token.access)
			localStorage.setItem('refresh', token.refresh)
			navigate('/')
		}).catch( error => {
			console.log("OOPS, recieved an ", error.response.status)
			console.log(error.response.data)
			setError(error.response.data)
		})
	}

	return (
		<div className="login width-wrap">
			<form onSubmit={formsubmit} className="form-block login-form-block">
				<label>Email <input ref={emailref} type="email" /></label>
				{error.email}
				<label>Password<input ref={passwordref} type="password" /></label>
				{error.password}
				<button>Login</button>
				{error.detail}
			</form>
			<p>Don't have an account? <a href="/signup">Signup</a></p>
		</div>
	)
}

export default Login
