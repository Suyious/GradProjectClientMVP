import { useState, useEffect } from 'react'
import axios from '../utils/axios'

const useUser = () => {
	const [user, setUser] = useState({ first_name: "Anonymous" })
	
	const refresh = async (token) => {
		await axios.post('api/token/refresh/', {
			refresh: token.refresh
		}).then( response => {
			localStorage.setItem('access', response.data.access)
			auth()
		} ).catch( error => {
			console.log("OOPS, recieved a ", error.response.status)
			console.log(error.response.data)
			setUser({ first_name: "Anonymous" })
		} )
		// console.log(response.data)
	}

	const auth = async () => {
		const token = {
			access: localStorage.getItem('access'),
			refresh: localStorage.getItem('refresh'),
		}
		await axios.get('me/', {
			headers: { "Authorization": `Bearer ${token.access}` }
		}).then( response => {
			// console.log(response.data)
			setUser(response.data)
		}).catch( error => {
			if(error.response.status === 401) {
				refresh(token)
			}
		} )
	}

	useEffect(() => {
		auth()
	}, [])

	return [ user ]
}

export default useUser
