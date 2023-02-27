import { NavLink } from 'react-router-dom'
import "./style.css"

type NavigationProps = {
	children?: React.ReactNode;
	logo?: React.ReactNode;
}

const Navigation = ({ children, logo }: NavigationProps): JSX.Element => {
	return (
		<nav className="navigation nav-width-wrap">
			<div className="navigation-logo">
				<NavLink to="/"><pre>{ logo }</pre></NavLink>
			</div>
			{ children }
		</nav>
	)
}

export default Navigation
