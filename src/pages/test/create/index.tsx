import { useState } from "react"
import CreateTestForm from "../../../components/modules/createtest";
import { Question } from "../../../types/question";
import AddQuestionsPanel from "../../../components/modules/createtest/addquestions";

export interface Test {
    name: string, 
    description: string,
    starts_at: string,
    duration: string,
	questions: Question[],
}

type RenderPageProps = {
	pageNumber: number;
	setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}

const RenderPage = ({ pageNumber, setPageNumber }: RenderPageProps) => {

    const [ currentTest, setCurrenttest ] = useState<Test | {}>({}); 

	switch(pageNumber) {
		case 0:
			return (<CreateTestForm state={currentTest} setState={setCurrenttest} setPage={setPageNumber}/>)
		default:
			return (<AddQuestionsPanel test={currentTest} setTest={setCurrenttest} setPage={setPageNumber} page={pageNumber}/>)
	}
}

const TestCreate = () => {

    const [ currentPage, setCurrentPage ] = useState<number>(0);

	return (
		<div className="test-create">
			<RenderPage pageNumber={currentPage} setPageNumber={setCurrentPage}/>
		</div>
	)
}

export default TestCreate
