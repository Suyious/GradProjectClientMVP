import { Navigate } from 'react-router-dom'
import { useGetUserQuery } from '../app/services/api/authApi'

const LoadingComponenet = () => {
	return (
		<div className="loading-skeleton-body"> Loaderload</div>
	)
}

const Home = () => {

	const { data: user, isLoading, isError } = useGetUserQuery()

	if(isLoading) return <LoadingComponenet/>

	return ( (!isError && user) ? <Navigate to="/test/"/>: <Navigate to="/user/login/"/> )
}

export default Home
