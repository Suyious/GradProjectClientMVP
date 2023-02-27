import { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from "../../../utils/axios"

type LoginErrors = {
	email?: String,
	password?: String,
	detail?: String
}

const Login = (): JSX.Element => {

	const emailref = useRef<HTMLInputElement | null>(null)
	const passwordref = useRef<HTMLInputElement | null>(null)
	const [error, setError] = useState<LoginErrors>({})
	const navigate = useNavigate()

	const formsubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault()
		await axios.post('login/', {
			email: emailref.current ? emailref.current.value : "",
			password: passwordref.current ? passwordref.current.value : "",
		}).then( response => {
			const token = response.data.token;
			// console.log(token)
			localStorage.setItem('access', token.access)
			localStorage.setItem('refresh', token.refresh)
			navigate('/')
		}).catch( error => {
			if(error.response){
				console.log("[ERROR] OOPS, recieved a ", error.response.status)
				console.log(error.response.data)
				setError(error.response.data)
			} else {
				if(error && error.code === 'ERR_NETWORK'){
					setError({"detail": error.message })
				}
			}
		})
	}

	return (
		<div className="login width-wrap">
			<form onSubmit={formsubmit} className="form-block login-form-block">
				<label>Email <input ref={emailref} type="email" /></label>
				<div className="form-error">{error.email}</div>
				<label>Password<input ref={passwordref} type="password" /></label>
				<div className="form-error">{error.password}</div>
				<button>Login</button>
				<div className="form-error">{error.detail}</div>
			</form>
			<p>Don't have an account? <Link to="/user/signup">Signup</Link></p>
		</div>
	)
}

export default Login
