import "./style.css"
import { Input } from "../../elements/inputs/input";
import TextBox from "../../elements/inputs/textbox";
import DateTimeInput, { DateTime } from "../../elements/inputs/datetime";
import { Button } from "../../elements/actions/buttons";
import DurationInput, { Duration } from "../../elements/inputs/duration";
import { useState } from "react";
import { Test } from "../../../pages/test/create";
import { parseHour, parseMeridian } from "../../../utils/moments";

type CreateTestProps = {
    state: Test | {};
    setState: React.Dispatch<React.SetStateAction<Test | {}>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

interface createTestErrors {
    name?: string,
    description?: string,
    datetime?: string,
    duration?: string,
}

const CreateTestForm = ({ state, setState, setPage }: CreateTestProps) => {
    
    const [ testName, setTestName ] = useState<string>("name" in state ? state.name: "");
    const [ description, setDescription ] = useState<string>("description" in state ? state.description: "");

    const [ dateTime, setDateTime ] = useState<DateTime>("starts_at" in state ? unformatDate(state.starts_at) : {
        day: "",
        month: "",
        year: "",
        hours: "",
        minutes: "",
        seconds: "",
        meridian: "AM",
    });

    function dateIsValid(date: DateTime): boolean {
        if(date.year === "0000") return false;
        if(date.month === "00") return false;
        if(date.day === "00") return false;
        if(date.hours === "00") return false;
        return true;
    }

    function dateIsEmpty(d: DateTime): boolean {
        return !d.year && !d.month && !d.day && !d.hours;
    }

    function getHour(meridian: string, hours: string) {
        if(hours === "") return "00";
        if(meridian === "AM") {
            if(hours === "12") return "00";
            return hours;
        } else if(meridian === "PM") {
            if(hours === "12") return "12";
            return (Number.parseInt(hours) + 12).toString();
        }
        return "00";
    }

    function formatDate(date: DateTime): string {
        return `${date.year.padStart(4, '0')}-${date.month.padStart(2, '0')}-${date.day.padStart(2, '0')}T${getHour(date.meridian, date.hours).padStart(2, '0')}:${date.minutes.padStart(2, '0')}:${date.seconds.padStart(2, '0')}Z`;
    }

    function unformatDate(date: string): DateTime {


        return {
            day: date.substring(8, 10),
            month: date.substring(5, 7),
            year: date.substring(0, 4),
            hours: parseHour(date.substring(11, 13)),
            minutes: date.substring(14, 16),
            seconds: date.substring(17, 19),
            meridian: parseMeridian(date.substring(11, 13)),
        }
    }

    const [ duration, setDuration ] = useState<Duration>("duration" in state ? unformatDuration(state.duration) : {
        hours: "",
        minutes: "",
        seconds: "",
    });

    function durationIsEmpty(d: Duration): boolean {
        return !d.hours && !d.minutes && !d.seconds
    }

    function formatDuration(d: Duration): string{
        return `${d.hours.padStart(2, '0')}:${d.minutes.padStart(2, '0')}:${d.seconds.padStart(2, '0')}`;
    }

    function unformatDuration(d: string): Duration {
        const s = d.split(":");
        return {
            hours: s[0],
            minutes: s[1],
            seconds: s[2],
        }
    }

    const [ errors, setErrors ] = useState<createTestErrors>({});

    function onSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        const NOTFOUND = "This Field cannot be Empty";
        const errors_found:createTestErrors = {};
        if(testName === "") {
            errors_found.name = NOTFOUND;
        }
        if(description === "") {
            errors_found.description = NOTFOUND;
        }
        if(!dateIsValid(dateTime))
            errors_found.datetime = "This Field must be a valid Date";
        if(dateIsEmpty(dateTime))
            errors_found.datetime = NOTFOUND;
        if(durationIsEmpty(duration))
            errors_found.duration = NOTFOUND;
        
        if(Object.keys(errors_found).length === 0) {
            setState((p) => ({
                name: testName,
                description: description,
                starts_at: formatDate(dateTime),
                duration: formatDuration(duration),
                questions: "questions" in p ? p.questions : [],
            }))
            setPage(1);
        } else {
            setErrors(errors_found);
        }

    }

    return (
        <form onSubmit={onSubmit} className="create_test_body width-wrap">
            <Input 
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                label="Test Name" placeholder="Enter Test Name" variant="plain" 
                style={{ fontSize: "2em", fontWeight: 700, padding: 0 }} 
                error={errors.name}
            />
            <TextBox 
             value={description} onChange={(e) => setDescription(e.target.value)}
             label="Description" placeholder="Test Description here..." error={errors.description}/>
            <DateTimeInput state={dateTime} setState={setDateTime} label="Start Time and Date" error={errors.datetime}/>
            <DurationInput state={duration} setState={setDuration} label="Duration" error={errors.duration}/>
            <Button>{"questions" in state ? "Continue" : "Create Test"}</Button>
        </form>
    )
}

export default CreateTestForm;