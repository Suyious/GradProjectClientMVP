import { useLocation, useParams } from "react-router-dom"
import { useGetTestByIdQuery } from "../../../app/services/api/mocktestApi";

const TestDetail = () => {

    const { id } = useParams();
    const { data, error, isLoading } = useGetTestByIdQuery(id || "");

    return (
        <div className="test-detail width-wrap">
            {!isLoading && data? data.name: "error"}
        </div>
    )
}

export default TestDetail