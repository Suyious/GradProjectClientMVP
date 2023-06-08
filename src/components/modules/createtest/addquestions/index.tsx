import "./style.css";

import BackChevronIcon from "../../../../assets/icons/backchevron";
import { Test } from "../../../../pages/test/create";
import { Button } from "../../../elements/actions/buttons";
import QuestionInput from "../../../elements/inputs/question";
import TextBox from "../../../elements/inputs/textbox";
import { Question } from "../../../../types/question";

type AddQuestionsPanelProps = {
    test: Test | {},
    setTest: React.Dispatch<React.SetStateAction<{} | Test>>,
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
}

const AddQuestionsPanel = ({ test, setTest, page, setPage }: AddQuestionsPanelProps) => {

    function createNewQuestion() {
        setTest((p) => {

            if("questions" in p) {
                return {
                    ...p,
                    questions: [
                        ...p.questions, {
                            serial: p.questions.length + 1, statement: "", option_1: "", option_2: "", option_3: "", option_4: "", answer: "X",
                        }
                    ]
                }
            } else {
                return {
                    ...p,
                    questions: [{
                        serial: 1, statement: "", option_1: "", option_2: "", option_3: "", option_4: "", answer: "X",
                    }]
                }
            }
        })
        if("questions" in test) {
            setPage(test.questions.length + 1);
        } 
    }
    
    function pageNext() {
        setPage(p => p + 1)
    }

    function pagePrevious() {
        setPage(p => p - 1)
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

    function setQuestionProperty(index: number, property: keyof Question, value: string) {
        setQuestion((p) => p.map((q, i) => {
            if (i === index) return {
                ...q,
                [property]: value,
            }
            return q;
        }))
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
                            <div className="add_question_panel_question_number">{test.questions[page - 1].serial}</div>
                            <form className="add_question_form_body">
                                <TextBox
                                    value={test.questions[page - 1].statement}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                        setQuestionProperty(page - 1, "statement", e.target.value);
                                    }}
                                    variant="plain" placeholder="Question Statement..." />
                                <div className="add_question_form_options">
                                    <QuestionInput label="A" placeholder="Enter Option" 
                                        value={test.questions[page - 1].option_1}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setQuestionProperty(page - 1, "option_1", e.target.value);
                                        }}    
                                        answer={test.questions[page - 1].answer === "A"}
                                        onToggleCheckBox={(p) => {
                                            if(p === false) setQuestionProperty(page - 1, "answer", "A")
                                            if(p === true) setQuestionProperty(page - 1, "answer", "X")
                                        } }
                                    />
                                    <QuestionInput label="B" placeholder="Enter Option" 
                                        value={test.questions[page - 1].option_2}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setQuestionProperty(page - 1, "option_2", e.target.value);
                                        }} 
                                        answer={test.questions[page - 1].answer === "B"}
                                        onToggleCheckBox={(p) => {
                                            if(p === false) setQuestionProperty(page - 1, "answer", "B")
                                            if(p === true) setQuestionProperty(page - 1, "answer", "X")
                                        } }
                                    />
                                    <QuestionInput label="C" placeholder="Enter Option" 
                                        value={test.questions[page - 1].option_3}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setQuestionProperty(page - 1, "option_3", e.target.value);
                                        }} 
                                        answer={test.questions[page - 1].answer === "C"}
                                        onToggleCheckBox={(p) => {
                                            if(p === false) setQuestionProperty(page - 1, "answer", "C")
                                            if(p === true) setQuestionProperty(page - 1, "answer", "X")
                                        } }
                                    />
                                    <QuestionInput label="D" placeholder="Enter Option" 
                                        value={test.questions[page - 1].option_4}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setQuestionProperty(page - 1, "option_4", e.target.value);
                                        }} 
                                        answer={test.questions[page - 1].answer === "D"}
                                        onToggleCheckBox={(p) => {
                                            if(p === false) setQuestionProperty(page - 1, "answer", "D")
                                            if(p === true) setQuestionProperty(page - 1, "answer", "X")
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
                </div>
                <div className="add_question_panel_page_nav">
                    <div className="add_question_panel_page_prev">
                        <Button 
                            disabled={"questions" in test && (page === 1 || test.questions.length === 0)}
                            onClick={pagePrevious}
                        >Previous</Button>
                    </div>
                    <div className="add_question_panel_page_current">{"questions" in test && test.questions.length > 0 ? page.toString().padStart(2, "0"): "00"}</div>
                    <div className="add_question_panel_page_next">
                        <Button 
                            disabled={"questions" in test && (page === test.questions.length || test.questions.length === 0)}
                            onClick={pageNext}
                        >Next</Button>
                    </div>
                </div>
            </div>
            <div className="add_question_panel_right">
                <div className="add_question_panel_right_head">Questions</div>
                <div className="add_question_panel_right_questions_tabs">
                    { "questions" in test && test.questions.map((t) => (
                        <div className="add_question_panel_right_question_tab_i" key={t.serial}>{t.serial}</div>
                    ))}
                    <div className="add_question_panel_right_question_tab_plus">+</div>
                </div>
                <Button onClick={createNewQuestion}>Create New Question</Button>
                <Button>Submit</Button>
            </div>
        </div>
    )
}

export default AddQuestionsPanel;