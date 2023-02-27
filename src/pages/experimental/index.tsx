import MCQSelect from "../../components/mcqselect"
import CountDown from "../../components/countdown"
import { AddQuestions } from "../../components/addquestions"
import type { Question } from "../../components/addquestions"
import { useState } from "react"

const Experimental = () => {

	const [questions, setQuestions] = useState<Question[]>([])
	return (
		<div className="experimental width-wrap">
			<AddQuestions questions = { questions } setQuestions = { setQuestions }/>
		</div>
	)
}

export default Experimental
