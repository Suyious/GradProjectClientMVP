import "./style.css"
import { Question } from "../addquestions"

type MCQSelectProp = {
	question: Question;
	answer: Number;
	setAnswer: React.Dispatch<React.SetStateAction<Number>>;
}

const MCQSelect = ({ question = {
	serial: 1,
	statement: "You must provide question in code",
	option_1: "Provide option_1 in code",
	option_2: "Provide option_2 in code",
	option_3: "Provide option_3 in code",
	option_4: "Provide option_4 in code",
	answer: "Provide answer in code",
}, answer, setAnswer }: MCQSelectProp) => {

	const selectOption = (option: Number) => {
		if(answer !== option) setAnswer(option);
		else setAnswer(0)
	}

	return (
		<div className="mcqselect">
			<div className="mcq-serial">{ question.serial.toString() }</div>
			<div className="mcq-statement">{ question.statement }</div>
			<ul className="mcq-options">
				<li className="mcq-option" onClick = {() => selectOption(1)}>
					<span className="mcq-option-no">1</span>{ question.option_1 }
				</li>
				<li className="mcq-option" onClick = {() => selectOption(2)}>
					<span className="mcq-option-no">2</span>{ question.option_2 }
				</li>
				<li className="mcq-option" onClick = {() => selectOption(3)}>
					<span className="mcq-option-no">3</span>{ question.option_3 }
				</li>
				<li className="mcq-option" onClick = {() => selectOption(4)}>
					<span className="mcq-option-no">4</span>{ question.option_4 }
				</li>
			</ul>
		</div>
	)
}

export default MCQSelect
