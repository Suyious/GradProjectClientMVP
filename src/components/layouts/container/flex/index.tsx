import "./style.css"

type FlexProps = {
    className?: string,
    children?: React.ReactNode,
    direction?: "row" | "column",
    style?: React.CSSProperties,
}

export default ({ className="", children, direction="row", style = {}}: FlexProps) => {

    const styles:React.CSSProperties = {
        gap: "1em",
        ...style
    }

    return (
        <div className={className + " container_flex_body " + direction} style={styles}>{ children }</div>
    )
}