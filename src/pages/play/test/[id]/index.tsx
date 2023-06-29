import "./style.css"
import { useParams } from "react-router-dom";
import { useGetTestAllQuestionsQuery, useGetTestByIdQuery } from "../../../../app/services/api/mocktestApi";
import Navigation from "../../../../components/layouts/navigation";
import { CountDown } from "../../../../components/modules/countdown";
import { useEffect, useState } from "react";
import { Question } from "../../../../types/question";
import { useCreateNewResponseMutation, useGetAllRegistrationsQuery } from "../../../../app/services/api/registrationApi";
import { useGetUserQuery } from "../../../../app/services/api/authApi";
import { Button } from "../../../../components/elements/actions/buttons";
import { Response } from "../../../../types/response";
import { Link } from "../../../../components/elements/actions/links";

const TestPlay = () => {

    const { id } = useParams();
    const [ page, setPage] = useState<number>(0);

    const { data: test, isLoading: isTestLoading, isError: isTestError} = useGetTestByIdQuery(id || "");
    const { data: questions, isLoading: isQuestionLoading } = useGetTestAllQuestionsQuery(id || "");
	const { data: user } = useGetUserQuery()
	const { data: registrations, isLoading: isLoadingRegistrations, isError: isRegistrationError } = useGetAllRegistrationsQuery({ 
		user: user? user.id.toString() : "",
		test: id || "",
	})

    const [ createNewResponse ] = useCreateNewResponseMutation()

    // Responses needs to be right format
    const [response, setResponse] = useState<Response[]>([]);


    useEffect(() => {
        if(!isQuestionLoading && questions) {
            setResponse(questions.map((q) => ({
                question_id: q.serial,
                answer: 0,
            })))
        }
    }, [questions, isQuestionLoading])

    function toggleResponse(index: number, r: number) {
        if(response[index].answer === r) {
            setResponse(p => p.map((res) => {
                if(res.question_id === index + 1) {
                    return {
                        ...res,
                        answer: 0
                    }
                } else return res;
            }))
        } else { 
            setResponse(p => p.map((res) => {
                if(res.question_id === index + 1) {
                    return {
                        ...res,
                        answer: r
                    }
                } else return res;
            }))
        }
    }

    function pageNext() {
        setPage(p => p + 1)
    }

    function pagePrevious() {
        setPage(p => p - 1)
    }


    const QuestionPage = ({ question }: { question: Question }) => {
        return (
            <div className="question_page_body">
                { response.length > 0 && (<>
                    <div className="question_page_serial">{question.serial}</div>
                    <div className="question_page_statement">{question.statement}</div>
                    <div className="question_page_options">
                        <div
                            className={"question_page_option question_page_option1 " + (response[page].answer === 1 ? "response": "")}
                            onClick={() => toggleResponse(page, 1)}
                        >
                            <div className="question_page_option_serial">A</div>
                            <div className="question_page_option_text">{question.option_1}</div>
                        </div>
                        <div
                            className={"question_page_option question_page_option2 " + (response[page].answer === 2 ? "response": "")}
                            onClick={() => toggleResponse(page, 2)}
                        >
                            <div className="question_page_option_serial">B</div>
                            <div className="question_page_option_text">{question.option_2}</div>
                        </div>
                        <div
                            className={"question_page_option question_page_option3 " + (response[page].answer === 3 ? "response": "")}
                            onClick={() => toggleResponse(page, 3)}
                        >
                            <div className="question_page_option_serial">C</div>
                            <div className="question_page_option_text">{question.option_3}</div>
                        </div>
                        <div 
                            className={"question_page_option question_page_option4 " + (response[page].answer === 4 ? "response": "")}
                            onClick={() => toggleResponse(page, 4)}
                        >
                            <div className="question_page_option_serial">D</div>
                            <div className="question_page_option_text">{question.option_4}</div>
                        </div>
                    </div>
                </>)}
            </div>
        )
    }

    const TestUnavailable = () => {
        return (
            <div className="test-play-unavailable">
                <div className="test-play-unavailable-wrapper">
                    <div className="test-play-unavialable-head">Unavailable</div>
                    <div className="test-play-unavialable-subtext">Seems like this test is yet to come online or has already been conducted.</div>
                    <Link variant="fill" to="/">Go Back Home</Link>
                </div>
            </div>
        )
    }

    const TestPlayInterface = () => {
        return (
            <>
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
                        <Button
                            disabled={questions && (page === 0 || questions.length === 0)}
                            onClick={pagePrevious}
                        >Previous</Button>
                        <span> {page + 1} </span>
                        <Button
                            disabled={questions && (page === questions.length - 1 || questions.length === 0)}
                            onClick={pageNext}
                        >Next</Button>
                    </div>
                </div>
                <div className="test-play-right">
                    <div>Questions</div>
                    {response.length > 0 && (
                        <div className="test-play-questions-icons">
                            {!isQuestionLoading ? questions ? questions.map((q) => (
                                <div className={"test-play-question-icon " + (response[q.serial - 1].answer !== 0 ? "response" : "")} key={q.serial} onClick={() => setPage(q.serial - 1)}>{q.serial}</div>
                            )) : "No Questions" : "Loading..."}
                        </div>
                    )}
                </div>
            </>
        )
    }

    return (
        <div className="test-play-body">
            <Navigation>
                {isTestLoading && <CountDown />}
                {!isTestLoading && test && test.data.isTestOnline && <CountDown to={test ? test.data.starts_at : undefined} />}
            </Navigation>
            <div className="test-play-main flat-width-wrap">
                { isTestLoading ? (
                    <div className="test_play_loading">loading...</div>
                    ) : test && test.data.isTestOnline ? (
                            <TestPlayInterface/>
                        ) : (
                            <TestUnavailable/>
                        ) 
                }
            </div>
        </div>
    )
}

export default TestPlay;