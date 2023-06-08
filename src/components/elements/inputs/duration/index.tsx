import "./style.css";

type DurationInputProps = {
    label?: string,
    error?: string,
    state: Duration,
    setState: React.Dispatch<React.SetStateAction<Duration>>
}

export interface Duration {
    hours:   string,
    minutes: string,
    seconds: string,
}

const DurationInput = ({ label, error, state, setState}: DurationInputProps) => {

    return (
        <label className="duration_input_body">
            <div className="duration_input_head">
                <div className="duration_input_label">{label}</div>
                <div className="duration_input_error">{error}</div>
            </div>
            <div className="duration_input_main">
                <input placeholder="HH" type="number" min={1} max={24} className="duration_input_hours"
                    value={state.hours} onChange={(e) => setState((p) => ({...p, hours: e.target.value}))}/>
                <input placeholder="MM" type="number" min={0} max={59} className="duration_input_minutes"
                    value={state.minutes} onChange={(e) => setState((p) => ({...p, minutes: e.target.value}))}/>
                <input placeholder="SS" type="number" min={0} max={59} className="duration_input_seconds"
                    value={state.seconds} onChange={(e) => setState((p) => ({...p, seconds: e.target.value}))}/>
            </div>
        </label>
    )
}

export default DurationInput;