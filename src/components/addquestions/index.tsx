import { useRef, useState } from "react"
import { Question } from "../../types/question";
import "./style.css"

type QuestionError = {
	statement?: String;
	option_1?: String;
	option_2?: String;
	option_3?: String;
	option_4?: String;
	answer?: String;
}

type AddQuestionProp = {
	questions: Question[];
	setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}

export const AddQuestions = ({ questions, setQuestions }: AddQuestionProp) => {

	const statementref = useRef<HTMLInputElement | null>(null)
	const option_1ref = useRef<HTMLInputElement | null>(null)
	const option_2ref = useRef<HTMLInputElement | null>(null)
	const option_3ref = useRef<HTMLInputElement | null>(null)
	const option_4ref = useRef<HTMLInputElement | null>(null)
	const answerref = useRef<HTMLInputElement | null>(null)
	const [errors, setErrors] = useState<QuestionError>({})

	const pushQuestion = (newquestion: Question) => {
		setQuestions((prev) => [...prev, newquestion])
	}

	const removeQuestion = (serial: Number) => {
		setQuestions((prev) => {
			return prev.filter((question) => question.serial !== serial)
		})
		// for correcting the Serial Numbers
		setQuestions((prev) => prev.map((question, index) => {
			return {
				...question,
				serial: index + 1
			}
		}))
	}

	const formsubmit = (e: React.SyntheticEvent) => {
		e.preventDefault()

		if(!statementref.current || !option_1ref.current
			|| !option_2ref.current || !option_3ref.current
			|| !option_4ref.current || !answerref.current)
		return

		const empty:QuestionError = {}
		if(statementref.current.value.length === 0)
			empty["statement"] = `This Field must not be Empty`
		if(option_1ref.current.value.length === 0)
			empty["option_1"] = `This Field must not be Empty`
		if(option_2ref.current.value.length === 0)
			empty["option_2"] = `This Field must not be Empty`
		if(option_3ref.current.value.length === 0)
			empty["option_3"] = `This Field must not be Empty`
		if(option_4ref.current.value.length === 0)
			empty["option_4"] = `This Field must not be Empty`
		if(answerref.current.value.length === 0)
			empty["answer"] = `This Field must not be Empty`
		setErrors(empty)
		if(Object.keys(empty).length !== 0) return

		const newquestion:Question = {
			serial: questions.length + 1,
			statement: statementref.current.value,
			option_1: option_1ref.current.value,
			option_2: option_2ref.current.value,
			option_3: option_3ref.current.value,
			option_4: option_4ref.current.value,
			answer: answerref.current.value,
		}
		pushQuestion(newquestion)
	}

	return (
		<div className="add-question">
			<form onSubmit={formsubmit} className="add-question-form">
				<label>Question Statement<input ref={statementref} type="text" /></label>
				{errors.statement}
				<label>A<input ref={option_1ref} type="text" /></label>
				{errors.option_1}
				<label>B<input ref={option_2ref} type="text" /></label>
				{errors.option_2}
				<label>C<input ref={option_3ref} type="text" /></label>
				{errors.option_3}
				<label>D<input ref={option_4ref} type="text" /></label>
				{errors.option_4}
				<label>Answer<input ref={answerref} type="text" /></label>
				{errors.answer}
				<button>Add Question +</button>
			</form>
			{ questions && questions.map((question) => {
				return (
					<div className="question-block" key={question.serial as React.Key}>	
						<h3 className="question-statement">
							<span className="question-no">{question.serial.toString()}</span>{question.statement}
						</h3>
						<p className="question-option option_1"><span>A</span>{question.option_1}</p>
						<p className="question-option option_2"><span>B</span>{question.option_2}</p>
						<p className="question-option option_3"><span>C</span>{question.option_3}</p>
						<p className="question-option option_4"><span>D</span>{question.option_4}</p>
						<p className="question-answer"><span>Answer</span>{question.answer}</p>
						<button onClick={() => removeQuestion(question.serial)}>Remove -</button>
					</div>
				)
			}) }
		</div>
	)
}