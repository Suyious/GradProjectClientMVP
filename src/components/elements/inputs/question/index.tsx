import CheckIcon from "../../../../assets/icons/check";
import "./style.css";

type QuestionInputProps = {
    className?: string,
    value?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    label?: string,
    error?: string,
    placeholder?: string,
    answer?: boolean,
    onToggleCheckBox?: (p: boolean | undefined ) => void,
}

const QuestionInput = ({ className="", placeholder, label, error, answer = false, value, onChange, onToggleCheckBox}: QuestionInputProps) => {
    return (
        <label className={"question_input_body " + className}>
            <div className="question_input_input">
                <div className="question_input_option_label">{label}</div>
                <div className="question_input_option_error">{error}</div>
                <input className="question_input_input_box" placeholder={placeholder} type="text" 
                    value={value} onChange={onChange}/>
                <div className={"question_input_answer_checkbox" + ( answer ? " checked" : "")} onClick={() => {
                    if(onToggleCheckBox) onToggleCheckBox(answer);
                } }>
                    { answer && <CheckIcon/> }
                </div>
            </div>
        </label>
    )
}

export default QuestionInput;