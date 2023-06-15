import { MockTest } from "../types/mocktest"

const extractDuration:(duration: string) => { 
    hours: number, minutes: number, seconds: number
} = (duration) => {

    const arrDuration = duration.split(":")

    return {
        hours: Number.parseInt(arrDuration[0]),
        minutes: Number.parseInt(arrDuration[1]),
        seconds: Number.parseInt(arrDuration[2])
    }
}

export function endsAt(test: MockTest) {
    const duration = extractDuration(test.duration)
    return new Date(new Date(test.starts_at).getTime() + duration.hours * 60 * duration.minutes * 60 * duration.seconds * 60 * 1000).toISOString();
}