import { MouseEventHandler } from 'react'
import { useNavigate } from 'react-router-dom'
import useUser from '../../../hooks/useUser'

const Me = (): JSX.Element => {

	const [ user, _isLoading ,logout ] = useUser()
	const navigate = useNavigate()

	const logUserOut = () => {
		logout(() => {
			navigate("/")
		})
	}

	return (
		<div className="me width-wrap">
			<pre>Logged in as {user && user.first_name} {user && user.last_name} { user && user.email && <span style={{ color: "blue", cursor: "pointer" }} onClick={logUserOut}>Logout</span> }</pre>
		</div>
	)
}

export default Me
