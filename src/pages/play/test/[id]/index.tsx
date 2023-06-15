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
                <div className="question_page_option1">{question.option_1}</div>
                <div className="question_page_option2">{question.option_2}</div>
                <div className="question_page_option3">{question.option_3}</div>
                <div className="question_page_option4">{question.option_4}</div>
            </div>
        )
    }

    return (
        <div className="test-play-body">
            <Navigation>
                {isLoading && <CountDown />}
                {!isLoading && <CountDown to={test ? endsAt(test.data) : undefined} />}
            </Navigation>
            {isLoadingRegistrations ? (
                <div className="test_play_loading">Loading...</div>
            ) : isRegistrationError ?
                (JSON.stringify(isRegistrationError)) :
                registrations && registrations.length > 0 ? (
                    <div className="test_play_questions_body flat-width-wrap">
                        <div className="test_play_questions_left">
                            {!isQuestionLoading && questions && <QuestionPage question={questions[page]} />}
                        </div>
                        <div className="test_play_questions_right"></div>
                    </div>
                ): " Not Registered Yo"
            }
        </div>
    )
}

export default TestPlay;