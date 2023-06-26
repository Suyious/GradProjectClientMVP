import "./style.css"
import { useParams } from "react-router-dom";
import { useGetTestAllQuestionsQuery, useGetTestByIdQuery } from "../../../../app/services/api/mocktestApi";
import Navigation from "../../../../components/layouts/navigation";
import { CountDown } from "../../../../components/modules/countdown";
import { endsAt } from "../../../../utils/endTest";
import { useState } from "react";
import { Question } from "../../../../types/question";
import { useGetAllRegistrationsQuery } from "../../../../app/services/api/registrationApi";
import { useGetUserQuery } from "../../../../app/services/api/authApi";
import { Button } from "../../../../components/elements/actions/buttons";
import { Input } from "../../../../components/elements/inputs/input";

const TestPlay = () => {

    const { id } = useParams();
    const { data: test, isLoading, isError} = useGetTestByIdQuery(id || "");
    const { data: questions, isLoading: isQuestionLoading } = useGetTestAllQuestionsQuery(id || "");
    const [ page, setPage] = useState<number>(0);
	const { data: user } = useGetUserQuery()
	const { data: registrations, isLoading: isLoadingRegistrations, isError: isRegistrationError } = useGetAllRegistrationsQuery({ 
		user: user? user.id.toString() : "",
		test: id || "",
	})

    const QuestionPage = ({ question }: { question: Question }) => {
        return (
            <div className="question_page_body">
                <div className="question_page_serial">{question.serial}</div>
                <div className="question_page_statement">{question.statement}</div>
                <div className="question_page_options">
                    <div className="question_page_option question_page_option1">
                        <div className="question_page_option_serial">A</div>
                        {question.option_1}
                    </div>
                    <div className="question_page_option question_page_option2">
                        <div className="question_page_option_serial">B</div>
                        {question.option_2}
                    </div>
                    <div className="question_page_option question_page_option3">
                        <div className="question_page_option_serial">C</div>
                        {question.option_3}
                    </div>
                    <div className="question_page_option question_page_option4">
                        <div className="question_page_option_serial">D</div>
                        {question.option_4}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="test-play-body">
            <Navigation>
                {isLoading && <CountDown />}
                {!isLoading && <CountDown to={test ? test.data.starts_at : undefined} />}
            </Navigation>
            <div className="test-play-main flat-width-wrap">
                <div className="test-play-left">
                    <div className="test-play-left-top">
                        {isLoadingRegistrations ? (
                            <div className="test_play_loading">Loading...</div>
                        ) : isRegistrationError ?
                            (JSON.stringify(isRegistrationError)) :
                            registrations && registrations.length > 0 ? (
                                    <div className="test_play_questions">
                                        {!isQuestionLoading && questions && <QuestionPage question={questions[page]} />}
                                    </div>
                            ) : " Not Registered Yo"
                        }
                    </div>
                    <div className="test-play-left-bottom">
                        <Button>Previous</Button>
                        <span> {page} </span>
                        <Button>Next</Button>
                    </div>
                </div>
                <div className="test-play-right">
                    <div>Questions</div>
                    <div className="test-play-questions-icons">
                        {!isQuestionLoading ? questions ? questions.map((q) => (
                            <div className="test-play-question-icon" key={q.serial} onClick={() => setPage(q.serial - 1)}>{q.serial}</div>
                        )) : "No Questions" : "Loading..." }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TestPlay;