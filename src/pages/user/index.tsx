import "./style.css"
import { Outlet } from 'react-router-dom'
import  Navigation from "../../components/layouts/navigation"

const User = () => {
	return (
		<>
			<Navigation/>
			<div className="user-body">
				<Outlet/>
			</div>
		</>
	)
}

export default User
