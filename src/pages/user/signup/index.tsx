import { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from "../../../utils/axios"

type SignupErrors = {
	first_name?: String,
	last_name?: String,
	username?: String,
	email?: String,
	password?: String,
	confirmpassword?: String,
	detail?: String
}

const Signup = (): JSX.Element => {

	const first_nameref = useRef<HTMLInputElement | null>(null)
	const last_nameref = useRef<HTMLInputElement | null>(null)
	const emailref = useRef<HTMLInputElement | null>(null)
	const usernameref = useRef<HTMLInputElement | null>(null)
	const passwordref = useRef<HTMLInputElement | null>(null)
	const confirmpasswordref = useRef<HTMLInputElement | null>(null)

	const [error, setError] = useState<SignupErrors>({})
	const navigate = useNavigate()

	const formsubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault()
		if(passwordref.current && confirmpasswordref.current &&
			passwordref.current.value !== confirmpasswordref.current.value) {
			setError({ password: "passwords must match" })
			return
		}
		await axios.post('signup/', {
			email: emailref.current?.value,
			first_name: first_nameref.current?.value,
			last_name: last_nameref.current?.value,
			username: usernameref.current?.value,
			password: passwordref.current?.value,
		}).then( response => {
			console.log(response.data)
			navigate('/login')
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
		} )
	}

	return (
		<div className="signup width-wrap">
			<form onSubmit={formsubmit} className="form-block signup-form-block">
				<label>First Name<input ref={first_nameref} type="text" /></label>
				{error.first_name}
				<label>Last Name<input ref={last_nameref} type="text" /></label>
				{error.last_name}
				<label>Email <input ref={emailref} type="email" /></label>
				{error.email}
				<label>Username<input ref={usernameref} type="username" /></label>
				{error.username}
				<label>Password<input ref={passwordref} type="password" /></label>
				{error.password}
				<label>Confirm Password<input ref={confirmpasswordref} type="password" /></label>
				<button>Signup</button>
				<div className="form-error">{error.detail}</div>
			</form>
			<p>Already have an account? <Link to="/user/login">Login</Link></p>
		</div>
	)
}

export default Signup
