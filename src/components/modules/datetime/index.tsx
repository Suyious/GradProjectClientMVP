import "./style.css"
import { parseHour, parseMeridian } from "../../../utils/moments";
import DateComponent from "./date";
import TimeComponent from "./time";

type DateTimeProps = {
    className?: string,
    datetime: string;
}

const DateTime = ({ className="", datetime }: DateTimeProps ) => {

    const d = new Date(datetime);
    const date = d.getDate().toString().padStart(2, "0");
    const month = d.toLocaleString('default', { month: 'long' }).slice(0, 3);
    const year = d.getFullYear().toString();
    const hour = parseHour(d.getHours().toString()).padStart(2, "0");
    const minute = d.getMinutes().toString().padStart(2, "0");
    const meridian = parseMeridian(d.getHours().toString()).padStart(2, "0");

    return (
        <div className={ "datetime_module_body " + className }>
            <DateComponent date={date} month={month} year={year} />
            <TimeComponent hours={hour} minutes={minute} meridian={meridian} />
        </div>
    )
};

DateTime.Date = DateComponent;
DateTime.Time = TimeComponent;

export default DateTime;