import Card from "./card";
import Flex from "./flex"

type ContainerProps = {
    children: React.ReactNode,
}

const Container = ({children}: ContainerProps) => {
    return (
        <>{children}</>
    )
}

Container.Flex = Flex;
Container.Card = Card

export default Container;