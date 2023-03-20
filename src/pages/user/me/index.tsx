import { useNavigate } from 'react-router-dom'
import { logout, setAuthStateUser } from '../../../app/features/auth/authSlice'
import { useAppDispatch } from '../../../app/hooks'
import { useGetUserQuery } from '../../../app/services/api/authApi'

const Me = (): JSX.Element => {

	const { refetch, data: user } = useGetUserQuery()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const logUserOut = () => {
		dispatch(logout())
		refetch()
		navigate('/user/login/')
	}

	return (
		<div className="me width-wrap">
			<pre>Logged in as {user && user.first_name} {user && user.last_name} { user && user.email && <span style={{ color: "blue", cursor: "pointer" }} onClick={logUserOut}>Logout</span> }</pre>
		</div>
	)
}

export default Me
