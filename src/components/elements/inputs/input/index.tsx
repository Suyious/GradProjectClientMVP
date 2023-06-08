import { forwardRef } from "react"
import "./style.css"

type InputProps = {
    type?: React.HTMLInputTypeAttribute,
    placeholder?: string,
    label?: string,
    value?: string,
    variant?: "stroke" | "plain",
    error?: string,
    style?: React.CSSProperties,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
}

export const Input = forwardRef((
    { type = "text", placeholder, label, value, variant = "stroke", error, style, onChange }: InputProps,
    ref: React.Ref<HTMLInputElement>
) => {
    return (
        <label className={`input-body ${variant}`}>
            <div className="input-header">
                { label && <div className="input-label">{label}</div> }
                { error && <div className="input-error-body">{error}</div> }
            </div>
            <input className="input-element input-strip" value={value} type={type} style={style} placeholder={placeholder} ref={ref} onChange={onChange}/>
        </label>
    )
})