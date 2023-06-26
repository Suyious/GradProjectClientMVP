import "./style.css"

type TimeProps = {
    hours: string;
    minutes: string;
    meridian: string;
}

const Time = ({ hours, minutes, meridian }: TimeProps ) => {
    return (
        <div className="datetime_time">
            <div className="datetime_time_left">
                {hours}:{minutes}
            </div>
            <div className="datetime_time_super">{meridian}</div>
        </div>
    )
}

export default Time;