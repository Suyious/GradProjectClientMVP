import { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useLoginMutation } from '../../../app/services/api/authApi'

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
	const [ login, { isLoading } ] = useLoginMutation()

	const formsubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault()

		if(emailref.current && passwordref.current){
			await login({
				email: emailref.current.value || "",
				password: passwordref.current.value || ""
			}).unwrap().then(() => {
				navigate('/')
			}).catch( error => {
				if(error){
					if(error.error) setError({ "detail": error.error.split(": ")[1]})
					else if(error.data) setError(error.data)
					else setError({"detail": JSON.stringify(error)})
				}
			})
		}
	}


	return (
		<div className="login width-wrap">
			<form onSubmit={formsubmit} className="form-block login-form-block">
				<label>Email <input ref={emailref} type="email" /></label>
				<div className="form-error">{error.email}</div>
				<label>Password<input ref={passwordref} type="password" /></label>
				<div className="form-error">{error.password}</div>
				<button disabled={isLoading}>{ isLoading? "Logging you in...": "Login" }</button>
				<div className="form-error">{error.detail}</div>
			</form>
			<p>Don't have an account? <Link to="/user/signup">Signup</Link></p>
		</div>
	)
}

export default Login
