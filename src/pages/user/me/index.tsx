import useUser from '../../../hooks/getUser'

const Me = (): JSX.Element => {

	const [ user ] = useUser()
	return (
		<div className="me width-wrap">
			<pre>Logged in as {user && user.first_name} {user && user.last_name} { user.email && <a href="/logout">Logout</a> }</pre>
		</div>
	)
}

export default Me
