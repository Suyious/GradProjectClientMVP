import "./style.css"
import { Question } from "../../../types/question" 

type MCQSelectProp = {
	question: Question;
	answer: number;
	setAnswer: React.Dispatch<React.SetStateAction<number>>;
}

const MCQSelect = ({ question = {
	serial: 1,
	statement: "You must provide question",
	option_1: "Provide option_1",
	option_2: "Provide option_2",
	option_3: "Provide option_3",
	option_4: "Provide option_4",
	answer: "Provide answer",
}, answer, setAnswer }: MCQSelectProp) => {

	const selectOption = (option: number) => {
		if(answer !== option) setAnswer(option);
		else setAnswer(0)
	}

	return (
		<div className="mcqselect">
			<div className="mcq-serial">{ question.serial.toString() }</div>
			<div className="mcq-statement">{ question.statement }</div>
			<ul className="mcq-options">
				<li className={`mcq-option${answer === 1 ? " selected": ""}`} onClick = {() => selectOption(1)}>
					<span className="mcq-option-no">1</span>{ question.option_1 }
				</li>
				<li className={`mcq-option${answer === 2 ? " selected": ""}`} onClick = {() => selectOption(2)}>
					<span className="mcq-option-no">2</span>{ question.option_2 }
				</li>
				<li className={`mcq-option${answer === 3 ? " selected": ""}`} onClick = {() => selectOption(3)}>
					<span className="mcq-option-no">3</span>{ question.option_3 }
				</li>
				<li className={`mcq-option${answer === 4 ? " selected": ""}`} onClick = {() => selectOption(4)}>
					<span className="mcq-option-no">4</span>{ question.option_4 }
				</li>
			</ul>
		</div>
	)
}

export default MCQSelect
