import { useState } from "react"
import { AddQuestions } from "../../../components/modules/addquestions"
import { Question } from "../../../types/question";

const TestCreate = () => {

	const [ questions, setQuestions ] = useState<Question[]>([]);

	return (
		<div className="test-create width-wrap">
			<AddQuestions questions={questions} setQuestions={setQuestions}/>
		</div>
	)
}

export default TestCreate
