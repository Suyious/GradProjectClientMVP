import "./style.css"
import { NavLink, To } from "react-router-dom"
import { Action } from "../action";

type LinkProps = {
    to: To;
    children: React.ReactNode;
    variant?: "fill" | "transparent" | "stroke";
    style?: React.CSSProperties;
}

export const Link = ({ to, children, variant="transparent", style = {} }: LinkProps) => {
    return <NavLink className="link-body link-strip" to={to}>
        <Action style={style} variant={variant}>{children}</Action>
    </NavLink>
}