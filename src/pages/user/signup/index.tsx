import { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSignupMutation } from '../../../app/services/api/authApi'
import { Input } from '../../../components/elements/inputs/input'
import { Button } from '../../../components/elements/actions/buttons'
import Container from '../../../components/layouts/container'

type SignupErrors = {
	first_name?: string,
	last_name?: string,
	username?: string,
	email?: string,
	password?: string,
	confirmpassword?: string,
	detail?: string
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
	const [ signup, { isLoading }] = useSignupMutation()

	const formsubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault()
		if(passwordref.current && confirmpasswordref.current &&
			passwordref.current.value !== confirmpasswordref.current.value) {
			setError({ password: "passwords must match" })
			return
		}

		// await axios.post('signup/', {
		// 	email: emailref.current?.value,
		// 	first_name: first_nameref.current?.value,
		// 	last_name: last_nameref.current?.value,
		// 	username: usernameref.current?.value,
		// 	password: passwordref.current?.value,
		// }).then( response => {
		// 	console.log(response.data)
		// 	navigate('/login')
		// }).catch( error => {
		// 	if(error.response){
		// 		console.log("[ERROR] OOPS, recieved a ", error.response.status)
		// 		console.log(error.response.data)
		// 		setError(error.response.data)
		// 	} else {
		// 		if(error && error.code === 'ERR_NETWORK'){
		// 			setError({"detail": error.message })
		// 		}
		// 	}
		// } )

		await signup({
			email: emailref.current?.value || "",
			first_name: first_nameref.current?.value || "", 
			last_name: last_nameref.current?.value || "",
			username: usernameref.current?.value || "",
			password: passwordref.current?.value || "",
		}).unwrap().then(() => {
			navigate('/')
		}).catch( error => {
			setError(error.data)
		})
	}

	return (
		<Container.Flex direction="column" style={{ height: "100%"}} className="signup width-wrap">
			<form onSubmit={formsubmit} className="form-block signup-form-block">
				<Input label="First Name" ref={first_nameref} type="text" placeholder="First Name" error={error.first_name}/>
				<Input label="Last Name" ref={last_nameref} type="text" placeholder="Last Name" error={error.last_name}/>
				<Input label="Email" ref={emailref} type="email" placeholder="Email" error={error.email}/>
				<Input label="Username" ref={usernameref} type="text" placeholder="Username" error={error.username}/>
				<Input label="Password" ref={passwordref} type="password" placeholder="Password" error={error.password}/>
				<Input label="Confirm Password" ref={confirmpasswordref} type="password" placeholder="Confirm Password"/>
				<Button disabled={isLoading}>Signup</Button>
				<div className="form-error">{error.detail}</div>
			</form>
			<p className='form-subtext'>Already have an account? <Link to="/user/login">Login</Link></p>
		</Container.Flex>
	)
}

export default Signup
