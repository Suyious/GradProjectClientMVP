import { Action } from "../action";
import "./style.css";

type ButtonProps = {
    children: React.ReactNode,
    variant?: "fill" | "transparent" | "stroke",
    type?: "submit" | "button",
    style?: React.CSSProperties,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    disabled?: boolean,
}

export const Button = ({ children, type, disabled, onClick, variant, style = {} }: ButtonProps) => {
    return (<button type={type} onClick={onClick} disabled={disabled} className="button-body button-strip">
            <Action style={style} variant={variant}>
                {children}
            </Action>
        </button>)
}