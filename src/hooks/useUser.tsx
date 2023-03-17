import { useState, useEffect } from 'react'
import axios from '../utils/axios'
import { User } from '../types/user'

export const useUser = (): [ User | null, Boolean, (callback: () => void) => void] => {
	
	const [user, setUser] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState<Boolean>(true)
	
	const refresh = async (token: { access: String | null, refresh: String | null}) => {
		await axios.post('api/token/refresh/', {
			refresh: token.refresh
		}).then( response => {
			localStorage.setItem('access', response.data.access)
			auth()
		} ).catch( error => {
			setIsLoading(false)
			setUser(null)
			if(error && error.response){
				console.log("OOPS, recieved a ", error.response.status)
				console.log(error.response.data)
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
			setIsLoading(false)
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

	return [ user, isLoading ,logout ]
}

export default useUser
