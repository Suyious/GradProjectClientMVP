import "./style.css"

const Navigation = (): JSX.Element => {
	return (
		<nav className="navigation nav-width-wrap">
			<div className="navigation-logo">
				<a href="/"><pre>mvp</pre></a>
			</div>
			<ul className="navigation-links">
				<li><a href="/signup"><pre>signup</pre></a></li>
				<li><a href="/login"><pre>login</pre></a></li>
			</ul>
		</nav>
	)
}

export default Navigation
