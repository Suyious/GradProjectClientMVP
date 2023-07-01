import { Navigate } from 'react-router-dom'
import { useGetUserQuery } from '../app/services/api/authApi'

const LoadingComponenet = () => {
	return (
		<div className="loading-skeleton-body" style={{ marginTop: "5em" }}>Loaderload</div>
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
