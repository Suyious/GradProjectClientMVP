import "./style.css"

type TabsProps = {
    children: React.ReactNode[],
    labels: string[];
    state: number,
    setState: React.Dispatch<React.SetStateAction<number>>
}

const Tabs = ({ children, state, setState, labels }: TabsProps) => {
    return (
        <div className="tabs-body">
            <div className="tabs-navigation-body">
                { labels.map((label, i) => (
                    <div className={ "tabs-navigation-tab-label" + (state === i ? " select": "") } 
                        key={i}
                        onClick={() => setState(i)}
                    >{label}</div>
                ))}
            </div>
            <div className="tabs-outlet-wrapper">
                {children[state]}
            </div>
        </div>
    )
}

export default Tabs;