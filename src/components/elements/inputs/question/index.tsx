import "./style.css";

type QuestionInputProps = {
    value?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    label?: string,
    placeholder?: string,
    answer?: boolean,
    onToggleCheckBox?: (p: boolean | undefined ) => void,
}

const QuestionInput = ({placeholder, label, answer = false, value, onChange, onToggleCheckBox}: QuestionInputProps) => {
    return (
        <label className="question_input_body">
            <div className="question_input_input">
                <div className="question_input_option_label">{label}</div>
                <input className="question_input_input_box" placeholder={placeholder} type="text" 
                    value={value} onChange={onChange}/>
                <div className={"question_input_answer_checkbox" + ( answer ? " checked" : "")} onClick={() => {
                    if(onToggleCheckBox) onToggleCheckBox(answer);
                }     
                }> </div>
            </div>
        </label>
    )
}

export default QuestionInput;