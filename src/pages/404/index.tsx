import { Link } from "../../components/elements/actions/links"
import Navigation from "../../components/layouts/navigation"
import "./style.css"

export const NotFound = () => {
    return (
            <div className="not-found-main flat-width-wrap">
                <div className="not-found-wrapper">
                    <div className="not-found-head">Not Found</div>
                    <div className="not-found-subtext">This page seems to be unavailable.</div>
                    <Link variant="fill" to="/">Home</Link>
                </div>
            </div>
    )
}

const Error404 = () => {
    return (
        <div className="not-found-error-body">
            <Navigation></Navigation>
            <NotFound/>
        </div>
    )
}

export default Error404;