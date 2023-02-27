import "./style.css"
import { Outlet } from 'react-router-dom'
import  Navigation from "../../components/navigation"

const User = () => {
	return (
		<>
			<Navigation logo='mvp'/>
			<Outlet/>
		</>
	)
}

export default User
