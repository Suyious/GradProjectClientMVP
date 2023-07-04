import { Navigate } from 'react-router-dom'
import { useGetUserQuery } from '../app/services/api/authApi'

const LoadingComponenet = () => {

	const styles:React.CSSProperties = {
		minHeight: "100vh",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	}

	return (
		<div className="loading-skeleton-body width-wrap" style={styles}>Loading Tests...</div>
	)
}

const Home = () => {

	const { data: user, isLoading, isError } = useGetUserQuery()

	if(isLoading) return <LoadingComponenet/>

	if(isError) return (
		<Navigate to="/user/login/"/>
	)

	return <Navigate to="/test/"/>
}

export default Home
