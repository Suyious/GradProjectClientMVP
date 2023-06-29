import "./style.css"
import { useState, useEffect } from 'react'

type CountDownProps = {
	to?: string | null,
	realtime?: boolean,
	variant?: "stylized" | "plain",
	minutes?: boolean,
	seconds?: boolean,
	onCountDownEnd?: () => void,
}

interface CountDownTime {
	days: string,
	hours: string,
	minutes: string,
	seconds: string,
}

export const COUNTDOWN_DEAD: CountDownTime = {
	days: "00",
	hours: "00",
	minutes: "00",
	seconds: "00",
}

export function getTimeRemaining(endtime: string): CountDownTime {
	const currentTime = new Date().getTime();
	const endTime = new Date(endtime).getTime();
	const total = endTime - currentTime;

	function padTime(num: Number) {
		return num.toString().padStart(2, "0");
	}
	if(total < 0) return COUNTDOWN_DEAD

	const seconds = padTime(Math.floor( (total/1000) % 60 ));
	const minutes = padTime(Math.floor( (total/1000/60) % 60 ));
	const hours = padTime(Math.floor( (total/(1000*60*60)) % 24));
	const days = padTime(Math.floor( total/(1000*60*60*24) ));

	return {
		days,
		hours,
		minutes,
		seconds,
	};
}

// to = new Date('2024-06-21T00:00:00.000Z')
export const CountDown = ({ to = null, realtime = true, variant = "plain", seconds = true, minutes = true, onCountDownEnd } : CountDownProps) => {

	const [ time_to, setTime_to ] = useState<CountDownTime>(to ? getTimeRemaining(to): COUNTDOWN_DEAD);

	useEffect(() => {
		if(to && realtime) {
			let interval:NodeJS.Timer = setInterval(() => {
				const tt = getTimeRemaining(to)
				if(tt === COUNTDOWN_DEAD) {
					// console.log("Time is up")
					if(onCountDownEnd) onCountDownEnd();
					return clearInterval(interval)
				}
				setTime_to(tt)
				// console.log("still running!")
			}, 1000)
		}
	}, [])

	return (
		<div className="countdown">
			{ !(time_to.days === "00") && <div className="countdown_days">
				{ time_to.days }<span className="countdown_sub">D</span>
			</div> }
			<div className="countdown_hours">
				{ time_to.hours }<span className="countdown_sub">H</span>
			</div>
			{ minutes && <div className="countdown_minutes">
				{time_to.minutes}<span className="countdown_sub">M</span>
			</div> }
			{ seconds && <div className="countdown_seconds">
				{time_to.seconds}<span className="countdown_sub">S</span>
			</div> }
		</div>
	)
}