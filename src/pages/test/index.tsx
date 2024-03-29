import "./style.css"
import { TestCard } from "../../components/modules/upcomingtestcard"
import { useGetAllTestsQuery } from "../../app/services/api/mocktestApi";
import { useState } from "react";
import Tabs from "../../components/layouts/tabs";

const Test = () => {

    const [ tab, setTab ] = useState<number>(0);
    const filters = ["available","online", "offline"];
    const labels = ["Upcoming", "Online Now", "Past"];
	const { data, error, isLoading, isError } = useGetAllTestsQuery({
        filter: filters[tab]
    });

    const TestAll = ():JSX.Element => {
        if(isLoading) return (
            <div className="test-all-body">
                <div className="test-all-loading">
                    Loading Tests ...
                </div>
            </div>
        )
        if(!isLoading && data) {
            if(data.length === 0) return (
                <div className="test-all-body">No Test {labels[tab]}</div>
            )
            return (
                <div className="tests-all-body">
                    {data.map(test => (
                        <TestCard key={test.id} test={test}/>
                    ))}
                </div>
            )
        } else {
            return (
                <div className="tests-all-error">
                    {error && 'status' in error && 'error' in error && error.error}
                </div>
            )
        }
    }

    const TestAvailable = TestAll;
    const TestOffline = TestAll;
 
    const TestOnline = TestAll;

    return (
        <div className="mock-test-pages-root flat-width-wrap">
            <Tabs labels={labels} state={tab} setState={setTab}>
                { [<TestAvailable key="available"/>, <TestOnline key="online"/>,<TestOffline key="offline"/>] }
            </Tabs>
        </div>
    )
}

export default Test
