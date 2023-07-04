import { NavLink } from 'react-router-dom'
import BCSP064Logo from '../../../assets/logo';
import "./style.css"

type NavigationProps = {
	children?: React.ReactNode;
	logo?: React.ReactNode;
	variant?: "plain" | "fixed",
	disableHome?: boolean,
}

const Navigation = ({ children, logo = <BCSP064Logo/>, variant = "plain", disableHome = false }: NavigationProps): JSX.Element => {
	return (
		<nav className={ "navigation " + variant }>
			<div className="navigation-wrapper nav-width-wrap">
				<div className="navigation-logo">
					{ disableHome ? (
						<div style={{ userSelect: "none" }}>{logo}</div>
					): (
						<NavLink to="/">{ logo }</NavLink>
					)}
				</div>
				{ children }
			</div>
		</nav>
	)
}

export default Navigation
