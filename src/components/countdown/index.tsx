import { useState, useEffect } from 'react'

const CountDown = ({ to = new Date('2024-06-21T00:00:00.000Z') }) => {

	const [ time_to, setTime_to ] = useState(getTimeRemaining(to.toDateString()));

	function getTimeRemaining(endtime: string) {
		const total = Date.parse(endtime) - Date.parse(new Date().toDateString());
		function padTime(num: Number) {
			return num.toString().padStart(2, "0");
		}
		if(total < 0) return "00:00:00:00"

		const seconds = padTime(Math.floor( (total/1000) % 60 ));
		const minutes = padTime(Math.floor( (total/1000/60) % 60 ));
		const hours = padTime(Math.floor( (total/(1000*60*60)) % 24));
		const days = padTime(Math.floor( total/(1000*60*60*24) ));

		return `${days}:${hours}:${minutes}:${seconds}`;
	}

	useEffect(() => {
		let interval:NodeJS.Timer = setInterval(() => {
			const tt = getTimeRemaining(to.toDateString())
			if(tt === "0:0:0:0") {
				console.log("Time is up")
				return clearInterval(interval)
			}
			setTime_to(tt)
			// console.log("still running!")
		}, 1000)
	}, [])

	return (
		<div className="countdown">{ time_to }</div>
	)
}

export default CountDown;
