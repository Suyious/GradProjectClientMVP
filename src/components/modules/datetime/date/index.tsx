import "./style.css"

type DateProps = {
    date: string;
    month: string;
    year: string;
}

const Date = ({ date, month, year }: DateProps) => {
    return (
        <div className="datetime_date">
            <div className="datetime_date_left">{date}</div>
            <div className="datetime_date_right">
                <div className="datetime_date_month">{month}</div>
                <div className="datetime_date_year">{year}</div>
            </div>
        </div>
    )
}

export default Date;