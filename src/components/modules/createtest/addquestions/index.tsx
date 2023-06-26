import "./style.css";

import BackChevronIcon from "../../../../assets/icons/backchevron";
import { Test } from "../../../../pages/test/create";
import { Button } from "../../../elements/actions/buttons";
import QuestionInput from "../../../elements/inputs/question";
import TextBox from "../../../elements/inputs/textbox";
import { Question } from "../../../../types/question";
import { useState } from "react";
import { useCreateNewTestMutation } from "../../../../app/services/api/mocktestApi";
import { useNavigate } from "react-router-dom";
import TrashIcon from "../../../../assets/icons/trash";

type AddQuestionsPanelProps = {
    test: Test | {},
    setTest: React.Dispatch<React.SetStateAction<{} | Test>>,
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
}

interface TestQuestionCreateErrors {
    statement?: string,
    option_1?: string,
    option_2?: string,
    option_3?: string,
    option_4?: string,
    answer?: string,
}

const AddQuestionsPanel = ({ test, setTest, page, setPage }: AddQuestionsPanelProps) => {
  
    const [errors, setErrors] = useState<TestQuestionCreateErrors>()
    const NO_ERRORS = true;
    
    function setQuestionCreateErrors(t: Test | {}, i: number): boolean {

        if("questions" in t) {
            const errors_found:TestQuestionCreateErrors = {};
            const ERROR_EMPTY = "This field should not be empty"
            const q = t.questions[i];
            if(q.statement === "") errors_found.statement = ERROR_EMPTY;
            if(q.option_1 === "") errors_found.option_1 = ERROR_EMPTY;
            if(q.option_2 === "") errors_found.option_2 = ERROR_EMPTY;
            if(q.option_3 === "") errors_found.option_3 = ERROR_EMPTY;
            if(q.option_4 === "") errors_found.option_4 = ERROR_EMPTY;
            if(q.answer === 0) errors_found.answer = ERROR_EMPTY;
            if(Object.keys(errors_found).length === 0) {
                return NO_ERRORS;
            }
            setErrors(errors_found);
            console.log(errors_found);
            return false;
        }
        return true;
        
    }

    function createNewQuestion() {
        setTest((p) => {
            if("questions" in p) {
                return {
                    ...p,
                    questions: [
                        ...p.questions, {
                            serial: p.questions.length + 1, statement: "", option_1: "", option_2: "", option_3: "", option_4: "", answer: 0,
                        }
                    ]
                }
            } else {
                return {
                    ...p,
                    questions: [{
                        serial: 1, statement: "", option_1: "", option_2: "", option_3: "", option_4: "", answer: 0,
                    }]
                }
            }
        })
        if("questions" in test) {
            setPage(test.questions.length + 1);
        } 
    }

    function deleteAndShift(questions: Question[], serial: number) {
        return questions.filter((q) => q.serial !== serial).map((q) => {
            if(q.serial > serial) {
                return {
                    ...q,
                    serial: q.serial - 1
                }
            } else {
                return q
            }
        })
    }

    function deleteQuestion(serial: number) {
        setTest((p) => {
            if("questions" in p) {
                return {
                    ...p,
                    questions: deleteAndShift(p.questions, serial)
                }
            } else {
                return p;
            }
        })
        if(serial === 1){
            setPage(1);
        }
        else setPage(serial - 1);
        setErrors(undefined);
    }

    function pageGoTo(serial: number) {
        setPage(serial);
        setErrors(undefined);
    }
    
    function pageNext() {
        setPage(p => p + 1)
        setErrors(undefined);
    }

    function pagePrevious() {
        setPage(p => p - 1)
        setErrors(undefined);
    }

    function setQuestion(newquestion: (prev: Question[]) => Question[]) {
        setTest(p => {
            if("questions" in p ) {
                return {
                    ...p,
                    questions: newquestion(p.questions)
                }
            } else return p;
        })
    }

    function setQuestionProperty(index: number, property: keyof Question, value: string | number) {
        setQuestion((p) => p.map((q, i) => {
            if (i === index) return {
                ...q,
                [property]: value,
            }
            return q;
        }))
    }

    const [ createNewTest, { isLoading }] = useCreateNewTestMutation();
	const navigate = useNavigate()

    async function onSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        if("questions" in test) {
            if(test.questions.length === 0) return;
            for(let i = 0; i < test.questions.length; i++){
                // console.log("checking question: %d", i + 1);
                if(setQuestionCreateErrors(test, i) !== NO_ERRORS) {
                    // console.log("Error in page" + i + 1);
                    setPage(i + 1)
                    return;
                }
            }
            console.log("ready to submit");
            await createNewTest(test)
                .unwrap().then(() => {
                    navigate("/");
                }).catch(error => {
                    if (error) {
                        if (error.error) console.log({ "detail": error.error.split(": ")[1] })
                        else if (error.data) console.log(error.data)
                        else console.log({ "detail": JSON.stringify(error) })
                    }
                })
        }
    }

    return (
        <div className="add_question_panel_body flat-width-wrap">
            <div className="add_question_panel_left">
                <div className="add_question_back_to_create" onClick={() => setPage(0)}>
                    <div className="addquestion_back_icon"><BackChevronIcon/></div>
                    <div className="addquestion_back_head">
                        <div className="addquestion_back_head_name">{"name" in test && test.name}</div>
                        <div className="addquestion_back_head_subtext">Edit Test Details</div>
                    </div>
                </div>
                <div className="add_question_panel_form_wrapper">
                    {"questions" in test && test.questions.length > 0 ? (
                        <>
                            <div className="add_question_panel_question_serial">{test.questions[page - 1].serial}</div>
                            <form className="add_question_form_body">
                                <TextBox
                                    error={errors?.statement}
                                    value={test.questions[page - 1].statement}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                        setQuestionProperty(page - 1, "statement", e.target.value);
                                    }}
                                    variant="plain" placeholder="Question Statement..." />
                                <div className="add_question_form_options">
                                    <QuestionInput label="A" placeholder="Enter Option" 
                                        error={errors?.option_1}
                                        value={test.questions[page - 1].option_1}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setQuestionProperty(page - 1, "option_1", e.target.value);
                                        }}
                                        answer={test.questions[page - 1].answer === 1}
                                        onToggleCheckBox={(p) => {
                                            if(p === false) setQuestionProperty(page - 1, "answer", 1)
                                            if(p === true) setQuestionProperty(page - 1, "answer", 0)
                                        } }
                                    />
                                    <QuestionInput label="B" placeholder="Enter Option" 
                                        error={errors?.option_2}
                                        value={test.questions[page - 1].option_2}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setQuestionProperty(page - 1, "option_2", e.target.value);
                                        }} 
                                        answer={test.questions[page - 1].answer === 2}
                                        onToggleCheckBox={(p) => {
                                            if(p === false) setQuestionProperty(page - 1, "answer", 2)
                                            if(p === true) setQuestionProperty(page - 1, "answer", 0)
                                        } }
                                    />
                                    <QuestionInput label="C" placeholder="Enter Option" 
                                        error={errors?.option_3}
                                        value={test.questions[page - 1].option_3}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setQuestionProperty(page - 1, "option_3", e.target.value);
                                        }} 
                                        answer={test.questions[page - 1].answer === 3}
                                        onToggleCheckBox={(p) => {
                                            if(p === false) setQuestionProperty(page - 1, "answer", 3)
                                            if(p === true) setQuestionProperty(page - 1, "answer", 0)
                                        } }
                                    />
                                    <QuestionInput label="D" placeholder="Enter Option" 
                                        error={errors?.option_4}
                                        value={test.questions[page - 1].option_4}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setQuestionProperty(page - 1, "option_4", e.target.value);
                                        }} 
                                        answer={test.questions[page - 1].answer === 4}
                                        onToggleCheckBox={(p) => {
                                            if(p === false) setQuestionProperty(page - 1, "answer", 4)
                                            if(p === true) setQuestionProperty(page - 1, "answer", 0)
                                        } }
                                    />
                                </div>
                            </form>
                        </>
                    ) : (
                        <>
                            <div className="add_question_panel_no_questions">
                                <div className="add_question_panel_no_question_text">No Questions in Test</div>
                                <Button onClick={createNewQuestion}>Create New Question</Button>
                            </div>
                        </>
                    )}
                    {errors?.answer && <div className="add_question_panel_errors">You must provide a valid answer</div>}
                </div>
                <div className="add_question_panel_page_nav">
                    <div className="add_question_panel_page_prev">
                        <Button 
                            disabled={"questions" in test && (page === 1 || test.questions.length === 0)}
                            onClick={pagePrevious}
                        >Previous</Button>
                    </div>
                    <div className="add_question_panel_page_current">
                        {"questions" in test && test.questions.length > 0 ? page.toString().padStart(2, "0"): "00"}
                    </div>
                    <div className="add_question_panel_page_next">
                        <Button 
                            disabled={"questions" in test && (page === test.questions.length || test.questions.length === 0)}
                            onClick={pageNext}
                        >Next</Button>
                    </div>
                </div>
            </div>
            <div className="add_question_panel_right">
                <div className="add_question_panel_right_top">
                    <div className="add_question_panel_right_head">Questions</div>
                    <div className="add_question_panel_right_questions_tabs">
                        { "questions" in test && test.questions.map((t) => (
                            <div className="add_question_panel_right_question_tab tab_i" 
                                key={t.serial} onClick={() => pageGoTo(t.serial)}>
                                {t.serial}
                            </div>
                        ))}
                        <div className="add_question_panel_right_question_tab tab_plus" onClick={createNewQuestion}>+</div>
                    </div>
                    <div className="add_question_panel_right_buttons">
                        <Button className="add_question_create_question_button" onClick={createNewQuestion}>Create New Question</Button>
                        <div className="add_question_delete_button" onClick={() => deleteQuestion(page)}>
                            <TrashIcon/>
                        </div>
                    </div>
                </div>
                <Button className="add_question_submit_button" onClick={onSubmit}>Submit</Button>
            </div>
        </div>
    )
}

export default AddQuestionsPanel;