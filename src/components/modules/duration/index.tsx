import ".style.css"

type DurationProps = {
    duration: string;
}

const Duration = ({ duration }: DurationProps) => {

    const dur_a = duration.split(":"); 

    return (
        <div className="duration_body">
            <div className="duration_hours">
                {dur_a[0]}
                <span className="duration_sub">H</span>
            </div>
            <div className="duration_minutes">
                {dur_a[1]}
                <span className="duration_sub">M</span>
            </div>
            <div className="duration_seconds">
                {dur_a[2]}
                <span className="duration_sub">S</span>
            </div>
        </div>
    )
}

export default Duration;