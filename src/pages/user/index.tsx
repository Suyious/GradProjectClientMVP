import "./style.css"
import { Outlet } from 'react-router-dom'
import  Navigation from "../../components/layouts/navigation"

const User = () => {
	return (
		<>
			<Navigation/>
			<Outlet/>
		</>
	)
}

export default User
