import "./style.css"

type ActionProp = {
    children: React.ReactNode;
    variant?: "fill" | "transparent" | "stroke";
    style?: React.CSSProperties;
}

export const Action = ({ children, variant="fill", style={}}: ActionProp) => {

    const styles:React.CSSProperties = {
        padding: "0.5em 1em",
        ...style
    }

    return (
        <div style={styles} className={`action-body ${variant}`}>
            {children}
        </div>
    )
}