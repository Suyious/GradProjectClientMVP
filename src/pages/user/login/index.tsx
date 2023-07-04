import { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useLoginMutation } from '../../../app/services/api/authApi'
import Container from "../../../components/layouts/container"
import { Input } from "../../../components/elements/inputs/input"
import { Button } from "../../../components/elements/actions/buttons"

type LoginErrors = {
	email?: string,
	password?: string,
	detail?: string
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
		<Container.Flex direction="column" style={{ height: "100%"}} className="login-body width-wrap">
			<form onSubmit={formsubmit} className="form-block login-form-block">
				<Input label="Email" placeholder="email" type="email" ref={emailref} error={error.email}/>
				<Input label="Password" placeholder="password" type="password" ref={passwordref} error={error.password}/>
				<Button disabled={isLoading} style={{ padding: "0.8em 2em", cursor: "pointer"}}>{ isLoading? "Logging you in...": "Login" }</Button>
				<div className="form-error">{error.detail}</div>
			</form>
			<p className="form-subtext">Don't have an account? <Link to="/user/signup">Signup</Link></p>
		</Container.Flex>
	)
}

export default Login
