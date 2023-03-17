import { useState, useEffect } from 'react'

type CountDownProps = {
	to?: string | null
}

export const COUNTDOWN_DEAD = "00:00:00:00"
export function getTimeRemaining(endtime: string) {
	const total = Date.parse(endtime) - Date.parse(new Date().toISOString());
	function padTime(num: Number) {
		return num.toString().padStart(2, "0");
	}
	if(total < 0) return COUNTDOWN_DEAD

	const seconds = padTime(Math.floor( (total/1000) % 60 ));
	const minutes = padTime(Math.floor( (total/1000/60) % 60 ));
	const hours = padTime(Math.floor( (total/(1000*60*60)) % 24));
	const days = padTime(Math.floor( total/(1000*60*60*24) ));

	return `${days}:${hours}:${minutes}:${seconds}`;
}

// to = new Date('2024-06-21T00:00:00.000Z')
export const CountDown = ({ to = null } : CountDownProps) => {

	const [ time_to, setTime_to ] = useState<String>(to ? getTimeRemaining(to): COUNTDOWN_DEAD);

	useEffect(() => {
		if(to) {
			let interval:NodeJS.Timer = setInterval(() => {
				const tt = getTimeRemaining(to)
				if(tt === COUNTDOWN_DEAD) {
					// console.log("Time is up")
					return clearInterval(interval)
				}
				setTime_to(tt)
				// console.log("still running!")
			}, 1000)
		}
	}, [])

	return (
		<div className="countdown">{ time_to }</div>
	)
}