import "./style.css"
import { CountDown, getTimeRemaining } from "../countdown";
import { DateToMomentsAgo } from "../../../utils/moments";
import { MockTest } from "../../../types/mocktest";
import { Link } from "../../elements/actions/links";
import TestIcon from "../../../assets/icons/testicon";
import Container from "../../layouts/container";

type TestCardProp = {
    test?: MockTest | null;
}

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

export const TestCard = ({ test = null }: TestCardProp) => {

    let endsAt = null;
    if(test) {
        const duration = extractDuration(test.duration)
        endsAt = new Date(new Date(test.starts_at).getTime() + duration.hours * 60 * duration.minutes * 60 * duration.seconds * 60 * 1000).toISOString();
    }

    return (
        <Container.Card variant="fill-shadow" className="upcoming-test-card" style={{ maxWidth: "600px"}}>
            <section className="upcoming-test-subtitle">
                <p className="upcoming-test-author">{test ? test.author.first_name + " " + test.author.last_name : <span>Unspecified</span>}</p>
                <p className="upcoming-test-created">{test ? DateToMomentsAgo(new Date(test.created_at)) : <span>Unspecified</span>}</p>
            </section>
            <header className="upcoming-test-title">
                <TestIcon/>
                <h2>{test ? test.name : <span>Untitled Test</span>}</h2>
            </header>
            <p className="upcoming-test-description">
                {test ? test.description.length > 255 ? test.description.substring(0, 255) + " ...": test.description : <span>No Description</span>}
            </p>
            <section className="upcoming-test-call-to-action">
                <div className="upcoming-test-coundown-wrapper">
                    <div className="upcoming-test-countdown-head">starts in</div>
                    <CountDown to = {endsAt} />
                </div>
                <Link to={`/test/${test?.id}`} variant="fill" style={{ paddingInline : "4em", textAlign: "center"}}>Register Now</Link>
            </section>
        </Container.Card>
    )
}