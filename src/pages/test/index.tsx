import "./style.css"
import { TestCard } from "../../components/modules/upcomingtestcard"
import { useGetAllTestsQuery } from "../../app/services/api/mocktestApi";
import { useState } from "react";
import Tabs from "../../components/layouts/tabs";

const Test = () => {

	const { data, error, isLoading, isError } = useGetAllTestsQuery();
    const [ tab, setTab ] = useState<number>(0);
    const labels = ["All", "Available","Online", "Offline"];

    const TestAll = ():JSX.Element => {
        if(!isLoading && data) {
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

    const TestAvailable = () => {
        return (
            <>Available</>
        )
    }
 
    const TestOffline = () => {
        return (
            <>Offline</>
        )
    }
 
    const TestOnline = () => {
        return (
            <>Online</>
        )
    }
 
    return (
        <div className="mock-test-pages-root flat-width-wrap">
            <Tabs labels={labels} state={tab} setState={setTab}>
                { [<TestAll/>, <TestAvailable/>, <TestOnline/>,<TestOffline/>] }
            </Tabs>
        </div>
    )
}

export default Test
