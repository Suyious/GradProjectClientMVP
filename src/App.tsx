import { Outlet, NavLink } from 'react-router-dom'
import './App.css'
import Navigation from './components/navigation'
import { useUser } from "./hooks/useUser"

function App(): JSX.Element {
	const [ user ] = useUser()
	return (
		<div className="App">
			<Navigation logo='mvp'>
				{ user ? (
					<div className="navigation-user">
						<NavLink to="/user/me/">
							<pre>{ user ? user.first_name : "Anonymous" }</pre>
						</NavLink>
					</div>
				) : (
					<ul className="navigation-links">
						<li><NavLink to="/user/signup">
							<pre>signup</pre>
						</NavLink></li>
						<li><NavLink to="/user/login">
							<pre>login</pre>
						</NavLink></li>
					</ul>
				) }
			</Navigation>
			<Outlet/>
		</div>
	)
}

export default App
