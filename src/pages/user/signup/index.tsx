import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "../../../utils/axios"

const Signup = (): JSX.Element => {

	const first_nameref = useRef(null)
	const last_nameref = useRef(null)
	const emailref = useRef(null)
	const usernameref = useRef(null)
	const passwordref = useRef(null)
	const confirmpasswordref = useRef(null)

	const [error, setError] = useState({})
	const navigate = useNavigate()

	const formsubmit = async (e) => {
		e.preventDefault()
		if(passwordref.current.value !== confirmpasswordref.current.value) {
			setError({ password: "passwords must match" })
			return
		}
		await axios.post('signup/', {
			email: emailref.current.value,
			first_name: first_nameref.current.value,
			last_name: last_nameref.current.value,
			username: usernameref.current.value,
			password: passwordref.current.value,
		}).then( response => {
			console.log(response.data)
			navigate('/login')
		}).catch( error => {
			console.log("OOPS, recieved an ", error.response.status)
			console.log(error.response.data)
			setError(error.response.data)
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
			</form>
			<p>Already have an account? <a href="/login">Login</a></p>
		</div>
	)
}

export default Signup
