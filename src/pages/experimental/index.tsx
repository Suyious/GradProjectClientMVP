import { useState } from "react"
import { Input } from "../../components/elements/inputs/input"
import MCQSelect from "../../components/modules/mcqselect"

const ExperimentalMCQSelect = () => {

	const [answer, setAnswer] = useState<number>(0)
	const question = {
		serial: 1,
		statement: "Who da fuq??",
		option_1: "me",
		option_2: "me modafuqaahh",
		option_3: "I, Sir",
		option_4: "No one ?",
		answer: "1",
	}

	return (
		<MCQSelect question={question} answer={answer} setAnswer={setAnswer}/>
	)
}

const Experimental = () => {

	return (
		<div className="experimental width-wrap">
			<div>These Components are Experimental.</div>
			<Input type="email" placeholder="hello@friend.com" label="Email"/>
		</div>
	)
}

export default Experimental
