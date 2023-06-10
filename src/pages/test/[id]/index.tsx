import { useParams } from "react-router-dom"
import { useGetTestByIdQuery } from "../../../app/services/api/mocktestApi";
import Container from "../../../components/layouts/container";
import TestIcon from "../../../assets/icons/testicon";
import { DateToMomentsAgo } from "../../../utils/moments";
import { MockTest } from "../../../types/mocktest";

const TestDetail = () => {

    const { id } = useParams();
    const { data, error, isLoading } = useGetTestByIdQuery(id || "");


	const TestDetailCard = ({ test }: { test?: MockTest}) => {
		return (
			<Container.Card className="test-detail-container" variant="fill-shadow" style={{ maxWidth: "600px"}}>
				<section className="upcoming-test-subtitle">
					<p className="upcoming-test-author">{test && test.author ? test.author.first_name + " " + test.author.last_name : <span>Unspecified</span>}</p>
					<p className="upcoming-test-created">{test ? DateToMomentsAgo(new Date(test.created_at)) : <span>Unspecified</span>}</p>
				</section>
				<header className="upcoming-test-title">
					<TestIcon/>
					<h2>{test ? test.name : <span>Untitled Test</span>}</h2>
				</header>
				<p className="upcoming-test-description">
					{test ? test.description : <span>No Description</span>}
				</p>
			</Container.Card>
		)
	}

    return (
        <div className="test-detail flat-width-wrap">
			{!isLoading && data? <TestDetailCard test={data.data}/>: JSON.stringify(error)}
        </div>
    )
}

export default TestDetail
