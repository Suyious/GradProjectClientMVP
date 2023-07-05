import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import { selectUser, setAuthStateUser } from './app/features/auth/authSlice'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { useGetUserQuery } from './app/services/api/authApi'
import { Link } from './components/elements/actions/links'
import Navigation from './components/layouts/navigation'

function App(): JSX.Element {
	const user = useAppSelector(selectUser);
	const dispatch = useAppDispatch()
	const { data, isLoading, isError } = useGetUserQuery()
	useEffect(() => {
		if(data && !isError) dispatch(setAuthStateUser(data))
	}, [data])

	const LoggedInLinks = () => (
		<ul className="navigation-user">
			<li><Link to="/user/me/">
				{ user ? user.first_name : "Anonymous" }
			</Link></li>
			<li><Link to="/test/join/">
				Join a Test
			</Link></li>
			<li><Link variant='fill' to="/test/create/">
				+ New Test
			</Link></li>
		</ul>
	)

	const LoggedOutLinks = () => (
		<ul className="navigation-links">
			<li><Link to="/user/signup">
				signup
			</Link></li>
			<li><Link variant='fill' to="/user/login">
				login
			</Link></li>
		</ul>
	)

	const LoadingLinks = () => (
		<ul className="navigation-links">
			<li><Link style={{ color: "#0076AFA8"}} to="/user/signup">
				signup
			</Link></li>
			<li><Link style={{ color: "#f0ffff9c"}} variant='fill' to="/user/login">
				login
			</Link></li>
		</ul>
	)

	return (
		<div className="App">
			<Navigation variant="fixed">
				{ isLoading ? <LoadingLinks/> : 
					user ? <LoggedInLinks/> : <LoggedOutLinks/> }
			</Navigation>
			<Outlet/>
		</div>
	)
}

export default App
