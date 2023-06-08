import { useLocation, useParams } from "react-router-dom"
import { useGetTestByIdQuery } from "../../../app/services/api/mocktestApi";
import Container from "../../../components/layouts/container";

const TestDetail = () => {

    const { id } = useParams();
    const { data, error, isLoading } = useGetTestByIdQuery(id || "");

    return (
        <div className="test-detail flat-width-wrap">
            <Container.Card className="test-detail-container" variant="fill-shadow" style={{ maxWidth: "600px"}}>

            </Container.Card>
            {!isLoading && data? data.name: "error"}
        </div>
    )
}

export default TestDetail