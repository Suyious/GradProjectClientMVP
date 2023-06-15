import "./style.css"
import { TestCard } from "../../components/modules/upcomingtestcard"
import { useGetAllTestsQuery } from "../../app/services/api/mocktestApi";

const Test = () => {

	const { data, error, isLoading } = useGetAllTestsQuery();
 
    return (
        <div className="mock-test-pages-root flat-width-wrap">
			{ !isLoading && data? data.map((test, i) => (
				<TestCard key={test.id} test={test}/>
			)) : error && 'status' in error && 'error' in error && error.error }
        </div>
    )
}

export default Test
