import { useParams } from "react-router-dom";
import { useGetTestByIdQuery } from "../../../../app/services/api/mocktestApi";
import Navigation from "../../../../components/layouts/navigation";
import { CountDown } from "../../../../components/modules/countdown";
import { endsAt } from "../../../../utils/endTest";

const TestPlay = () => {

    const { id } = useParams();
    const { data, isLoading, isError} = useGetTestByIdQuery(id || "");

    return (
        <div className="test-play-body">
            <Navigation>
                {isLoading && <CountDown/>}
                { !isLoading && <CountDown to={data ? endsAt(data.data): undefined}/> }
            </Navigation>
            <div className="test_play_questions_body">
            </div>
        </div>
    )
}

export default TestPlay;