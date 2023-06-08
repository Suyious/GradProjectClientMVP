import { useState } from "react"
import { Input } from "../../components/elements/inputs/input"
import MCQSelect from "../../components/modules/mcqselect"
import Container from "../../components/layouts/container"

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
		<Container.Flex style={{ height: "100vh"}} className="experimental width-wrap">
			<Input type="email" placeholder="hello@friend.com" label="Email" error="Give Error Bro!"/>
		</Container.Flex>
	)
}

export default Experimental
