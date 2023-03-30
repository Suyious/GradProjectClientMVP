import { NavLink } from 'react-router-dom'
import BCSP064Logo from '../../modules/logo';
import "./style.css"

type NavigationProps = {
	children?: React.ReactNode;
	logo?: React.ReactNode;
}

const Navigation = ({ children, logo = <BCSP064Logo/> }: NavigationProps): JSX.Element => {
	return (
		<nav className="navigation nav-width-wrap">
			<div className="navigation-logo">
				<NavLink to="/">{ logo }</NavLink>
			</div>
			{ children }
		</nav>
	)
}

export default Navigation