import "./style.css"
import { NavLink, To } from "react-router-dom"
import { Action } from "../action";

type LinkProps = {
    to: To;
    children: React.ReactNode;
    variant?: "fill" | "transparent" | "stroke";
    style?: React.CSSProperties;
    disabled?: boolean;
}

export const Link = ({ to, children, variant="transparent", style = {}, disabled = false }: LinkProps) => {
    if(disabled) {
        return <div className="link-body link-strip">
            <Action style={style} variant={variant}>{children}</Action>
        </div>
    }
    return <NavLink className="link-body link-strip" to={to}>
        <Action style={style} variant={variant}>{children}</Action>
    </NavLink>
}