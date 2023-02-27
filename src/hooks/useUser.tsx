import { useState, useEffect } from 'react'
import axios from '../utils/axios'

export type User = {
	id: Number;
	first_name: String;
	last_name: String;
	email: String;
	username: String;
}

export const useUser = (): [ User | null, (callback: () => void) => void] => {
	
	const [user, setUser] = useState<User | null>(null)
	
	const refresh = async (token: { access: String | null, refresh: String | null}) => {
		await axios.post('api/token/refresh/', {
			refresh: token.refresh
		}).then( response => {
			localStorage.setItem('access', response.data.access)
			auth()
		} ).catch( error => {
			if(error && error.response){
				console.log("OOPS, recieved a ", error.response.status)
				console.log(error.response.data)
				setUser(null)
			} else {
				console.log("[ERROR] ", error)
			}
		} )
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
			if(error.response && error.response.status === 401) {
				refresh(token)
			}
		} )
	}

	const logout = (callback = () => {}) => {
		localStorage.removeItem('access')
		localStorage.removeItem('refresh')
		setUser(null)
		callback()
	}

	useEffect(() => {
		auth()
	}, [])

	return [ user, logout ]
}

export default useUser
