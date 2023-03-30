import "./style.css"

type InputProps = {
    type?: React.HTMLInputTypeAttribute,
    placeholder?: string,
    label?: string
}

export const Input = ({ type = "text", placeholder, label }: InputProps) => {
    return (
        <label className="input-body">
            <div className="input-label">{label}</div>
            <input className="input-element input-strip" type={type} placeholder={placeholder}/>
        </label>
    )
}