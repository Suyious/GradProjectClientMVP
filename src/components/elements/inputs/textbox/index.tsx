import React from "react";
import "./style.css"

type TextBoxProps = {
    value?: string,
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>,
    label?: string,
    error?: string,
    placeholder?: string,
    variant?: "stroke" | "plain",
}

const TextBox = React.forwardRef((
        { label, error, variant = "stroke", placeholder, value, onChange }: TextBoxProps,
        ref: React.Ref<HTMLTextAreaElement>
        ) => {
    return (
        <label className="textbox-body">
            <div className="textbox-head">
                <div className="textbox-label">{label}</div>
                <div className="textbox-error">{error}</div>
            </div>
            <textarea ref={ref} className={`textbox-textarea ${variant}`} placeholder={placeholder} value={value} onChange={onChange}/>
        </label>
    )
})

export default TextBox;