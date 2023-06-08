import "./style.css"

type CardProps = {
    className?: string,
    style?: React.CSSProperties,
    variant?: "fill-shadow" | "fill" | "plain",
    children?: React.ReactNode,
}

export default ({ className, style, variant = "plain", children}: CardProps) => {
    return (
        <section className={"container_card_body " + className + " " + variant} style={style}>{children}</section>
    )
}