import "./style.css"

type DateTimeProps = {
    label?: string,
    error?: string,
    state: DateTime,
    setState: React.Dispatch<React.SetStateAction<DateTime>>
}

// Needed Format: TODAY.strftime('%Y-%m-%dT%H:%M:%SZ')
//                  '2023-05-22T00:57:52Z'

export interface DateTime {
    day:       string,
    month:     string,
    year:      string,
    hours:     string,
    minutes:   string,
    seconds:   string,
    meridian:  string,
}

const DateTimeInput = ({ label, error, state, setState }: DateTimeProps) => {

    return (
        <label className="datetime_body">
            <div className="datetime_head">
                <div className="datetime_label">{label}</div>
                <div className="datetime_error">{error}</div>
            </div>
            <div className="datetime_inputs">
                <div className="datetime_input_date">
                    <input  placeholder="YYYY" min={new Date().getFullYear()} className="datetime_input_date_year" type="number"
                            value={state.year} onChange={(e) => setState((p) => ({...p, year: e.target.value}))}/>
                    <input  placeholder="MM"   min={1} max={12} className="datetime_input_date_month" type="number"
                            value={state.month} onChange={(e) => setState((p) => ({...p, month: e.target.value}))}/>
                    <input  placeholder="DD"   min={1} className="datetime_input_date_day" type="number"
                            max={new Date(new Date().getFullYear(), state?.month? Number.parseInt(state.month) : 12, 0).getDate()} 
                            value={state.day} onChange={(e) => setState((p) => ({...p, day: e.target.value}))}/>
                </div>
                <div className="datetime_input_time">
                    <input placeholder="HH" type="number" min={1} max={12} className="datetime_input_hours"
                            value={state.hours} onChange={(e) => setState((p) => ({...p, hours: e.target.value}))}/>
                    <input placeholder="MM" type="number" min={0} max={59} className="datetime_input_minutes"
                            value={state.minutes} onChange={(e) => setState((p) => ({...p, minutes: e.target.value}))}/>
                    <input placeholder="SS" type="number" min={0} max={59} className="datetime_input_seconds"
                            value={state.seconds} onChange={(e) => setState((p) => ({...p, seconds: e.target.value}))}/>
                    <select className="datetime_input_meridian"
                            value={state.meridian} onChange={(e) => setState((p) => ({...p, meridian: e.target.value}))}>
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                    </select>
                </div>
            </div>
        </label>
    )
}

export default DateTimeInput;