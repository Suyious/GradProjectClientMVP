import { Action } from "../action";
import "./style.css";

type ButtonProps = {
    children: React.ReactNode;
    variant?: "fill" | "transparent" | "stroke";
    style?: React.CSSProperties;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({ children, onClick, variant, style = {} }: ButtonProps) => {
    return (<button onClick={onClick} className="button-body button-strip">
            <Action style={style} variant={variant}>
                {children}
            </Action>
        </button>)
}