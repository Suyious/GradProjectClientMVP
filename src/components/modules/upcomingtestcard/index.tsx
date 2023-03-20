import { Link } from "react-router-dom";
import { CountDown } from "../countdown";
import { MockTest } from "../../../types/mocktest";
import "./style.css"

type TestCardProp = {
    test?: MockTest | null;
}

const extractDuration:(duration: String) => { 
    hours: number, minutes: number, seconds: number
} = (duration) => {

    const arrDuration = duration.split(":")

    return {
        hours: Number.parseInt(arrDuration[0]),
        minutes: Number.parseInt(arrDuration[1]),
        seconds: Number.parseInt(arrDuration[2])
    }
}

export const TestCard = ({ test = null }: TestCardProp) => {

    let endsAt = null;
    if(test) {
        const duration = extractDuration(test.duration)
        endsAt = new Date(test.starts_at.getTime() + duration.hours * 60 * duration.minutes * 60 * duration.seconds * 60 * 1000).toISOString();
    }

    return (
        <section className="upcoming-test-card">
            <header className="upcoming-test-title">
                <h2>{test ? test.name : <span>Untitled Test</span>}</h2>
            </header>
            <section className="upcoming-test-subtitle">
                <p className="upcoming-test-created">{test ? test.created_at.getFullYear() + " " + (test.created_at.getMonth() + 1) : <span>Unspecified</span>}</p>
                <p className="upcoming-test-author">{test ? test.author : <span>Unspecified</span>}</p>
            </section>
            <details className="upcoming-test-description">
                <summary>{test ? test.description.substring(0, 255) + " ..." : <span>No Description</span>}</summary>
                { test && <p>{test.description}</p> }
            </details>
            <section className="upcoming-test-call-to-action">
                <CountDown to = {endsAt} />
                <Link to="#" className="upcoming-test-call-to-action-button">Register</Link>
            </section>
        </section>
    )
}