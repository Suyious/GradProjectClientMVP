import { TestCard } from "../../components/upcomingtestcard"
import { useGetAllTestsQuery } from "../../app/services/api/mocktestApi";

const Test = () => {

	const { data, error, isLoading } = useGetAllTestsQuery();
 
    return (
        <div className="mock-test-pages-root width-wrap">
            Your Tests Yo:
			{ !isLoading && data? data.map((test, i) => (
				<TestCard/>
			)) : `Error yo: ${error}` }
        </div>
    )
}

export default Test
