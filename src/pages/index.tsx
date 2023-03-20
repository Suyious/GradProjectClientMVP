import { Navigate } from 'react-router-dom'
import { useGetUserQuery } from '../app/services/api/authApi'

const Home = () => {

	const { data: user, isLoading, isError } = useGetUserQuery()

	if(isLoading) return "Loading"

	return ( (!isError && user) ? <Navigate to="/test/"/>: <Navigate to="/user/login/"/> )
}

export default Home
